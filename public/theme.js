
/* snippets/cart-notification.liquid */
(() => {

  /**
   * <cart-notification>: the "Added to your bag" card. Listens for "cart:added" (detail.item = the
   * line from Shopify's /cart/add.js answer; its quantity is the line's total in the bag).
   * Sends "cart-notification:close" when it closes or is replaced, so the cart button that opened it
   * can take its tick away.
   */
  class CartNotification extends HTMLElement {
    static DURATION = 5000;

    connectedCallback() {
      this.controller = new AbortController();
      const { signal } = this.controller;
      document.addEventListener('cart:added', (event) => this.open(event.detail?.item), { signal });
      this.addEventListener('click', (event) => {
        if (event.target.closest('[data-cart-notification-close]')) this.close();
      }, { signal });
      this.addEventListener('keydown', (event) => {
        if (event.key === 'Escape') this.close();
      }, { signal });
      // The timer stops while the visitor is reading or using the card (WCAG 2.2.1)
      this.addEventListener('pointerenter', () => this.pause(), { signal });
      this.addEventListener('pointerleave', () => this.resume(), { signal });
      this.addEventListener('focusin', () => this.pause(), { signal });
      this.addEventListener('focusout', (event) => {
        if (!this.contains(event.relatedTarget)) this.resume();
      }, { signal });
    }

    disconnectedCallback() {
      this.controller?.abort();
      clearTimeout(this.timer);
      clearTimeout(this.bagTimer);
    }

    open(item) {
      if (!item) return;
      // A card that is still open belongs to another add: its button takes its tick away
      if (!this.hidden) document.dispatchEvent(new CustomEvent('cart-notification:close'));

      this.fill(item);
      this.hidden = false;
      if (this.showPopover && !this.matches(':popover-open')) this.showPopover();
      this.restartAnimation();
      this.resume();
      this.waitForBag();
    }

    /** Writes the product into the card (text only: textContent, no HTML from the answer) */
    fill(item) {
      const image = this.querySelector('[data-cart-notification-image]');
      image.src = 'data:,';
      if (item.image) {
        try {
          // A small file (Shopify's image CDN resizes by the width parameter). document.baseURI, not
          // location.origin: that is "null" in some frames, and new URL() then throws
          const url = new URL(item.image, document.baseURI);
          url.searchParams.set('width', '160');
          image.src = url.toString();
        } catch (error) {
          image.src = item.image;
        }
      }
      this.querySelectorAll('[data-cart-notification-link]').forEach((link) => (link.href = item.url || '#'));
      this.querySelector('[data-cart-notification-name]').textContent = item.product_title || item.title || '';
      const variant = item.product_has_only_default_variant ? '' : item.variant_title || '';
      this.querySelector('[data-cart-notification-variant]').textContent = variant;
      this.querySelector('[data-cart-notification-price]').textContent = this.money(item.final_price ?? item.price ?? 0);
      this.querySelector('[data-cart-notification-in-bag]').textContent = this.dataset.labelInBag.replace('[count]', item.quantity);
      this.querySelector('[data-cart-notification-bag]').hidden = true;
    }

    /**
     * The bag line (item count + total) comes from the next "cart:updated" (the header reads /cart.js
     * after every add). Without a header, or if it doesn't come within 1.5s, read /cart.js here.
     */
    waitForBag() {
      clearTimeout(this.bagTimer);
      this.bagController?.abort();
      this.bagController = new AbortController();
      document.addEventListener('cart:updated', (event) => {
        if (event.detail?.cart) this.fillBag(event.detail.cart);
      }, { signal: this.bagController.signal, once: true });
      this.bagTimer = setTimeout(async () => {
        try {
          const root = window.Shopify?.routes?.root || '/';
          this.fillBag(await fetch(`${root}cart.js`, { headers: { Accept: 'application/json' } }).then((r) => r.json()));
        } catch (error) {
          // The bag line stays hidden; the rest of the card is right
        }
      }, 1500);
    }

    fillBag(cart) {
      clearTimeout(this.bagTimer);
      this.bagController?.abort();
      const count = cart.item_count;
      const label = count === 1 ? this.dataset.labelBagOne : this.dataset.labelBagOther.replace('999999', count);
      this.querySelector('[data-cart-notification-count]').textContent = label;
      this.querySelector('[data-cart-notification-total]').textContent = this.money(cart.total_price);
      this.querySelector('[data-cart-notification-bag]').hidden = false;
    }

    close() {
      if (this.hidden) return;
      clearTimeout(this.timer);
      clearTimeout(this.bagTimer);
      this.bagController?.abort();
      if (this.hidePopover && this.matches(':popover-open')) this.hidePopover();
      this.hidden = true;
      document.dispatchEvent(new CustomEvent('cart-notification:close'));
    }

    pause() {
      clearTimeout(this.timer);
    }

    resume() {
      clearTimeout(this.timer);
      if (this.matches(':hover') || this.contains(document.activeElement)) return;
      this.timer = setTimeout(() => this.close(), CartNotification.DURATION);
    }

    /** A new add while the card is open plays the entrance again */
    restartAnimation() {
      this.style.animation = 'none';
      void this.offsetWidth;
      this.style.animation = '';
    }

    /**
     * Cents → the store's money format (Settings > General > Store currency), e.g. "Rs. 4,000.00".
     * Same placeholders as Product bundle (sections/product-pairs.liquid).
     */
    money(cents) {
      const format = this.dataset.moneyFormat || '';
      if (!format) return (cents / 100).toFixed(2);
      const group = (value, decimals, thousands, decimal) => {
        const [whole, fraction] = (value / 100).toFixed(decimals).split('.');
        return whole.replace(/\B(?=(\d{3})+(?!\d))/g, thousands) + (fraction ? decimal + fraction : '');
      };
      return format.replace(/\{\{\s*(\w+)\s*\}\}/, (match, key) => {
        switch (key) {
          case 'amount_no_decimals':
            return group(cents, 0, ',', '.');
          case 'amount_with_comma_separator':
            return group(cents, 2, '.', ',');
          case 'amount_no_decimals_with_comma_separator':
            return group(cents, 0, '.', ',');
          case 'amount_with_apostrophe_separator':
            return group(cents, 2, "'", '.');
          default:
            return group(cents, 2, ',', '.');
        }
      });
    }
  }

  if (!customElements.get('cart-notification')) customElements.define('cart-notification', CartNotification);

})();

/* snippets/filter-drawer.liquid */
(() => {

  /**
   * <filter-drawer>: opens the filter <dialog> with showModal() (focus moves in, Tab stays inside, Escape
   * closes, the page behind is inert).
   * - While it's open, every change asks Shopify for the same section with the new choices (~0.3s after the
   *   last change) and copies the new total into "View results (N)" and the new counts next to each choice.
   *   Nothing else on the page changes.
   * - "View results" asks the section's <results-view> to load the results (a bubbling 'results:load' event;
   *   it reads this form and the sort to build the URL), then closes. "Reset" is a link <results-view> loads.
   * - The Brand search box hides the rows that don't contain what was typed.
   * - Closing without applying resets the boxes to what's applied.
   */
  class FilterDrawer extends HTMLElement {
    connectedCallback() {
      this.toggle = this.querySelector('.filter-drawer__toggle');
      this.dialog = this.querySelector('dialog');
      this.sectionId = this.dataset.sectionId;

      this.toggle.addEventListener('click', () => {
        this.applied = false;
        this.dialog.showModal();
        // Focus on the close button, not on Reset (the first focusable). Done here, not with the
        // autofocus attribute: Theme Store rule "no autofocus".
        this.dialog.querySelector('[data-drawer-close]')?.focus();
        this.toggle.setAttribute('aria-expanded', 'true');
      });

      this.dialog.addEventListener('click', (event) => {
        // The form fills the dialog, so the dialog itself is only the target for a backdrop click
        if (event.target === this.dialog || event.target.closest('[data-drawer-close]')) {
          this.dialog.close();
        } else if (event.target.closest('[data-results-link]')) {
          // "Reset": <results-view> loads the link; the drawer just gets out of the way
          this.applied = true;
          this.dialog.close();
        }
      });

      this.dialog.addEventListener('submit', (event) => {
        event.preventDefault();
        this.dispatchEvent(new CustomEvent('results:load', { bubbles: true }));
        this.applied = true;
        this.dialog.close();
      });

      this.dialog.addEventListener('change', (event) => {
        if (event.target.name) this.queueCount();
      });

      this.dialog.addEventListener('input', (event) => {
        if (event.target.matches('[data-filter-search]')) this.searchBrands(event.target);
      });

      // Enter in the brand search shouldn't submit the whole form
      this.dialog.addEventListener('keydown', (event) => {
        if (event.key === 'Enter' && event.target.matches('[data-filter-search]')) event.preventDefault();
      });

      this.dialog.addEventListener('close', () => {
        this.toggle.setAttribute('aria-expanded', 'false');
        clearTimeout(this.countTimer);
        this.controller?.abort();
        if (!this.applied) {
          this.dialog.querySelector('form')?.reset();
          this.queueCount();
        }
      });
    }

    disconnectedCallback() {
      clearTimeout(this.countTimer);
      this.controller?.abort();
    }

    searchBrands(input) {
      const term = input.value.trim().toLowerCase();
      const list = input.closest('fieldset').querySelector('.filter-group__options');
      list.querySelectorAll('.filter-group__item').forEach((item) => {
        item.hidden = term !== '' && !item.textContent.toLowerCase().includes(term);
      });
    }

    queueCount() {
      clearTimeout(this.countTimer);
      this.countTimer = setTimeout(() => this.updateCount(), 300);
    }

    // The same URL "View results" would load: this form + the sort, empty boxes left out
    countUrl() {
      const form = this.dialog.querySelector('form');
      const params = new URLSearchParams();
      for (const [key, value] of new FormData(form)) {
        if (value !== '') params.append(key, value);
      }
      const sort = this.closest('results-view')?.querySelector('select[name="sort_by"]')?.value;
      if (sort) params.set('sort_by', sort);
      params.set('section_id', this.sectionId);
      return `${form.action}?${params}`;
    }

    async updateCount() {
      this.controller?.abort();
      this.controller = new AbortController();
      try {
        const response = await fetch(this.countUrl(), { signal: this.controller.signal });
        if (!response.ok) return;
        const html = new DOMParser().parseFromString(await response.text(), 'text/html');

        const total = html.getElementById(`FilterResults-${this.sectionId}`);
        const button = this.querySelector(`#FilterResults-${this.sectionId}`);
        if (total && button) button.textContent = total.textContent;

        // Each choice's count and whether it can still be picked (an id per choice, see filter-group)
        this.dialog.querySelectorAll('[data-filter-count]').forEach((count) => {
          const fresh = html.getElementById(count.id);
          if (fresh) count.textContent = fresh.textContent;
          const input = count.closest('label')?.querySelector('input');
          const freshInput = fresh?.closest('label')?.querySelector('input');
          if (input && freshInput && !input.checked) input.disabled = freshInput.disabled;
        });
      } catch (error) {
        // A failed count is only a hint: the visitor can still press View results
      }
    }
  }

  if (!customElements.get('filter-drawer')) customElements.define('filter-drawer', FilterDrawer);

})();

/* snippets/filter-group.liquid */
(() => {

  /**
   * <price-range>: keeps the two-thumb slider and the From / To boxes in step. Only the boxes have a name,
   * so only they go into the URL. A thumb at the very end leaves its box empty (no limit on that side).
   * The red part of the track is drawn with --from / --to (percentages along the track).
   */
  class PriceRange extends HTMLElement {
    connectedCallback() {
      this.thumbs = { min: this.querySelector('[data-price-thumb="min"]'), max: this.querySelector('[data-price-thumb="max"]') };
      this.boxes = { min: this.querySelector('[data-price-box="min"]'), max: this.querySelector('[data-price-box="max"]') };
      this.top = Number(this.thumbs.max.max) || 0;

      // All listeners on one AbortController: the theme editor can attach the section again (connectedCallback
      // runs again), and the thumbs and boxes are the same elements, so they would get a second listener.
      this.controller?.abort();
      this.controller = new AbortController();
      const { signal } = this.controller;

      Object.entries(this.thumbs).forEach(([side, thumb]) => {
        thumb.addEventListener('input', () => this.fromThumb(side), { signal });
      });
      Object.entries(this.boxes).forEach(([side, box]) => {
        box.addEventListener('input', () => this.fromBox(side), { signal });
      });

      // Closing the drawer without applying runs form.reset(): the thumbs and boxes jump back, but no input
      // event fires, so repaint the red part of the track. 'reset' fires before the values change, hence the
      // next frame.
      this.closest('form')?.addEventListener('reset', () => requestAnimationFrame(() => this.paint()), { signal });

      this.paint();
    }

    disconnectedCallback() {
      this.controller?.abort();
    }

    fromThumb(side) {
      let min = Number(this.thumbs.min.value);
      let max = Number(this.thumbs.max.value);
      // The thumbs can't cross
      if (min > max) {
        if (side === 'min') this.thumbs.min.value = min = max;
        else this.thumbs.max.value = max = min;
      }
      this.boxes.min.value = min > 0 ? min : '';
      this.boxes.max.value = max < this.top ? max : '';
      this.paint();
      // The drawer's live count listens for changes on the form
      this.boxes[side].dispatchEvent(new Event('change', { bubbles: true }));
    }

    fromBox(side) {
      const value = this.boxes[side].value;
      this.thumbs[side].value = value === '' ? (side === 'min' ? 0 : this.top) : value;
      this.paint();
    }

    paint() {
      const percent = (value) => (this.top ? (Number(value) / this.top) * 100 : 0);
      this.style.setProperty('--from', `${percent(this.thumbs.min.value)}%`);
      this.style.setProperty('--to', `${percent(this.thumbs.max.value)}%`);
    }
  }

  if (!customElements.get('price-range')) customElements.define('price-range', PriceRange);

})();

/* snippets/gift-card-recipient.liquid */
(() => {

  /**
   * <gift-card-recipient>: the fields are disabled (not sent) while the box is unticked; ticking enables
   * them, makes the email required and fills in the time zone offset.
   */
  class GiftCardRecipient extends HTMLElement {
    connectedCallback() {
      this.controller?.abort();
      this.controller = new AbortController();
      const { signal } = this.controller;
      this.toggle = this.querySelector('[data-recipient-toggle]');
      if (!this.toggle) return;
      this.classList.add('is-enhanced');
      this.toggle.addEventListener('change', () => this.update(), { signal });
      this.update();
    }

    // The editor can move the block (connectedCallback runs again): the old listener goes first
    disconnectedCallback() {
      this.controller?.abort();
    }

    update() {
      const on = this.toggle.checked;
      this.querySelectorAll('[data-recipient-input]').forEach((input) => (input.disabled = !on));
      const email = this.querySelector('input[type="email"]');
      if (email) email.required = on;
      const offset = this.querySelector('[data-recipient-offset]');
      if (offset) offset.value = String(new Date().getTimezoneOffset());
    }
  }

  if (!customElements.get('gift-card-recipient')) customElements.define('gift-card-recipient', GiftCardRecipient);

})();

/* snippets/header-drawer.liquid */
(() => {

  /**
   * <header-drawer>: opens the phone menu <dialog> with showModal() and keeps the button's aria-expanded in
   * step. Closes on the close button, a click on the dimmed backdrop, Escape (built into <dialog>), and when
   * the window grows past the menu-button layout (the menu button is hidden there).
   * Second level: a link's button shows its panel (focus to Back); Back hides it (focus to the link's button).
   * Closing the drawer always returns to the first level.
   */
  class HeaderDrawer extends HTMLElement {
    connectedCallback() {
      this.toggle = this.querySelector('.header-drawer__toggle');
      this.dialog = this.querySelector('dialog');

      this.toggle.addEventListener('click', () => {
        this.dialog.showModal();
        this.toggle.setAttribute('aria-expanded', 'true');
      });

      this.dialog.addEventListener('click', (event) => {
        // The panel fills the dialog, so the dialog itself is only the target for a backdrop click
        if (event.target === this.dialog || event.target.closest('[data-drawer-close]')) {
          this.dialog.close();
          return;
        }

        const opener = event.target.closest('[data-drawer-sub]');
        if (opener) {
          this.openSub(opener);
          return;
        }

        const back = event.target.closest('[data-drawer-back]');
        if (back) {
          this.closeSub(true);
          return;
        }

        // Search: close the drawer, then open the header's search popup (without it, the link goes to the search page)
        const search = event.target.closest('[data-drawer-search]');
        const searchButton = document.querySelector('search-popup [data-search-open]');
        if (search && searchButton) {
          event.preventDefault();
          this.dialog.close();
          searchButton.click();
        }
      });

      this.dialog.addEventListener('close', () => {
        this.toggle.setAttribute('aria-expanded', 'false');
        this.closeSub(false);
      });

      // The breakpoint is a header setting (768 / 990 / 1200px), so check the button itself, not one width
      this.onResize = () => {
        if (!this.dialog.open) return;
        // checkVisibility() is missing before Safari 17.4: a hidden button has no offsetParent there
        const visible = this.toggle.checkVisibility ? this.toggle.checkVisibility() : this.toggle.offsetParent !== null;
        if (!visible) this.dialog.close();
      };
      window.addEventListener('resize', this.onResize);
    }

    disconnectedCallback() {
      window.removeEventListener('resize', this.onResize);
    }

    openSub(opener) {
      const panel = this.querySelector(`#${opener.getAttribute('aria-controls')}`);
      if (!panel) return;
      this.opener = opener;
      panel.hidden = false;
      panel.scrollTop = 0;
      opener.setAttribute('aria-expanded', 'true');
      panel.querySelector('[data-drawer-back]')?.focus();
    }

    closeSub(returnFocus) {
      this.querySelectorAll('.header-drawer__sub:not([hidden])').forEach((panel) => (panel.hidden = true));
      this.querySelectorAll('[data-drawer-sub]').forEach((button) => button.setAttribute('aria-expanded', 'false'));
      if (returnFocus) this.opener?.focus();
      this.opener = null;
    }
  }

  if (!customElements.get('header-drawer')) customElements.define('header-drawer', HeaderDrawer);

})();

/* snippets/header-menu.liquid */
(() => {

  // One listener per event on the whole document, so it keeps working when the
  // theme editor re-renders the header.
  function closeMenu(dropdown, returnFocus) {
    dropdown.removeAttribute('open');
    if (returnFocus) dropdown.querySelector('summary').focus();
  }

  // Card row slider: show the arrows only when the cards overflow, scroll one card per click,
  // and disable an arrow at the start or end of the row.
  function updateSlider(panel) {
    const track = panel.querySelector('.menu__cards');
    const buttons = panel.querySelector('.menu__slider-buttons');
    if (!track || !buttons) return;
    const overflow = track.scrollWidth > track.clientWidth + 1;
    buttons.hidden = !overflow;
    if (!overflow) return;
    buttons.querySelector('[data-direction="-1"]').disabled = track.scrollLeft <= 1;
    buttons.querySelector('[data-direction="1"]').disabled =
      track.scrollLeft + track.clientWidth >= track.scrollWidth - 1;
  }

  // A dropdown opened: close any other one, then set up its card slider.
  // ('toggle' doesn't bubble, so listen in the capture phase.)
  document.addEventListener(
    'toggle',
    (event) => {
      const opened = event.target;
      if (!opened.matches?.('.menu__dropdown') || !opened.open) return;
      document.querySelectorAll('.menu__dropdown[open]').forEach((other) => {
        if (other !== opened) closeMenu(other, false);
      });
      updateSlider(opened.querySelector('.menu__panel'));
    },
    true
  );

  document.addEventListener(
    'scroll',
    (event) => {
      if (event.target.matches?.('.menu__cards')) updateSlider(event.target.closest('.menu__panel'));
    },
    true
  );

  document.addEventListener('click', (event) => {
    const button = event.target.closest?.('.menu__slider-button');
    if (!button) return;
    const track = button.closest('.menu__panel').querySelector('.menu__cards');
    const card = track.querySelector('.menu__card');
    const gap = parseFloat(getComputedStyle(track).columnGap) || 0;
    const step = card ? card.getBoundingClientRect().width + gap : track.clientWidth;
    track.scrollBy({ left: step * Number(button.dataset.direction) });
  });

  window.addEventListener('resize', () => {
    document.querySelectorAll('.menu__dropdown[open] .menu__panel').forEach(updateSlider);
  });

  // Escape closes the open dropdown and puts focus back on its button
  document.addEventListener('keydown', (event) => {
    if (event.key !== 'Escape') return;
    const open = document.querySelector('.menu__dropdown[open]');
    if (open) closeMenu(open, true);
  });

  // Clicking anywhere outside closes it
  document.addEventListener('click', (event) => {
    document.querySelectorAll('.menu__dropdown[open]').forEach((dropdown) => {
      if (!dropdown.contains(event.target)) closeMenu(dropdown, false);
    });
  });

  // Tabbing out of the dropdown closes it. relatedTarget is the element receiving focus; it's null when
  // the visitor clicks a non-focusable spot (e.g. empty space inside the panel), which must NOT close it.
  document.addEventListener('focusout', (event) => {
    const dropdown = event.target.closest?.('.menu__dropdown[open]');
    if (dropdown && event.relatedTarget && !dropdown.contains(event.relatedTarget)) closeMenu(dropdown, false);
  });

})();

/* snippets/localization-form.liquid */
(() => {

  /**
   * <localization-picker>: closes its <details> on Escape (focus goes back to the pill), on a click
   * outside it, and when keyboard focus leaves it. Clicking another picker counts as "outside", so only
   * one list is open at a time. Picking an item needs no script: it's a submit button.
   */
  class LocalizationPicker extends HTMLElement {
    connectedCallback() {
      this.details = this.querySelector('details');
      if (!this.details) return;

      // All listeners on one AbortController: the theme editor can move the section (disconnect, then
      // connect again), and without this the element's own listeners were added a second time.
      this.controller?.abort();
      this.controller = new AbortController();
      const { signal } = this.controller;

      this.addEventListener(
        'keydown',
        (event) => {
          if (event.key !== 'Escape' || !this.details.open) return;
          this.details.open = false;
          this.details.querySelector('summary')?.focus();
        },
        { signal }
      );
      // relatedTarget is the element receiving focus; it's null when clicking empty space (the click handler covers that)
      this.addEventListener(
        'focusout',
        (event) => {
          if (event.relatedTarget && !this.contains(event.relatedTarget)) this.details.open = false;
        },
        { signal }
      );
      // The list must never go past the side of the screen, not even for one frame: a short sideways
      // overflow can make a phone browser pan or zoom the page. So the script opens the list itself and
      // places it in the same step; the browser paints only after this handler. Enter and Space on the
      // summary also fire click. Closing keeps the browser's own behaviour.
      this.list = this.details.querySelector('.localization__list');
      const summary = this.details.querySelector('summary');
      if (summary && this.list) {
        summary.addEventListener(
          'click',
          (event) => {
            if (this.details.open) return;
            event.preventDefault();
            this.details.open = true;
            this.placeList();
          },
          { signal }
        );
        // A rotation or resize while the list is open: place it again
        window.addEventListener(
          'resize',
          () => {
            if (this.details.open) this.placeList();
          },
          { signal }
        );
      }
      document.addEventListener(
        'click',
        (event) => {
          if (!this.contains(event.target)) this.details.open = false;
        },
        { signal }
      );
    }

    disconnectedCallback() {
      this.controller?.abort();
    }

    /**
     * Measures the open list (its real size, so it always matches the CSS) and picks the edge it opens
     * from: the pill's start edge, or the end edge when the start does not fit. If neither fits (a very
     * narrow or zoomed screen), it keeps the better edge and moves the list back onto the screen.
     */
    placeList() {
      const list = this.list;
      list.style.removeProperty('--list-shift');
      delete list.dataset.align;

      const screen = document.documentElement.clientWidth;
      const overflow = (box) => Math.max(0, box.right - screen) + Math.max(0, -box.left);

      const startBox = list.getBoundingClientRect();
      if (overflow(startBox) === 0) return;

      list.dataset.align = 'end';
      const endBox = list.getBoundingClientRect();
      if (overflow(endBox) === 0) return;

      let box = endBox;
      if (overflow(startBox) < overflow(endBox)) {
        delete list.dataset.align;
        box = startBox;
      }
      const shift = box.left < 0 ? -box.left : screen - box.right;
      list.style.setProperty('--list-shift', `${shift}px`);
    }
  }

  if (!customElements.get('localization-picker')) customElements.define('localization-picker', LocalizationPicker);

})();

/* snippets/motion-pause.liquid */
(() => {

  class MotionPause extends HTMLElement {
    connectedCallback() {
      // The theme editor can attach the section again (a move): one set of listeners only
      this.controller?.abort();
      this.controller = new AbortController();
      const { signal } = this.controller;

      this.button = this.querySelector('.motion-pause__button');
      if (!this.button) return;
      this.target = (this.dataset.target && this.closest(this.dataset.target)) || this.parentElement;

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
      const update = () => {
        const moves = document.documentElement.classList.contains('motion-on') && !reduced.matches;
        this.button.hidden = !moves;
        if (!moves) this.setPaused(false);
      };
      update();
      reduced.addEventListener('change', update, { signal });

      this.button.addEventListener(
        'click',
        () => this.setPaused(this.button.getAttribute('aria-pressed') !== 'true'),
        { signal }
      );
    }

    disconnectedCallback() {
      this.controller?.abort();
    }

    setPaused(paused) {
      this.button.setAttribute('aria-pressed', String(paused));
      this.target?.classList.toggle('is-motion-paused', paused);
    }
  }

  if (!customElements.get('motion-pause')) customElements.define('motion-pause', MotionPause);

})();

/* snippets/newsletter-form.liquid */
(() => {

  /**
   * <auto-dismiss>: removes itself after data-delay ms (default 6000), fading out first.
   * If the message had keyboard/screen-reader focus, focus moves to data-focus-target (the email field)
   * instead of being lost to the top of the page when the message disappears.
   */
  class AutoDismiss extends HTMLElement {
    connectedCallback() {
      const delay = Number(this.dataset.delay) || 6000;
      this.timer = setTimeout(() => this.dismiss(), delay);
    }

    disconnectedCallback() {
      clearTimeout(this.timer);
    }

    dismiss() {
      const hadFocus = this.contains(document.activeElement);
      let removed = false;
      const remove = () => {
        if (removed) return;
        removed = true;
        this.remove();
        if (hadFocus) document.getElementById(this.dataset.focusTarget)?.focus({ preventScroll: true });
      };

      this.classList.add('is-hiding');
      this.addEventListener('transitionend', remove, { once: true });
      // Fallback: no transitionend fires with reduced motion (transition: none)
      setTimeout(remove, 400);
    }
  }

  if (!customElements.get('auto-dismiss')) customElements.define('auto-dismiss', AutoDismiss);

  /**
   * After a sign-up, Shopify reloads the page with an error or success message. The element marked
   * data-focus-after-submit (the email field with its error, or the success message) only exists in
   * that case, so focus moves only right after the visitor's own submit, never on a normal page load.
   * preventScroll: the page already jumps to the form through its #anchor.
   * Every newsletter form on the page shows the message (Shopify doesn't tie it to one form), so the
   * form named in the #anchor (the one the visitor sent) wins; else the first one on the page.
   */
  function focusNewsletterResult() {
    let sent = null;
    try {
      const id = decodeURIComponent(location.hash.slice(1));
      if (id) sent = document.getElementById(id);
    } catch (error) {
      sent = null;
    }
    const target =
      sent?.querySelector('[data-focus-after-submit]') || document.querySelector('[data-focus-after-submit]');
    target?.focus({ preventScroll: true });
  }

  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', focusNewsletterResult);
  } else {
    focusNewsletterResult();
  }

  /**
   * Empty or wrong email: the browser fires "invalid" before it would show its own bubble. Stopping it
   * (preventDefault) hides the bubble; the form still isn't sent and the browser still focuses the field.
   * Our line under the field says what is wrong (aria-invalid + aria-describedby for screen readers). It
   * goes away as soon as the address is correct. Listening on the document (capture: "invalid" doesn't
   * bubble) also covers forms added later, e.g. a Newsletter section added in the theme editor. One
   * listener per page.
   */
  if (!window.newsletterCheck) {
    window.newsletterCheck = true;
    const describe = (field, id, on) => {
      const ids = (field.getAttribute('aria-describedby') || '').split(' ').filter((item) => item && item !== id);
      if (on) ids.unshift(id);
      if (ids.length) field.setAttribute('aria-describedby', ids.join(' '));
      else field.removeAttribute('aria-describedby');
    };

    document.addEventListener(
      'invalid',
      (event) => {
        const field = event.target;
        const line = field.closest?.('.newsletter-form')?.querySelector('.newsletter-form__error');
        if (!line) return;
        event.preventDefault();
        line.textContent = field.validity.valueMissing ? line.dataset.missing : line.dataset.format;
        line.hidden = false;
        field.setAttribute('aria-invalid', 'true');
        describe(field, line.id, true);
        field.focus();
      },
      true
    );

    document.addEventListener('input', (event) => {
      const field = event.target;
      const line = field.closest?.('.newsletter-form')?.querySelector('.newsletter-form__error');
      // validity.valid only reads the state (checkValidity() would fire "invalid" again on every key)
      if (!line || line.hidden || !field.validity?.valid) return;
      line.hidden = true;
      field.removeAttribute('aria-invalid');
      describe(field, line.id, false);
    });
  }

})();

/* snippets/product-card.liquid */
(() => {

  /**
   * <card-options> (full product card): a size pill or colour dot was chosen. Swaps the price (the
   * value's <template>), the "Save" pill, the cart button's variant and name, and the BUY link; a
   * sold-out value hides cart + BUY and shows "Notify me". One AbortController for the editor re-attach.
   */
  class CardOptions extends HTMLElement {
    connectedCallback() {
      this.controller?.abort();
      this.controller = new AbortController();
      this.addEventListener('change', (event) => this.choose(event.target, true), { signal: this.controller.signal });
      // The cart button was rendered with its own first variant: start in step with the checked value
      // (the photo stays: the first photo is the product's, not moved on page load)
      const checked = this.querySelector('input[type="radio"]:checked');
      if (checked) this.choose(checked, false);
    }

    /**
     * Shows the chosen value's photo: its slide when it is one of the first 5, else the photo from its
     * <template> in place of the first slide (or the only photo). The first photo comes back when its
     * own value is chosen again
     */
    showMedia(id) {
      if (!id) return;
      const card = this.closest('.product-card');
      const gallery = card?.querySelector('card-gallery');
      const slides = gallery ? [...gallery.querySelectorAll('.product-card__slide')] : [];
      const index = slides.findIndex((slide) => slide.dataset.mediaId === id);
      const holder = slides[0] || card?.querySelector('.product-card__media');
      const image = holder?.querySelector('.image');

      // This value's photo is already the swapped-in one: just show it
      if (this.swapped?.id === id) {
        gallery?.go(0);
        return;
      }
      if (this.swapped) {
        // Put the first photo back before showing another one
        image?.replaceWith(this.swapped.image);
        this.swapped = null;
      }
      if (index >= 0) {
        gallery.go(index);
        return;
      }
      const template = this.querySelector(`template[data-media-for="${id}"]`);
      const current = holder?.querySelector('.image');
      if (!template || !current) return;
      this.swapped = { id, image: current };
      current.replaceWith(template.content.cloneNode(true));
      gallery?.go(0);
    }

    disconnectedCallback() {
      this.controller?.abort();
    }

    choose(input, showPhoto) {
      if (input.type !== 'radio') return;
      const id = input.value;
      if (showPhoto) this.showMedia(input.dataset.mediaId);

      // No templates = every value costs the same: the price stays
      const price = this.querySelector('[data-card-price]');
      const template = this.querySelector(`template[data-price-for="${id}"]`);
      if (price && template) price.replaceChildren(template.content.cloneNode(true));

      // The "Save 24%" pill and the "-24%" badge on the photo (outside this element) show the same number
      const percent = Number(input.dataset.save) || 0;
      const discounts = [this.querySelector('[data-card-save]'), this.closest('.product-card')?.querySelector('[data-card-discount]')];
      discounts.forEach((element) => {
        if (!element) return;
        element.hidden = percent === 0;
        element.textContent = (element.dataset.template || '').replace('[percent]', percent);
      });

      const quickAdd = this.querySelector('quick-add');
      if (quickAdd) {
        quickAdd.dataset.variantId = id;
        const field = quickAdd.querySelector('input[name="id"]');
        if (field) field.value = id;
        // The round button is named by its aria-label; the text pill by its visible text + a hidden
        // product name (no aria-label: the name must start with the visible text)
        const button = quickAdd.querySelector('.quick-add__button');
        const name = button?.querySelector('[data-quick-add-name]');
        if (name) name.textContent = `: ${input.dataset.addName}`;
        else button?.setAttribute('aria-label', input.dataset.addLabel);
        quickAdd.dataset.labelAdded = input.dataset.addedLabel;
      }

      const link = this.querySelector('[data-card-buy-link]');
      if (link) link.href = `${this.dataset.cartUrl}/${id}:1`;

      const available = input.dataset.available === 'true';
      const buy = this.querySelector('[data-card-buy]');
      if (buy) buy.hidden = !available;
      const notify = this.querySelector('[data-card-notify]');
      if (notify) notify.hidden = available;
    }
  }

  if (!customElements.get('card-options')) customElements.define('card-options', CardOptions);

  /**
   * <card-gallery> (full card with 2+ photos): the track scrolls sideways (swipe, snap points); the
   * arrows (mouse, on hover) and the dots move it one photo. The dots follow the scroll. The next photo
   * is loaded early (when the pointer enters the card, on a touch, and after each move): a lazy image in
   * a sideways track only loads once it is scrolled into view, so the first swipe showed an empty slide.
   * One AbortController for the editor re-attach.
   */
  class CardGallery extends HTMLElement {
    connectedCallback() {
      this.controller?.abort();
      this.controller = new AbortController();
      const { signal } = this.controller;
      this.track = this.querySelector('[data-card-slides]');
      if (!this.track) return;
      this.slides = [...this.track.children];
      this.dots = [...this.querySelectorAll('[data-card-dot]')];
      this.index = 0;

      this.track.addEventListener(
        'scroll',
        () => {
          if (this.frame) return;
          this.frame = requestAnimationFrame(() => {
            this.frame = null;
            this.update();
          });
        },
        { signal, passive: true }
      );

      this.addEventListener(
        'click',
        (event) => {
          const dot = event.target.closest('[data-card-dot]');
          if (dot) this.go(Number(dot.dataset.cardDot));
          else if (event.target.closest('[data-card-prev]')) this.go(this.index - 1);
          else if (event.target.closest('[data-card-next]')) this.go(this.index + 1);
        },
        { signal }
      );

      const card = this.closest('.product-card') || this;
      card.addEventListener('pointerenter', () => this.warm(this.index + 1), { signal });
      this.track.addEventListener('touchstart', () => this.warm(this.index + 1), { signal, passive: true });
    }

    disconnectedCallback() {
      this.controller?.abort();
      if (this.frame) cancelAnimationFrame(this.frame);
      this.frame = null;
    }

    /** The photo in view (scrollLeft is negative in right-to-left pages) */
    update() {
      const width = this.track.clientWidth || 1;
      const index = Math.min(this.slides.length - 1, Math.round(Math.abs(this.track.scrollLeft) / width));
      if (index === this.index) return;
      this.index = index;
      this.dots.forEach((dot, i) => dot.classList.toggle('is-active', i === index));
      this.warm(index + 1);
    }

    /** Moves to a photo; past the last one it goes back to the first (and the other way round) */
    go(index) {
      const count = this.slides.length;
      const target = (index + count) % count;
      const rtl = getComputedStyle(this.track).direction === 'rtl';
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.warm(target);
      this.track.scrollTo({ left: target * this.track.clientWidth * (rtl ? -1 : 1), behavior: reduced ? 'auto' : 'smooth' });
    }

    /** Loads one photo now (lazy images in a sideways track wait until they are scrolled into view) */
    warm(index) {
      const image = this.slides[index]?.querySelector('img');
      if (image && image.loading === 'lazy') image.loading = 'eager';
    }
  }

  if (!customElements.get('card-gallery')) customElements.define('card-gallery', CardGallery);

})();

/* snippets/product-lightbox.liquid */
(() => {

  /**
   * <product-lightbox>: the gallery's full-screen viewer.
   * - Opens from [data-lightbox-open] buttons in its section, at that medium.
   * - Thumbnails, ← / →, the arrow buttons and (touch) sideways swipes change the medium.
   * - Clicking / tapping the image (or Enter / Space on it: it's a button) shows it alone across the
   *   screen; again = back. Escape first leaves full screen, then closes.
   */
  class ProductLightbox extends HTMLElement {
    connectedCallback() {
      // One controller for every listener: the theme editor re-attaches a moved section and runs
      // connectedCallback again (without it, one arrow press moved two images)
      this.controller?.abort();
      this.controller = new AbortController();
      const { signal } = this.controller;

      this.dialog = this.querySelector('dialog');
      this.slides = [...this.querySelectorAll('[data-lightbox-slide]')];
      this.thumbs = [...this.querySelectorAll('[data-lightbox-thumb]')];
      this.current = 0;

      // The opener buttons live in the gallery, outside this element: listen on the whole section
      this.scope = this.closest('.shopify-section') || document;
      this.scope.addEventListener(
        'click',
        (event) => {
          const opener = event.target.closest('[data-lightbox-open]');
          if (!opener) return;
          this.opener = opener;
          this.open(Number(opener.dataset.lightboxOpen));
        },
        { signal }
      );

      this.dialog.addEventListener(
        'click',
        (event) => {
          const thumb = event.target.closest('[data-lightbox-thumb]');
          const step = event.target.closest('[data-lightbox-step]');
          if (thumb) this.show(Number(thumb.dataset.lightboxThumb));
          else if (step) this.show(this.current + Number(step.dataset.lightboxStep));
          else if (event.target.closest('[data-lightbox-close]')) this.dialog.close();
          else if (event.target.closest('[data-lightbox-zoom]')) {
            // A swipe also ends in a click: it already changed the image, so it doesn't toggle full screen
            if (this.swiped) this.swiped = false;
            else this.fullScreen(!this.classList.contains('is-full'));
          }
        },
        { signal }
      );

      this.dialog.addEventListener(
        'keydown',
        (event) => {
          // ← / → on a video or a 3D model seek / turn it: leave them to the medium
          if (this.inMedia(event.target)) return;
          if (event.key === 'ArrowRight') this.show(this.current + 1);
          else if (event.key === 'ArrowLeft') this.show(this.current - 1);
        },
        { signal }
      );

      // Escape: the dialog's "cancel" event. In full screen, the first Escape only leaves it
      this.dialog.addEventListener(
        'cancel',
        (event) => {
          if (!this.classList.contains('is-full')) return;
          event.preventDefault();
          this.fullScreen(false);
        },
        { signal }
      );

      this.dialog.addEventListener(
        'close',
        () => {
          this.fullScreen(false);
          this.pauseMedia();
          this.opener?.focus();
        },
        { signal }
      );

      this.setUpSwipe(signal);
    }

    disconnectedCallback() {
      this.controller?.abort();
    }

    /** A video, a 3D model or an embedded player (YouTube, Vimeo) handles its own keys and drags */
    inMedia(target) {
      return Boolean(target?.closest?.('video, model-viewer, iframe'));
    }

    open(index) {
      this.show(index);
      this.dialog.showModal();
      // A video started in the page gallery kept playing behind the viewer (two sounds at once)
      const section = this.closest('.shopify-section') || document;
      section.querySelectorAll('.product-media').forEach((media) => {
        if (!this.contains(media)) this.pauseIn(media);
      });
    }

    /** Shows one medium (wrapping round at both ends), updates the counter and the outlined thumbnail */
    show(index) {
      const count = this.slides.length;
      if (!count) return;
      this.pauseMedia();
      this.current = (index + count) % count;

      this.slides.forEach((slide, i) => (slide.hidden = i !== this.current));
      this.thumbs.forEach((thumb) => {
        const isCurrent = Number(thumb.dataset.lightboxThumb) === this.current;
        if (isCurrent) thumb.setAttribute('aria-current', 'true');
        else thumb.removeAttribute('aria-current');
      });
      // In full screen, a non-image (video, 3D) goes back to the normal view
      if (!this.slides[this.current].querySelector('[data-lightbox-zoom]')) this.fullScreen(false);
      else if (this.classList.contains('is-full')) this.fullScreen(true);

      const number = this.current + 1;
      this.querySelector('[data-lightbox-current]').textContent = number;
      // "Item 2 of 7" for screen readers (the visible counter is hidden from them)
      const status = this.querySelector('[data-lightbox-status]');
      if (this.dialog.open) status.textContent = status.dataset.template.replace('[index]', number);
    }

    /** Full screen on / off; only images have it */
    fullScreen(on) {
      this.querySelectorAll('[data-lightbox-zoom]').forEach((button) => button.setAttribute('aria-pressed', 'false'));
      const button = this.slides[this.current]?.querySelector('[data-lightbox-zoom]');
      this.classList.toggle('is-full', Boolean(on && button));
      if (on && button) button.setAttribute('aria-pressed', 'true');
    }

    /** Touch / pen: a sideways swipe of more than 50px goes to the next / previous medium */
    setUpSwipe(signal) {
      const stage = this.querySelector('.product-lightbox__stage');
      let start = null;

      stage.addEventListener(
        'pointerdown',
        (event) => {
          // A drag on a 3D model turns it, a drag on a video's bar seeks: not a swipe
          if (event.pointerType === 'mouse' || this.inMedia(event.target)) return;
          start = { x: event.clientX, y: event.clientY };
        },
        { signal }
      );

      stage.addEventListener(
        'pointerup',
        (event) => {
          if (!start) return;
          const dx = event.clientX - start.x;
          const dy = event.clientY - start.y;
          start = null;
          if (Math.abs(dx) < 50 || Math.abs(dx) < Math.abs(dy)) return;
          this.swiped = true;
          setTimeout(() => (this.swiped = false), 400); // no click followed: forget it
          this.show(this.current + (dx < 0 ? 1 : -1));
        },
        { signal }
      );

      stage.addEventListener('pointercancel', () => (start = null), { signal });
    }

    /**
     * Stops what plays in the shown slide when the viewer moves on or closes: a video, or a YouTube /
     * Vimeo player with a pause message (product-media turns on YouTube's message API: enablejsapi=1)
     */
    pauseMedia() {
      const slide = this.slides[this.current];
      if (slide) this.pauseIn(slide);
    }

    /** Pauses every video and YouTube / Vimeo player inside one element (a slide, a gallery item) */
    pauseIn(root) {
      root.querySelectorAll('video').forEach((video) => video.pause());
      root.querySelectorAll('iframe').forEach((frame) => {
        const src = frame.getAttribute('src') || '';
        if (src.includes('vimeo')) {
          frame.contentWindow?.postMessage('{"method":"pause"}', '*');
        } else if (src.includes('youtube')) {
          frame.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
        }
      });
    }
  }

  if (!customElements.get('product-lightbox')) customElements.define('product-lightbox', ProductLightbox);

})();

/* snippets/product-sticky-bar.liquid */
(() => {

  /**
   * <product-sticky-bar>: shows itself while the page's Add to cart row is scrolled up out of view and the
   * footer isn't in view; its buttons press the Buy buttons form (same section).
   */
  class ProductStickyBar extends HTMLElement {
    connectedCallback() {
      // One controller for every listener: the theme editor re-attaches a moved section and runs
      // connectedCallback again (without it, one Buy now press ran twice)
      this.controller?.abort();
      this.controller = new AbortController();
      const { signal } = this.controller;
      // A minimise that was running when the editor moved the bar: start clean (sessionStorage decides below)
      this.classList.remove('is-minimizing', 'is-landed');

      this.scope = this.closest('.shopify-section') || document;
      this.form = this.scope.querySelector('buy-buttons form');
      const row = this.scope.querySelector('buy-buttons .buy-buttons__row');
      if (!this.form || !row) return;

      try {
        this.variants = JSON.parse(this.querySelector('[data-sticky-variants]').textContent);
      } catch (error) {
        this.variants = {};
      }

      // Two conditions: the Add to cart row is above the screen, and the footer isn't on screen
      this.rowPassed = false;
      this.footerInView = false;
      this.rowObserver?.disconnect();
      this.rowObserver = new IntersectionObserver(([entry]) => {
        this.rowPassed = !entry.isIntersecting && entry.boundingClientRect.top < 0;
        this.toggle();
      });
      this.rowObserver.observe(row);

      const footer = document.querySelector('.shopify-section-group-footer-group, footer');
      this.footerObserver?.disconnect();
      if (footer) {
        // "In view" = the footer has reached the top two thirds of the screen (rootMargin shrinks the
        // watched area by the bottom third), so a sliver of footer doesn't hide the bar on a short page
        this.footerObserver = new IntersectionObserver(
          ([entry]) => {
            this.footerInView = entry.isIntersecting;
            this.toggle();
          },
          { rootMargin: '0px 0px -33% 0px' }
        );
        this.footerObserver.observe(footer);
      }

      this.querySelector('[data-sticky-add]').addEventListener('click', () => this.add(false), { signal });
      this.querySelector('[data-sticky-buy]').addEventListener('click', () => this.buyNow(), { signal });

      // Minimise / open again; remembered for this browser session (sessionStorage can be blocked: try)
      this.querySelector('[data-sticky-minimize]')?.addEventListener('click', () => this.minimize(true), { signal });
      this.querySelector('[data-sticky-expand]')?.addEventListener('click', () => this.minimize(false), { signal });
      try {
        if (sessionStorage.getItem('oroskin-sticky-bar') === 'min') this.minimize(true, false);
      } catch (error) {
        // No storage: the bar starts open
      }

      // The Buy buttons block adds in the background and says so: the same fill while it adds, then
      // "Added" here too for 2s
      const addButton = this.querySelector('[data-sticky-add]');
      this.scope.addEventListener('product:adding', () => addButton.classList.add('is-adding'), { signal });
      this.scope.addEventListener('product:add-error', () => addButton.classList.remove('is-adding'), { signal });
      this.scope.addEventListener(
        'product:added',
        () => {
          const label = this.querySelector('[data-sticky-add-label]');
          const add = addButton;
          add.classList.remove('is-adding');
          label.textContent = this.dataset.labelAdded;
          add.classList.add('is-added');
          clearTimeout(this.addedTimer);
          this.addedTimer = setTimeout(() => {
            add.classList.remove('is-added');
            if (!add.disabled) label.textContent = this.dataset.labelAdd;
          }, 2000);
        },
        { signal }
      );

      this.scope.addEventListener('variant:change', (event) => this.showVariant(event.detail?.variantId), { signal });
      // Purchase options: a subscription plan's price is the price shown (Buy buttons, "plan:change")
      this.scope.addEventListener(
        'plan:change',
        (event) => {
          this.plan = event.detail;
          this.showPrice(event.detail.variantId);
        },
        { signal }
      );

      this.quantity = this.form.querySelector('input[name="quantity"]');
      this.quantity?.addEventListener('change', () => this.showQuantity(), { signal });
      this.quantity?.addEventListener('input', () => this.showQuantity(), { signal });

      // Back from checkout (page restored from the browser's cache): no Buy now field may stay in the form,
      // or the page's own Add to cart would go to checkout too
      window.addEventListener('pageshow', () => this.removeReturnTo(), { signal });
      // A focused button in the bar keeps it on screen (hiding it would drop the focus to the page)
      this.addEventListener('focusout', () => requestAnimationFrame(() => this.toggle()), { signal });
    }

    disconnectedCallback() {
      this.controller?.abort();
      this.rowObserver?.disconnect();
      this.footerObserver?.disconnect();
      clearTimeout(this.addedTimer);
      clearTimeout(this.landedTimer);
    }

    /**
     * Shrinks the bar to the round cart button (or opens it), moving focus to the button that's left.
     * Minimise (morphToButton): the bar closes like a lens onto the minimise button, that circle becomes the
     * round cart and jumps to the corner, lands with a bounce, two rings pulse and the icon wiggles, so the
     * visitor sees where the bar went. Open again: the bar rises back in. No animation with reduced motion
     * or on page load
     */
    minimize(on, moveFocus = true) {
      const inner = this.querySelector('.product-sticky-bar__inner');
      const animate = moveFocus && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const finish = () => {
        this.classList.remove('is-minimizing');
        this.classList.toggle('is-minimized', on);
        this.toggle(); // the round cart may stay over the footer, the full bar not
        if (moveFocus) this.querySelector(on ? '[data-sticky-expand]' : '[data-sticky-minimize]')?.focus();
      };
      try {
        sessionStorage.setItem('oroskin-sticky-bar', on ? 'min' : 'open');
      } catch (error) {
        // No storage: just this page
      }

      // animationend can fail to come (a hidden tab pauses animations): a timer finishes the step anyway
      const afterAnimation = (callback) => {
        let done = false;
        const run = () => {
          if (done) return;
          done = true;
          callback();
        };
        inner.addEventListener('animationend', run, { once: true });
        setTimeout(run, 600);
      };

      if (on && animate && inner) {
        if (this.classList.contains('is-minimizing')) return; // a second press while it runs
        this.morphToButton(inner, finish);
        return;
      }
      if (!on) {
        this.querySelector('[data-sticky-expand]')?.style.removeProperty('animation');
        this.classList.remove('is-landed');
      }
      this.classList.toggle('is-expanding', !on && animate);
      if (!on && animate && inner) afterAnimation(() => this.classList.remove('is-expanding'));
      finish();
    }

    /** The minimise movement (see minimize). Each step also ends on a timer: a hidden tab pauses animations */
    morphToButton(inner, finish) {
      const button = this.querySelector('[data-sticky-minimize]');
      const mini = this.querySelector('[data-sticky-expand]');
      if (!button || !mini) {
        finish();
        return;
      }
      const ended = (animation, ms) =>
        Promise.race([animation.finished.catch(() => {}), new Promise((resolve) => setTimeout(resolve, ms))]);
      // Moved or removed while it runs (theme editor): the rest of the steps stop
      const { signal } = this.controller;

      // 1. The lens: a clip from the whole bar down to the minimise button's circle
      const box = inner.getBoundingClientRect();
      const target = button.getBoundingClientRect();
      const radius = getComputedStyle(inner).borderRadius;
      const to = `inset(${target.top - box.top}px ${box.right - target.right}px ${box.bottom - target.bottom}px ${target.left - box.left}px round 50%)`;
      this.classList.add('is-minimizing');
      const lens = inner.animate([{ clipPath: `inset(0 round ${radius})` }, { clipPath: to }], {
        duration: 420,
        easing: 'cubic-bezier(0.6, 0, 0.4, 1)',
        fill: 'forwards',
      });

      ended(lens, 700).then(() => {
        if (signal.aborted) return;
        // 2. The circle becomes the round cart, which jumps from there to the corner
        finish();
        lens.cancel();
        mini.style.animation = 'none'; // this movement replaces the CSS pop
        const corner = mini.getBoundingClientRect();
        const dx = target.left + target.width / 2 - (corner.left + corner.width / 2);
        const dy = target.top + target.height / 2 - (corner.top + corner.height / 2);
        const jump = mini.animate(
          [
            { transform: `translate(${dx}px, ${dy}px) scale(${target.width / corner.width})` },
            { transform: `translate(${dx * 0.5}px, ${dy * 0.5 - 40}px) scale(1.1)`, offset: 0.5 },
            { transform: 'translate(0, 0) scale(1)' },
          ],
          { duration: 520, easing: 'cubic-bezier(0.34, 1.4, 0.64, 1)' }
        );
        ended(jump, 800).then(() => {
          if (signal.aborted) return;
          // 3. Landed: rings and a wiggle (CSS), then back to rest. The pop stays off until the bar opens
          // again (putting it back now would play it a second time)
          this.classList.add('is-landed');
          clearTimeout(this.landedTimer);
          this.landedTimer = setTimeout(() => this.classList.remove('is-landed'), 1900);
        });
      });
    }

    toggle() {
      // The round cart (minimised) is small: it stays over the footer too; the full bar makes room for it
      const minimized = this.classList.contains('is-minimized');
      const show =
        (this.rowPassed && (!this.footerInView || minimized)) || this.contains(document.activeElement);
      this.classList.toggle('is-visible', show);
      // inert while hidden: its buttons can't be reached with Tab or read out when it isn't there
      this.inert = !show;
    }

    removeReturnTo() {
      this.form?.querySelector('input[name="return_to"][data-sticky]')?.remove();
    }

    /**
     * Submit the Buy buttons form (the browser checks it first, e.g. a gift card email).
     * toCheckout: Shopify sends the visitor to checkout instead of the cart (return_to). The field is only
     * there while the form is sent, then removed again.
     */
    add(toCheckout) {
      const submit = this.form.querySelector('[data-submit]');
      if (!this.form.checkValidity()) {
        this.form.reportValidity();
        const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
        this.form.scrollIntoView({ behavior: smooth ? 'smooth' : 'auto', block: 'center' });
        return;
      }
      this.removeReturnTo();
      // Buy buttons flies the product photo from the button that was pressed: this one
      if (!toCheckout) this.form.dataset.addSource = 'sticky';
      if (toCheckout) {
        const returnTo = Object.assign(document.createElement('input'), {
          type: 'hidden',
          name: 'return_to',
          value: '/checkout',
        });
        returnTo.dataset.sticky = '';
        this.form.append(returnTo);
      }
      this.form.requestSubmit(submit || undefined);
      // The form's data is read during requestSubmit: the field is no longer needed
      this.removeReturnTo();
    }

    /**
     * Buy now: Shopify's plain "Buy it now" button if it's there. The branded buttons (Shop Pay, PayPal…)
     * draw their real button inside their own frame, so a click on them from here does nothing: then
     * add + go straight to checkout
     */
    buyNow() {
      const shopifyButton = this.form.querySelector('.shopify-payment-button__button--unbranded');
      if (shopifyButton && !shopifyButton.closest('[hidden]') && !shopifyButton.disabled) {
        shopifyButton.click();
        return;
      }
      this.add(true);
    }

    /** The variant's price, or the chosen subscription plan's price for it */
    showPrice(variantId) {
      const variant = variantId && this.variants[variantId];
      const price = this.querySelector('[data-sticky-price]');
      if (!variant || !price) return;
      const plan = this.plan;
      const planPrice = plan?.planId && String(plan.variantId) === String(variantId) ? plan.price : '';
      price.textContent = planPrice || variant.price;
    }

    /** The chosen variant's name, price, image and state ("Sold out", "Unavailable") */
    showVariant(variantId) {
      const variant = variantId && this.variants[variantId];
      const add = this.querySelector('[data-sticky-add]');
      const buy = this.querySelector('[data-sticky-buy]');
      const addLabel = this.querySelector('[data-sticky-add-label]');

      if (!variant) {
        add.disabled = buy.disabled = true;
        addLabel.textContent = this.dataset.labelUnavailable;
        return;
      }
      const name = this.querySelector('[data-sticky-variant]');
      if (name) name.textContent = variant.title;
      this.showPrice(variantId);
      if (variant.image) {
        // A product without a featured image has no <img> in the bar yet: make one
        let image = this.querySelector('.product-sticky-bar__image');
        if (!image) {
          image = Object.assign(document.createElement('img'), { alt: '', className: 'product-sticky-bar__image' });
          this.querySelector('.product-sticky-bar__media')?.append(image);
        }
        image.removeAttribute('srcset');
        image.src = variant.image;
      }
      add.disabled = buy.disabled = !variant.available;
      addLabel.textContent = variant.available ? this.dataset.labelAdd : this.dataset.labelSoldOut;
    }

    showQuantity() {
      const quantity = Math.max(1, parseInt(this.quantity.value, 10) || 1);
      this.querySelector('[data-sticky-quantity]').textContent = this.dataset.quantityLabel.replace('[quantity]', quantity);
    }
  }

  if (!customElements.get('product-sticky-bar')) customElements.define('product-sticky-bar', ProductStickyBar);

})();

/* snippets/quick-add.liquid */
(() => {

  /**
   * <quick-add>: adds the product with Shopify's Cart AJAX API instead of submitting the form, plays
   * the cart animation, then updates the header's cart count. The animation (1s) and the request run
   * together; the tick shows once both are done, so a fast request still gets the full animation.
   * Then the "Added to your bag" card shows (cart:added), and when it closes the button goes back to its
   * normal state.
   */
  class QuickAdd extends HTMLElement {
    static HOLD = 2500; // ms the tick stays when the page has no "Added" card

    connectedCallback() {
      // One controller for every listener: an element moved in the page (theme editor, the product
      // page's pinned track) connects again, and two submit listeners would add 2
      this.controller = new AbortController();
      const { signal } = this.controller;
      this.form = this.querySelector('form');
      this.status = this.querySelector('[data-quick-add-status]');
      this.message = this.querySelector('[data-quick-add-message]');
      this.form?.addEventListener(
        'submit',
        (event) => {
          event.preventDefault();
          this.add();
        },
        { signal }
      );
    }

    disconnectedCallback() {
      this.controller?.abort();
      this.closeListener?.abort();
      this.hideMessage();
      clearTimeout(this.resetTimer);
      this.classList.remove('is-adding', 'is-added', 'is-resetting', 'is-error');
      this.busy = false;
    }

    async add() {
      if (this.busy) return;
      this.busy = true;
      clearTimeout(this.resetTimer);
      this.closeListener?.abort();
      this.hideMessage();
      this.classList.remove('is-added', 'is-resetting', 'is-error');
      this.classList.add('is-adding');

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const root = window.Shopify?.routes?.root || '/';
      const request = fetch(`${root}cart/add.js`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({ items: [{ id: Number(this.dataset.variantId), quantity: 1 }] }),
      }).then(async (response) => {
        const data = await response.json().catch(() => ({}));
        // Shopify explains a refused add (e.g. stock) in "description" or "message"
        if (!response.ok) throw new Error(data.description || data.message || '');
        return data;
      });
      const drive = new Promise((resolve) => setTimeout(resolve, reduced ? 0 : 1000));

      try {
        const [data] = await Promise.all([request, drive]);
        this.classList.replace('is-adding', 'is-added');
        this.announce(this.dataset.labelAdded);

        // The "Added to your bag" card (snippets/cart-notification.liquid) shows the line. Its
        // quantity in Shopify's answer is the line's total in the bag, not just this add.
        const card = document.querySelector('cart-notification');
        document.dispatchEvent(new CustomEvent('cart:added', { detail: { item: data?.items?.[0] } }));
        // The header's <cart-count> refreshes the count (and tells the cart page and the card)
        document.dispatchEvent(new CustomEvent('cart:changed'));

        // Back to the normal button when the card closes (or after a moment where there is no card,
        // e.g. on the cart page): the tick shrinks away (0.3s), the cart stays. Listening only after
        // "cart:added": that event closes a card still open for another button, not this one.
        const reset = () => {
          clearTimeout(this.resetTimer);
          this.closeListener?.abort();
          this.classList.replace('is-added', 'is-resetting');
          this.resetTimer = setTimeout(() => this.classList.remove('is-resetting'), reduced ? 0 : 300);
        };
        this.closeListener?.abort();
        this.closeListener = new AbortController();
        document.addEventListener('cart-notification:close', reset, { once: true, signal: this.closeListener.signal });
        if (!card) this.resetTimer = setTimeout(reset, QuickAdd.HOLD);
      } catch (error) {
        this.classList.remove('is-adding');
        this.classList.add('is-error');
        const reason = error?.message || this.dataset.labelError;
        this.announce(reason);
        this.showMessage(reason, 4000);
        this.resetTimer = setTimeout(() => this.classList.remove('is-error'), 600);
      } finally {
        this.busy = false;
      }
    }

    /**
     * Shows the message near the button for `duration` ms: above it, or below when there's no room,
     * kept 8px inside the screen. A popover (top layer) where the browser has them, so a card's
     * overflow: hidden can't cut it off. Its place is fixed on the screen, so it goes on scroll.
     */
    showMessage(message, duration) {
      const box = this.message;
      if (!box || !message) return;
      box.textContent = message;
      box.hidden = false;
      if (box.showPopover && !box.matches(':popover-open')) box.showPopover();

      const button = this.querySelector('.quick-add__button')?.getBoundingClientRect();
      if (button) {
        const gap = 8;
        const { width, height } = box.getBoundingClientRect();
        let top = button.top - height - gap;
        if (top < gap) top = button.bottom + gap;
        const left = Math.min(Math.max(gap, button.left + button.width / 2 - width / 2), window.innerWidth - width - gap);
        box.style.setProperty('--message-top', `${Math.round(top)}px`);
        box.style.setProperty('--message-left', `${Math.round(left)}px`);
      }

      clearTimeout(this.messageTimer);
      this.messageTimer = setTimeout(() => this.hideMessage(), duration);
      this.onScroll ??= () => this.hideMessage();
      window.addEventListener('scroll', this.onScroll, { passive: true, once: true });
      window.addEventListener('resize', this.onScroll, { once: true });
    }

    hideMessage() {
      const box = this.message;
      clearTimeout(this.messageTimer);
      if (this.onScroll) {
        window.removeEventListener('scroll', this.onScroll);
        window.removeEventListener('resize', this.onScroll);
      }
      if (!box || box.hidden) return;
      if (box.hidePopover && box.matches(':popover-open')) box.hidePopover();
      box.hidden = true;
    }

    announce(message) {
      if (!this.status) return;
      this.status.textContent = '';
      requestAnimationFrame(() => {
        this.status.textContent = message;
      });
    }
  }

  if (!customElements.get('quick-add')) {
    customElements.define('quick-add', QuickAdd);
  }

})();

/* snippets/results-view.liquid */
(() => {

  /**
   * <results-view>: reloads only this section's results, not the whole page, when the visitor
   * - changes the sort (a form with data-results-autoload),
   * - applies filters (<filter-drawer> sends a 'results:load' event),
   * - removes an active filter, clears them all or changes page (links with data-results-link),
   * - goes Back / Forward.
   *
   * The URL is built from every form with data-results-form (sort + filters), so the two always combine:
   * /collections/skincare?filter.p.vendor=Oroskin&sort_by=price-ascending
   * Section Rendering API: that URL + &section_id=<id> returns just this section's HTML, already filtered and
   * sorted by Shopify. Every [data-results-part] is replaced by the new one with the same id; a
   * [data-results-text] only gets its text changed (the count, so its aria-live announces it).
   * The URL goes in the address bar, so the page can be shared and reloaded, and pagination keeps the choices.
   * If anything fails, it falls back to a normal page load of the URL.
   */
  class ResultsView extends HTMLElement {
    connectedCallback() {
      this.sectionId = this.dataset.sectionId;

      // Every listener on one AbortController: the theme editor attaches a moved section again, and a
      // second set of listeners loaded the results two times for one click
      this.listeners?.abort();
      this.listeners = new AbortController();
      const { signal } = this.listeners;

      this.addEventListener('results:load', () => this.load(this.buildUrl(), true), { signal });

      this.addEventListener(
        'change',
        (event) => {
          if (event.target.form?.hasAttribute('data-results-autoload')) this.load(this.buildUrl(), true);
        },
        { signal }
      );

      this.addEventListener(
        'submit',
        (event) => {
          if (!event.target.hasAttribute('data-results-autoload')) return;
          event.preventDefault();
          this.load(this.buildUrl(), true);
        },
        { signal }
      );

      this.addEventListener(
        'click',
        (event) => {
          const link = event.target.closest('a[data-results-link]');
          if (!link) return;
          event.preventDefault();
          // Page links (data-results-scroll): the new page starts at the top of the results, not at the pagination
          this.load(link.href, true, link.hasAttribute('data-results-scroll'));
        },
        { signal }
      );

      window.addEventListener('popstate', () => this.load(window.location.href, false), { signal });
    }

    disconnectedCallback() {
      this.listeners?.abort();
      this.controller?.abort();
    }

    // Every non-empty field of the sort and filter forms (an empty price box means "no limit"; the
    // default sort needs no parameter); a new choice always starts again at page 1, so the page
    // number is left out
    buildUrl() {
      const forms = this.querySelectorAll('form[data-results-form]');
      const defaultSort = this.querySelector('select[name="sort_by"]')?.dataset.default;
      const params = new URLSearchParams();
      forms.forEach((form) => {
        for (const [key, value] of new FormData(form)) {
          if (value === '' || (key === 'sort_by' && value === defaultSort)) continue;
          // A filter can repeat (two brands ticked); anything else, like the search terms q that both the
          // sort and the filter form carry on the search page, goes in once
          if (!key.startsWith('filter.') && params.has(key)) continue;
          params.append(key, value);
        }
      });
      const action = forms[0]?.action || window.location.pathname;
      return `${action}?${params}`;
    }

    async load(url, addToHistory, scrollToTop = false) {
      this.controller?.abort();
      this.controller = new AbortController();

      const results = this.querySelector('[data-results-main]');
      const hadFocus = results?.contains(document.activeElement);
      results?.setAttribute('aria-busy', 'true');

      try {
        const sectionUrl = new URL(url, window.location.origin);
        sectionUrl.searchParams.set('section_id', this.sectionId);
        const response = await fetch(sectionUrl, { signal: this.controller.signal });
        if (!response.ok) throw new Error(`HTTP ${response.status}`);
        const html = new DOMParser().parseFromString(await response.text(), 'text/html');

        this.querySelectorAll('[data-results-part]').forEach((part) => {
          const fresh = html.getElementById(part.id);
          if (fresh) part.replaceWith(fresh);
        });

        // New results are in: e.g. the column switch gives the new photos their sizes
        this.dispatchEvent(new CustomEvent('results:updated', { bubbles: true }));

        this.querySelectorAll('[data-results-text]').forEach((part) => {
          const fresh = html.getElementById(part.id);
          if (fresh) part.textContent = fresh.textContent;
        });

        if (addToHistory) window.history.pushState({}, '', url);

        // Back / Forward: the sort select isn't replaced, so set it to match the URL
        const select = this.querySelector('select[name="sort_by"]');
        if (select && !addToHistory) {
          select.value = new URL(url, window.location.origin).searchParams.get('sort_by') || select.dataset.default;
        }

        // The clicked pill, "Clear all" or page link was inside the old results: put focus on the new ones
        if (hadFocus) this.querySelector('[data-results-main]')?.focus({ preventScroll: true });
        if (scrollToTop) {
          const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
          this.scrollIntoView({ block: 'start', behavior: reduce ? 'auto' : 'smooth' });
        }
      } catch (error) {
        if (error.name === 'AbortError') return;
        window.location.href = url;
      } finally {
        results?.removeAttribute('aria-busy');
      }
    }
  }

  if (!customElements.get('results-view')) customElements.define('results-view', ResultsView);

})();

/* snippets/search-popup.liquid */
(() => {

  /**
   * <search-popup>: opens the search <dialog>, fetches predictive results while the visitor types, and
   * keeps the visitor's recent searches in localStorage.
   */
  class SearchPopup extends HTMLElement {
    static storageKey = 'oroskin:recent-searches';
    static maxRecent = 5;

    connectedCallback() {
      this.dialog = this.querySelector('dialog');
      this.input = this.querySelector('[data-search-input]');
      this.start = this.querySelector('[data-search-start]');
      this.results = this.querySelector('[data-search-results]');
      this.status = this.querySelector('[data-search-status]');
      this.recent = this.querySelector('[data-search-recent]');

      /*
        Every listener on one AbortController, removed in disconnectedCallback. The theme editor takes the
        header out and puts it back (connectedCallback runs again): without this, each move added a second
        set of listeners (one click opened the popup two times).
      */
      this.listeners?.abort();
      this.listeners = new AbortController();
      const { signal } = this.listeners;

      this.querySelector('[data-search-open]').addEventListener(
        'click',
        (event) => {
          event.preventDefault(); // the link to the search page is the no-JavaScript fallback
          this.open();
        },
        { signal }
      );

      /*
        Close on a backdrop click only. The target alone can't tell: a drag that starts in the field and
        ends on the backdrop (selecting the typed text), and a click on the popup's own scrollbar, both
        send their click to the <dialog> too. So the check is the position: the press AND the click must
        both be outside the dialog's box (the backdrop is outside it, the scrollbar inside).
      */
      this.dialog.addEventListener(
        'pointerdown',
        (event) => {
          this.pressedBackdrop = this.isOutside(event);
        },
        { signal }
      );

      this.dialog.addEventListener(
        'click',
        (event) => {
          const onBackdrop = this.pressedBackdrop && this.isOutside(event);
          this.pressedBackdrop = false;
          if (onBackdrop || event.target.closest('[data-search-close]')) {
            this.dialog.close();
            return;
          }
          /*
            A chip (recent, trending, suggestion): remember the term before the page changes. "Search for …"
            is a submit button of the form, so the submit handler below remembers it.
          */
          const term = event.target.closest('[data-search-term]');
          if (term) this.remember(term.dataset.searchTerm);
        },
        { signal }
      );

      this.querySelector('[data-search-form]').addEventListener('submit', () => this.remember(this.input.value), {
        signal,
      });
      this.input.addEventListener('input', () => this.onInput(), { signal });
      this.dialog.addEventListener('close', () => this.stop(), { signal });
    }

    disconnectedCallback() {
      this.stop(); // also removes the resize / transitionend listeners of an open popup (this.watcher)
      this.listeners?.abort();
    }

    /** Closed: no waiting search, no request in flight, no resize listener */
    stop() {
      clearTimeout(this.timer);
      this.controller?.abort();
      this.watcher?.abort();
    }

    /** True when a pointer event happened on the dialog itself, outside its box (= on the backdrop) */
    isOutside(event) {
      if (event.target !== this.dialog) return false;
      const box = this.dialog.getBoundingClientRect();
      return (
        event.clientX < box.left || event.clientX > box.right || event.clientY < box.top || event.clientY > box.bottom
      );
    }

    open() {
      this.renderRecent();
      this.dialog.showModal();
      this.input.focus();
      this.input.select(); // reopening: typing replaces the old search

      /*
        Measure after the focus: the focused field is inside the header, so a transparent header at rest
        turns into the glass pill now (on phones its buttons also grow from 36 to 40px). Measure again
        when the pill's width transition ends, and when the window changes size (phone rotation).
      */
      this.place();
      this.watcher?.abort(); // never two sets of these listeners
      this.watcher = new AbortController();
      const { signal } = this.watcher;
      window.addEventListener('resize', () => this.place(), { passive: true, signal });
      const pill = this.closest('.header__bar');
      pill?.addEventListener(
        'transitionend',
        (event) => {
          if (event.target === pill && event.propertyName === 'max-inline-size') this.place();
        },
        { signal }
      );

      /*
        Closing cancels a waiting or running search, so the results on screen can be for older words than
        the field holds ("rose" results, "rosewater" in the field). Bring them back in step.
      */
      if (this.input.value.trim() !== (this.shownTerms ?? '')) this.onInput();
    }

    /**
     * Puts the popup just under the header pill. Its real bottom edge moves: a top announcement bar
     * above it, the smaller pill after scrolling, phones. Without a visible pill, the CSS default stays.
     */
    place() {
      const pill = this.closest('.header__bar');
      const rect = pill?.getBoundingClientRect();
      if (rect && rect.height > 0) {
        this.dialog.style.setProperty('--search-popup-header', `${Math.max(0, Math.round(rect.bottom))}px`);
      } else {
        this.dialog.style.removeProperty('--search-popup-header');
      }
    }

    /** Waits until typing pauses (250ms), so "rose" is one request, not four */
    onInput() {
      clearTimeout(this.timer);
      const terms = this.input.value.trim();
      // No result types switched on (Theme settings → Search): keep the starting groups, Enter still searches
      if (!this.dataset.types) return;
      if (!terms) {
        this.controller?.abort();
        this.showStart();
        return;
      }
      this.timer = setTimeout(() => this.search(terms), 250);
    }

    async search(terms) {
      // Cancel the previous request: an older, slower answer must never replace a newer one
      this.controller?.abort();
      const controller = new AbortController();
      this.controller = controller;

      const params = new URLSearchParams({
        q: terms,
        section_id: this.dataset.sectionId,
        'resources[type]': this.dataset.types, // only the groups switched on in Theme settings → Search
        'resources[limit]': this.dataset.limit,
        'resources[limit_scope]': 'each', // up to "limit" of each type, not in total
      });

      this.results.setAttribute('aria-busy', 'true');
      try {
        const response = await fetch(`${this.dataset.url}?${params}`, { signal: controller.signal });
        if (!response.ok) throw new Error(String(response.status));

        // The answer is the section's HTML inside <div id="shopify-section-predictive-search">
        const html = new DOMParser().parseFromString(await response.text(), 'text/html');
        const section = html.getElementById(`shopify-section-${this.dataset.sectionId}`);
        this.results.innerHTML = section ? section.innerHTML : '';
        this.shownTerms = terms;
        this.showResults();
        this.announce(this.results.querySelector('[data-search-announce]')?.textContent.trim());
      } catch (error) {
        if (error.name === 'AbortError') return; // replaced by a newer search, or the popup closed
        const message = document.createElement('p');
        message.className = 'search-popup__empty';
        message.textContent = this.dataset.labelError;
        this.results.replaceChildren(message);
        this.showResults();
        this.announce(this.dataset.labelError);
      } finally {
        /*
          Only the newest search ends the busy state: when search B cancels search A, A ends here too, but
          B is still loading, so the dim and aria-busy stay. A search cancelled by closing the popup or
          by an empty field is still this.controller, so it clears them.
        */
        if (this.controller === controller) this.results.removeAttribute('aria-busy');
      }
    }

    showResults() {
      this.start.hidden = true;
      this.results.hidden = false;
    }

    showStart() {
      this.shownTerms = '';
      this.results.hidden = true;
      this.results.replaceChildren();
      this.start.hidden = false;
      this.announce('');
    }

    announce(message) {
      if (this.status) this.status.textContent = message || '';
    }

    /** Recent searches: newest first, no duplicates (ignoring capitals), at most 5 */
    readRecent() {
      try {
        const list = JSON.parse(localStorage.getItem(SearchPopup.storageKey));
        return Array.isArray(list) ? list.filter((term) => typeof term === 'string') : [];
      } catch {
        return []; // storage blocked (private mode, cookies off) or broken: just show none
      }
    }

    remember(term) {
      const clean = term?.trim();
      if (!clean || !this.recent) return;
      const list = [clean, ...this.readRecent().filter((old) => old.toLowerCase() !== clean.toLowerCase())];
      try {
        localStorage.setItem(SearchPopup.storageKey, JSON.stringify(list.slice(0, SearchPopup.maxRecent)));
      } catch {
        // storage blocked: the search still works, it just isn't remembered
      }
    }

    /** Draws the recent chips. textContent, never innerHTML: these are words a visitor typed */
    renderRecent() {
      if (!this.recent) return;
      const list = this.readRecent();
      const chips = list.map((term) => {
        const item = document.createElement('li');
        const link = document.createElement('a');
        link.className = 'search-popup__chip';
        link.href = `${this.dataset.searchUrl}?q=${encodeURIComponent(term)}&options%5Bprefix%5D=last`;
        link.dataset.searchTerm = term;
        link.textContent = term;
        item.append(link);
        return item;
      });
      this.recent.querySelector('ul').replaceChildren(...chips);
      this.recent.hidden = list.length === 0;
    }
  }

  if (!customElements.get('search-popup')) customElements.define('search-popup', SearchPopup);

})();

/* snippets/share-links.liquid */
(() => {

  /**
   * <share-links>: the copy-link button copies its data-copy-url and announces the "Link copied"
   * text (from data-copied-text) in the status element for 2.5 seconds.
   */
  class ShareLinks extends HTMLElement {
    connectedCallback() {
      this.status = this.querySelector('[data-share-status]');
      this.querySelector('[data-copy-url]')?.addEventListener('click', (event) => this.copy(event.currentTarget));
    }

    async copy(button) {
      try {
        await navigator.clipboard.writeText(button.dataset.copyUrl);
        if (!this.status) return;
        this.status.textContent = this.dataset.copiedText || '';
        clearTimeout(this.timer);
        this.timer = setTimeout(() => (this.status.textContent = ''), 2500);
      } catch {
        window.prompt('', button.dataset.copyUrl);
      }
    }
  }

  if (!customElements.get('share-links')) customElements.define('share-links', ShareLinks);

})();

/* blocks/_discipline.liquid */
(() => {

  /**
   * A "Fill the screen height" hero centres its content, so a card that shrinks would pull the
   * breadcrumb and the story with it. Just before the last open row closes (click, Enter or Space on
   * its summary), the card keeps its current height as a minimum: the rows fold up inside the white
   * card and nothing around it moves. The minimum is dropped when the window's width changes, because
   * the card's open height changes with the screen.
   */
  document.addEventListener('click', (event) => {
    const summary = event.target.closest('.discipline__summary');
    if (!summary || !summary.parentElement.open) return;

    const card = summary.closest('.section--fill-screen .about-hero__card');
    if (!card || card.querySelectorAll('.discipline[open]').length > 1) return;

    card.style.minBlockSize = `${card.offsetHeight}px`;
  });

  // Only a width change resizes the card (phones fire "resize" when the address bar hides on scroll)
  let lastWidth = window.innerWidth;
  window.addEventListener('resize', () => {
    if (window.innerWidth === lastWidth) return;
    lastWidth = window.innerWidth;

    document.querySelectorAll('.about-hero__card[style]').forEach((card) => {
      card.style.removeProperty('min-block-size');
    });
  });

})();

/* blocks/_offer.liquid */
(() => {

  /**
   * COPY: the code to the clipboard, "Copied" for 2s (also in a hidden status line for screen readers).
   * The "Copy" text comes from data-label (Liquid), so a second click within the 2s, or the editor
   * moving the block, can never keep "Copied".
   */
  class OfferTicket extends HTMLElement {
    connectedCallback() {
      this.controller?.abort();
      this.controller = new AbortController();
      const { signal } = this.controller;
      const button = this.querySelector('.offer__copy');
      if (!button) return;
      button.addEventListener('click', () => this.copy(button), { signal });
    }

    // The 2s timer keeps running: if the block is moved, it still puts "Copy" back
    disconnectedCallback() {
      this.controller?.abort();
    }

    async copy(button) {
      try {
        await navigator.clipboard.writeText(button.dataset.code);
      } catch (error) {
        return; // no clipboard (an old browser or an insecure page): the code stays readable
      }
      const label = button.querySelector('[data-copy-label]');
      const status = this.querySelector('[data-copy-status]');
      label.textContent = button.dataset.copied;
      button.classList.add('is-copied');
      // Empty first, then the text on the next frame, so a second copy is announced again
      if (status) {
        status.textContent = '';
        requestAnimationFrame(() => (status.textContent = button.dataset.copied));
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        label.textContent = button.dataset.label;
        button.classList.remove('is-copied');
        if (status) status.textContent = '';
      }, 2000);
    }
  }

  if (!customElements.get('offer-ticket')) customElements.define('offer-ticket', OfferTicket);

})();

/* blocks/buy-buttons.liquid */
(() => {

  /**
   * <buy-buttons>: turns the option pills into a variant choice. The hidden <select name="id"> stays the
   * field the form sends; the pills only decide which of its options is selected.
   * Purchase options: the chosen card decides the hidden "selling_plan" field (empty = one time).
   */
  class BuyButtons extends HTMLElement {
    connectedCallback() {
      // One controller for every listener: the theme editor re-attaches a moved block, and connectedCallback
      // then runs again (without it, one press on + added 2)
      this.controller?.abort();
      this.controller = new AbortController();
      const { signal } = this.controller;

      this.select = this.querySelector('select[name="id"]');
      this.submit = this.querySelector('[data-submit]');
      this.form = this.querySelector('form');
      this.quantity = this.querySelector('input[name="quantity"]');
      this.enhanced = Boolean(this.select && this.querySelector('[data-option]'));

      this.setUpQuantity(signal);
      this.setUpPlans(signal);
      this.setUpAdd(signal);
      window.addEventListener('pageshow', () => this.syncFromForm(), { signal });
      if (!this.enhanced) return;

      this.addEventListener(
        'change',
        (event) => {
          if (event.target.matches('[data-option-input]')) this.onOptionChange();
        },
        { signal }
      );
    }

    disconnectedCallback() {
      this.controller?.abort();
      clearTimeout(this.addedTimer);
    }

    /**
     * "pageshow" fires on every load, and also after Back / Forward, when the browser has put the visitor's
     * earlier choices back into the form without a change event. Only when the pills differ from what
     * Liquid rendered (defaultChecked) is the variant announced again: a plain product link keeps the
     * merchant's image order and gets no ?variant= in the address
     */
    syncFromForm() {
      // The quantity may also be restored: tell the sticky bar
      this.quantity?.dispatchEvent(new Event('change', { bubbles: true }));
      if (!this.enhanced) {
        this.updatePlans();
        return;
      }
      const restored = [...this.querySelectorAll('[data-option-input]')].some(
        (input) => input.checked !== input.defaultChecked
      );
      if (restored) {
        this.onOptionChange();
      } else {
        this.updateStates();
        this.updatePlans();
      }
    }

    /**
     * Add to cart without leaving the page: the form's own fields (variant, quantity, selling plan, gift
     * card recipient) go to Shopify's Cart AJAX API (/cart/add.js) as FormData. While it adds, a small
     * spinning ring takes the place of the cart icon ("product:adding" tells the sticky bar). Then the
     * product photo flies from the pressed button to the header cart, the label says "Added" for 2s, the
     * header's cart count updates, and a "product:added" event goes to the sticky bar. A refused add
     * (stock…) shows Shopify's reason under the buttons. A form carrying return_to (the sticky bar's Buy now
     * fallback) is sent normally, so it can go to checkout. Without JavaScript the form posts as before.
     */
    setUpAdd(signal) {
      this.form?.addEventListener(
        'submit',
        (event) => {
          if (this.form.querySelector('input[name="return_to"]')) return;
          event.preventDefault();
          this.add();
        },
        { signal }
      );
    }

    async add() {
      // The sticky bar marks the form when its own Add to cart sent it: the photo then flies from there.
      // Read and cleared first, so an add that stops early can't leave it for the next one
      const fromSticky = this.form.dataset.addSource === 'sticky';
      delete this.form.dataset.addSource;
      if (this.busy || this.submit?.disabled) return;
      this.busy = true;
      const source = fromSticky
        ? this.closest('.shopify-section')?.querySelector('[data-sticky-add]')
        : this.submit;
      this.dispatchEvent(new CustomEvent('product:adding', { bubbles: true }));
      const label = this.submit?.querySelector('[data-submit-label]');
      const message = this.querySelector('[data-buy-message]');
      const root = window.Shopify?.routes?.root || '/';
      this.submit?.classList.add('is-adding');
      if (message) message.hidden = true;

      try {
        const response = await fetch(`${root}cart/add.js`, {
          method: 'POST',
          headers: { Accept: 'application/json' },
          body: new FormData(this.form),
        });
        const data = await response.json().catch(() => ({}));
        // Shopify explains a refused add (e.g. not enough stock) in "description" or "message"
        if (!response.ok) throw new Error(data.description || data.message || '');

        if (label) {
          label.textContent = this.dataset.labelAdded;
          this.submit.classList.add('is-added');
          clearTimeout(this.addedTimer);
          this.addedTimer = setTimeout(() => {
            this.submit.classList.remove('is-added');
            if (!this.submit.disabled) label.textContent = this.dataset.labelAdd;
          }, 2000);
        }
        this.announce(this.dataset.labelAddedStatus);
        BuyButtons.flyToCart(source, this.select?.selectedOptions[0]?.dataset.image || this.dataset.image);
        this.dispatchEvent(new CustomEvent('product:added', { bubbles: true, detail: { item: data } }));
        // The header's <cart-count> refreshes the count (and tells the cart page)
        document.dispatchEvent(new CustomEvent('cart:changed'));
      } catch (error) {
        const reason = error?.message || this.dataset.labelError;
        if (message) {
          message.textContent = reason;
          message.hidden = false;
        }
        this.dispatchEvent(new CustomEvent('product:add-error', { bubbles: true, detail: { message: reason } }));
      } finally {
        this.submit?.classList.remove('is-adding');
        this.busy = false;
      }
    }

    /**
     * A round copy of the product photo flies in an arc from the pressed button to the header's cart
     * (or, on phones, to the menu button: the cart is in the drawer there); the icon bumps when it lands.
     * Reduced motion, no photo, or the button not on screen: only the bump
     */
    static flyToCart(source, imageSrc) {
      const shown = (element) => {
        if (!element) return false;
        const box = element.getBoundingClientRect();
        return (
          box.width > 0 &&
          box.bottom > 0 &&
          box.top < window.innerHeight &&
          getComputedStyle(element).visibility !== 'hidden'
        );
      };
      const target = [...document.querySelectorAll('cart-count .header__icon-button, .header-drawer__toggle')].find(shown);
      if (!target) return;
      const bump = () => {
        target.classList.remove('is-cart-bump');
        void target.offsetWidth; // restart the animation
        target.classList.add('is-cart-bump');
      };
      if (!imageSrc || !shown(source) || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        bump();
        return;
      }

      const from = source.getBoundingClientRect();
      const to = target.getBoundingClientRect();
      const flight = document.createElement('div');
      flight.className = 'cart-flight';
      flight.setAttribute('aria-hidden', 'true');
      const image = document.createElement('img');
      image.alt = '';
      image.src = imageSrc;
      flight.append(image);
      document.body.append(flight);

      const size = flight.offsetWidth;
      const x = from.left + from.width / 2 - size / 2;
      const y = from.top + from.height / 2 - size / 2;
      const dx = to.left + to.width / 2 - size / 2 - x;
      const dy = to.top + to.height / 2 - size / 2 - y;
      flight.style.left = `${x}px`;
      flight.style.top = `${y}px`;
      const animation = flight.animate(
        [
          { transform: 'translate(0, 0) scale(0.6)', opacity: 0 },
          { transform: 'translate(0, -1.5rem) scale(1)', opacity: 1, offset: 0.15 },
          { transform: `translate(${dx * 0.55}px, ${dy * 0.55 - 60}px) scale(0.8)`, opacity: 1, offset: 0.55 },
          { transform: `translate(${dx}px, ${dy}px) scale(0.25)`, opacity: 0.4 },
        ],
        { duration: 800, easing: 'cubic-bezier(0.45, 0, 0.3, 1)' }
      );
      let landed = false;
      const land = () => {
        if (landed) return;
        landed = true;
        flight.remove();
        bump();
      };
      animation.onfinish = land;
      animation.oncancel = land;
      setTimeout(land, 1100); // a paused animation (hidden tab) never finishes: the photo must not stay
    }

    announce(text) {
      const status = this.querySelector('[data-buy-status]');
      if (!status) return;
      status.textContent = '';
      requestAnimationFrame(() => (status.textContent = text));
    }

    /** − / + move by the variant's step (1, or the B2B quantity rule), between its min and max */
    setUpQuantity(signal) {
      if (!this.quantity) return;
      this.querySelectorAll('[data-step]').forEach((button) => {
        button.addEventListener(
          'click',
          () => {
            const { min, step } = this.quantityRule();
            const current = parseInt(this.quantity.value, 10) || min;
            this.setQuantity(current + Number(button.dataset.step) * step);
          },
          { signal }
        );
      });
    }

    quantityRule() {
      const input = this.quantity;
      return {
        min: Number(input.min) || 1,
        step: Number(input.step) || 1,
        max: input.max ? Number(input.max) : Infinity,
      };
    }

    /** Keeps the number inside the rule: not under min, not over max, on a step from min */
    setQuantity(value) {
      const { min, step, max } = this.quantityRule();
      let next = Math.max(min, Math.min(max, value));
      next = min + Math.round((next - min) / step) * step;
      if (next > max) next -= step;
      this.quantity.value = next;
      this.quantity.dispatchEvent(new Event('change', { bubbles: true }));
    }

    /** The chosen variant's quantity rule (from its <option>) and its rules / volume pricing lines */
    applyQuantityRule(option) {
      if (!this.quantity || !option) return;
      const { qtyMin = '1', qtyStep = '1', qtyMax = '' } = option.dataset;
      this.quantity.min = qtyMin;
      this.quantity.step = qtyStep;
      if (qtyMax) this.quantity.max = qtyMax;
      else this.quantity.removeAttribute('max');
      this.setQuantity(parseInt(this.quantity.value, 10) || Number(qtyMin));
      this.querySelectorAll('[data-variant-rules]').forEach((rule) => {
        rule.hidden = rule.dataset.variantRules !== option.value;
      });
    }

    /** Purchase options: choosing a card or a frequency updates the prices and the selling plan field */
    setUpPlans(signal) {
      this.plans = this.querySelector('[data-plans]');
      if (!this.plans) return;
      this.sellingPlan = this.querySelector('[data-selling-plan]');
      try {
        this.planPrices = JSON.parse(this.querySelector('[data-plan-prices]')?.textContent || '{}');
      } catch (error) {
        this.planPrices = {};
      }

      this.plans.addEventListener(
        'change',
        (event) => {
          const frequency = event.target.closest('select[data-plan-select]');
          if (frequency) {
            // Picking a frequency also picks its card, and updates the first tick
            const card = frequency.closest('[data-plan-card]');
            card.querySelector('[data-plan-choice]').checked = true;
            const delivery = card.querySelector('[data-plan-delivery]');
            if (delivery) delivery.textContent = frequency.selectedOptions[0]?.dataset.delivery || '';
          }
          this.updatePlans();
        },
        { signal }
      );
      // A plan chosen on load (?selling_plan= or a subscription-only product): announce it once the rest
      // of the section (Price block, sticky bar) is on the page and listening
      requestAnimationFrame(() => this.updatePlans());
    }

    /** Each card's price for the current variant, and the chosen card's plan into "selling_plan" */
    updatePlans() {
      if (!this.plans) return;
      const variantId = this.querySelector('[name="id"]')?.value;
      const prices = this.planPrices[variantId] || {};
      let planId = '';

      this.filterPlans(prices);

      this.plans.querySelectorAll('[data-plan-card]').forEach((card) => {
        const id = card.querySelector('[data-plan-select]')?.value || '';
        const price = card.querySelector('[data-plan-price]');
        if (price && prices[id]) price.textContent = prices[id];
        if (card.querySelector('[data-plan-choice]').checked) planId = id;
      });

      this.sellingPlan.value = planId;
      this.sellingPlan.disabled = !planId;
      // Tells the Price block and the sticky bar which price the chosen option costs (the plan's price,
      // already formatted by Liquid's money filter) and the one-time price to compare it with. The cents
      // say which is cheaper: a prepaid plan (several deliveries at once) costs more than one bottle
      this.dispatchEvent(
        new CustomEvent('plan:change', {
          bubbles: true,
          detail: {
            variantId,
            planId,
            price: prices[planId] || '',
            regular: prices[''] || '',
            cheaper: planId !== '' && prices[`${planId}:cents`] < prices[':cents'],
          },
        })
      );
    }

    /**
     * Only the plans the chosen variant has: a plan can belong to some variants only, and Shopify refuses
     * a plan the variant doesn't have ("Cannot apply selling plan to variant"). The variant's plans are the
     * keys of its prices (from its selling plan allocations). A card with none of them hides; in a
     * frequency select, the other options hide. If the ticked card hides, One time purchase (or the
     * first card left) is ticked instead
     */
    filterPlans(prices) {
      let lostChoice = false;
      this.plans.querySelectorAll('[data-plan-card]').forEach((card) => {
        const choice = card.querySelector('[data-plan-choice]');
        if (!choice || choice.value === '') return; // One time purchase: always there
        const select = card.querySelector('[data-plan-select]');
        let available = false;
        if (select?.tagName === 'SELECT') {
          [...select.options].forEach((option) => {
            option.hidden = option.disabled = !(option.value in prices);
          });
          if (!(select.value in prices)) {
            const first = [...select.options].find((option) => option.value in prices);
            if (first) select.value = first.value;
          }
          available = select.value in prices;
          const delivery = card.querySelector('[data-plan-delivery]');
          if (delivery && available) delivery.textContent = select.selectedOptions[0]?.dataset.delivery || '';
        } else {
          available = Boolean(select) && select.value in prices;
        }
        card.hidden = !available;
        choice.disabled = !available;
        if (!available && choice.checked) {
          choice.checked = false;
          lostChoice = true;
        }
      });

      const anyChecked = this.plans.querySelector('[data-plan-choice]:checked');
      if (lostChoice || !anyChecked) {
        const fallback =
          this.plans.querySelector('[data-plan-choice][value=""]') ||
          this.plans.querySelector('[data-plan-card]:not([hidden]) [data-plan-choice]');
        if (fallback) fallback.checked = true;
      }
    }

    /**
     * Marks each value that can't be bought together with the other chosen values: no such variant =
     * "unavailable", a variant that is sold out = "sold-out" (dimmed or crossed out by the CSS). The hidden
     * note in its label tells screen readers the same
     */
    updateStates() {
      const groups = [...this.querySelectorAll('[data-option]')];
      const chosen = groups.map((group) => group.querySelector('input:checked')?.value);
      const variants = [...this.select.options].map((option) => ({
        values: (option.dataset.options || '').split('||'),
        available: option.dataset.available === 'true',
      }));

      groups.forEach((group, index) => {
        group.querySelectorAll('[data-option-input]').forEach((input) => {
          const wanted = [...chosen];
          wanted[index] = input.value;
          const variant = variants.find((item) => item.values.every((value, i) => value === wanted[i]));
          let state = '';
          if (!variant) state = 'unavailable';
          else if (!variant.available) state = 'sold-out';

          if (state) input.dataset.state = state;
          else delete input.dataset.state;
          const note = input.nextElementSibling?.querySelector('[data-value-note]');
          if (note) {
            const text = state === 'unavailable' ? this.dataset.labelUnavailable : this.dataset.labelSoldOut;
            note.textContent = state ? ` (${text})` : '';
          }
        });
      });
    }

    /** Finds the variant whose option values match the checked pills ("15ml||Rose" etc.) */
    onOptionChange() {
      const chosen = [...this.querySelectorAll('[data-option]')].map((group) => {
        const value = group.querySelector('input:checked')?.value;
        const label = group.querySelector('[data-option-chosen]');
        if (label) label.textContent = value || '';
        return value;
      });
      this.updateStates();
      const match = [...this.select.options].find((option) => option.dataset.options === chosen.join('||'));

      if (!match) {
        // This combination doesn't exist as a variant (e.g. a size only sold in one colour)
        this.updateButton(false, this.dataset.labelUnavailable);
        this.notify(null, null);
        return;
      }

      this.select.value = match.value;
      // Tells Shopify's own elements in the form (Shop Pay Installments...) that the variant changed
      this.select.dispatchEvent(new Event('change', { bubbles: true }));
      const available = match.dataset.available === 'true';
      this.updateButton(available, available ? this.dataset.labelAdd : this.dataset.labelSoldOut);
      this.applyQuantityRule(match);
      this.updatePlans();
      this.notify(match.value, match.dataset.mediaId);
    }

    /**
     * Add to cart follows the variant; the accelerated checkout buttons (Shop Pay...) are hidden when
     * it can't be bought, because they would otherwise buy whatever the form last held.
     */
    updateButton(enabled, label) {
      if (this.submit) {
        this.submit.disabled = !enabled;
        const text = this.submit.querySelector('[data-submit-label]') || this.submit;
        text.textContent = label;
      }
      const payment = this.querySelector('.buy-buttons__payment');
      if (payment) payment.hidden = !enabled;
    }

    /** Tells the Price block, the Stock block and the section's gallery which variant is now chosen */
    notify(variantId, mediaId) {
      this.dispatchEvent(new CustomEvent('variant:change', { bubbles: true, detail: { variantId, mediaId } }));
    }
  }

  if (!customElements.get('buy-buttons')) {
    customElements.define('buy-buttons', BuyButtons);
  }

})();

/* blocks/countdown.liquid */
(() => {

  /**
   * <countdown-timer>: counts down to data-end (Unix seconds). Updates on the second, only while it is
   * on screen and the tab is visible. At the end it follows data-on-end: hide / zeros / message.
   */
  class CountdownTimer extends HTMLElement {
    connectedCallback() {
      this.end = Number(this.dataset.end) * 1000;
      if (!this.end) return;

      // One controller for every listener: the editor can move the section (disconnect + connect again)
      this.controller = new AbortController();
      const { signal } = this.controller;
      this.values = {};
      this.querySelectorAll('[data-unit]').forEach((element) => {
        this.values[element.dataset.unit] = element;
      });

      this.observer = new IntersectionObserver(([entry]) => {
        this.onScreen = entry.isIntersecting;
        this.schedule();
      });
      this.observer.observe(this);
      document.addEventListener('visibilitychange', () => this.schedule(), { signal });

      // Pause button: stops the ticking; play shows the real time left again at once (and ends the
      // countdown if the time ran out while it was paused)
      this.pauseButton = this.querySelector('.countdown__pause');
      if (this.pauseButton) {
        this.pauseButton.hidden = false;
        this.pauseButton.addEventListener(
          'click',
          () => {
            this.paused = !this.paused;
            this.pauseButton.setAttribute('aria-pressed', String(this.paused));
            this.schedule();
          },
          { signal }
        );
      }
      this.tick();
    }

    disconnectedCallback() {
      this.controller?.abort();
      this.observer?.disconnect();
      clearTimeout(this.timer);
    }

    /** Runs the next tick at the start of the next second, while the countdown can be seen */
    schedule() {
      clearTimeout(this.timer);
      if (!this.onScreen || document.hidden || this.ended || this.paused) return;
      this.tick();
      this.timer = setTimeout(() => this.schedule(), 1000 - (Date.now() % 1000) + 10);
    }

    tick() {
      const left = Math.max(0, Math.floor((this.end - Date.now()) / 1000));
      const parts = {
        days: Math.floor(left / 86400),
        hours: Math.floor((left % 86400) / 3600),
        minutes: Math.floor((left % 3600) / 60),
        seconds: left % 60,
      };
      Object.entries(this.values).forEach(([unit, element]) => {
        const text = String(parts[unit]).padStart(2, '0');
        // Only write a number that changed: no repaint for the tiles that stay the same
        if (element.textContent !== text) element.textContent = text;
      });
      if (left === 0) this.finish();
    }

    /** The time is over: hide the countdown, keep the zeros, or show the message */
    finish() {
      this.ended = true;
      clearTimeout(this.timer);
      // Nothing ticks any more: no pause button
      if (this.pauseButton) this.pauseButton.hidden = true;
      const mode = this.dataset.onEnd;
      if (mode === 'hide') {
        // The editor keeps the block (faded), so it can still be selected
        if (window.Shopify?.designMode) this.classList.add('countdown--preview-hidden');
        else this.hidden = true;
      } else if (mode === 'message') {
        const message = this.querySelector('.countdown__message');
        if (!message) return;
        message.hidden = false;
        this.querySelector('.countdown__row')?.setAttribute('hidden', '');
      }
    }
  }

  if (!customElements.get('countdown-timer')) {
    customElements.define('countdown-timer', CountdownTimer);
  }

})();

/* blocks/product-eyebrow.liquid */
(() => {

  /**
   * Share: the phone's share sheet when there is one, else copy the link ("Link copied" for 2s, also
   * in a hidden status line for screen readers). The "Share" text comes from data-label (Liquid), so a
   * second click within the 2s, or the editor moving the block, can never keep "Link copied".
   */
  class ProductEyebrow extends HTMLElement {
    connectedCallback() {
      this.controller?.abort();
      this.controller = new AbortController();
      const { signal } = this.controller;
      const button = this.querySelector('.product-eyebrow__share');
      if (!button) return;
      button.addEventListener('click', () => this.share(button), { signal });
    }

    // The 2s timer keeps running: if the block is moved, it still puts "Share" back
    disconnectedCallback() {
      this.controller?.abort();
    }

    async share(button) {
      const { shareUrl: url, shareTitle: title, copied } = button.dataset;
      if (navigator.share) {
        try {
          await navigator.share({ url, title });
        } catch (error) {
          // The visitor closed the share sheet: nothing to do
        }
        return;
      }
      // No clipboard (an old browser or an insecure page) or the copy failed: don't say "Link copied"
      if (!navigator.clipboard) return;
      try {
        await navigator.clipboard.writeText(url);
      } catch (error) {
        return;
      }
      const label = button.querySelector('[data-share-label]');
      const status = this.querySelector('[data-share-status]');
      label.textContent = copied;
      // Empty first, then the text on the next frame, so a second copy is announced again
      if (status) {
        status.textContent = '';
        requestAnimationFrame(() => (status.textContent = copied));
      }
      clearTimeout(this.timer);
      this.timer = setTimeout(() => {
        label.textContent = button.dataset.label;
        if (status) status.textContent = '';
      }, 2000);
    }
  }

  if (!customElements.get('product-eyebrow')) customElements.define('product-eyebrow', ProductEyebrow);

})();

/* blocks/product-pickup.liquid */
(() => {

  /** Shows the pickup line of the variant chosen in the Buy buttons block (same section only) */
  class ProductPickup extends HTMLElement {
    connectedCallback() {
      this.controller?.abort();
      this.controller = new AbortController();
      const { signal } = this.controller;
      const scope = this.closest('.shopify-section') || document;
      scope.addEventListener('variant:change', (event) => this.show(event.detail), { signal });

      this.drawer = this.querySelector('.product-pickup__drawer');
      // variant id -> a promise of { line, list } HTML from the section (loaded one time each)
      this.cache = this.cache || new Map();
      this.addEventListener(
        'click',
        (event) => {
          const opener = event.target.closest('[data-pickup-open]');
          if (opener) this.open(opener.dataset.pickupOpen);
          if (event.target.closest('[data-pickup-close]')) this.drawer.close();
        },
        { signal }
      );
      // A click on the dimmed backdrop (the dialog element itself, outside the panel) closes it
      this.drawer?.addEventListener(
        'click',
        (event) => {
          if (event.target === this.drawer) this.drawer.close();
        },
        { signal }
      );
    }

    /**
     * One variant's pickup line and store list, from sections/pickup-availability.liquid (one request per
     * variant, kept; a failed one is forgotten so the next try asks again). The product's own URL keeps a
     * language prefix such as /fr; /variants/<id> renders the section without a product (empty)
     */
    load(variantId) {
      if (this.cache.has(variantId)) return this.cache.get(variantId);
      const url = `${this.drawer.dataset.productUrl}?variant=${variantId}&section_id=pickup-availability`;
      const request = fetch(url)
        .then((response) => {
          if (!response.ok) throw new Error(response.status);
          return response.text();
        })
        .then((text) => {
          const html = new DOMParser().parseFromString(text, 'text/html');
          const list = html.querySelector('[data-pickup-list]');
          if (!list) throw new Error('no list');
          return { line: html.querySelector('[data-pickup-summary]')?.innerHTML.trim() || '', list: list.outerHTML };
        })
        .catch((error) => {
          this.cache.delete(variantId);
          throw error;
        });
      this.cache.set(variantId, request);
      return request;
    }

    /** Opens the side panel and shows the store list of one variant */
    async open(variantId) {
      if (!this.drawer) return;
      const body = this.drawer.querySelector('[data-pickup-body]');
      this.drawer.showModal();
      this.opening = variantId;
      body.textContent = body.dataset.loading;
      try {
        const { list } = await this.load(variantId);
        // Another variant's link was pressed meanwhile: show only the newest
        if (this.opening === variantId) body.innerHTML = list;
      } catch (error) {
        if (this.opening === variantId) body.textContent = body.dataset.error;
      }
    }

    disconnectedCallback() {
      this.controller?.abort();
    }

    /**
     * The chosen variant changed: its pickup line replaces the old one (loaded from the section; none when
     * no pickup store has it in stock). variantId null = the chosen options match no variant
     * ("Unavailable"): no line. The delivery note always stays. An event without a variantId changes nothing.
     */
    async show(detail) {
      if (!detail || detail.variantId === undefined || !this.drawer) return;
      const id = detail.variantId === null ? null : String(detail.variantId);
      const current = this.querySelector('[data-pickup-line]');
      if (current?.dataset.pickupLine === id) return;
      // The old variant's line goes at once (it would show a wrong store while the new one loads)
      current?.remove();
      this.showing = id;
      if (id === null) return;
      try {
        const { line } = await this.load(id);
        if (this.showing !== id || !line || this.querySelector('[data-pickup-line]')) return;
        const list = this.querySelector('.product-pickup__list');
        list.insertAdjacentHTML('beforeend', line);
        list.querySelector('[data-pickup-line] [data-pickup-open]')?.setAttribute('aria-controls', this.drawer.id);
      } catch (error) {
        // No line: the shopper still sees the delivery note and can buy
      }
    }
  }

  if (!customElements.get('product-pickup')) customElements.define('product-pickup', ProductPickup);

})();

/* blocks/product-price.liquid */
(() => {

  /**
   * <product-price>: shows the price of the variant the visitor picks. Listens for "variant:change"
   * on its section (sent by the Buy buttons block) and copies in that variant's <template>.
   */
  class ProductPrice extends HTMLElement {
    connectedCallback() {
      this.controller?.abort();
      this.controller = new AbortController();
      const { signal } = this.controller;
      const scope = this.closest('.shopify-section') || document;
      this.current = this.querySelector('[data-price-current]');
      // A one-variant product has no templates: its own first content is the "template".
      // Read one time only: after an editor re-attach the content may be a swapped-in price
      this.base ??= this.current?.innerHTML;
      scope.addEventListener(
        'variant:change',
        (event) => {
          const variantId = event.detail?.variantId;
          // null = the chosen options match no variant ("Unavailable"): the last price stays, dimmed
          this.classList.toggle('is-unavailable', variantId === null);
          this.show(variantId);
        },
        { signal }
      );
      // Purchase options (Buy buttons): a subscription plan's price replaces the price shown
      scope.addEventListener(
        'plan:change',
        (event) => {
          this.plan = event.detail;
          this.show(event.detail?.variantId);
        },
        { signal }
      );
    }

    disconnectedCallback() {
      this.controller?.abort();
    }

    /** The variant's price (its template), then the chosen plan's price over it */
    show(variantId) {
      if (!this.current) return;
      const template = variantId && this.querySelector(`template[data-variant-id="${variantId}"]`);
      if (template) this.current.replaceChildren(template.content.cloneNode(true));
      else if (!this.querySelector('template[data-variant-id]')) this.current.innerHTML = this.base;
      this.applyPlan(variantId);
    }

    /**
     * A chosen plan: its price becomes the price. Only when it is cheaper than buying once (not a prepaid
     * plan) is the one-time price shown struck through beside it, unless the variant is on sale (its
     * compare-at price is already there)
     */
    applyPlan(variantId) {
      const plan = this.plan;
      if (!plan?.planId || !plan.price || plan.price === plan.regular) return;
      if (variantId && String(plan.variantId) !== String(variantId)) return;
      const amount = this.current.querySelector('[data-price-amount]');
      if (!amount) return;
      amount.textContent = plan.price;
      const label = amount.parentElement.querySelector('.visually-hidden');
      if (label) label.textContent = this.dataset.labelPlan;
      const price = amount.closest('.price');
      if (!plan.cheaper || !price || price.querySelector('.price__compare')) return;
      const regular = document.createElement('span');
      regular.className = 'price__compare';
      const hidden = document.createElement('span');
      hidden.className = 'visually-hidden';
      hidden.textContent = this.dataset.labelRegular;
      const struck = document.createElement('s');
      struck.textContent = plan.regular;
      regular.append(hidden, struck);
      amount.parentElement.after(regular);
    }
  }

  if (!customElements.get('product-price')) {
    customElements.define('product-price', ProductPrice);
  }

})();

/* blocks/product-stock.liquid */
(() => {

  /**
   * Shows the line of the variant chosen in the Buy buttons block. Listens on its own section (as the
   * Price block does) and ignores variants it has no line for, so another product on the same page
   * can't hide this one's stock.
   */
  class ProductStock extends HTMLElement {
    connectedCallback() {
      // One controller: the theme editor re-attaches a moved block and runs connectedCallback again
      this.controller?.abort();
      this.controller = new AbortController();
      this.scope = this.closest('.shopify-section') || document;
      this.scope.addEventListener(
        'variant:change',
        (event) => {
          const id = event.detail?.variantId;
          // null = the chosen values are no variant ("Unavailable"): no stock line
          if (id === null) {
            this.querySelectorAll('[data-variant-id]').forEach((line) => (line.hidden = true));
            return;
          }
          if (!id || !this.querySelector(`[data-variant-id="${id}"]`)) return;
          this.querySelectorAll('[data-variant-id]').forEach((line) => {
            line.hidden = line.dataset.variantId !== String(id);
          });
        },
        { signal: this.controller.signal }
      );
    }

    disconnectedCallback() {
      this.controller?.abort();
    }
  }

  if (!customElements.get('product-stock')) customElements.define('product-stock', ProductStock);

})();

/* blocks/product-videos.liquid */
(() => {

  /**
   * <product-videos>: a thumbnail click copies that video (an uploaded <video>, or a YouTube / Vimeo
   * <iframe> that starts itself) out of its <template> into the dialog and plays it (the click counts as the visitor's permission to play with sound). Closing empties the player,
   * which stops the video, and returns focus to the thumbnail.
   */
  class ProductVideos extends HTMLElement {
    connectedCallback() {
      this.controller?.abort();
      this.controller = new AbortController();
      const { signal } = this.controller;
      this.dialog = this.querySelector('dialog');
      this.player = this.querySelector('[data-video-player]');
      if (!this.dialog) return;

      this.addEventListener(
        'click',
        (event) => {
          const thumb = event.target.closest('[data-video]');
          if (thumb) this.play(thumb);
          else if (event.target.closest('[data-video-close]') || event.target === this.dialog) this.dialog.close();
        },
        { signal }
      );

      this.dialog.addEventListener(
        'close',
        () => {
          this.player.replaceChildren();
          this.opener?.focus();
        },
        { signal }
      );
    }

    // The editor can move the block (connectedCallback runs again): the old listeners go first
    disconnectedCallback() {
      this.controller?.abort();
    }

    play(thumb) {
      const template = this.querySelector(`[data-video-template="${thumb.dataset.video}"]`);
      if (!template) return;
      this.opener = thumb;
      this.player.style.setProperty('--video-ratio', thumb.dataset.ratio || '1.7778');
      this.player.replaceChildren(template.content.cloneNode(true));
      this.dialog.showModal();
      this.player.querySelector('video')?.play().catch(() => {
        // The browser refused to start it: the visitor presses play in the controls
      });
    }
  }

  if (!customElements.get('product-videos')) customElements.define('product-videos', ProductVideos);

})();

/* sections/about-chapters.liquid */
(() => {

  /**
   * <about-chapters>: the photo story.
   *
   * sync() gathers the chapters: it moves each chapter's photo (.chapter__media) into the sticky
   * layer, in chapter order, and builds the side nav (one link per chapter: "01" + its heading, else
   * its label, for screen readers). A chapter remembers its moved photo (chapter.media), so sync()
   * can run again: the theme editor re-renders a block when its settings change, and a
   * MutationObserver re-syncs. A Chapter with no content draws no .chapter, so it gets no photo and
   * no nav item.
   *
   * The IntersectionObserver's root is a thin line across the viewport 70% down (rootMargin -69%
   * top, -30% bottom), so one chapter crosses it at a time, early enough that its words are already
   * fading in while it scrolls into view (the middle felt late: half a screen of photo without
   * words). activate() then:
   * - shows that chapter's photo (is-active: CSS cross-fades it) and plays its video (playVideos);
   * - marks its nav link (aria-current="step");
   * - adds is-active to the chapter, so its words fade up (CSS, only with animations on).
   * data-ready tells the CSS the script runs, so it may hide words until their chapter arrives.
   *
   * Videos (WCAG 2.2.2: a loop longer than 5 seconds needs a way to stop it): only the active
   * chapter's video plays, and only when motion is allowed and the pause button is not pressed. A
   * reduced-motion change while the page is open pauses or plays it and hides or shows the button.
   */
  class AboutChapters extends HTMLElement {
    connectedCallback() {
      /*
        One AbortController for every listener: the theme editor re-attaches a moved section, so
        connectedCallback runs again; without it the pause button would toggle twice per click.
      */
      this.controller?.abort();
      this.controller = new AbortController();
      const { signal } = this.controller;

      this.media = this.querySelector('.about-chapters__media');
      this.list = this.querySelector('.about-chapters__list');
      this.nav = this.querySelector('.about-chapters__nav');
      if (!this.media || !this.list || !this.nav) return;

      this.motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
      this.paused ??= false;
      this.pauseButton = this.querySelector('.about-chapters__pause');
      this.current = -1;

      this.observer?.disconnect();
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) this.activate(this.chapters.indexOf(entry.target));
          });
        },
        { rootMargin: '-69% 0px -30% 0px' }
      );

      this.pauseButton?.addEventListener('click', () => this.togglePause(), { signal });
      this.motion.addEventListener(
        'change',
        () => {
          this.updatePauseButton();
          this.playVideos();
        },
        { signal }
      );

      this.sync();
      this.mutations?.disconnect();
      this.mutations = new MutationObserver(() => this.sync());
      this.mutations.observe(this.list, { childList: true, subtree: true });
      this.setAttribute('data-ready', '');
    }

    disconnectedCallback() {
      this.controller?.abort(); // removes every listener added with its signal
      this.observer?.disconnect();
      this.mutations?.disconnect();
      // The videos were moved into the sticky layer: pause every one of them
      this.querySelectorAll('video').forEach((video) => video.pause());
    }

    sync() {
      this.chapters = [...this.list.querySelectorAll('.chapter')];

      const photos = this.chapters.map((chapter) => {
        const own = chapter.querySelector('.chapter__media');
        if (own) chapter.media = own;
        return chapter.media;
      });
      this.slides = photos.filter(Boolean);
      this.media.replaceChildren(...this.slides);

      const items = this.chapters.map((chapter, i) => {
        const link = document.createElement('a');
        link.className = 'about-chapters__link';
        link.href = `#${chapter.id}`;

        const rule = document.createElement('span');
        rule.className = 'about-chapters__rule';
        rule.setAttribute('aria-hidden', 'true');
        link.append(rule, String(i + 1).padStart(2, '0'));

        const heading = chapter.querySelector('.chapter__heading') || chapter.querySelector('.chapter__label');
        if (heading) {
          const name = document.createElement('span');
          name.className = 'visually-hidden';
          name.textContent = `: ${heading.textContent.trim()}`;
          link.append(name);
        }

        const item = document.createElement('li');
        item.append(link);
        return item;
      });
      this.nav.querySelector('ol').replaceChildren(...items);
      this.links = [...this.nav.querySelectorAll('.about-chapters__link')];
      this.nav.hidden = this.chapters.length < 2;
      this.updatePauseButton();

      this.observer.disconnect();
      this.chapters.forEach((chapter) => this.observer.observe(chapter));

      // Before any chapter reaches the middle, the first photo shows (Default-1: photo, no words yet)
      const index = Math.min(Math.max(this.current, 0), this.chapters.length - 1);
      this.current = -1;
      this.activate(index, this.chapters[index]?.classList.contains('is-active'));

      // Moving the photos changed the list: don't let that trigger another sync
      this.mutations?.takeRecords();
    }

    activate(index, markChapter = true) {
      const chapter = this.chapters[index];
      if (!chapter) return;
      // Same chapter again: nothing to do, unless it was re-rendered and lost its mark
      if (index === this.current && (!markChapter || chapter.classList.contains('is-active'))) return;
      this.current = index;

      if (markChapter) {
        this.chapters.forEach((chapter, i) => chapter.classList.toggle('is-active', i === index));
      }
      this.links.forEach((link, i) => {
        if (i === index) link.setAttribute('aria-current', 'step');
        else link.removeAttribute('aria-current');
      });
      this.chapters.forEach((chapter, i) => chapter.media?.classList.toggle('is-active', i === index));
      this.playVideos();
    }

    /** Plays the active chapter's video (motion allowed, not paused); pauses every other video */
    playVideos() {
      this.chapters?.forEach((chapter, i) => {
        const video = chapter.media?.querySelector('video');
        if (!video) return;
        if (i === this.current && this.motion.matches && !this.paused) video.play().catch(() => {});
        else video.pause();
      });
    }

    /** The button shows only when a chapter has a video and motion is allowed */
    updatePauseButton() {
      if (!this.pauseButton) return;
      const hasVideo = this.slides?.some((slide) => slide.querySelector('video'));
      this.pauseButton.hidden = !hasVideo || !this.motion.matches;
      this.pauseButton.setAttribute('aria-pressed', String(this.paused));
    }

    togglePause() {
      this.paused = !this.paused;
      // The label stays "Pause"; aria-pressed says whether it is on (pressed = paused)
      this.pauseButton.setAttribute('aria-pressed', String(this.paused));
      this.playVideos();
    }
  }

  if (!customElements.get('about-chapters')) customElements.define('about-chapters', AboutChapters);

})();

/* sections/about-hero.liquid */
(() => {

  /**
   * <about-hero-rotator>: swaps the heading's second line every few seconds (the section's
   * "Change every" setting, data-interval in seconds). One brush glides to each version's Bold word
   * (placeBrush) while the words change.
   * - Runs only with animations on (the global setting; never in the theme editor) and for
   *   visitors who allow motion; otherwise the first version just stays.
   * - Loops for as long as the page is open. WCAG 2.2.2 (moving content that runs longer than 5
   *   seconds needs a way to stop it): the pause / play button next to the heading stops it for
   *   good (until pressed again), and it also pauses while the pointer is over the heading.
   * - A reduced-motion change while the page is open: setup() / teardown() start or stop the
   *   line and show or hide the pause button (the visitor's pause choice is kept).
   */
  class AboutHeroRotator extends HTMLElement {
    connectedCallback() {
      /*
        One AbortController for every listener: disconnectedCallback aborts it, which removes them all.
        The theme editor re-attaches the section when it is moved, so connectedCallback runs again;
        without this, the pause button would get a second listener and toggle twice per click.
      */
      this.abortController?.abort();
      this.abortController = new AbortController();
      const { signal } = this.abortController;

      this.phrases = [...this.querySelectorAll('.about-hero__phrase')];
      const animations = document.documentElement.classList.contains('animations-on');
      if (this.phrases.length < 2 || !animations) return;

      // After an editor re-attach, carry on from the version that shows
      this.index = Math.max(0, this.phrases.findIndex((phrase) => phrase.classList.contains('is-active')));
      this.paused ??= false;
      this.delay = Math.max(Number(this.dataset.interval) || 3, 1) * 1000;
      this.brush = this.querySelector('.about-hero__brush');
      // The button sits next to the h1, in the same lettering block
      this.pauseButton = this.closest('.about-hero__lettering')?.querySelector('.about-hero__pause');

      this.addEventListener('pointerenter', () => this.stop(), { signal });
      this.addEventListener('pointerleave', () => this.start(), { signal });
      this.pauseButton?.addEventListener('click', () => this.togglePause(), { signal });

      // Listened to before anything moves, so a later "motion allowed" also starts the line
      this.motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
      this.motion.addEventListener('change', () => (this.motion.matches ? this.setup() : this.teardown()), { signal });

      if (this.motion.matches) this.setup();
    }

    /** Starts the changing line (safe to call again: nothing is built twice) */
    setup() {
      this.running = true;
      this.setAttribute('data-ready', '');

      // The brush's first place: put it there at once (no glide in from the left)
      if (this.brush) {
        this.brush.style.transition = 'none';
        this.placeBrush();
        this.brush.getBoundingClientRect();
        this.brush.style.transition = '';
        // The heading's size changes with the screen: measure again when the line resizes
        if (!this.resize) {
          this.resize = new ResizeObserver(() => this.placeBrush());
          this.resize.observe(this);
        }
      }

      if (this.pauseButton) {
        this.pauseButton.hidden = false;
        this.pauseButton.setAttribute('aria-pressed', String(this.paused));
      }

      this.start();
    }

    /** Stops the line on its first version, as without JS, and hides the pause button */
    teardown() {
      this.running = false;
      this.stop();
      clearTimeout(this.leaveTimer);
      this.resize?.disconnect();
      this.resize = null;
      this.index = 0;
      this.phrases.forEach((phrase, i) => {
        phrase.classList.remove('is-leaving');
        phrase.classList.toggle('is-active', i === 0);
      });
      this.removeAttribute('data-ready');
      if (this.pauseButton) this.pauseButton.hidden = true;
    }

    togglePause() {
      this.paused = !this.paused;
      const button = this.pauseButton;
      // The label stays "Pause"; aria-pressed says whether it is on (pressed = paused)
      button.setAttribute('aria-pressed', String(this.paused));
      if (this.paused) this.stop();
      else this.start();
    }

    disconnectedCallback() {
      this.abortController?.abort(); // removes every listener added with its signal
      this.stop();
      clearTimeout(this.leaveTimer);
      this.resize?.disconnect();
      this.resize = null;
    }

    /**
     * Puts the brush under the current version's Bold (or <u>) word, the same way the old ::after
     * did: from 8% before the word to 2% after it, its top 0.06em above the word's bottom.
     * offsetLeft / offsetTop ignore the versions' rise-in movement (translate), so it aims at the
     * word's final place. No Bold word in this version: the brush fades out.
     */
    placeBrush() {
      if (!this.brush) return;
      const word = this.phrases[this.index].querySelector('strong, u');
      this.brush.classList.toggle('is-hidden', !word);
      if (!word) return;

      const width = word.offsetWidth;
      this.style.setProperty('--brush-x', `${word.offsetLeft - width * 0.08}px`);
      this.style.setProperty('--brush-w', `${width * 1.1}px`);
      this.style.setProperty('--brush-y', `${word.offsetTop + word.offsetHeight}px`);
    }

    start() {
      if (this.timer || this.paused || !this.running) return;
      this.timer = setInterval(() => this.next(), this.delay);
    }

    stop() {
      clearInterval(this.timer);
      this.timer = null;
    }

    next() {
      const previous = this.index;
      this.index = (this.index + 1) % this.phrases.length;
      this.phrases.forEach((phrase, i) => {
        phrase.classList.toggle('is-leaving', i === previous);
        phrase.classList.toggle('is-active', i === this.index);
      });
      this.placeBrush();
      // Once it has gone (~450ms), the old version waits below again, unseen
      clearTimeout(this.leaveTimer);
      this.leaveTimer = setTimeout(() => {
        this.phrases.forEach((phrase) => phrase.classList.remove('is-leaving'));
      }, 500);
    }
  }

  if (!customElements.get('about-hero-rotator')) customElements.define('about-hero-rotator', AboutHeroRotator);

})();

/* sections/about-numbers.liquid */
(() => {

  /**
   * <about-numbers>: counts each card's number up from 0 once, when the card is in view.
   *
   * The real value is the data-count attribute (also in a visually hidden copy for screen readers);
   * only the visible, aria-hidden digits change, and the last frame is the saved value itself.
   * - Decimals and the number of digits are kept ("4.9" counts 0.0 → 4.9, "98" 00 → 98, "07" ends as 07).
   * - A value with thousands commas ("31,400"), or a collection count of 1000 or more
   *   (data-group), counts with the store language's separators (Intl.NumberFormat).
   * - Anything else ("N/A") is left as it is.
   * Off (the final value shows straight away): animations off (also in the theme editor), reduced
   * motion (also when it is turned on during the count), or no JS.
   */
  class AboutNumbers extends HTMLElement {
    connectedCallback() {
      this.controller?.abort();
      this.controller = new AbortController();
      const { signal } = this.controller;
      this.frames = new Set();

      this.counts = [...this.querySelectorAll('.stat-figure__count')]
        .map((element) => this.parse(element))
        .filter(Boolean);
      if (!this.counts.length) return;

      // A collection count of 1000 or more gets its separators even when nothing moves
      this.counts.forEach((count) => {
        if (count.group && !count.element.dataset.done) this.render(count, count.target);
      });

      const animations = document.documentElement.classList.contains('animations-on');
      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
      if (!animations || reduce.matches) return;

      // Reduced motion turned on while on the page: show every final value and stop
      reduce.addEventListener(
        'change',
        () => {
          if (reduce.matches) this.finish();
        },
        { signal }
      );

      const waiting = this.counts.filter((count) => !count.element.dataset.done);
      // Start from 0 before the cards come into view
      waiting.forEach((count) => this.render(count, 0));

      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (!entry.isIntersecting) return;
            this.observer.unobserve(entry.target);
            const count = this.counts.find((item) => item.element === entry.target);
            if (count) this.countUp(count);
          });
        },
        { threshold: 0.5 }
      );
      waiting.forEach((count) => this.observer.observe(count.element));
    }

    disconnectedCallback() {
      // The editor re-attaches a moved section: a count cut off here shows its final value
      this.finish();
      this.controller?.abort();
    }

    /** Reads a card's saved value; null when it isn't a number this script can count. */
    parse(element) {
      const saved = element.dataset.count || '';
      const grouped = /^\d{1,3}(,\d{3})+(\.\d+)?$/.test(saved);
      if (!grouped && !/^\d+(\.\d+)?$/.test(saved)) return null;

      const plain = saved.replace(/,/g, '');
      const [whole, fraction = ''] = plain.split('.');
      const target = parseFloat(plain);
      const group = grouped || (element.hasAttribute('data-group') && target >= 1000);
      // The count keeps the saved number of digits (phone design: 98 counts 00 → 98; 07 ends as 07)
      const digits = Math.min(whole.length, 21);

      let format = null;
      if (group) {
        const formatter = new Intl.NumberFormat(document.documentElement.lang || undefined, {
          minimumIntegerDigits: digits,
          minimumFractionDigits: fraction.length,
          maximumFractionDigits: fraction.length,
          numberingSystem: 'latn',
        });
        format = (value) => formatter.format(value);
      }

      return {
        element,
        number: element.querySelector('.stat-figure__number'),
        saved,
        target,
        decimals: fraction.length,
        digits,
        group,
        format,
      };
    }

    render(count, value) {
      if (!count.number) return;
      if (count.format) {
        count.number.textContent = count.format(value);
        return;
      }
      const [whole, fraction] = value.toFixed(count.decimals).split('.');
      count.number.textContent = whole.padStart(count.digits, '0') + (fraction ? `.${fraction}` : '');
    }

    /** The final value: the saved text, or its grouped form for a collection count. */
    show(count) {
      count.element.dataset.done = '';
      if (count.group && count.format) this.render(count, count.target);
      else if (count.number) count.number.textContent = count.saved;
    }

    /** Stops every count and shows every final value (also the cards not in view yet). */
    finish() {
      this.observer?.disconnect();
      this.observer = null;
      this.frames?.forEach((frame) => cancelAnimationFrame(frame));
      this.frames?.clear();
      this.counts?.forEach((count) => {
        if (!count.element.dataset.done) this.show(count);
      });
    }

    countUp(count) {
      const duration = 1200;
      const start = performance.now();

      const step = (now) => {
        this.frames.delete(frame);
        const progress = Math.min((now - start) / duration, 1);
        if (progress < 1) {
          const eased = 1 - (1 - progress) ** 3; // ease-out: fast first, gentle at the end
          this.render(count, count.target * eased);
          frame = requestAnimationFrame(step);
          this.frames.add(frame);
        } else {
          this.show(count);
        }
      };
      let frame = requestAnimationFrame(step);
      this.frames.add(frame);
    }
  }

  if (!customElements.get('about-numbers')) customElements.define('about-numbers', AboutNumbers);

})();

/* sections/about-pillars.liquid */
(() => {

  /**
   * <about-pillars>: turns scrolling through the (tall) section into slide changes.
   *
   * fit() decides if the panel can be pinned: it applies the pinned layout (data-ready) and checks
   * that the panel's content (the tallest slide and the photos) fits one screen. If not, it removes
   * data-ready again in the same step (before paint), so the slides stack as without JS. It runs on
   * connect, on resize and when the web fonts have loaded (text gets taller).
   *
   * While pinned, update() runs at most once per frame while the section is on screen (an
   * IntersectionObserver adds and removes the scroll listener). It measures how far the visitor is
   * through the section (0 at its top, 1 at its end), shows slide floor(progress x slides), and
   * writes --progress:
   * - "Photos drift while scrolling" on (data-drift) and motion allowed: the exact progress, so the
   *   photo columns follow the scroll smoothly (data-drift-on);
   * - otherwise one step per slide (0, 0.5, 1 for three slides): the columns glide once per slide.
   * Keyboard focus in a slide that doesn't show, and selecting a Pillar block in the theme editor,
   * scroll to that slide. Every listener is on one AbortController (the editor re-attaches a moved
   * section, so connectedCallback can run again).
   */
  class AboutPillars extends HTMLElement {
    connectedCallback() {
      this.controller?.abort();
      this.controller = new AbortController();
      const { signal } = this.controller;

      this.slides = [...this.querySelectorAll('.pillar')];
      if (!this.slides.length) return;

      this.panel = this.querySelector('.about-pillars__panel');
      this.bars = [...this.querySelectorAll('.about-pillars__bar')];
      this.counter = this.querySelector('.about-pillars__count-current');
      this.current = -1;

      // Smooth drift only with motion allowed; follow a change of the visitor's setting
      this.motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
      this.setDrift();
      this.motion.addEventListener(
        'change',
        () => {
          this.setDrift();
          this.update();
        },
        { signal }
      );

      this.onScroll = () => {
        if (this.frame) return;
        this.frame = requestAnimationFrame(() => {
          this.frame = null;
          this.update();
        });
      };

      this.visibility = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', this.onScroll, { passive: true, signal });
          this.update();
        } else {
          window.removeEventListener('scroll', this.onScroll);
        }
      });

      // Pin again or stack after a resize, and once the web fonts have loaded
      this.onResize = () => {
        if (this.fitFrame) return;
        this.fitFrame = requestAnimationFrame(() => {
          this.fitFrame = null;
          this.fit();
          this.update();
        });
      };
      window.addEventListener('resize', this.onResize, { signal });
      document.fonts?.ready.then(() => {
        if (!signal.aborted) this.onResize();
      });

      this.fit();
      this.activate(0);
      this.visibility.observe(this);

      this.addEventListener('shopify:block:select', (event) => this.scrollToSlide(event.target), { signal });

      // A link in a slide that doesn't show gets keyboard focus: bring its slide in
      this.addEventListener(
        'focusin',
        (event) => {
          if (!this.pinned) return;
          const slide = event.target.closest?.('.pillar');
          if (slide && slide !== this.slides[this.current]) this.scrollToSlide(slide);
        },
        { signal }
      );
    }

    disconnectedCallback() {
      this.controller?.abort();
      clearTimeout(this.leaveTimer);
      this.visibility?.disconnect();
      if (this.frame) cancelAnimationFrame(this.frame);
      if (this.fitFrame) cancelAnimationFrame(this.fitFrame);
      this.frame = null;
      this.fitFrame = null;
    }

    setDrift() {
      this.drift = this.hasAttribute('data-drift') && this.motion.matches;
      this.toggleAttribute('data-drift-on', this.drift);
    }

    /**
     * Pinned only when the content fits one screen. Always measured in the pinned layout (the
     * stacked slides are taller, so measuring them would flip it back and forth).
     */
    fit() {
      this.setAttribute('data-ready', '');
      this.pinned = this.panel.scrollHeight <= this.panel.clientHeight + 1;
      this.toggleAttribute('data-ready', this.pinned);
    }

    /** 0 at the section's top, 1 once its end reaches the bottom of the screen */
    progress() {
      const rect = this.getBoundingClientRect();
      const travel = rect.height - window.innerHeight;
      if (travel <= 0) return 0;
      return Math.min(Math.max(-rect.top / travel, 0), 1);
    }

    update() {
      if (!this.pinned) return;
      const count = this.slides.length;
      const progress = this.progress();
      const index = Math.min(Math.floor(progress * count), count - 1);
      const step = count > 1 ? index / (count - 1) : 0;

      this.style.setProperty('--progress', String(this.drift ? progress : step));
      this.activate(index);
    }

    activate(index) {
      if (index === this.current) return;
      const previous = this.current;
      this.current = index;

      // Scrolling down: the new lines come up from below; back up: down from above
      this.style.setProperty('--enter-from', index < previous ? '-2rem' : '2rem');

      clearTimeout(this.leaveTimer);
      this.slides.forEach((slide, i) => {
        slide.classList.toggle('is-leaving', i === previous);
        slide.classList.toggle('is-active', i === index);
      });
      // The leaving slide is gone after ~400ms: back to "waiting", unseen
      this.leaveTimer = setTimeout(() => {
        this.slides.forEach((slide) => slide.classList.remove('is-leaving'));
      }, 450);
      this.bars.forEach((bar, i) => bar.classList.toggle('is-active', i === index));
      if (this.counter) this.counter.textContent = String(index + 1).padStart(2, '0');
    }

    scrollToSlide(target) {
      const slide = target.closest?.('.pillar');
      const index = this.slides.indexOf(slide);
      if (index < 0) return;

      // Stacked: the slide is in the page flow
      if (!this.pinned) {
        slide.scrollIntoView({ block: 'nearest' });
        return;
      }

      const top = this.getBoundingClientRect().top + window.scrollY;
      const travel = this.offsetHeight - window.innerHeight;
      window.scrollTo({ top: top + (travel * (index + 0.5)) / this.slides.length });
    }
  }

  if (!customElements.get('about-pillars')) customElements.define('about-pillars', AboutPillars);

})();

/* sections/about-team.liquid */
(() => {

  /*
    The cards' buttons: open / close a person's quote (and social buttons). One card open at a time,
    Escape closes. The buttons are hidden in the markup (they do nothing without this script) and
    shown here. In the theme editor, selecting a Team member block opens its card.
  */
  if (!customElements.get('about-team-list')) {
    customElements.define(
      'about-team-list',
      class AboutTeamList extends HTMLElement {
        connectedCallback() {
          this.controller?.abort();
          this.controller = new AbortController();
          const { signal } = this.controller;

          this.querySelectorAll('[data-member-toggle][hidden]').forEach((button) => button.removeAttribute('hidden'));

          this.addEventListener(
            'click',
            (event) => {
              const button = event.target.closest('[data-member-toggle]');
              if (!button || !this.contains(button)) return;
              this.toggle(button.closest('.team-member'), button.getAttribute('aria-expanded') !== 'true');
            },
            { signal }
          );

          document.addEventListener(
            'keydown',
            (event) => {
              if (event.key !== 'Escape' || event.defaultPrevented) return;
              const open = this.querySelector('.team-member.is-open');
              if (!open) return;
              this.toggle(open, false);
              // Focus inside the closed card (a social button) goes back to the card's button
              if (open.contains(document.activeElement)) open.querySelector('[data-member-toggle]')?.focus();
            },
            { signal }
          );

          document.addEventListener(
            'shopify:block:select',
            (event) => {
              const card = event.target.closest?.('.team-member');
              if (card && this.contains(card)) this.toggle(card, true);
            },
            { signal }
          );

          document.addEventListener(
            'shopify:block:deselect',
            (event) => {
              const card = event.target.closest?.('.team-member');
              if (card && this.contains(card)) this.toggle(card, false);
            },
            { signal }
          );
        }

        disconnectedCallback() {
          this.controller?.abort();
        }

        toggle(card, open) {
          if (!card) return;
          if (open) {
            this.querySelectorAll('.team-member.is-open').forEach((other) => {
              if (other !== card) this.toggle(other, false);
            });
          }
          card.classList.toggle('is-open', open);
          card.querySelector('[data-member-toggle]')?.setAttribute('aria-expanded', String(open));
        }
      }
    );
  }

})();

/* sections/about-timeline.liquid */
(() => {

  /**
   * <about-timeline>: fills the rail while the visitor scrolls.
   *
   * The reading line is 60% down the screen. measure() places one rail from just above the first
   * marker (--rail-lead) to just past the last one and notes where each marker sits on it (px from
   * the list's top: these don't change while scrolling). Each frame, the target is how much of the
   * rail lies above the reading line; the drawn fill moves a share of the way there (easing), so it
   * glides instead of jumping with each wheel step. A milestone is reached (full colour) once the
   * fill gets to its marker, so markers light up as the line arrives.
   * Off (nothing happens, so all is full colour): animations off (also in the theme editor) or
   * reduced motion. A change of the reduced-motion setting while on the page stops (stop()) or
   * starts (start()) it. Listeners are on AbortControllers: one for the element (the editor
   * re-attaches a moved section, so connectedCallback can run again), one for the running effect.
   */
  class AboutTimeline extends HTMLElement {
    connectedCallback() {
      this.controller?.abort();
      this.controller = new AbortController();
      const { signal } = this.controller;

      this.list = this.querySelector('.about-timeline__list');
      this.milestones = [...this.querySelectorAll('.milestone')];
      const animations = document.documentElement.classList.contains('animations-on');
      if (!this.list || !this.milestones.length || !animations) return;

      this.motion = window.matchMedia('(prefers-reduced-motion: no-preference)');
      this.motion.addEventListener('change', () => (this.motion.matches ? this.start() : this.stop()), { signal });
      if (this.motion.matches) this.start();
    }

    disconnectedCallback() {
      this.controller?.abort();
      this.stop();
    }

    start() {
      if (this.running) return;
      this.running = new AbortController();
      const { signal } = this.running;

      this.drawn = 0;
      this.onScroll = () => this.requestTick();

      this.visibility = new IntersectionObserver(([entry]) => {
        this.visible = entry.isIntersecting;
        if (entry.isIntersecting) {
          window.addEventListener('scroll', this.onScroll, { passive: true, signal });
          this.requestTick();
        } else {
          window.removeEventListener('scroll', this.onScroll);
          this.setWaiting(false);
        }
      });

      // Text reflow (resize, fonts loading) moves the markers: measure again
      this.resizer = new ResizeObserver(() => {
        this.measure();
        this.requestTick();
      });

      this.setAttribute('data-ready', '');
      this.measure();
      this.resizer.observe(this.list);
      this.visibility.observe(this);
    }

    /** Back to the still state: full rail, every milestone in full colour, no sweep */
    stop() {
      if (!this.running) return;
      this.running.abort();
      this.running = null;
      this.visibility?.disconnect();
      this.resizer?.disconnect();
      if (this.frame) cancelAnimationFrame(this.frame);
      this.frame = null;
      clearTimeout(this.waitTimer);
      this.visible = false;
      this.removeAttribute('data-ready');
      this.list.classList.remove('is-waiting');
      this.milestones.forEach((milestone) => milestone.classList.remove('is-reached'));
    }

    // The hint shows only after the visitor has paused for a moment, partway through the rail
    setWaiting(waiting) {
      clearTimeout(this.waitTimer);
      if (!waiting) {
        this.list.classList.remove('is-waiting');
        return;
      }
      this.waitTimer = setTimeout(() => {
        const partway = this.drawn > 0 && this.drawn < this.railLength;
        this.list.classList.toggle('is-waiting', Boolean(this.visible) && partway);
      }, 800);
    }

    measure() {
      const listTop = this.list.getBoundingClientRect().top;
      this.markers = this.milestones.map((milestone) => {
        const marker = milestone.querySelector('.milestone__marker');
        const box = (marker || milestone).getBoundingClientRect();
        return { milestone, size: box.height, middle: box.top + box.height / 2 - listTop };
      });

      const lead = parseFloat(getComputedStyle(this.list).getPropertyValue('--rail-lead')) || 0;
      const first = this.markers[0];
      const last = this.markers[this.markers.length - 1];
      this.railTop = Math.max(first.middle - lead, 0);
      this.railLength = last.middle + last.size * 2 - this.railTop;
      this.list.style.setProperty('--rail-top', `${this.railTop}px`);
      this.list.style.setProperty('--rail-length', `${this.railLength}px`);
    }

    requestTick() {
      if (this.frame || !this.running) return;
      this.frame = requestAnimationFrame(() => {
        this.frame = null;
        this.tick();
      });
    }

    tick() {
      const line = window.innerHeight * 0.6;
      const railStart = this.list.getBoundingClientRect().top + this.railTop;
      const target = Math.min(Math.max(line - railStart, 0), this.railLength);

      // Move 15% of the remaining distance each frame; snap when it's under half a pixel
      const gap = target - this.drawn;
      this.drawn = Math.abs(gap) < 0.5 ? target : this.drawn + gap * 0.15;

      this.list.style.setProperty('--fill-px', `${this.drawn.toFixed(1)}px`);

      const reached = this.railTop + this.drawn;
      this.markers.forEach(({ milestone, middle }) => {
        milestone.classList.toggle('is-reached', middle <= reached + 0.5);
      });

      if (this.drawn !== target) {
        this.setWaiting(false);
        this.requestTick();
      } else {
        this.setWaiting(true);
      }
    }
  }

  if (!customElements.get('about-timeline')) customElements.define('about-timeline', AboutTimeline);

})();

/* sections/announcement-bar.liquid */
(() => {

  /**
   * <announcement-bar>
   * - Close: hides the bar and remembers it for the visit (not in the theme editor).
   * - Slideshow: arrows, autoplay (paused on hover, focus on a message, and by the pause button). With
   *   reduced motion it still changes the message, without the fade (a text change is not movement), so a
   *   bar without arrows never gets stuck on message 1. Screen readers hear the new message only when the
   *   visitor changed it (aria-live polite), not every few seconds.
   * - Marquee: shows the pause button when it really moves.
   * Listeners are removed when the editor re-renders the section (AbortController).
   */
  class AnnouncementBar extends HTMLElement {
    connectedCallback() {
      // Closed earlier (the inline script hid it before the first paint): nothing to run
      if (this.hidden) return;

      this.controller = new AbortController();
      const { signal } = this.controller;
      // Reduced motion, re-checked if the visitor changes it while the page is open
      const motionQuery = window.matchMedia('(prefers-reduced-motion: no-preference)');
      this.motion = motionQuery.matches;
      motionQuery.addEventListener(
        'change',
        () => {
          this.motion = motionQuery.matches; // the close animation reads it
        },
        { signal }
      );
      this.designMode = Boolean(window.Shopify && Shopify.designMode);

      this.querySelector('.announcement-bar__close')?.addEventListener('click', () => this.close(), { signal });
      if (this.dataset.tuck === 'true') this.setUpTuck(signal);

      this.pauseButton = this.querySelector('.announcement-bar__pause');
      this.pauseButton?.addEventListener('click', () => this.togglePause(), { signal });

      if (this.dataset.mode === 'slideshow') this.setUpSlideshow(signal);
      if (this.dataset.mode === 'marquee') this.setUpMarquee(signal);
      this.setUpScroll(signal);
    }

    disconnectedCallback() {
      this.teardown();
    }

    // Stops everything: listeners, timers, observers. Also used once the bar is closed.
    teardown() {
      this.controller?.abort();
      clearInterval(this.timer);
      clearTimeout(this.closeFallback);
      this.resizeObserver?.disconnect();
      this.marqueeObserver?.disconnect();
    }

    /*
      Marquee: moves only outside the theme editor and when the visitor hasn't asked for reduced motion
      (re-checked if that preference changes while the page is open). While moving, the strip gets enough
      copies of the messages that one half covers the bar (no gap at the loop point), and the loop time comes
      from the Speed setting in pixels per second, so short and long messages move at the same pace. The
      pause button shows only while it really moves. In the editor, selecting a message scrolls the real
      line to it.
    */
    setUpMarquee(signal) {
      this.viewport = this.querySelector('.announcement-bar__viewport');
      this.track = this.viewport?.querySelector('.announcement-bar__track');
      if (!this.track) return;
      this.unit = [...this.track.querySelector('.announcement-bar__half').children].map((node) => node.cloneNode(true));

      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
      const apply = () => {
        const moving = !this.designMode && !reduced.matches;
        this.classList.toggle('is-moving', moving);
        if (this.pauseButton) this.pauseButton.hidden = !moving;
        if (moving) this.buildMarquee();
        this.refreshScrollers?.(); // the real line's Tab stop depends on is-moving
      };
      reduced.addEventListener('change', apply, { signal });

      // Rebuild when the strip's room changes (window resize, band height, or the strip showing again after
      // the keyboard leaves the real line). At most once per frame.
      let pending = false;
      this.marqueeObserver = new ResizeObserver(() => {
        if (pending) return;
        pending = true;
        requestAnimationFrame(() => {
          pending = false;
          if (!this.classList.contains('is-moving')) return;
          const size = this.measure(this.viewport);
          if (size > 0 && size !== this.marqueeSize) this.buildMarquee();
        });
      });
      this.marqueeObserver.observe(this.viewport);

      // The web font changes the messages' width once it has loaded
      document.fonts?.ready.then(() => {
        if (!signal.aborted && this.classList.contains('is-moving')) this.buildMarquee();
      });

      document.addEventListener(
        'shopify:block:select',
        (event) => {
          const part = [...this.querySelectorAll('.announcement-bar__part')].find(
            (element) => element === event.target || element.contains(event.target)
          );
          part?.scrollIntoView({ block: 'nearest', inline: 'center' });
        },
        { signal }
      );

      apply();
    }

    // Size along the text: width in the bar above the header, height in the right-side band (vertical)
    measure(element) {
      const rect = element.getBoundingClientRect();
      return getComputedStyle(element).writingMode.startsWith('vertical') ? rect.height : rect.width;
    }

    buildMarquee() {
      const target = this.measure(this.viewport);
      if (target === 0) return; // the strip is hidden right now (keyboard on the real line)
      this.marqueeSize = target;
      const half = document.createElement('div');
      half.className = 'announcement-bar__half';
      this.track.replaceChildren(half);
      let copies = 0;
      do {
        this.unit.forEach((node) => half.append(node.cloneNode(true)));
        copies += 1;
      } while (this.measure(half) < target && copies < 50);
      this.track.append(half.cloneNode(true));
      const speed = Number(this.dataset.speed) || 50; // pixels per second
      this.style.setProperty('--announcement-duration', (this.measure(half) / speed).toFixed(2) + 's');
    }

    /*
      Static and Slideshow, every screen size: each message line scrolls sideways when the message is too long. Mark
      which side of a line still has text off screen (has-overflow-start / -end on the line) so the
      stylesheet fades only that side, and drops the fade once an end is reached.
      In a slideshow, a swipe restarts the autoplay timer, so the slide doesn't change mid-swipe.
    */
    setUpScroll(signal) {
      const scrollers = [...this.querySelectorAll('.announcement-bar__scroller')];
      if (!scrollers.length) return;
      const update = (scroller) => {
        // The right-side band writes top to bottom (vertical writing mode), so it scrolls vertically
        const vertical = getComputedStyle(scroller).writingMode.startsWith('vertical');
        const max = vertical
          ? scroller.scrollHeight - scroller.clientHeight
          : scroller.scrollWidth - scroller.clientWidth;
        const position = vertical ? scroller.scrollTop : scroller.scrollLeft;
        scroller.classList.toggle('has-overflow-start', position > 1);
        scroller.classList.toggle('has-overflow-end', position < max - 1);
        // A Tab stop only while the text is too long (the keyboard can then scroll it). The marquee's line
        // keeps it while the marquee moves: focusing it shows the still line. Never removed from a line that
        // has focus (focus would jump to the page): it is checked again when focus leaves.
        const needed =
          max > 1 || (scroller.classList.contains('announcement-bar__marquee-line') && this.classList.contains('is-moving'));
        if (needed) scroller.setAttribute('tabindex', '0');
        else if (scroller !== document.activeElement) scroller.removeAttribute('tabindex');
      };
      // Watch each line and its text: when the web font swaps in, the text's width changes, not the line's
      this.resizeObserver = new ResizeObserver((entries) => {
        entries.forEach((entry) => update(entry.target.closest('.announcement-bar__scroller')));
      });
      this.refreshScrollers = () => scrollers.forEach(update);
      scrollers.forEach((scroller) => {
        let ticking = false;
        scroller.addEventListener(
          'scroll',
          () => {
            if (this.dataset.mode === 'slideshow') this.restart();
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(() => {
              ticking = false;
              update(scroller);
            });
          },
          { passive: true, signal }
        );
        scroller.addEventListener('blur', () => update(scroller), { signal });
        this.resizeObserver.observe(scroller);
        if (scroller.firstElementChild) this.resizeObserver.observe(scroller.firstElementChild);
        update(scroller);
      });
    }

    /*
      Right-side band: slides out once the page has scrolled down, and comes back only at the top of the page
      (not in the middle when scrolling up), or while it has keyboard focus. Checked once at the start too
      (a reload halfway down the page), and again when focus leaves it (Tab out).
    */
    setUpTuck(signal) {
      const large = window.matchMedia('(min-width: 990px)');
      let ticking = false;
      const update = () => {
        ticking = false;
        const atTop = window.scrollY < 80;
        const show = !large.matches || atTop || this.contains(document.activeElement);
        this.classList.toggle('is-tucked', !show);
      };
      update();
      // The browser may restore the scroll position of a reloaded page a little later: check again then
      window.addEventListener('load', update, { signal });
      window.addEventListener('pageshow', update, { signal });
      this.addEventListener(
        'focusout',
        (event) => {
          if (!this.contains(event.relatedTarget)) requestAnimationFrame(update);
        },
        { signal }
      );
      window.addEventListener(
        'scroll',
        () => {
          if (!ticking) {
            ticking = true;
            requestAnimationFrame(update);
          }
        },
        { passive: true, signal }
      );
      this.addEventListener('focusin', () => this.classList.remove('is-tucked'), { signal });
    }

    close() {
      // Stop everything (slideshow timer, marquee and scroll observers, listeners): a closed bar runs nothing
      this.teardown();

      // Remember it first, so a closed bar stays closed even if the animation is cut short
      if (!this.designMode) {
        try {
          // sessionStorage: remembered while the visitor browses in this tab; a new tab shows the bar again
          sessionStorage.setItem(this.dataset.closeKey, '1');
          // Forget notes for older messages, so they don't pile up
          Object.keys(sessionStorage)
            .filter((key) => key.startsWith('announcement-closed') && key !== this.dataset.closeKey)
            .forEach((key) => sessionStorage.removeItem(key));
        } catch (error) {
          // Storage blocked: the bar comes back on the next page
        }
      }

      // Theme editor or reduced motion: just hide it, no animation
      if (this.designMode || !this.motion) {
        this.hidden = true;
        return;
      }

      const finish = (event) => {
        if (event && event.target !== this) return;
        this.hidden = true;
        this.removeEventListener('transitionend', finish);
        clearTimeout(this.closeFallback);
      };

      this.classList.add('is-closing');
      // A bar above the header (Top, or Right side below 990px): collapse its height so the page (and the hero)
      // closes the gap smoothly. The right-side band keeps its height and only fades (collapsing a
      // full-height fixed band would look wrong).
      const band =
        this.classList.contains('announcement-bar--right') && window.matchMedia('(min-width: 990px)').matches;
      if (!band) {
        this.style.blockSize = `${this.offsetHeight}px`;
        void this.offsetHeight; // commit that height before animating to 0
        this.style.blockSize = '0';
      }
      this.style.opacity = '0';

      this.addEventListener('transitionend', finish);
      this.closeFallback = setTimeout(finish, 600); // safety if transitionend never fires
    }

    setUpSlideshow(signal) {
      this.messages = [...this.querySelectorAll('.announcement-bar__message')];
      this.current = 0;
      this.region = this.querySelector('.announcement-bar__messages');

      this.querySelectorAll('[data-step]').forEach((button) => {
        button.addEventListener(
          'click',
          () => {
            this.region.setAttribute('aria-live', 'polite');
            this.show(this.current + Number(button.dataset.step));
            this.restart();
          },
          { signal }
        );
      });

      // Theme editor: selecting a message's block shows it and pauses autoplay; deselecting resumes it.
      // A separate flag (not userPaused) so it never touches the pause button's own state.
      const findMessage = (event) =>
        this.messages.findIndex((message) => message.contains(event.target) || message === event.target);
      document.addEventListener(
        'shopify:block:select',
        (event) => {
          const index = findMessage(event);
          if (index === -1) return;
          this.editorPaused = true;
          clearInterval(this.timer);
          this.show(index);
        },
        { signal }
      );
      document.addEventListener(
        'shopify:block:deselect',
        (event) => {
          if (findMessage(event) === -1) return;
          this.editorPaused = false;
          this.restart();
        },
        { signal }
      );

      if (this.dataset.autoplay !== 'true' || this.messages.length < 2) {
        this.region.setAttribute('aria-live', 'polite');
        return;
      }

      // Hover and focus each pause on their own, so leaving one doesn't resume while the other still holds.
      // Focus pauses only on a message (to read it or use its link), not on the arrows or the pause button:
      // a click there gives the button focus, and that kept the slideshow stopped after pressing play.
      this.hoverPaused = false;
      this.focusPaused = false;
      const onMessage = (element) =>
        Boolean(element && this.contains(element) && element.closest('.announcement-bar__message'));
      // Mouse only: a tap on a phone fires mouseenter but no mouseleave until you tap elsewhere, which kept
      // the slideshow stopped after tapping play or an arrow
      this.addEventListener('pointerenter', (event) => {
        if (event.pointerType !== 'mouse') return;
        this.hoverPaused = true;
        this.restart();
      }, { signal });
      this.addEventListener('pointerleave', (event) => {
        if (event.pointerType !== 'mouse') return;
        this.hoverPaused = false;
        this.restart();
      }, { signal });
      this.addEventListener('focusin', (event) => { this.focusPaused = onMessage(event.target); this.restart(); }, { signal });
      this.addEventListener('focusout', (event) => { this.focusPaused = onMessage(event.relatedTarget); this.restart(); }, { signal });
      this.updateAutoplay();
    }

    /*
      Slideshow autoplay: shows the pause button (WCAG 2.2.2) and starts the timer. It runs with reduced
      motion too (the fade is off then, in CSS). Screen readers hear changes (polite) only while it is paused.
    */
    updateAutoplay() {
      if (!this.region || this.dataset.autoplay !== 'true' || this.messages.length < 2) return;
      if (this.pauseButton) this.pauseButton.hidden = false;
      this.region.setAttribute('aria-live', this.userPaused ? 'polite' : 'off');
      this.restart();
    }

    show(index) {
      const count = this.messages.length;
      this.current = (index + count) % count;
      this.messages.forEach((message, i) => message.classList.toggle('is-active', i === this.current));
      // A slide that was swiped earlier starts again from the beginning of its message
      const active = this.messages[this.current];
      if (active && (active.scrollLeft !== 0 || active.scrollTop !== 0)) active.scrollTo(0, 0);
    }

    restart() {
      clearInterval(this.timer);
      if (this.dataset.mode !== 'slideshow' || this.dataset.autoplay !== 'true') return;
      if (this.userPaused || this.hoverPaused || this.focusPaused || this.editorPaused) return;
      this.timer = setInterval(() => {
        // Auto-advance is silent to screen readers; only a change the visitor makes is announced (polite)
        this.region?.setAttribute('aria-live', 'off');
        this.show(this.current + 1);
      }, Number(this.dataset.interval) || 5000);
    }

    togglePause() {
      this.userPaused = !this.userPaused;
      this.classList.toggle('is-paused', this.userPaused);
      this.pauseButton.querySelector('.visually-hidden').textContent = this.userPaused
        ? this.pauseButton.dataset.labelPlay
        : this.pauseButton.dataset.labelPause;
      this.region?.setAttribute('aria-live', this.userPaused ? 'polite' : 'off');
      this.restart();
    }
  }

  if (!customElements.get('announcement-bar')) customElements.define('announcement-bar', AnnouncementBar);

})();

/* sections/article-comments.liquid */
(() => {

  /**
   * <article-comments>
   * - Focus moves to the message after posting (it only exists right after the visitor's own post).
   * - Dates under 30 days old read "2 days ago" (Intl.RelativeTimeFormat, in the page's language).
   * - "Load more" fetches the next page of this section (Section Rendering API: ?section_id=), adds its
   *   comments to the list, swaps in its own "Load more" link and moves focus to the first new comment.
   *   If the fetch fails, the link just opens the next page.
   */
  class ArticleComments extends HTMLElement {
    connectedCallback() {
      // The theme editor can attach the section again: every listener goes on one signal, so one
      // click on "Load more" loads one page (it loaded it two times after a re-attach)
      this.controller?.abort();
      this.controller = new AbortController();
      const { signal } = this.controller;

      this.list = this.querySelector('[data-comments-list]');
      this.more = this.querySelector('[data-comments-more]');
      this.status = this.querySelector('[data-comments-status]');

      // Only on the first connect: a re-attach must not move the focus or show the message again
      if (!this.started) {
        this.started = true;
        this.confirmSent();
        this.querySelector('[data-focus-after-submit]')?.focus();
        this.relativeDates(this);
      }
      this.more?.addEventListener(
        'click',
        (event) => {
          const link = event.target.closest('[data-load-more]');
          if (!link) return;
          event.preventDefault();
          this.loadMore(link);
        },
        { signal }
      );
    }

    disconnectedCallback() {
      this.controller?.abort();
    }

    /**
     * Back-up for the "sent" message. The form's action ends in #<form id>, so after posting Shopify
     * reloads the article with that #. Liquid shows the message when Shopify reports
     * form.posted_successfully?, but on a moderated blog that can come back false (seen 2026-11-05: the
     * comment arrived in the admin, the page said nothing). So: back at the form's # with no message
     * and no error → show the "sent" text here. The # is then removed, so a refresh doesn't repeat it.
     */
    confirmSent() {
      const form = document.getElementById(this.dataset.formId);
      if (!form || location.hash !== `#${form.id}`) return;
      if (!form.querySelector('.form-message') && this.dataset.sentText) {
        const message = document.createElement('p');
        message.className = 'form-message form-message--success';
        message.tabIndex = -1;
        message.dataset.focusAfterSubmit = '';
        message.textContent = this.dataset.sentText;
        form.prepend(message);
      }
      history.replaceState(null, '', location.pathname + location.search);
    }

    relativeDates(root) {
      if (!('RelativeTimeFormat' in Intl)) return;
      const format = new Intl.RelativeTimeFormat(document.documentElement.lang || undefined, { numeric: 'auto' });
      const now = Date.now() / 1000;
      root.querySelectorAll('[data-timestamp]').forEach((date) => {
        const seconds = now - Number(date.dataset.timestamp);
        const time = date.querySelector('time') || date;
        if (!(seconds >= 0) || seconds > 30 * 86400) return;
        if (seconds < 3600) time.textContent = format.format(-Math.max(1, Math.round(seconds / 60)), 'minute');
        else if (seconds < 86400) time.textContent = format.format(-Math.round(seconds / 3600), 'hour');
        else time.textContent = format.format(-Math.round(seconds / 86400), 'day');
      });
    }

    async loadMore(link) {
      // One page at a time: a double click must not load the same page two times (repeated comments
      // and ids). The flag is on the element, because the link itself is replaced after a load.
      if (this.loading) return;
      this.loading = true;
      link.setAttribute('aria-busy', 'true');
      try {
        const url = new URL(link.href, window.location.href);
        url.hash = '';
        url.searchParams.set('section_id', this.dataset.sectionId);
        const response = await fetch(url);
        if (!response.ok) throw new Error(response.statusText);
        const page = new DOMParser().parseFromString(await response.text(), 'text/html');
        const comments = [...page.querySelectorAll('[data-comments-list] > li')];
        const nextMore = page.querySelector('[data-comments-more]');
        if (!this.list || comments.length === 0) throw new Error('No comments');

        this.relativeDates(page);
        this.list.append(...comments);
        this.more.innerHTML = nextMore ? nextMore.innerHTML : '';
        comments[0].focus({ preventScroll: true });
        comments[0].scrollIntoView({ block: 'nearest', behavior: 'smooth' });
        if (this.status) this.status.textContent = this.dataset.loadedText || '';
      } catch {
        window.location.href = link.href;
      } finally {
        this.loading = false;
        link.removeAttribute('aria-busy');
      }
    }
  }

  if (!customElements.get('article-comments')) customElements.define('article-comments', ArticleComments);

})();

/* sections/article-hero.liquid */
(() => {

  /**
   * <share-button>: a click or tap on "Share article" shows the share icons in its place (is-open)
   * and moves the focus to the first icon; the phone has no hover, so this is how it opens there.
   * Closes on a click outside, on Escape (focus back to the button) or when the keyboard leaves the
   * icons. Copying and sharing are done by the icons (snippets/share-links.liquid).
   */
  class ShareButton extends HTMLElement {
    // Every listener on one AbortController: the theme editor attaches a moved section again. The
    // button has no aria-expanded: it is hidden while the icons show, so it can not close them (no
    // fake toggle); the focus moves to the first icon instead
    connectedCallback() {
      this.controller?.abort();
      this.controller = new AbortController();
      const { signal } = this.controller;
      this.button = this.querySelector('.article-hero__share-button');
      this.panel = this.querySelector('.share-links');
      this.button?.addEventListener('click', () => this.open(), { signal });

      // Close on a tap / click outside, or with Escape (focus goes back to the button)
      this.onDocumentClick = (event) => {
        if (!this.contains(event.target)) this.close();
      };
      this.addEventListener(
        'keydown',
        (event) => {
          if (event.key !== 'Escape' || !this.classList.contains('is-open')) return;
          this.close();
          this.button.focus();
        },
        { signal }
      );
      // Keyboard: leaving the last icon closes it
      this.addEventListener(
        'focusout',
        (event) => {
          if (!this.contains(event.relatedTarget)) this.close();
        },
        { signal }
      );
    }

    disconnectedCallback() {
      this.controller?.abort();
      document.removeEventListener('click', this.onDocumentClick);
    }

    // Shows the icons in place of the button and puts the focus on the first one
    open() {
      this.classList.add('is-open');
      document.addEventListener('click', this.onDocumentClick);
      this.panel?.querySelector('a, button')?.focus({ preventScroll: true });
    }

    close() {
      if (!this.classList.contains('is-open')) return;
      this.classList.remove('is-open');
      document.removeEventListener('click', this.onDocumentClick);
    }
  }

  if (!customElements.get('share-button')) customElements.define('share-button', ShareButton);

})();

/* sections/article.liquid */
(() => {

  /**
   * <article-layout>: two small jobs for the article page.
   * 1. Measures the sidebar into --side-height, so the sticky sidebar can stop with its bottom in view
   *    when it's taller than the screen (see the CSS).
   * 2. "In this article": marks the link of the section being read (aria-current, accent colour):
   *    the last heading that has passed the top third of the screen.
   */
  class ArticleLayout extends HTMLElement {
    connectedCallback() {
      // The theme editor can attach the section again: every listener goes on one signal
      this.controller = new AbortController();
      const { signal } = this.controller;

      this.side = this.querySelector('[data-article-side]');
      if (this.side && 'ResizeObserver' in window) {
        this.resizeObserver = new ResizeObserver(() => {
          this.style.setProperty('--side-height', `${this.side.offsetHeight}px`);
        });
        this.resizeObserver.observe(this.side);
      }

      this.links = [...this.querySelectorAll('[data-contents-link]')];
      const ids = [...new Set(this.links.map((link) => link.hash.slice(1)))];
      this.headings = ids.map((id) => document.getElementById(id)).filter(Boolean);
      if (!this.headings.length) return;

      // One check per frame at most, however fast the scroll events come
      this.onScroll = () => {
        if (this.frame) return;
        this.frame = requestAnimationFrame(() => {
          this.frame = null;
          this.markCurrent();
        });
      };
      window.addEventListener('scroll', this.onScroll, { passive: true, signal });
      this.markCurrent();
    }

    disconnectedCallback() {
      this.controller?.abort();
      this.resizeObserver?.disconnect();
      if (this.frame) cancelAnimationFrame(this.frame);
      this.frame = null;
    }

    markCurrent() {
      const line = window.innerHeight / 3;
      let current = null;
      for (const heading of this.headings) {
        if (heading.getBoundingClientRect().top > line) break;
        current = heading;
      }
      for (const link of this.links) {
        if (current && link.hash === `#${current.id}`) {
          link.setAttribute('aria-current', 'location');
        } else {
          link.removeAttribute('aria-current');
        }
      }
    }
  }

  if (!customElements.get('article-layout')) customElements.define('article-layout', ArticleLayout);

})();

/* sections/blog-stories.liquid */
(() => {

  /**
   * Theme editor only: while a Story block is selected, keep its card zoomed in with a dot on the zoom
   * point (class is-zoom-preview), so Zoom amount / Zoom towards can be judged without hovering.
   * The editor sends shopify:block:select / shopify:block:deselect to the block's element (the card,
   * which carries block.shopify_attributes), including after a setting change re-renders the section.
   * The listeners sit on document and are added one time (the flag), so a re-rendered or moved section
   * adds nothing: no AbortController is needed.
   */
  if (window.Shopify?.designMode && !window.oroskinStoryPreview) {
    window.oroskinStoryPreview = true;
    const toggle = (event, on) => {
      const card = event.target.closest?.('.blog-stories__card');
      if (card) card.classList.toggle('is-zoom-preview', on);
    };
    document.addEventListener('shopify:block:select', (event) => toggle(event, true));
    document.addEventListener('shopify:block:deselect', (event) => toggle(event, false));
  }

})();

/* sections/blog-trending.liquid */
(() => {

  /**
   * <blog-video>: plays the Trending articles video in place. The player waits in a <template> (so the
   * page loads no video and no YouTube / Vimeo frame); a click on the play button puts it in the card,
   * starts it and moves the focus to it. The listener is on one AbortController: the theme editor
   * attaches a moved section again (connectedCallback runs again), and two listeners added two players.
   */
  class BlogVideo extends HTMLElement {
    connectedCallback() {
      this.controller?.abort();
      this.controller = new AbortController();
      this.querySelector('.blog-video__play')?.addEventListener('click', () => this.play(), {
        signal: this.controller.signal,
      });
    }

    disconnectedCallback() {
      this.controller?.abort();
    }

    play() {
      if (this.classList.contains('is-playing')) return;
      const template = this.querySelector('.blog-video__template');
      const player = template?.content.firstElementChild?.cloneNode(true);
      if (!player) return;

      this.append(player);
      this.classList.add('is-playing');
      if (player instanceof HTMLVideoElement) player.play().catch(() => {});
      player.focus();
    }
  }

  if (!customElements.get('blog-video')) {
    customElements.define('blog-video', BlogVideo);
  }

})();

/* sections/blog.liquid */
(() => {

  /**
   * <blog-toolbar>: adds "is-stuck" while the sticky toolbar is pinned under the header (the CSS then
   * covers the gap above it). Pinned = the bar sits exactly at its sticky position (its CSS top),
   * checked on scroll and resize, at most once per frame. Also passes that position to the CSS as
   * --toolbar-top, so the cover reaches the top of the screen. Listeners on one AbortController (the
   * theme editor attaches a moved section again).
   */
  class BlogToolbar extends HTMLElement {
    connectedCallback() {
      this.controller?.abort();
      if (!this.classList.contains('blog-list__toolbar--sticky')) return;
      this.controller = new AbortController();
      const { signal } = this.controller;
      const onScroll = () => {
        if (this.frame) return;
        this.frame = requestAnimationFrame(() => {
          this.frame = null;
          this.update();
        });
      };
      window.addEventListener('scroll', onScroll, { passive: true, signal });
      window.addEventListener('resize', onScroll, { signal });
      this.update();
    }

    disconnectedCallback() {
      this.controller?.abort();
      cancelAnimationFrame(this.frame);
      this.frame = null;
    }

    update() {
      const top = parseFloat(getComputedStyle(this).top) || 0;
      const pinned = window.scrollY > 0 && Math.abs(this.getBoundingClientRect().top - top) < 1;
      this.style.setProperty('--toolbar-top', `${top}px`);
      this.classList.toggle('is-stuck', pinned);
    }
  }

  if (!customElements.get('blog-toolbar')) customElements.define('blog-toolbar', BlogToolbar);

})();

/* sections/cart.liquid */
(() => {

  /**
   * <cart-page>: changes the cart without reloading the page.
   *
   * Every change (- / +, a typed quantity, remove, remove selected) goes to Shopify's Cart AJAX API
   * together with `sections`: Shopify answers with the updated cart AND this section rendered again in
   * Liquid. The script swaps in the new HTML, so prices, totals and counts always come from Shopify,
   * never from JavaScript maths. What the visitor was doing stays: focus, ticked boxes, typed coupon
   * text, an open note or gift form, and the photos already loaded (no flash).
   * The header's count bubble follows the "cart:updated" event (<cart-count> in the header).
   *
   * Without JavaScript the page still works: the form posts to /cart (Update / Checkout) and the remove
   * buttons are plain links.
   */
  class CartPage extends HTMLElement {
    connectedCallback() {
      // All listeners on one controller: the theme editor can attach the same element again (a moved
      // section); without this, one + click would then add 2
      this.controller = new AbortController();
      const { signal } = this.controller;

      this.root = window.Shopify?.routes?.root || '/';
      // Last quantity sent for each line key (see queueQuantity)
      this.sent ??= new Map();
      // Shopify's HTML for each part of the cart as the page loaded: updates replace only what differs
      const inner = this.querySelector('.cart-page__inner');
      if (inner && !this.server) this.server = this.partsHtml(inner);
      this.status = this.querySelector('[data-cart-status]');

      // The cart was changed elsewhere on this page (quick add in "You might love"): show the new cart.
      // The cart's own changes say source: 'cart-page' and are already on screen.
      document.addEventListener(
        'cart:updated',
        (event) => {
          if (event.detail?.source !== 'cart-page') this.refresh();
        },
        { signal }
      );

      // Listeners on the element itself: they keep working after the inner HTML is swapped
      this.addEventListener('click', (event) => this.onClick(event), { signal });
      this.addEventListener('change', (event) => this.onChange(event), { signal });
      this.addEventListener('submit', (event) => this.onSubmit(event), { signal });
      this.addEventListener('keydown', (event) => this.onKeydown(event), { signal });
      // The quantity field is as wide as its number (--digits, first set by Liquid)
      this.addEventListener(
        'input',
        (event) => {
          if (!event.target.matches('[data-cart-quantity]')) return;
          this.setDigits(event.target);
        },
        { signal }
      );

      // Theme editor: a selected "Wrap style" block is inside the gift form, so the form opens while
      // the block is selected
      if (window.Shopify?.designMode) {
        document.addEventListener('shopify:block:select', (event) => this.onBlockSelect(event, true), { signal });
        document.addEventListener('shopify:block:deselect', (event) => this.onBlockSelect(event, false), { signal });
      }

      if (this.codes === undefined && this.querySelector('[data-cart-coupon]')) this.loadCodes();
    }

    disconnectedCallback() {
      this.controller?.abort();
    }

    onSubmit(event) {
      // Gift wrap form: "Save wrap" (saved by the script; the form has no action of its own)
      if (event.target.matches('[data-cart-gift-form]')) {
        event.preventDefault();
        this.saveGift(event.target);
        return;
      }
      // Coupon form: apply here; the form's own target (/checkout?discount=...) is the no-JS fallback
      if (!event.target.matches('[data-cart-coupon]')) return;
      event.preventDefault();
      const code = event.target.querySelector('[name="discount"]').value.trim();
      if (code) this.applyCoupon(code);
    }

    onKeydown(event) {
      // Enter in a quantity field saves it here instead of submitting the whole form; focus stays in
      // the field (render() puts it back on the new copy)
      if (event.key === 'Enter' && event.target.matches('[data-cart-quantity]')) {
        event.preventDefault();
        this.queueQuantity(event.target, 0);
      }
      // Esc inside the gift form = Cancel
      if (event.key === 'Escape' && event.target.closest('[data-cart-gift-panel]')) this.toggleGift(false);
    }

    onBlockSelect(event, selected) {
      if (event.detail?.sectionId !== this.dataset.sectionId) return;
      if (!event.target.closest?.('[data-cart-gift-panel]')) return;
      this.toggleGift(selected, { focus: false });
    }

    onClick(event) {
      const step = event.target.closest('[data-cart-step]');
      if (step) {
        const input = step.closest('.cart-item').querySelector('[data-cart-quantity]');
        // The minus stops at 1: removing a product is the bin's job (the minus is disabled at 1)
        input.value = Math.max(1, (Number(input.value) || Number(input.defaultValue)) + Number(step.dataset.cartStep));
        this.setDigits(input); // 9 -> 10
        this.queueQuantity(input);
        return;
      }

      const remove = event.target.closest('[data-cart-remove]');
      if (remove) {
        event.preventDefault(); // the link is the no-JavaScript fallback
        const line = remove.closest('.cart-item');
        // A gift wrap line: the same as "Remove" in the gift card (the message goes too)
        if (line.hasAttribute('data-cart-wrap')) this.removeGift({ focus: null });
        else this.change({ [line.dataset.lineKey]: 0 }, line);
        return;
      }

      if (event.target.closest('[data-cart-remove-selected]')) {
        const updates = {};
        this.querySelectorAll('[data-cart-select]:checked').forEach((box) => (updates[box.value] = 0));
        // All wrap lines go: the gift message goes with them
        const wrapsLeft = this.wrapLines().some((line) => !(line.key in updates));
        const extra = this.wrapLines().length && !wrapsLeft ? { attributes: { 'Gift message': '' } } : {};
        this.change(updates, null, extra);
        return;
      }

      const removeCode = event.target.closest('[data-cart-coupon-remove]');
      if (removeCode) {
        this.removeCoupon(removeCode.dataset.cartCouponRemove);
        return;
      }

      // Gift wrap: switch the card to its form and back, or take the wrap off
      if (event.target.closest('[data-cart-gift-open]')) {
        this.toggleGift(true);
        return;
      }
      if (event.target.closest('[data-cart-gift-close]')) {
        this.toggleGift(false);
        return;
      }
      if (event.target.closest('[data-cart-gift-remove]')) this.removeGift();
    }

    /**
     * Figma: the gift card itself turns into the form (no popup). Open: hide the summary, show the
     * form, put focus on the first style. Close (Cancel or Esc): back, with focus on the button that
     * opened it, so a keyboard user isn't lost. focus: false = the theme editor opens or closes it.
     */
    toggleGift(open, { focus = true } = {}) {
      const card = this.querySelector('[data-cart-gift]');
      const panel = card?.querySelector('[data-cart-gift-panel]');
      if (!panel) return;
      card.classList.toggle('is-open', open);
      card.querySelector('[data-cart-gift-summary]').hidden = open;
      panel.hidden = !open;
      if (!focus) return;
      if (open) {
        panel.querySelector('[data-cart-gift-error]').hidden = true;
        (panel.querySelector('[name="wrap"]:checked') || panel.querySelector('[name="wrap"]'))?.focus();
      } else {
        card.querySelector('[data-cart-gift-open]')?.focus();
      }
    }

    /**
     * The wrap lines in the cart now: the item list marks them (data-cart-wrap, with the variant id).
     * Read from the list, not from the gift card, so the bin works also when the card is turned off.
     */
    wrapLines() {
      return [...this.querySelectorAll('.cart-item[data-cart-wrap]')].map((line) => ({
        key: line.dataset.lineKey,
        variant: line.dataset.variantId,
      }));
    }

    /**
     * Save wrap: add the chosen wrap product (unless it's already in the cart), take any other wrap
     * out, keep exactly one, and save the message as the "Gift message" cart attribute, then re-render.
     * Two requests: /cart/add.js only adds; the quantities and the attribute go in one update.
     */
    async saveGift(form) {
      const variant = form.querySelector('[name="wrap"]:checked')?.value;
      const message = form.querySelector('[name="message"]').value.trim();
      const errorBox = form.querySelector('[data-cart-gift-error]');
      if (!variant) return; // the radios are "required", so the browser asks for a choice first

      const lines = this.wrapLines();
      try {
        if (!lines.some((line) => line.variant === variant)) {
          const response = await fetch(`${this.root}cart/add.js`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
            body: JSON.stringify({ items: [{ id: Number(variant), quantity: 1 }] }),
          });
          const data = await response.json();
          if (!response.ok) throw new Error(data.description || data.message || '');
        }
      } catch (error) {
        errorBox.textContent = error?.message || this.dataset.labelError;
        errorBox.hidden = false;
        this.announce(errorBox.textContent);
        return;
      }

      // Other wraps out; the chosen one (if it was already there) back to 1. The re-render brings the
      // card back in its summary state (keepGift: false), now showing the wrap and the message.
      const updates = {};
      lines.forEach((line) => (updates[line.key] = line.variant === variant ? 1 : 0));
      await this.change(updates, null, { attributes: { 'Gift message': message } }, { keepGift: false, focus: 'gift-open' });
    }

    /**
     * All wrap lines out and the message cleared. focus: the gift card's button after "Remove" in the
     * card; null from the bin in the item list (focus then goes to the heading, as for any removed line).
     */
    removeGift({ focus = 'gift-open' } = {}) {
      const updates = {};
      this.wrapLines().forEach((line) => (updates[line.key] = 0));
      this.change(updates, null, { attributes: { 'Gift message': '' } }, { keepGift: false, focus });
    }

    /**
     * The codes that work right now. Shopify's cart JSON lists every entered code with
     * "applicable": true / false; that's the truth. Liquid only sees codes that already change a price
     * (cart.discount_applications), so a free-shipping code, which only acts at checkout, would look
     * "not working" if we went by the page alone. Until the JSON has loaded, the page's list is used.
     */
    appliedCodes() {
      return this.codes ?? [...this.querySelectorAll('[data-coupon-code]')].map((el) => el.dataset.couponCode);
    }

    /** Reads the codes from a cart JSON (on load, and after every change) and shows any Liquid missed */
    setCodes(cart) {
      this.codes = (cart.discount_codes || []).filter((entry) => entry.applicable).map((entry) => entry.code);
      const list = this.querySelector('[data-cart-coupon-codes]');
      const template = this.querySelector('[data-cart-coupon-template]');
      if (!list || !template) return;
      const shown = [...list.querySelectorAll('[data-coupon-code]')].map((el) => el.dataset.couponCode.toLowerCase());
      for (const code of this.codes) {
        if (shown.includes(code.toLowerCase())) continue;
        const chip = template.content.firstElementChild.cloneNode(true);
        chip.dataset.couponCode = code;
        chip.querySelector('.cart-coupon__name').textContent = code;
        const remove = chip.querySelector('[data-cart-coupon-remove]');
        remove.dataset.cartCouponRemove = code;
        remove.setAttribute('aria-label', this.dataset.labelCouponRemove.replace('[code]', code));
        list.append(chip);
      }
    }

    /** On page load: ask Shopify which codes are in the cart (only when the coupon card is shown) */
    async loadCodes() {
      try {
        const cart = await fetch(`${this.root}cart.js`, { headers: { Accept: 'application/json' } }).then((r) => r.json());
        this.setCodes(cart);
      } catch (error) {
        // The page's own list stays; applying still works
      }
    }

    /**
     * Shopify's "discount" field replaces ALL codes, so a new code is sent together with the ones
     * already working. Shopify's answer says whether it applies (wrong, expired, scheduled, or the
     * cart doesn't qualify yet = not applicable), and the message says which.
     */
    async applyCoupon(code) {
      const same = (a) => a.toLowerCase() === code.toLowerCase();
      if (this.appliedCodes().some(same)) {
        this.couponMessage(this.dataset.labelCouponExists, code, 'error');
        return;
      }

      // keepCoupon: false = the field comes back empty; a code that doesn't apply is put back below
      const cart = await this.change({}, null, { discount: [...this.appliedCodes(), code].join(',') }, { keepCoupon: false });
      if (!cart) return;

      const applied = Boolean((cart.discount_codes || []).find((entry) => same(entry.code))?.applicable);
      this.couponMessage(applied ? this.dataset.labelCouponApplied : this.dataset.labelCouponInvalid, code, applied ? 'success' : 'error');
      if (!applied) {
        // Keep what they typed, so a typo can be fixed instead of retyped
        const input = this.querySelector('[data-cart-coupon] [name="discount"]');
        if (input) input.value = code;
      }
    }

    removeCoupon(code) {
      const rest = this.appliedCodes().filter((c) => c.toLowerCase() !== code.toLowerCase());
      this.change({}, null, { discount: rest.join(',') });
    }

    /** Shows the coupon result under the field and reads it out (status line) */
    couponMessage(template, code, tone) {
      const box = this.querySelector('[data-cart-coupon-message]');
      const message = template.replace('[code]', code);
      if (box) {
        box.textContent = message;
        box.dataset.tone = tone;
        box.hidden = false;
      }
      this.announce(message);
    }

    onChange(event) {
      if (event.target.matches('[data-cart-quantity]')) this.queueQuantity(event.target, 0);
      if (event.target.matches('[data-cart-select]')) this.updateToolbar();
      if (event.target.matches('[data-cart-note]')) this.saveNote(event.target.value);
    }

    /**
     * Saves the cart note as soon as the visitor leaves the box ("change" fires then), so it isn't
     * lost if they go back to shopping. No re-render: nothing else on the page depends on the note.
     */
    async saveNote(note) {
      try {
        await fetch(`${this.root}cart/update.js`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ note }),
        });
      } catch (error) {
        // Still sent with the form when they check out
      }
    }

    /**
     * Waits a moment, so clicking + three times sends one request with the final number. An empty
     * field (the visitor cleared it, then left) or the same number = no change: the number comes back.
     * 0 still removes the line.
     * "The same number" = the last number SENT for this line (this.sent), not the field's defaultValue:
     * while a request is on its way, defaultValue is still the old cart. Example: 1, + sends 2, then -
     * before the answer: 1 is not "no change", it must be sent, or the answer for 2 would stay.
     */
    queueQuantity(input, delay = 400) {
      const line = input.closest('.cart-item');
      const key = line.dataset.lineKey;
      clearTimeout(line.saveTimer);
      line.saveTimer = setTimeout(() => {
        const expected = this.sent.get(key) ?? input.defaultValue;
        const value = input.value.trim();
        if (value === '' || Number.isNaN(Number(value))) {
          input.value = expected;
          this.setDigits(input);
          return;
        }
        const quantity = Math.max(0, Math.floor(Number(value)));
        if (String(quantity) === expected) {
          input.value = expected;
          this.setDigits(input);
          return;
        }
        this.sent.set(key, String(quantity));
        this.change({ [key]: quantity }, line);
      }, delay);
    }

    /** The field is as wide as its number: --digits on the pill (first written by Liquid) */
    setDigits(input) {
      input.closest('.cart-item__quantity')?.style.setProperty('--digits', Math.max(1, input.value.length));
    }

    /** "2 selected  Remove selected" appears only while something is ticked */
    updateToolbar() {
      const toolbar = this.querySelector('[data-cart-toolbar]');
      const count = this.querySelectorAll('[data-cart-select]:checked').length;
      if (!toolbar) return;
      toolbar.hidden = count === 0;
      // "[count] selected" from the locale file, with the number filled in
      toolbar.querySelector('[data-cart-selected-count]').textContent = this.dataset.labelSelected.replace('[count]', count);
    }

    /**
     * updates = { lineKey: quantity, ... }. /cart/update.js accepts several lines at once and finds each
     * line by its key, so it works the same for one line or for "Remove selected".
     * extra = other cart fields to send in the same request (e.g. { discount: 'A,B' }).
     * options = what render() keeps (see there) and the control to focus after it.
     * Returns Shopify's cart JSON once the new cart is on the page, false if it failed or a newer
     * change won.
     */
    async change(updates, line, extra = {}, options = {}) {
      const lines = line ? [line] : Object.keys(updates).map((key) => this.querySelector(`[data-line-key="${CSS.escape(key)}"]`));
      lines.forEach((el) => el?.classList.add('is-loading'));
      this.setAttribute('aria-busy', 'true');

      const sections = this.sectionsToRender();

      // Number every request. Two quick changes (e.g. on two lines) can come back in the wrong order;
      // only the newest answer is shown, so an older cart never replaces a newer one.
      const requestId = (this.latestRequest = (this.latestRequest || 0) + 1);

      try {
        const response = await fetch(`${this.root}cart/update.js`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          // sections_url: the page Shopify renders the sections for (the cart, with the language prefix)
          body: JSON.stringify({ updates, ...extra, sections, sections_url: this.dataset.cartUrl }),
        });
        const data = await response.json();
        // Shopify explains a refused change (e.g. not enough stock) in "description" or "message"
        if (!response.ok) throw new Error(data.description || data.message || '');
        if (requestId !== this.latestRequest) return false; // a newer change is on its way; it will render

        this.sent.clear(); // the new HTML has the real numbers, and no newer request is on its way
        this.render(data.sections, options);
        this.setCodes(data); // the fresh card only lists what Liquid sees; add e.g. free-shipping codes
        this.announce(this.dataset.labelUpdated);
        document.dispatchEvent(new CustomEvent('cart:updated', { detail: { cart: data, source: 'cart-page' } }));
        return data;
      } catch (error) {
        if (requestId !== this.latestRequest) return false;
        // The refused number must not stay on screen: back to the saved quantity
        lines.forEach((el) => {
          if (!el) return;
          el.classList.remove('is-loading');
          const input = el.querySelector('[data-cart-quantity]');
          if (!input) return;
          input.value = input.defaultValue;
          this.setDigits(input);
          this.sent.delete(el.dataset.lineKey); // the cart still has the old number
        });
        const message = error?.message || this.dataset.labelError;
        const box = this.querySelector('[data-cart-error]');
        if (box) {
          box.textContent = message;
          box.hidden = false;
        }
        this.announce(message);
        return false;
      } finally {
        if (requestId === this.latestRequest) this.removeAttribute('aria-busy');
      }
    }

    /**
     * The sections Shopify should render again with each change (it accepts up to 5): this cart and
     * every section that depends on the cart, marked data-cart-refresh (e.g. the Product list set to
     * "Only when the cart is empty"). The header is not needed: its <cart-count> reads "cart:updated".
     */
    sectionsToRender() {
      const dependents = [...document.querySelectorAll('[data-cart-refresh]')]
        .map((el) => el.closest('.shopify-section')?.id.replace('shopify-section-', ''))
        .filter(Boolean);
      return [...new Set([this.dataset.sectionId, ...dependents])].filter(Boolean).slice(0, 5);
    }

    /**
     * Something else changed the cart (a quick add button in "You might love"): ask Shopify for the
     * same sections again (Section Rendering API: ?sections=a,b) and swap them in.
     */
    async refresh() {
      try {
        const url = `${this.dataset.cartUrl}?sections=${this.sectionsToRender().join(',')}`;
        const html = await fetch(url).then((response) => response.json());
        if (!this.hasAttribute('aria-busy')) this.sent.clear(); // only when no change of ours is on its way
        this.render(html);
      } catch {
        // The cart itself is fine; the page just shows it after the next reload
      }
    }

    /**
     * Shows Shopify's freshly rendered cart WITHOUT rebuilding the page: only the parts that changed
     * are replaced (patch()), so the photos, the gift ribbon, Shopify's express checkout buttons, the
     * note and the coupon field stay as they are (rebuilding all of it looked like a page reload).
     * When the layout itself changes (the bag becomes empty, a card appears or goes), the whole cart is
     * swapped, keeping what the visitor was doing (carryOver()).
     * Focus goes back to the same control, or options.focus, else the heading.
     */
    render(html, { keepCoupon = true, keepGift = true, focus } = {}) {
      const focusKey = focus || document.activeElement?.closest('[data-cart-focus]')?.dataset.cartFocus;
      const parse = (id) => html?.[id] && new DOMParser().parseFromString(html[id], 'text/html');

      const fresh = parse(this.dataset.sectionId)?.querySelector('.cart-page__inner');
      const old = this.querySelector('.cart-page__inner');
      if (fresh && old) {
        // Shopify's HTML for each part, read before anything is moved into it: what the next update
        // compares with
        const freshHtml = this.partsHtml(fresh);
        if (!this.patch(old, fresh, freshHtml, { keepCoupon, keepGift })) {
          this.carryOver(old, fresh, { keepCoupon, keepGift });
          old.replaceWith(fresh);
          if (keepGift && old.querySelector('[data-cart-gift].is-open')) this.toggleGift(true, { focus: false });
        }
        this.server = freshHtml;
        this.updateToolbar();
      }

      // Sections that depend on the cart: replace their whole content (they may appear or disappear)
      document.querySelectorAll('[data-cart-refresh]').forEach((el) => {
        const section = el.closest('.shopify-section');
        const next = section && parse(section.id.replace('shopify-section-', ''))?.getElementById(section.id);
        if (next) section.innerHTML = next.innerHTML;
      });

      // Same control again if it still exists and shows (e.g. the + button); otherwise the heading (line
      // removed, or "Remove selected" now hidden). preventScroll: Safari doesn't focus buttons on click,
      // so focus is often "nowhere" here; without it, every + click there would jump the page up.
      const target = focusKey && this.querySelector(`[data-cart-focus="${CSS.escape(focusKey)}"]`);
      const visible = target && (target.checkVisibility ? target.checkVisibility() : target.offsetParent !== null);
      if (visible && target === document.activeElement) return; // still there: nothing to move
      (visible ? target : this.querySelector('[data-cart-heading]'))?.focus({ preventScroll: true });
    }

    /**
     * The parts of the cart that an update can change, by name: the heading (count), the free-shipping
     * block, the coupon codes, the gift card, the summary rows, the bottom bar's total, and every line
     * ("item:<key>"). Everything else (forms, buttons, the note, express checkout) never changes.
     */
    parts(root) {
      const map = new Map();
      const add = (key, selector) => {
        const el = root.querySelector(selector);
        if (el) map.set(key, el);
      };
      add('header', '.cart-page__header');
      add('shipping', '.cart-shipping');
      add('codes', '[data-cart-coupon-codes]');
      add('gift', '[data-cart-gift]');
      add('rows', '.cart-summary__rows');
      add('bar', '.cart-bar__total');
      root.querySelectorAll('.cart-item[data-line-key]').forEach((el) => map.set(`item:${el.dataset.lineKey}`, el));
      return map;
    }

    /**
     * Each part's HTML for the comparison, without what differs between the first page and a section
     * render for the same cart: the domain in URLs ("//shop.example/cdn/..." vs "/cdn/...") and the
     * photos' loading / fetchpriority (eager near the top of the page, lazy in a section render).
     */
    partsHtml(root) {
      const clean = (html) =>
        html
          .replace(/(?:https?:)?\/\/[^/"'\s]+(?=\/)/g, '')
          .replace(/\s(?:loading|fetchpriority)="[^"]*"/g, '');
      return new Map([...this.parts(root)].map(([key, el]) => [key, clean(el.outerHTML)]));
    }

    /**
     * Replaces only the parts whose HTML from Shopify changed since the last update (this.server; the
     * page's first HTML at the start). Returns false when the layout changed, so render() swaps it all.
     */
    patch(old, fresh, freshHtml, { keepCoupon, keepGift }) {
      if (!this.server) return false;
      const live = this.parts(old);
      const next = this.parts(fresh);
      const fixed = (map) => [...map.keys()].filter((key) => !key.startsWith('item:')).sort().join();
      const hasLayout = (root) => Boolean(root.querySelector('.cart-page__layout'));
      if (!hasLayout(old) || !hasLayout(fresh) || fixed(live) !== fixed(next)) return false;

      const changed = (key) => this.server.get(key) !== freshHtml.get(key);

      for (const [key, el] of next) {
        if (key.startsWith('item:') || !changed(key)) continue;
        const current = live.get(key);
        if (key === 'shipping') {
          this.patchShipping(current, el);
        } else if (key === 'gift') {
          const open = keepGift && current.classList.contains('is-open');
          if (open) this.carryGift(current, el);
          current.replaceWith(el);
          if (open) this.toggleGift(true, { focus: false });
        } else {
          current.replaceWith(el);
        }
      }

      // Lines: an unchanged line stays (the same element), a changed one is replaced (keeping its photo
      // and tick), a removed one goes, a new one comes in. The order is Shopify's.
      const order = [];
      for (const [key, el] of next) {
        if (!key.startsWith('item:')) continue;
        const current = live.get(key);
        if (current && !changed(key)) {
          current.classList.remove('is-loading');
          order.push(current);
        } else {
          if (current) this.carryItem(current, el);
          order.push(el);
        }
      }
      const list = old.querySelector('.cart-page__items');
      const liveItems = [...list.querySelectorAll(':scope > .cart-item')];
      const sameOrder = liveItems.length === order.length && order.every((el, index) => !liveItems.includes(el) || liveItems[index] === el);
      if (sameOrder) {
        order.forEach((el, index) => {
          if (liveItems[index] !== el) liveItems[index].replaceWith(el);
        });
      } else {
        list.replaceChildren(...order);
      }

      // The change worked: an old error goes; a new coupon code was applied = the field is emptied
      const error = old.querySelector('[data-cart-error]');
      if (error) error.hidden = true;
      if (!keepCoupon) {
        const input = old.querySelector('[data-cart-coupon] [name="discount"]');
        if (input) input.value = '';
      }
      return true;
    }

    /** Free shipping: new text and class; the bar grows (CSS transition) from its width to the new one */
    patchShipping(current, fresh) {
      current.className = fresh.className;
      current.querySelector('.cart-shipping__message')?.replaceWith(fresh.querySelector('.cart-shipping__message'));
      current.querySelector('.cart-shipping__amounts')?.replaceWith(fresh.querySelector('.cart-shipping__amounts'));
      const progress = fresh.querySelector('.cart-shipping__fill')?.style.getPropertyValue('--progress');
      if (progress) current.querySelector('.cart-shipping__fill')?.style.setProperty('--progress', progress);
    }

    /** A changed line keeps its loaded photo (same file = the old element moves in) and its tick */
    carryItem(before, item) {
      const oldMedia = before.querySelector('.cart-item__media');
      const newMedia = item.querySelector('.cart-item__media');
      // The file name only: the full page writes the URL with the shop's domain, a section render without
      const src = (media) => media?.querySelector('img')?.getAttribute('src')?.split('?')[0].split('/').pop();
      if (oldMedia && newMedia && src(oldMedia) && src(oldMedia) === src(newMedia)) newMedia.replaceWith(oldMedia);
      const box = item.querySelector('[data-cart-select]');
      if (box && before.querySelector('[data-cart-select]')?.checked) box.checked = true;
    }

    /** An open gift form keeps the typed message and the chosen style */
    carryGift(before, card) {
      const message = before.querySelector('[data-cart-gift-form] [name="message"]');
      const target = card.querySelector('[data-cart-gift-form] [name="message"]');
      if (message && target && message.value !== message.defaultValue) target.value = message.value;
      const wrap = before.querySelector('[data-cart-gift-form] [name="wrap"]:checked')?.value;
      const radio = wrap && card.querySelector(`[data-cart-gift-form] [name="wrap"][value="${CSS.escape(wrap)}"]`);
      if (radio) radio.checked = true;
    }

    /** Full swap (the layout changed): moves the visitor's state from the old cart HTML into the new one */
    carryOver(old, fresh, { keepCoupon, keepGift }) {
      fresh.querySelectorAll('.cart-item').forEach((item) => {
        const before = old.querySelector(`.cart-item[data-line-key="${CSS.escape(item.dataset.lineKey)}"]`);
        if (before) this.carryItem(before, item);
      });

      const oldFill = old.querySelector('.cart-shipping__fill');
      const newFill = fresh.querySelector('.cart-shipping__fill');
      if (oldFill && newFill) newFill.style.setProperty('--from', oldFill.style.getPropertyValue('--progress'));

      const copyValue = (selector) => {
        const from = old.querySelector(selector);
        const to = fresh.querySelector(selector);
        if (from && to && from.value !== from.defaultValue) to.value = from.value;
      };
      if (keepCoupon) copyValue('[data-cart-coupon] [name="discount"]');
      copyValue('[data-cart-note]');
      const note = old.querySelector('.cart-summary__note');
      if (note?.open) fresh.querySelector('.cart-summary__note')?.setAttribute('open', '');

      const oldGift = old.querySelector('[data-cart-gift]');
      const newGift = fresh.querySelector('[data-cart-gift]');
      if (keepGift && oldGift?.classList.contains('is-open') && newGift) this.carryGift(oldGift, newGift);
    }

    announce(message) {
      if (!this.status) return;
      this.status.textContent = '';
      requestAnimationFrame(() => {
        this.status.textContent = message;
      });
    }
  }

  if (!customElements.get('cart-page')) {
    customElements.define('cart-page', CartPage);
  }

})();

/* sections/collection.liquid */
(() => {

  /**
   * <grid-view-switch>: the "fewer / more per row" radios of the card grid. The choice goes on the
   * section (data-view, read by the CSS) and into localStorage; the photos get the matching sizes, also
   * after the results are swapped (sort, filters, pages: the results:updated event of <results-view>).
   * With no saved choice the radio follows the screen: phones show "more" (2), wider screens "fewer".
   */
  class GridViewSwitch extends HTMLElement {
    connectedCallback() {
      this.section = this.closest('[data-grid-view]');
      if (!this.section) return;

      this.controller?.abort();
      this.controller = new AbortController();
      const { signal } = this.controller;
      this.phone = window.matchMedia('(max-width: 749px)');

      this.addEventListener('change', (event) => this.choose(event.target.value), { signal });
      this.phone.addEventListener('change', () => this.showChoice(), { signal });
      this.section.addEventListener('results:updated', () => this.applySizes(), { signal });

      this.showChoice();
      this.applySizes();
    }

    disconnectedCallback() {
      this.controller?.abort();
    }

    showChoice() {
      const view = this.section.dataset.view || (this.phone.matches ? 'more' : 'fewer');
      this.querySelectorAll('input[type="radio"]').forEach((input) => {
        input.checked = input.value === view;
      });
    }

    choose(view) {
      if (view !== 'fewer' && view !== 'more') return;
      this.section.dataset.view = view;
      try {
        localStorage.setItem('oroskin-collection-view', view);
      } catch (error) {
        // Storage blocked: the view still changes for this page
      }
      this.applySizes();
    }

    /** No saved choice: the cards keep the sizes Liquid wrote for the default view */
    applySizes() {
      const view = this.section.dataset.view;
      if (!view) return;
      const sizes = view === 'more' ? this.section.dataset.sizesMore : this.section.dataset.sizesFewer;
      this.section.querySelectorAll('.collection-grid--full .product-card__media img').forEach((image) => {
        image.sizes = sizes;
      });
    }
  }

  if (!customElements.get('grid-view-switch')) customElements.define('grid-view-switch', GridViewSwitch);

})();

/* sections/contact-form.liquid */
(() => {

  /**
   * <contact-form>: the theme's own error lines in place of the browser's bubbles, and the typed
   * fields kept after Shopify sends the page back with an error.
   * - novalidate is set here, so without JavaScript the browser's own check stays.
   * - Submit: every required field is checked; each problem shows under its field (aria-invalid +
   *   aria-describedby) and focus goes to the first one. A marked field is checked again while the
   *   visitor types or leaves it, so the message goes away when it is correct.
   * - A valid submit saves the fields in sessionStorage; when the page comes back with an error they
   *   are put back (Shopify keeps only the email and the message). A sent message clears them.
   * - After sending, focus moves to Shopify's message one time (never on a normal page load, and
   *   without the autofocus attribute: Theme Store rule).
   */
  class ContactForm extends HTMLElement {
    connectedCallback() {
      this.form = this.querySelector('form');
      if (!this.form) return;

      this.controller?.abort();
      this.controller = new AbortController();
      const { signal } = this.controller;

      this.form.noValidate = true;
      this.storageKey = `oroskin-contact:${this.form.id}`;

      // Only one time: the editor can move the section, and that connects the element again
      if (!this.started) {
        this.started = true;
        this.restore();
        this.querySelector('[data-focus-after-submit]')?.focus({ preventScroll: true });
      }

      this.form.addEventListener('submit', (event) => this.onSubmit(event), { signal });
      this.form.addEventListener('input', (event) => this.recheck(event), { signal });
      this.form.addEventListener('focusout', (event) => this.recheck(event), { signal });
    }

    disconnectedCallback() {
      this.controller?.abort();
    }

    get fields() {
      return [...this.form.querySelectorAll('[data-validate]')];
    }

    problem(field) {
      const value = field.value.trim();
      if (field.required && !value) return 'missing';
      if (field.type === 'email' && value && field.validity.typeMismatch) return 'format';
      return null;
    }

    show(field, problem) {
      const line = document.getElementById(`${field.id}-error`);
      if (!line) return;
      const ids = (field.getAttribute('aria-describedby') || '').split(' ').filter((id) => id && id !== line.id);

      if (problem) {
        line.textContent = line.dataset[problem] || line.dataset.missing;
        line.hidden = false;
        field.setAttribute('aria-invalid', 'true');
        ids.push(line.id);
      } else {
        line.hidden = true;
        line.textContent = '';
        field.removeAttribute('aria-invalid');
        // Shopify's own error (Liquid links it after a server email error) no longer describes a correct field
        const server = field.dataset.serverError;
        if (server) {
          const index = ids.indexOf(server);
          if (index !== -1) ids.splice(index, 1);
          delete field.dataset.serverError;
        }
      }

      if (ids.length) field.setAttribute('aria-describedby', ids.join(' '));
      else field.removeAttribute('aria-describedby');
    }

    onSubmit(event) {
      const wrong = [];
      for (const field of this.fields) {
        const problem = this.problem(field);
        this.show(field, problem);
        if (problem) wrong.push(field);
      }

      if (wrong.length) {
        event.preventDefault();
        wrong[0].focus();
        return;
      }

      this.save();
    }

    recheck(event) {
      const field = event.target.closest?.('[data-validate]');
      if (field?.getAttribute('aria-invalid') === 'true') this.show(field, this.problem(field));
    }

    save() {
      const data = {};
      for (const element of this.form.elements) {
        if (!element.name?.startsWith('contact[')) continue;
        if (element.type === 'radio') {
          if (element.checked) data[element.name] = element.value;
        } else {
          data[element.name] = element.value;
        }
      }
      try {
        sessionStorage.setItem(this.storageKey, JSON.stringify(data));
      } catch (error) {
        // Storage can be blocked (private mode): the form still sends
      }
    }

    restore() {
      let data = null;
      try {
        if (this.querySelector('.form-message--error')) data = JSON.parse(sessionStorage.getItem(this.storageKey) || 'null');
        sessionStorage.removeItem(this.storageKey);
      } catch (error) {
        return;
      }
      if (!data) return;

      for (const element of this.form.elements) {
        if (!(element.name in data)) continue;
        if (element.type === 'radio') element.checked = element.value === data[element.name];
        else if (!element.value) element.value = data[element.name];
      }
    }
  }

  if (!customElements.get('contact-form')) customElements.define('contact-form', ContactForm);

})();

/* sections/faq.liquid */
(() => {

  /**
   * <faq-page>: shows one view of the FAQ at a time.
   * - The URL's #handle picks the topic (the cards and pills are plain links to it, so the Back
   *   button returns to the overview); no #handle = the overview, or the search results.
   * - Each question row becomes a real button (the <details> stays for no JS): it shows its answer
   *   in the topic's answer card, and focus moves to the card's question so screen readers read it.
   * - Search filters every question (question and answer text) on the page; nothing is sent anywhere.
   *   A hidden status line says how many questions match.
   * - In the theme editor, selecting a Topic or Question block shows it.
   * - Every listener is on one AbortController: the editor can move the section, which connects the
   *   element again (the pills and the row buttons are built only once).
   */
  class FaqPage extends HTMLElement {
    connectedCallback() {
      this.topics = [...this.querySelectorAll('[data-faq-topic]')].map((element) => ({
        element,
        handle: element.dataset.handle,
        title: element.dataset.title,
        panel: element.querySelector('.faq-topic__panel'),
        card: element.querySelector('[data-faq-card]'),
        questions: [...element.querySelectorAll('[data-faq-question]')],
      }));
      if (!this.topics.length) return;
      this.uniqueHandles();

      this.controller?.abort();
      this.controller = new AbortController();
      const { signal } = this.controller;

      this.query ??= '';
      this.breadcrumb = this.querySelector('.faq__breadcrumb ol');
      this.breadcrumbHTML ??= this.breadcrumb?.innerHTML;
      this.buildPills();
      this.buildRows();

      this.topics.forEach((topic) => {
        topic.questions.forEach((question, index) => {
          question.row.addEventListener('click', () => this.select(topic, index, true), { signal });
        });
        topic.card?.querySelector('[data-faq-yes]')?.addEventListener('click', () => this.thank(topic), { signal });
      });

      const search = this.querySelector('[data-faq-search]');
      const input = search?.querySelector('input');
      const clear = search?.querySelector('[data-faq-search-clear]');
      search?.addEventListener('submit', (event) => event.preventDefault(), { signal });
      input?.addEventListener(
        'input',
        () => {
          const hasText = input.value !== '';
          search.classList.toggle('has-text', hasText);
          if (clear) clear.hidden = !hasText;
          clearTimeout(this.searchTimer);
          this.searchTimer = setTimeout(() => {
            this.query = input.value.trim();
            this.render();
          }, 150);
        },
        { signal }
      );
      clear?.addEventListener(
        'click',
        () => {
          input.value = '';
          input.dispatchEvent(new Event('input'));
          input.focus();
        },
        { signal }
      );

      /*
        Topic links (cards, pills): handled here instead of by the browser. A plain #link lets the
        browser jump first and the script redraw a moment later (a visible flicker); pushState
        changes the URL without a jump, and the new topic is drawn in the same frame. Back /
        forward still work (popstate).
      */
      this.addEventListener(
        'click',
        (event) => {
          const link = event.target.closest('a[href^="#"]');
          if (!link || event.metaKey || event.ctrlKey || event.shiftKey) return;
          const handle = decodeURIComponent(link.getAttribute('href').slice(1));
          if (!this.topics.some((topic) => topic.handle === handle)) return;
          event.preventDefault();
          this.goTo(handle);
        },
        { signal }
      );

      const onLocation = () => this.render(true);
      window.addEventListener('hashchange', onLocation, { signal });
      window.addEventListener('popstate', onLocation, { signal });

      // Theme editor: show the topic of the selected block
      document.addEventListener(
        'shopify:block:select',
        (event) => {
          const topic = this.topics.find((item) => item.element.contains(event.target));
          if (!topic) return;
          const index = topic.questions.findIndex((question) => question.contains(event.target));
          this.showTopic(topic, Math.max(index, 0));
        },
        { signal }
      );

      this.setAttribute('data-ready', '');
      // A shared #topic link: the browser has already jumped down to that panel; start at the top
      this.render(true);
    }

    disconnectedCallback() {
      this.controller?.abort();
      clearTimeout(this.searchTimer);
    }

    /**
     * Two topics with the same handle (e.g. a topic duplicated in the editor) would share one #link and
     * one panel id, and the second could never open: the later ones get a number (order-shipping-2).
     * The new handle is saved on the element, so a re-attach reads the same value.
     */
    uniqueHandles() {
      const used = new Set();
      this.topics.forEach((topic) => {
        let handle = topic.handle;
        for (let n = 2; used.has(handle); n += 1) handle = `${topic.handle}-${n}`;
        used.add(handle);
        if (handle === topic.handle) return;
        topic.handle = handle;
        topic.element.dataset.handle = handle;
        topic.panel.id = handle;
        topic.element.querySelector('.faq-topic__card')?.setAttribute('href', `#${handle}`);
      });
    }

    /** The "All subjects" pill and one pill per topic (only one time: a re-attach keeps them) */
    buildPills() {
      const list = this.querySelector('[data-faq-pills]');
      if (!list) return;

      if (!list.children.length) {
        const all = document.createElement('li');
        all.innerHTML = `<button type="button" class="faq__pill" data-faq-all>${this.querySelector('.faq__pill-arrow')?.innerHTML ?? ''}</button>`;
        all.firstElementChild.append(this.dataset.labelAll);
        list.append(all);

        this.topics.forEach((topic) => {
          const item = document.createElement('li');
          const link = document.createElement('a');
          link.className = 'faq__pill';
          link.href = `#${topic.handle}`;
          link.textContent = topic.title;
          item.append(link);
          list.append(item);
        });
      }

      this.topics.forEach((topic) => {
        topic.pill = list.querySelector(`a[href="#${CSS.escape(topic.handle)}"]`);
      });
      list
        .querySelector('[data-faq-all]')
        ?.addEventListener('click', () => this.goOverview(), { signal: this.controller.signal });
    }

    /**
     * A real button in place of each <summary> (one time): the same look and text, linked to the
     * answer card it fills (aria-controls). The <details> stays in the page for search engines.
     */
    buildRows() {
      this.topics.forEach((topic) => {
        topic.questions.forEach((question) => {
          question.row = question.querySelector(':scope > .faq-question__row');
          if (question.row) return;
          const summary = question.querySelector('summary');
          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'faq-question__row';
          if (topic.card?.id) button.setAttribute('aria-controls', topic.card.id);
          summary.childNodes.forEach((node) => button.append(node.cloneNode(true)));
          button.querySelectorAll('[itemprop]').forEach((node) => node.removeAttribute('itemprop'));
          question.prepend(button);
          question.row = button;
        });
      });
    }

    render(fromLocation = false) {
      const handle = decodeURIComponent(window.location.hash.slice(1));
      const topic = this.topics.find((item) => item.handle === handle);
      if (topic) this.showTopic(topic, this.pendingIndex ?? 0, fromLocation);
      else if (this.query.length >= 2) this.showResults();
      else this.setView('overview');
      this.pendingIndex = null;
    }

    setView(view) {
      const changed = this.dataset.view !== view;
      this.dataset.view = view;
      this.querySelector('[data-faq-results]').hidden = view !== 'results';
      if (view !== 'results') this.setStatus('');
      if (view !== 'topic') this.setBreadcrumb(null);
      // A new view fades in (not the first one: no animation on page load)
      if (changed && this.rendered) {
        this.classList.remove('is-entering');
        void this.offsetWidth; // restart the animation
        this.classList.add('is-entering');
      }
      this.rendered = true;
    }

    setStatus(text) {
      const status = this.querySelector('[data-faq-status]');
      if (status && status.textContent !== text) status.textContent = text;
    }

    showTopic(topic, index = 0, scroll = false) {
      this.setView('topic');
      this.topics.forEach((item) => {
        item.panel.classList.toggle('is-current', item === topic);
        if (item.pill) item.pill.setAttribute('aria-current', String(item === topic));
      });
      this.setBreadcrumb(topic);
      this.select(topic, index, false);
      // Only when the visitor had scrolled down past the section's top (no jump when already there)
      if (scroll && this.getBoundingClientRect().top < 0) this.scrollIntoView({ block: 'start' });
    }

    /** Opens a topic: the URL gets #handle (one history step), no browser jump */
    goTo(handle) {
      if (window.location.hash.slice(1) !== handle) history.pushState(null, '', `#${handle}`);
      this.render(true);
    }

    goOverview() {
      history.pushState(null, '', window.location.pathname + window.location.search);
      this.render();
      this.scrollIntoView({ block: 'start' });
    }

    /** HOME > FAQ > TOPIC: the page title becomes a link back to the overview */
    setBreadcrumb(topic) {
      if (!this.breadcrumb) return;
      this.breadcrumb.innerHTML = this.breadcrumbHTML;
      if (!topic) return;
      const current = this.breadcrumb.querySelector('[aria-current]');
      const link = document.createElement('a');
      link.href = window.location.pathname;
      link.textContent = current.textContent;
      link.addEventListener('click', (event) => {
        event.preventDefault();
        this.goOverview();
      });
      current.removeAttribute('aria-current');
      current.replaceChildren(link);
      const item = document.createElement('li');
      item.setAttribute('aria-current', 'page');
      item.textContent = topic.title;
      this.breadcrumb.append(item);
    }

    /** Shows question number `index` of `topic` in the answer card */
    select(topic, index, fromClick) {
      const question = topic.questions[index];
      if (!question || !topic.card) return;
      topic.questions.forEach((item, i) => {
        item.classList.toggle('is-active', i === index);
        item.row?.setAttribute('aria-current', String(i === index));
      });

      const card = topic.card;
      card.querySelector('[data-faq-card-number]').textContent = String(index + 1).padStart(2, '0');
      card.querySelector('[data-faq-card-question]').textContent =
        question.querySelector('.faq-question__text').textContent;
      card.querySelector('[data-faq-card-answer]').innerHTML =
        question.querySelector('[itemprop="text"]').innerHTML;
      card.querySelector('[data-faq-feedback]').hidden = false;
      card.querySelector('[data-faq-thanks]').textContent = '';

      if (fromClick) {
        const heading = card.querySelector('[data-faq-card-question]');
        heading.focus({ preventScroll: true });
        // Phones / tablets: the card is under the list
        if (window.matchMedia('(max-width: 1099px)').matches) {
          const smooth = window.matchMedia('(prefers-reduced-motion: no-preference)').matches;
          card.scrollIntoView({ block: 'nearest', behavior: smooth ? 'smooth' : 'auto' });
        }
      }
    }

    thank(topic) {
      topic.card.querySelector('[data-faq-feedback]').hidden = true;
      topic.card.querySelector('[data-faq-thanks]').textContent = this.dataset.labelThanks;
    }

    /**
     * One row per matching question: the topic's icon, the topic name, the question and the start
     * of its answer (the searched word in a <mark> in both), and an arrow. Built with text nodes
     * only, so nothing typed in the search can become HTML.
     */
    showResults() {
      this.setView('results');
      const query = this.query.toLowerCase();
      const list = this.querySelector('[data-faq-results-list]');
      const arrow = this.querySelector('.faq__pill-arrow')?.innerHTML ?? '';
      list.replaceChildren();

      this.topics.forEach((topic) => {
        topic.questions.forEach((question, index) => {
          const questionText = question.querySelector('.faq-question__text').textContent.trim();
          const answerText = question.querySelector('[itemprop="text"]').textContent.trim().replace(/\s+/g, ' ');
          if (!`${questionText} ${answerText}`.toLowerCase().includes(query)) return;

          const button = document.createElement('button');
          button.type = 'button';
          button.className = 'faq__result';

          const icon = topic.element.querySelector('.faq-topic__icon');
          if (icon) button.append(icon.cloneNode(true));

          const body = document.createElement('span');
          body.className = 'faq__result-body';
          body.append(
            this.textSpan('faq__result-topic', topic.title),
            this.textSpan('faq__result-question', questionText, query),
            this.textSpan('faq__result-excerpt', answerText, query)
          );
          button.append(body);

          const arrowBox = document.createElement('span');
          arrowBox.className = 'faq__result-arrow';
          arrowBox.setAttribute('aria-hidden', 'true');
          arrowBox.innerHTML = arrow;
          button.append(arrowBox);

          button.addEventListener('click', () => {
            this.pendingIndex = index;
            this.goTo(topic.handle);
          });
          const item = document.createElement('li');
          item.append(button);
          list.append(item);
        });
      });

      const count = list.children.length;
      this.querySelector('[data-faq-results-title]').textContent = this.dataset.labelResults.replace(
        '[query]',
        this.query
      );
      const countLabel = count === 1 ? this.dataset.labelCountOne : this.dataset.labelCountOther;
      const countText = count ? countLabel.replace('[count]', count) : '';
      this.querySelector('[data-faq-results-count]').textContent = countText;
      this.querySelector('[data-faq-results-empty]').hidden = count > 0;
      this.setStatus(countText || this.dataset.labelNoResults);
    }

    /** A <span> with `text`, each match of `query` wrapped in <mark> (as text nodes, never HTML) */
    textSpan(className, text, query = '') {
      const span = document.createElement('span');
      span.className = className;
      if (!query) {
        span.textContent = text;
        return span;
      }
      const lower = text.toLowerCase();
      let start = 0;
      let found = lower.indexOf(query);
      while (found !== -1) {
        span.append(text.slice(start, found));
        const mark = document.createElement('mark');
        mark.textContent = text.slice(found, found + query.length);
        span.append(mark);
        start = found + query.length;
        found = lower.indexOf(query, start);
      }
      span.append(text.slice(start));
      return span;
    }
  }

  if (!customElements.get('faq-page')) customElements.define('faq-page', FaqPage);

})();

/* sections/featured-product.liquid */
(() => {

  /**
   * <featured-product>: scrolls the gallery to the chosen variant's photo (or a clicked thumbnail), marks the
   * thumbnail of the medium on show, pauses the videos that are no longer on show, and loads Shopify's 3D
   * model controls (model-viewer-ui) when the product has a 3D model.
   */
  class FeaturedProduct extends HTMLElement {
    connectedCallback() {
      // One controller: the theme editor re-attaches a moved section and runs connectedCallback again
      this.controller?.abort();
      this.controller = new AbortController();
      const { signal } = this.controller;

      this.gallery = this.querySelector('[data-gallery]');
      this.slides = this.gallery ? [...this.gallery.querySelectorAll('[data-media-id]')] : [];
      this.thumbs = [...this.querySelectorAll('[data-thumb]')];
      this.current = 0;

      this.addEventListener('variant:change', (event) => this.showMedia(event.detail?.mediaId), { signal });

      // Thumbnail click shows that medium; swiping the gallery moves the thumbnail outline along
      this.thumbs.forEach((thumb) =>
        thumb.addEventListener('click', () => this.showMedia(thumb.dataset.thumb), { signal })
      );
      this.gallery?.addEventListener(
        'scroll',
        () => {
          if (this.scrollFrame) return;
          this.scrollFrame = requestAnimationFrame(() => {
            this.scrollFrame = null;
            // RTL: scrollLeft goes from 0 to negative values, so the distance is the absolute value
            const index = Math.round(Math.abs(this.gallery.scrollLeft) / this.step());
            this.setCurrent(Math.min(Math.max(index, 0), this.slides.length - 1));
          });
        },
        { passive: true, signal }
      );

      this.loadModelViewer();
    }

    disconnectedCallback() {
      this.controller?.abort();
      if (this.scrollFrame) cancelAnimationFrame(this.scrollFrame);
      this.scrollFrame = null;
    }

    /** The distance from one slide to the next: one slide plus the gap */
    step() {
      const first = this.slides[0];
      if (!first) return 1;
      const gap = parseFloat(getComputedStyle(this.gallery).columnGap) || 0;
      return first.offsetWidth + gap || 1;
    }

    /** Scrolls only the gallery sideways to one medium (scrollIntoView would also scroll the page) */
    showMedia(mediaId) {
      if (!mediaId || !this.gallery) return;
      const index = this.slides.findIndex((slide) => slide.dataset.mediaId === String(mediaId));
      if (index < 0) return;
      const rtl = getComputedStyle(this.gallery).direction === 'rtl';
      const smooth = !window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      this.gallery.scrollTo({ left: index * this.step() * (rtl ? -1 : 1), behavior: smooth ? 'smooth' : 'auto' });
      this.setCurrent(index);
    }

    setCurrent(index) {
      this.thumbs.forEach((thumb, i) => thumb.setAttribute('aria-current', String(i === index)));
      if (index === this.current) return;
      this.current = index;
      this.pauseOthers(index);
    }

    /** A video on a slide that is no longer on show stops (uploaded videos, YouTube and Vimeo players) */
    pauseOthers(index) {
      this.slides.forEach((slide, i) => {
        if (i === index) return;
        slide.querySelectorAll('video').forEach((video) => video.pause());
        slide.querySelectorAll('iframe').forEach((frame) => {
          const src = frame.getAttribute('src') || '';
          if (src.includes('vimeo')) {
            frame.contentWindow?.postMessage('{"method":"pause"}', '*');
          } else if (src.includes('youtube')) {
            frame.contentWindow?.postMessage('{"event":"command","func":"pauseVideo","args":""}', '*');
          }
        });
      });
    }

    /**
     * 3D models: Shopify's loader adds the viewer's controls (play, zoom, full screen) to each
     * <model-viewer>. One time per element, and one time per model (an editor re-attach runs this again)
     */
    loadModelViewer() {
      if (!this.querySelector('model-viewer') || this.modelViewerLoaded || !window.Shopify?.loadFeatures) return;
      this.modelViewerLoaded = true;
      // The controls' own stylesheet (Shopify's CDN), one link per page (shared with the Product section)
      if (!document.getElementById('ModelViewerStyle')) {
        const link = document.createElement('link');
        link.id = 'ModelViewerStyle';
        link.rel = 'stylesheet';
        link.href = 'https://cdn.shopify.com/shopifycloud/model-viewer-ui/assets/v1.0/model-viewer-ui.css';
        document.head.append(link);
      }
      window.Shopify.loadFeatures([
        {
          name: 'model-viewer-ui',
          version: '1.0',
          onLoad: (error) => {
            if (error || !window.Shopify.ModelViewerUI) return;
            this.querySelectorAll('model-viewer').forEach((model) => {
              if (!model.dataset.ui) {
                model.dataset.ui = 'true';
                new window.Shopify.ModelViewerUI(model);
              }
            });
          },
        },
      ]);
    }
  }

  if (!customElements.get('featured-product')) {
    customElements.define('featured-product', FeaturedProduct);
  }

})();

/* sections/header.liquid */
(() => {

  /**
   * <sticky-header>: adds "is-scrolled" to the header once the page has scrolled a little, so a transparent
   * header turns into the full pill. A web component, so the theme editor's re-render restarts it on its own.
   */
  class StickyHeader extends HTMLElement {
    connectedCallback() {
      this.header = this.querySelector('.header');
      if (!this.header?.classList.contains('header--transparent')) return;
      this.onScroll = () => {
        if (this.ticking) return;
        this.ticking = true;
        requestAnimationFrame(() => {
          this.header.classList.toggle('is-scrolled', window.scrollY > 10);
          this.ticking = false;
        });
      };
      window.addEventListener('scroll', this.onScroll, { passive: true });
      this.onScroll();
    }

    disconnectedCallback() {
      if (this.onScroll) window.removeEventListener('scroll', this.onScroll);
    }
  }

  if (!customElements.get('sticky-header')) customElements.define('sticky-header', StickyHeader);

  /**
   * <cart-count>: the one place that refreshes the header's cart count.
   * - "cart:changed" (sent by quick add, Buy buttons and Pairs well with after a background add): fetch
   *   /cart.js once, update the bubble and the hidden label, then send "cart:updated" with the cart (the
   *   cart page listens to it and redraws itself).
   * - "cart:updated" from the cart page itself already carries the cart: just update the bubble.
   * There are two <cart-count> elements (the bar and the phone drawer). Both receive the SAME event object
   * for one "cart:changed", so they share one request for that event (CartCount.requests, keyed by the
   * event), and only that request sends "cart:updated": the cart page redraws once. A later
   * "cart:changed" is a new event, so it always gets a new request and never an older answer.
   */
  class CartCount extends HTMLElement {
    static requests = new WeakMap();

    /** The /cart.js request for this "cart:changed" event: started by the first <cart-count>, reused by the other */
    static fetchCart(root, event) {
      let request = CartCount.requests.get(event);
      if (!request) {
        request = fetch(`${root}cart.js`, { headers: { Accept: 'application/json' } })
          .then((response) => response.json())
          .then((cart) => {
            document.dispatchEvent(new CustomEvent('cart:updated', { detail: { cart, source: 'header' } }));
            return cart;
          });
        CartCount.requests.set(event, request);
      }
      return request;
    }

    connectedCallback() {
      this.root = window.Shopify?.routes?.root || '/';
      this.onChanged = (event) => this.refresh(event);
      this.onUpdated = (event) => {
        if (event.detail?.source !== 'header' && event.detail?.cart) this.show(event.detail.cart.item_count);
      };
      document.addEventListener('cart:changed', this.onChanged);
      document.addEventListener('cart:updated', this.onUpdated);
    }

    disconnectedCallback() {
      document.removeEventListener('cart:changed', this.onChanged);
      document.removeEventListener('cart:updated', this.onUpdated);
    }

    async refresh(event) {
      try {
        const cart = await CartCount.fetchCart(this.root, event);
        this.show(cart.item_count);
      } catch (error) {
        // The add itself worked; only the count is stale. The cart page shows the right total.
      }
    }

    /** The red bubble (created on the first item, removed at 0) and "Cart, 3 items" for screen readers */
    show(count) {
      const link = this.querySelector('.header__icon-button');
      if (!link) return;
      let bubble = link.querySelector('.header__count');
      if (count > 0 && !bubble) {
        bubble = document.createElement('span');
        bubble.className = 'header__count';
        bubble.setAttribute('aria-hidden', 'true');
        link.append(bubble);
      }
      if (bubble) {
        if (count > 0) bubble.textContent = count < 100 ? count : '99+';
        else bubble.remove();
      }
      const label = this.querySelector('[data-cart-count-label]');
      if (label) {
        const wording = count === 0 ? this.dataset.labelZero : count === 1 ? this.dataset.labelOne : this.dataset.labelOther;
        label.textContent = (wording || '').replace('999999', count);
      }
    }
  }

  if (!customElements.get('cart-count')) customElements.define('cart-count', CartCount);

})();

/* sections/hero.liquid */
(() => {

  /**
   * <hero-showcase>: the Figma hero states. Products with a label or brush word take turns being "active":
   * the active one shows its name tag, and the headline's brush word changes to its word ("glow" -> "scent").
   * Start: the product whose brush word matches the headline's own word (e.g. "glow") is active from the
   * first paint, and only products rotate. If no product matches, the first state is the headline's word
   * with no product active.
   *
   * - Rotates every data-interval ms when data-rotate is true, only while the hero is on screen, and never
   *   for visitors who prefer reduced motion.
   * - Hovering or focusing a product shows it straight away and pauses the rotation; when the pointer or
   *   focus leaves, the rotation resumes after data-resume ms (2-3 s by default).
   * - In the theme editor, selecting a product block shows its state.
   * Without JavaScript nothing changes: the default headline shows and the labels stay hidden.
   */
  class HeroShowcase extends HTMLElement {
    connectedCallback() {
      /*
        One AbortController for every listener: disconnectedCallback aborts it, which removes them all at
        once. The theme editor re-attaches the section when it is moved, so connectedCallback runs again;
        without this, each listener would be added twice (the pause button would toggle twice per click).
      */
      this.abortController = new AbortController();
      const { signal } = this.abortController;

      this.setUpPauseButton(signal);
      this.products = [...this.querySelectorAll('[data-hero-product]')];
      const brushEm = this.querySelector('.heading--italic-brush em');
      if (!this.products.length) return;

      /*
        Wrap the brush word in its own span, so the swap fades only the text and the brush stays still.
        The headline's own word is saved on the span (data-default-word) the first time: when the section is
        re-attached (moved in the editor), the span may be showing a product's word ("scent"), and reading
        its text again would lose "glow".
      */
      if (brushEm) {
        this.brush = brushEm.querySelector('.hero-brush-text');
        if (!this.brush) {
          this.brush = document.createElement('span');
          this.brush.className = 'hero-brush-text';
          this.brush.textContent = brushEm.textContent;
          this.brush.dataset.defaultWord = brushEm.textContent;
          brushEm.replaceChildren(this.brush);
        }
        // A swap cut short by a disconnect leaves the word faded out: start visible
        this.brush.classList.remove('is-swapping');
      }

      this.defaultWord = this.brush ? (this.brush.dataset.defaultWord ?? this.brush.textContent) : '';
      this.held = false; // a hold from before a disconnect would block the rotation
      this.fixBrushWidth();

      /*
        Measure again when the screen width changes (phone / tablet / desktop type sizes and letter spacing
        differ, so a width measured on one screen can be too narrow on another: "glamour" ran past the brush
        at 320px). Debounced: once the resizing stops.
      */
      this.onResize = () => {
        clearTimeout(this.resizeTimer);
        this.resizeTimer = setTimeout(() => this.fixBrushWidth(), 150);
      };
      if (this.brush) window.addEventListener('resize', this.onResize, { passive: true, signal });

      // The product that owns the headline's word ("glow") is the starting state
      const ownWord = this.defaultWord.trim().toLowerCase();
      this.home = this.products.findIndex(
        (product) => (product.dataset.brushWord || '').trim().toLowerCase() === ownWord && ownWord !== ''
      );
      this.state = -2; // nothing shown yet
      this.show(this.home); // -1 = default (no product active) when no product owns the word
      this.interval = Number(this.dataset.interval) || 4000;
      this.resumeDelay = Number(this.dataset.resume) || 2500;
      this.canRotate =
        this.dataset.rotate === 'true' && !window.matchMedia('(prefers-reduced-motion: reduce)').matches;

      this.products.forEach((product, index) => {
        product.addEventListener('mouseenter', () => this.hold(index), { signal });
        product.addEventListener('mouseleave', () => this.release(), { signal });
        product.addEventListener('focusin', () => this.hold(index), { signal });
        product.addEventListener('focusout', () => this.release(), { signal });
      });

      // Theme editor: selecting a product block previews its state
      document.addEventListener(
        'shopify:block:select',
        (event) => {
          const index = this.products.findIndex((product) => product.contains(event.target));
          if (index > -1) this.hold(index);
        },
        { signal }
      );
      // Only when the deselected block is in this hero (a block in another section must not end the hold)
      document.addEventListener(
        'shopify:block:deselect',
        (event) => {
          if (this.contains(event.target)) this.release();
        },
        { signal }
      );

      // Rotate only while the hero is visible
      this.observer = new IntersectionObserver(([entry]) => {
        this.visible = entry.isIntersecting;
        if (this.visible && !this.held) this.start();
        else this.stop();
      });
      this.observer.observe(this);
    }

    disconnectedCallback() {
      this.abortController?.abort(); // removes every listener added with its signal
      this.stop();
      clearTimeout(this.resumeTimer);
      clearTimeout(this.resizeTimer);
      clearTimeout(this.swapTimer);
      this.brush?.classList.remove('is-swapping'); // the cancelled timer was the one to remove it
      this.observer?.disconnect();
    }

    /**
     * Pause / play (WCAG 2.2.2). Shown only if something moves: the rotation, or decorations that animate
     * (animations on, no reduced motion). Pausing stops both; playing restarts them.
     * The label stays "Pause animation"; aria-pressed tells screen readers whether it is on ("pressed" =
     * paused). Changing the label as well would give two signals ("Play animation, pressed").
     */
    setUpPauseButton(signal) {
      this.pauseButton = this.querySelector('.hero__pause');
      if (!this.pauseButton) return;
      const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      const rotates = this.dataset.rotate === 'true' && this.querySelector('[data-hero-product]');
      const decorationsMove =
        document.documentElement.classList.contains('animations-on') &&
        this.querySelector('.hero-decoration:not(.hero-decoration--anim-none)');
      if (reduced || (!rotates && !decorationsMove)) return;

      this.pauseButton.hidden = false;
      this.pauseButton.addEventListener(
        'click',
        () => {
          this.paused = !this.paused;
          this.pauseButton.setAttribute('aria-pressed', String(this.paused));
          this.classList.toggle('hero--paused', this.paused);
          if (this.paused) this.stop();
          else if (this.visible && !this.held) this.start();
        },
        { signal }
      );
    }

    start() {
      if (!this.canRotate || this.timer || this.paused) return;
      this.timer = setInterval(() => this.show(this.next()), this.interval);
    }

    /**
     * Keeps the brush one size: measures every brush word (the headline's and each product's) in the real
     * font, and gives the word box the widest width, in em so it still scales with the text. Waits for the
     * fonts, because a word measured in the fallback font would have the wrong width.
     */
    async fixBrushWidth() {
      if (!this.brush) return;
      /*
        Waiting for the fonts can outlast the element: skip the measuring if it was disconnected meanwhile
        (aborted signal), or if a newer measurement started (run number), so two never overlap.
      */
      const signal = this.abortController?.signal;
      const run = (this.measureRun = (this.measureRun || 0) + 1);
      await document.fonts?.ready;
      if (signal?.aborted || run !== this.measureRun) return;
      const words = [this.defaultWord, ...this.products.map((product) => product.dataset.brushWord || '')].filter(Boolean);
      const shown = this.brush.textContent;
      this.brush.style.minInlineSize = '0px';
      this.brush.style.removeProperty('--brush-word-width');
      let widest = 0;
      for (const word of words) {
        this.brush.textContent = word;
        // offsetWidth ignores the swap animation's scale (getBoundingClientRect would include it)
        widest = Math.max(widest, this.brush.offsetWidth);
      }
      this.brush.textContent = shown;
      this.brush.style.minInlineSize = '';
      const fontSize = parseFloat(getComputedStyle(this.brush).fontSize) || 16;
      this.brush.style.setProperty('--brush-word-width', `${(widest / fontSize).toFixed(3)}em`);
    }

    /* Next state: with a "home" product only products rotate; without one, the default state is part of the loop */
    next() {
      if (this.state + 1 < this.products.length) return this.state + 1;
      return this.home > -1 ? 0 : -1;
    }

    stop() {
      clearInterval(this.timer);
      this.timer = null;
    }

    hold(index) {
      this.held = true;
      clearTimeout(this.resumeTimer);
      this.stop();
      this.show(index);
    }

    release() {
      this.held = false;
      clearTimeout(this.resumeTimer);
      this.resumeTimer = setTimeout(() => {
        if (this.held) return;
        if (!this.canRotate || this.paused) this.show(this.home);
        else if (this.visible) this.start();
      }, this.resumeDelay);
    }

    show(index) {
      if (index === this.state) return;
      this.state = index;
      this.products.forEach((product, i) => product.classList.toggle('is-active', i === index));

      if (!this.brush) return;
      const word = (index > -1 && this.products[index].dataset.brushWord) || this.defaultWord;
      if (this.brush.textContent === word) return;
      this.brush.classList.add('is-swapping');
      clearTimeout(this.swapTimer);
      this.swapTimer = setTimeout(() => {
        this.brush.textContent = word;
        this.brush.classList.remove('is-swapping');
      }, 200);
    }
  }

  if (!customElements.get('hero-showcase')) customElements.define('hero-showcase', HeroShowcase);

})();

/* sections/image-banner.liquid */
(() => {

  /**
   * <image-banner>: the Manifesto -> Trending scroll scene. Active only when the section shows a
   * Trending sheet, the theme's animations are on (data-scene) and the visitor allows motion.
   * Turns the scroll position inside the tall track into --p (0 -> 1), smoothed so a mouse wheel
   * doesn't make it jump; the CSS moves the content and the sheet from that number.
   */
  class ImageBanner extends HTMLElement {
    connectedCallback() {
      this.sheet = this.querySelector('[data-banner-sheet]');
      this.track = this.querySelector('.image-banner__track');
      this.stage = this.querySelector('.image-banner__stage');
      if (!this.sheet || !this.track || !this.stage || !this.hasAttribute('data-scene')) return;

      // One controller for every listener: the editor can move the section (disconnect + connect again)
      this.inner = this.querySelector('.image-banner__inner');
      this.controller = new AbortController();
      const { signal } = this.controller;
      this.motion = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.motion.addEventListener('change', () => this.update(), { signal });
      // A resize can make the content too tall for the screen (or fit again): check again
      window.addEventListener(
        'resize',
        () => {
          cancelAnimationFrame(this.resizeFrame);
          this.resizeFrame = requestAnimationFrame(() => this.update());
        },
        { signal }
      );
      this.update();
    }

    /**
     * The scene runs only when motion is allowed and the banner content fits on one screen: a pinned
     * stage can't scroll, so taller content (a small phone, a long text) would be cut off. Then the
     * sheet simply sits under the banner.
     */
    update() {
      const active = this.hasAttribute('data-scene-active');
      const fits = this.inner.scrollHeight <= window.innerHeight + 1;
      if (!this.motion.matches && fits) {
        if (!active) this.start();
      } else if (active) {
        this.stop();
      }
    }

    disconnectedCallback() {
      this.stop();
      this.controller?.abort();
      cancelAnimationFrame(this.resizeFrame);
    }

    /** Pins the stage and follows the scroll */
    start() {
      this.stop();
      this.sceneController = new AbortController();
      const { signal } = this.sceneController;

      this.style.setProperty('--scene-length', this.sheet.dataset.sceneLength || 250);
      this.setAttribute('data-scene-active', '');
      this.current = this.measure();
      this.paint();

      this.run = () => {
        if (!this.frame) this.frame = requestAnimationFrame(() => this.step());
      };
      // Scroll and resize are only followed while the scene is on screen
      this.observer = new IntersectionObserver(([entry]) => {
        this.scrollController?.abort();
        if (entry.isIntersecting) {
          this.scrollController = new AbortController();
          window.addEventListener('scroll', this.run, { passive: true, signal: this.scrollController.signal });
          window.addEventListener('resize', this.run, { signal: this.scrollController.signal });
          this.run();
        } else {
          this.current = this.measure();
          this.paint();
        }
      });
      this.observer.observe(this.track);

      // Keyboard: a link that gets focus while it is out of view (the sheet before it slides in, or the
      // banner text under the sheet) scrolls the page to the point of the scene where it shows
      this.addEventListener('focusin', (event) => this.reveal(event.target), { signal });
    }

    /** Back to the plain layout (reduced motion switched on, or the section left the page) */
    stop() {
      this.sceneController?.abort();
      this.scrollController?.abort();
      this.observer?.disconnect();
      if (this.frame) cancelAnimationFrame(this.frame);
      this.frame = null;
      ['data-scene-active', 'data-sheet-shown', 'data-sheet-placed'].forEach((name) => this.removeAttribute(name));
      this.style.setProperty('--p', 0);
    }

    /**
     * Scrolls to 0.8 (sheet in place) for a link in the sheet, to 0 (banner text) for any other link.
     * The banner text starts to fade at 0.12 (see --out), so a banner link needs a scroll from there on.
     */
    reveal(target) {
      const inSheet = this.sheet.contains(target);
      if (inSheet && this.hasAttribute('data-sheet-placed')) return;
      if (!inSheet && this.current <= 0.12) return;
      const distance = this.track.offsetHeight - this.stage.offsetHeight;
      const top = this.track.getBoundingClientRect().top + window.scrollY;
      const progress = inSheet ? 0.8 : 0;
      window.scrollTo({ top: top + distance * progress, behavior: 'instant' });
      this.current = progress;
      this.paint();
    }

    /** 0 when the stage pins, 1 when it lets go (measured against the stage's own height) */
    measure() {
      const distance = this.track.offsetHeight - this.stage.offsetHeight;
      const scrolled = -this.track.getBoundingClientRect().top;
      return distance > 0 ? Math.min(Math.max(scrolled / distance, 0), 1) : 0;
    }

    /** Each frame the shown progress moves 12% of the way to the real one, until they meet */
    step() {
      this.frame = null;
      const target = this.measure();
      const gap = target - this.current;
      this.current = Math.abs(gap) < 0.0005 ? target : this.current + gap * 0.12;
      this.paint();
      if (this.current !== target) this.run();
    }

    paint() {
      this.style.setProperty('--p', this.current.toFixed(4));
      this.toggleAttribute('data-sheet-shown', this.current > 0.45);
      // The sheet is fully in place at 0.65 (see --in); a hair earlier so the smoothing never holds it back
      this.toggleAttribute('data-sheet-placed', this.current > 0.64);
    }
  }

  if (!customElements.get('image-banner')) {
    customElements.define('image-banner', ImageBanner);
  }

})();

/* sections/locations-map.liquid */
(() => {

  /**
   * <location-map>: shows the filter buttons (hidden without JavaScript) and, on click, keeps only
   * the pins of that type. aria-pressed tells screen readers which button is on.
   * Only types that have pins get a button, and the buttons only show with two types or more.
   */
  class LocationMap extends HTMLElement {
    connectedCallback() {
      this.filters = this.querySelector('[data-map-filters]');
      this.status = this.querySelector('[data-map-status]');
      if (!this.filters) return;

      this.controller?.abort();
      this.controller = new AbortController();

      // A pin can belong to several types: data-pin-type is a space-separated list of handles
      const usedTypes = new Set(
        [...this.querySelectorAll('[data-pin-type]')].flatMap((pin) => pin.dataset.pinType.split(' ').filter(Boolean))
      );

      // Count only the type buttons that show: a pin type with no button in "Location types" does not count
      const shownTypes = new Set();
      for (const button of this.filters.querySelectorAll('[data-filter]')) {
        const type = button.dataset.filter;
        button.hidden = type !== 'all' && !usedTypes.has(type);
        if (type !== 'all' && !button.hidden) shownTypes.add(type);
      }
      this.filters.hidden = shownTypes.size < 2;
      if (this.filters.hidden) return;
      this.filters.addEventListener('click', this, { signal: this.controller.signal });
    }

    disconnectedCallback() {
      this.controller?.abort();
    }

    handleEvent(event) {
      const button = event.target.closest('[data-filter]');
      if (!button) return;

      const type = button.dataset.filter;
      for (const other of this.filters.querySelectorAll('[data-filter]')) {
        other.setAttribute('aria-pressed', String(other === button));
      }
      let shown = 0;
      for (const pin of this.querySelectorAll('[data-pin-type]')) {
        pin.hidden = type !== 'all' && !pin.dataset.pinType.split(' ').includes(type);
        if (!pin.hidden) shown += 1;
      }

      if (this.status) {
        const text = shown === 1 ? this.status.dataset.one : this.status.dataset.other;
        this.status.textContent = (text || '').replace('[count]', shown);
      }
    }
  }

  if (!customElements.get('location-map')) customElements.define('location-map', LocationMap);

})();

/* sections/marquee.liquid */
(() => {

  /**
   * <marquee-text>: starts the movement (is-moving) and shows the pause / play button, but only
   * with "Enable animations" on (.motion-on) and motion allowed. The button and the movement are
   * always on or off together, so the button never shows while nothing moves. A reduced-motion
   * change while on the page stops or starts it. The button toggles is-paused, which stops the CSS
   * animation where it is.
   */
  class MarqueeText extends HTMLElement {
    connectedCallback() {
      /*
        Every listener is tied to one AbortController, and disconnectedCallback aborts it. The theme
        editor re-attaches the section when it is moved, so connectedCallback runs again; without
        this, the button would get a second listener and toggle twice per click (= nothing happens).
      */
      this.abortController?.abort();
      this.abortController = new AbortController();
      const { signal } = this.abortController;

      this.button = this.querySelector('.marquee__pause');
      if (!this.button || !document.documentElement.classList.contains('motion-on')) return;

      const reduce = window.matchMedia('(prefers-reduced-motion: reduce)');
      const update = () => {
        const moving = !reduce.matches;
        this.classList.toggle('is-moving', moving);
        this.button.hidden = !moving;
      };
      update();
      reduce.addEventListener('change', update, { signal });

      this.button.addEventListener(
        'click',
        () => {
          const paused = this.classList.toggle('is-paused');
          // The label stays "Pause"; aria-pressed says whether it is on (pressed = paused)
          this.button.setAttribute('aria-pressed', String(paused));
        },
        { signal }
      );
    }

    disconnectedCallback() {
      this.abortController?.abort();
    }
  }

  if (!customElements.get('marquee-text')) customElements.define('marquee-text', MarqueeText);

})();

/* sections/policy.liquid */
(() => {

  /**
   * <policy-page>:
   * - Contents layout: builds the contents list from the policy's H2s (01 …, each with an id) one
   *   time, and marks the clause being read: the last heading at or above the place where a
   *   contents link stops it (its scroll-margin, + 8px), else the first. Read on scroll, so a fast
   *   scroll never leaves an old mark. A click on a contents link marks that clause and holds it
   *   until the visitor scrolls (wheel, touch, keys): a short clause must not pass the mark to the
   *   next one, and near the end of the page the last headings can't reach the line.
   * - The register on phones: gives each cell its column's label (data-label, from the table's
   *   header row), so a row can be shown as label / value lines.
   * The editor can attach the section again (connectedCallback runs again): the listeners are on one
   * AbortController and the list is built only when it is empty.
   */
  class PolicyPage extends HTMLElement {
    connectedCallback() {
      this.body = this.querySelector('[data-policy-body]');
      if (!this.body) return;
      this.controller?.abort();
      this.controller = new AbortController();
      this.labelTables();
      this.buildContents();
    }

    disconnectedCallback() {
      this.controller?.abort();
      cancelAnimationFrame(this.frame);
    }

    labelTables() {
      this.body.querySelectorAll('table').forEach((table) => {
        // The header row: the <thead>'s last row, else the table's first row. Only that row: a row
        // header (a <th> at the start of a body row) is not a column name. Headers are read by cell
        // position, so a body row that starts with a <th> still lines up with its column.
        const headerRow = table.tHead?.rows.length ? table.tHead.rows[table.tHead.rows.length - 1] : table.rows[0];
        if (!headerRow) return;
        const headers = [...headerRow.cells].map((cell) => (cell.tagName === 'TH' ? cell.textContent.trim() : ''));
        if (!headers.some(Boolean)) return;
        table.querySelectorAll('tr').forEach((row) => {
          [...row.children].forEach((cell, index) => {
            if (cell.tagName === 'TD' && headers[index]) cell.dataset.label = headers[index];
          });
        });
      });
    }

    buildContents() {
      const nav = this.querySelector('.policy__contents');
      const list = this.querySelector('[data-policy-contents]');
      this.headings = [...this.body.querySelectorAll('h2')];
      if (!nav || !list || !this.headings.length) return;

      if (!list.children.length) {
        this.headings.forEach((heading, index) => {
          const number = String(index + 1).padStart(2, '0');
          heading.id ||= `PolicyClause-${number}`;
          const item = document.createElement('li');
          const link = document.createElement('a');
          link.className = 'policy__contents-link';
          link.href = `#${heading.id}`;
          const numberSpan = document.createElement('span');
          numberSpan.className = 'policy__contents-number';
          numberSpan.textContent = number;
          link.append(numberSpan, heading.textContent.trim());
          item.append(link);
          list.append(item);
        });
      }
      this.links = [...list.querySelectorAll('.policy__contents-link')];
      nav.hidden = false;

      const { signal } = this.controller;
      const queue = () => {
        cancelAnimationFrame(this.frame);
        this.frame = requestAnimationFrame(() => this.markCurrent());
      };
      window.addEventListener('scroll', queue, { passive: true, signal });
      window.addEventListener('resize', queue, { signal });

      list.addEventListener(
        'click',
        (event) => {
          const link = event.target.closest('.policy__contents-link');
          if (!link) return;
          this.held = this.links.indexOf(link);
          this.markCurrent();
        },
        { signal }
      );
      // The visitor scrolls again: the scroll position decides again
      const release = () => {
        if (this.held == null) return;
        this.held = null;
        queue();
      };
      ['wheel', 'touchstart', 'keydown'].forEach((type) =>
        window.addEventListener(type, release, { passive: true, signal })
      );
      this.markCurrent();
    }

    markCurrent() {
      let current = 0;
      if (this.held != null) {
        current = this.held;
      } else {
        // Where a contents link stops a heading (scroll-margin), + 8px for rounding
        const line = parseFloat(getComputedStyle(this.headings[0]).scrollMarginBlockStart || 0) + 8;
        this.headings.forEach((heading, index) => {
          if (heading.getBoundingClientRect().top <= line) current = index;
        });
      }
      if (current === this.current) return;
      this.current = current;
      this.links.forEach((link, index) => {
        if (index === current) link.setAttribute('aria-current', 'true');
        else link.removeAttribute('aria-current');
      });
    }
  }

  if (!customElements.get('policy-page')) customElements.define('policy-page', PolicyPage);

})();

/* sections/product-clinical.liquid */
(() => {

  /**
   * <product-clinical>: the before / after range moves the cut (--pos) and updates its value text; the
   * rings draw once the section is in view (is-drawn).
   */
  class ProductClinical extends HTMLElement {
    connectedCallback() {
      const compare = this.querySelector('[data-compare]');
      const range = this.querySelector('[data-compare-range]');
      // Through a signal, removed when the element leaves the page (the tabs' pinned track moves it)
      this.controller = new AbortController();
      const { signal } = this.controller;
      const setValue = (value) => {
        range.value = String(Math.round(Math.min(100, Math.max(0, value))));
        compare.style.setProperty('--pos', `${range.value}%`);
        range.setAttribute('aria-valuetext', range.dataset.valuetext.replace('[percent]', range.value));
      };
      range?.addEventListener('input', () => setValue(Number(range.value)), { signal });

      // Drag anywhere on the photo (mouse, pen, touch). Some browsers (iPhone Safari) move an invisible
      // range input only when the press hits its small thumb, so the script follows the pointer itself.
      // Mouse / pen: the line moves at once. Touch: only after the finger moves more sideways than up /
      // down (a scroll that starts on the photo must not move the line), or on a tap
      this.dragging = false;
      this.press = null;
      if (compare && range) {
        const fromPointer = (event) => {
          const box = compare.getBoundingClientRect();
          setValue(((event.clientX - box.left) / box.width) * 100);
        };
        const startDrag = (event) => {
          compare.setPointerCapture(event.pointerId);
          this.dragging = true;
          range.focus({ preventScroll: true });
          fromPointer(event);
        };
        compare.addEventListener(
          'pointerdown',
          (event) => {
            if (event.button !== 0) return;
            if (event.pointerType === 'touch') {
              this.press = { x: event.clientX, y: event.clientY, id: event.pointerId };
              return;
            }
            event.preventDefault(); // no text selection or native range drag on top of this one
            startDrag(event);
          },
          { signal }
        );
        compare.addEventListener(
          'pointermove',
          (event) => {
            if (this.dragging) {
              fromPointer(event);
              return;
            }
            const press = this.press;
            if (!press || press.id !== event.pointerId) return;
            const dx = Math.abs(event.clientX - press.x);
            const dy = Math.abs(event.clientY - press.y);
            if (dx > 6 && dx > dy) {
              this.press = null;
              startDrag(event);
            }
          },
          { signal }
        );
        compare.addEventListener(
          'pointerup',
          (event) => {
            // A tap (the finger hardly moved): the line jumps there
            const press = this.press;
            if (press && press.id === event.pointerId && Math.hypot(event.clientX - press.x, event.clientY - press.y) < 8) {
              fromPointer(event);
            }
            this.press = null;
            this.dragging = false;
          },
          { signal }
        );
        const stop = () => {
          this.press = null;
          this.dragging = false;
        };
        compare.addEventListener('pointercancel', stop, { signal }); // the page scrolls: no change
        compare.addEventListener('lostpointercapture', stop, { signal });
      }

      if (this.classList.contains('is-drawn')) return; // drawn before a move in the page
      // Watch the rings themselves: below 1200px they sit under the slider, so the section can be on
      // screen long before the rings are
      const rings = this.querySelector('.product-clinical__rings');
      if (!rings) return;
      this.observer = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        this.classList.add('is-drawn');
        this.observer.disconnect();
      }, { threshold: 0.5 });
      this.observer.observe(rings);
    }

    disconnectedCallback() {
      this.controller?.abort();
      this.observer?.disconnect();
      this.dragging = false; // a move in the page during a drag must not leave the line following the mouse
      this.press = null;
    }
  }

  if (!customElements.get('product-clinical')) customElements.define('product-clinical', ProductClinical);

})();

/* sections/product-deck.liquid */
(() => {

  /**
   * <product-deck>: makes a card active (class is-active) when the mouse moves onto it, or when it is
   * tapped or reached with Tab; the active card stays until another one is picked. With data-fan, it
   * also moves the cards from a stack to their places (--fan-progress 0 -> 1: the fan from 1200px, the
   * rows below), in one of two ways (setting "Animation > Start of the animation"):
   * - scroll: follows the scroll while the section comes into view (smoothed like the Image banner
   *   scene), and folds back if the visitor scrolls up
   * - auto: plays once by itself (about 1.2s) when the deck is a third on screen, then stays open, also
   *   when the theme editor attaches the section again
   * The cards' places never change: only which one is in front.
   */
  class ProductDeck extends HTMLElement {
    connectedCallback() {
      this.cards = [...this.querySelectorAll('[data-card]')];
      this.list = this.querySelector('.product-deck__list');
      if (this.cards.length < 2) return;

      /*
        Every listener on one AbortController: the theme editor attaches the section again when it
        moves, so connectedCallback runs again. disconnectedCallback removes the old listeners first.
      */
      this.controller = new AbortController();
      const { signal } = this.controller;

      this.cards.forEach((card) => {
        card.addEventListener(
          'pointerenter',
          (event) => {
            if (event.pointerType === 'mouse') this.select(card);
          },
          { signal }
        );
        card.addEventListener('focusin', () => this.select(card), { signal });
        card.querySelector('[data-pick]')?.addEventListener('click', () => this.select(card), { signal });
      });

      if (this.hasAttribute('data-fan') && !window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        if (this.dataset.fanStyle === 'auto') {
          this.startAutoFan();
        } else {
          this.startFan();
        }
      }
    }

    disconnectedCallback() {
      this.controller?.abort();
      this.observer?.disconnect();
      this.stopListening();
      clearTimeout(this.movingTimer);
      if (this.playFrame) cancelAnimationFrame(this.playFrame);
    }

    /** "Play once": stacked until a third of the deck is on screen, then fans out by itself and stays */
    startAutoFan() {
      this.setAttribute('data-fan-active', '');
      // Already played (the editor moved the section): stay open, do not play again
      if (this.played) {
        this.current = 1;
        this.paint();
        return;
      }
      this.current = 0;
      this.paint();
      this.observer = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          this.observer.disconnect(); // once per page view
          this.play();
        },
        { threshold: 0.35 }
      );
      this.observer.observe(this.list);
    }

    /** 0 -> 1 over 1.2s, fast at first and gently settling (ease-out cubic), one step per frame */
    play() {
      this.played = true;
      const duration = 1200;
      const start = performance.now();
      const frame = (now) => {
        const t = Math.min((now - start) / duration, 1);
        this.current = 1 - Math.pow(1 - t, 3);
        this.paint();
        this.playFrame = t < 1 ? requestAnimationFrame(frame) : null;
      };
      this.playFrame = requestAnimationFrame(frame);
    }

    /** The other cards' info and cart button are visibility: hidden (CSS), so Tab skips them */
    select(card) {
      if (card.classList.contains('is-active')) return;
      this.setAttribute('data-moving', '');
      clearTimeout(this.movingTimer);
      this.movingTimer = setTimeout(() => this.removeAttribute('data-moving'), 500);
      this.cards.forEach((item) => {
        item.classList.toggle('is-active', item === card);
        const pick = item.querySelector('[data-pick]');
        if (item === card) {
          pick?.setAttribute('aria-current', 'true');
        } else {
          pick?.removeAttribute('aria-current');
        }
      });
    }

    startFan() {
      this.setAttribute('data-fan-active', '');
      this.current = this.measure();
      this.paint();
      this.run = () => {
        if (!this.frame) this.frame = requestAnimationFrame(() => this.step());
      };
      this.observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', this.run, { passive: true });
          window.addEventListener('resize', this.run);
          this.run();
        } else {
          this.stopListening();
          this.current = this.measure();
          this.paint();
        }
      });
      this.observer.observe(this.list);
    }

    stopListening() {
      if (!this.run) return;
      window.removeEventListener('scroll', this.run);
      window.removeEventListener('resize', this.run);
      if (this.frame) cancelAnimationFrame(this.frame);
      this.frame = null;
    }

    /** 0 while the deck's top is at the bottom of the screen, 1 once it has reached 35% from the top */
    measure() {
      const top = this.list.getBoundingClientRect().top;
      const height = window.innerHeight;
      return Math.min(Math.max((height - top) / (height * 0.65), 0), 1);
    }

    /** Each frame the shown progress moves 12% of the way to the real one, until they meet */
    step() {
      this.frame = null;
      const target = this.measure();
      const gap = target - this.current;
      this.current = Math.abs(gap) < 0.0005 ? target : this.current + gap * 0.12;
      this.paint();
      if (this.current !== target) this.run();
    }

    paint() {
      this.style.setProperty('--fan-progress', this.current.toFixed(4));
    }
  }

  if (!customElements.get('product-deck')) {
    customElements.define('product-deck', ProductDeck);
  }

})();

/* sections/product-faq.liquid */
(() => {

  /**
   * <product-faq>: after the contact form is sent, Shopify reloads the page with a thank-you or an error
   * marked data-focus-after-submit. Focus moves there once the page has loaded: by then the tabs have
   * shown this panel (a hidden or faded panel can't take focus). Only right after the visitor's own
   * submit, never on a normal load (and no autofocus attribute: Theme Store rule).
   */
  class ProductFaq extends HTMLElement {
    connectedCallback() {
      // Theme editor: a question picked in the sidebar opens (the others close: same name)
      this.controller?.abort();
      this.controller = new AbortController();
      this.addEventListener('shopify:block:select', (event) => {
        if (event.target.matches('details')) event.target.open = true;
      }, { signal: this.controller.signal });

      // Once: the tabs' pinned track moves this section, which runs connectedCallback again
      if (this.focusDone) return;
      const message = this.querySelector('[data-focus-after-submit]');
      if (!message) return;
      this.focusDone = true;
      // The tabs open this panel and scroll to the message (whatever the URL hash is), then focus moves
      const focus = () => requestAnimationFrame(() => {
        document.querySelector('product-tabs')?.reveal?.(message);
        message.focus({ preventScroll: true });
      });
      if (document.readyState === 'complete') focus();
      else window.addEventListener('load', focus, { once: true });
    }

    disconnectedCallback() {
      this.controller?.abort();
    }
  }

  if (!customElements.get('product-faq')) customElements.define('product-faq', ProductFaq);

})();

/* sections/product-how-to.liquid */
(() => {

  /**
   * <product-how-to>: opens one step at a time. A click on a step opens it (and restarts the timer).
   * Autoplay (data-autoplay): the progress line's CSS animation is the timer; when it ends, the next
   * step opens and the line starts again. It plays only while the section is on screen (and, inside
   * the tabs' pinned block, while its panel shows); the pause button and keyboard focus on a step stop
   * it; reduced motion: no autoplay (followed when the visitor changes it).
   */
  class ProductHowTo extends HTMLElement {
    connectedCallback() {
      // Every listener goes through this signal and is removed in disconnectedCallback. The tabs' pinned
      // track moves this section in the page, which runs connectedCallback again: without this, the
      // listeners were added twice and each finished line opened two steps (01 → 03)
      this.controller = new AbortController();
      const { signal } = this.controller;
      this.steps = [...this.querySelectorAll('.product-how-to__step')];
      this.slides = [...this.querySelectorAll('[data-slide]')];
      this.progress = this.querySelector('[data-step-progress]');
      this.pauseButton = this.querySelector('[data-step-pause]');
      // The step that is open now (after a move in the page it isn't always the first)
      this.index = Math.max(0, this.steps.findIndex((step) => step.classList.contains('is-active')));
      if (this.steps.length < 2) return;

      this.addEventListener(
        'click',
        (event) => {
          const button = event.target.closest('[data-step]');
          if (button) this.open(Number(button.dataset.step));
        },
        { signal }
      );

      // Theme editor: selecting a step block opens that step and holds autoplay until it is deselected
      this.addEventListener(
        'shopify:block:select',
        (event) => {
          const index = this.steps.indexOf(event.target.closest('.product-how-to__step'));
          if (index < 0) return;
          this.editorHold = true;
          this.open(index);
          if (this.motion) this.updatePlay();
        },
        { signal }
      );
      this.addEventListener(
        'shopify:block:deselect',
        () => {
          this.editorHold = false;
          if (this.motion) this.updatePlay();
        },
        { signal }
      );

      this.updateFill();
      if (!this.hasAttribute('data-autoplay')) return;

      this.progress?.addEventListener('animationend', () => this.open(this.index + 1), { signal });
      this.paused = this.pauseButton?.getAttribute('aria-pressed') === 'true';
      this.pauseButton?.addEventListener(
        'click',
        () => {
          this.paused = !this.paused;
          // The label stays "Pause steps"; aria-pressed says whether it is on (pressed = paused)
          this.pauseButton.setAttribute('aria-pressed', String(this.paused));
          this.updatePlay();
        },
        { signal }
      );

      // Reduced motion: no autoplay and no pause button; followed when the visitor changes it
      this.motion = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.motion.addEventListener('change', () => this.updatePlay(), { signal });

      this.inView = false;
      this.focused = false;
      this.observer = new IntersectionObserver(([entry]) => {
        this.inView = entry.isIntersecting;
        this.updatePlay();
      }, { threshold: 0.35 });
      this.observer.observe(this);

      // Pause while a keyboard user is on a step (focus-visible), so the text doesn't change under them.
      // Not after a mouse click (the button keeps focus, which used to pause it for good)
      const onFocus = () => {
        this.focused = Boolean(this.querySelector('.product-how-to__step-button:focus-visible'));
        this.updatePlay();
      };
      this.addEventListener('focusin', onFocus, { signal });
      this.addEventListener('focusout', () => requestAnimationFrame(onFocus), { signal });

      // Inside the tabs' pinned block: hidden panels (is-tab-faded / is-tab-hidden) don't play
      const wrapper = this.closest('.shopify-section');
      if (wrapper) {
        this.classObserver = new MutationObserver(() => this.updatePlay());
        this.classObserver.observe(wrapper, { attributes: true, attributeFilter: ['class'] });
      }
      this.updatePlay();
    }

    disconnectedCallback() {
      this.controller?.abort();
      this.observer?.disconnect();
      this.classObserver?.disconnect();
    }

    panelHidden() {
      return Boolean(this.closest('.is-tab-faded, .is-tab-hidden'));
    }

    updatePlay() {
      const reduced = this.motion.matches;
      if (this.pauseButton) this.pauseButton.hidden = reduced;
      const play = !reduced && this.inView && !this.panelHidden();
      this.classList.toggle('is-playing', play);
      this.classList.toggle('is-paused', play && (this.focused || this.paused || this.editorHold));
    }

    /** Opens step i (wrapping round), shows its slide, restarts the timer */
    open(i) {
      const count = this.steps.length;
      this.index = (i + count) % count;
      this.steps.forEach((step, n) => {
        const active = n === this.index;
        step.classList.toggle('is-active', active);
        // Only a step with text has aria-expanded (a step with no text shows or hides nothing)
        const button = step.querySelector('[data-step][aria-expanded]');
        button?.setAttribute('aria-expanded', String(active));
      });
      this.slides.forEach((slide, n) => {
        slide.classList.toggle('is-active', n === this.index);
        // Screen readers get only the shown image and caption
        slide.toggleAttribute('aria-hidden', n !== this.index);
      });
      const current = this.querySelector('[data-step-current]');
      if (current) current.textContent = String(this.index + 1).padStart(2, '0');
      this.updateFill();
      // Restart the line: remove the animation, force a reflow, put it back
      if (this.progress && this.classList.contains('is-playing')) {
        this.progress.style.animation = 'none';
        void this.progress.offsetWidth;
        this.progress.style.animation = '';
      }
    }

    /** Click-only: the line shows how far through the steps the open one is (1 of 4 = 25%) */
    updateFill() {
      this.style.setProperty('--step-fill', `${((this.index + 1) / this.steps.length) * 100}%`);
    }
  }

  if (!customElements.get('product-how-to')) customElements.define('product-how-to', ProductHowTo);

})();

/* sections/product-list.liquid */
(() => {

  /**
   * <product-list-ui>: the Product list's two interactive layouts.
   * - Tabs: each Tab block draws its button + panel (blocks/_product-tab); the buttons are moved into the
   *   tab row here. Clicking a tab (or ← / → / Home / End on the tab row) shows its panel. In the theme
   *   editor, selecting a Tab block shows its panel.
   * - Scrolling strip: the arrows scroll by about one screen of cards and turn off at either end (checked
   *   again on scroll and on resize; right-to-left pages too).
   * All listeners on one AbortController: the editor can attach the element again (a moved section).
   */
  class ProductListUI extends HTMLElement {
    connectedCallback() {
      this.controller = new AbortController();
      const { signal } = this.controller;

      // Tabs: each Tab block drew its own button (hidden in the block); move them into the tab row, in
      // block order, and show one panel (the one already chosen after an editor re-attach, else the first)
      this.tablist = this.querySelector('[data-tablist]');
      this.tabs = [...this.querySelectorAll('[data-tab]')];
      if (this.tablist && this.tabs.length) {
        this.tablist.append(...this.tabs);
        // The tab row is named after the heading block (its h2), else it keeps "Product tabs"
        const heading = this.querySelector('.product-list__flow h2')?.textContent.trim();
        if (heading) this.tablist.setAttribute('aria-label', heading);
        this.select(this.tabs.find((tab) => tab.getAttribute('aria-selected') === 'true') || this.tabs[0]);
      }
      this.tabs.forEach((tab) => {
        tab.addEventListener('click', () => this.select(tab), { signal });
        tab.addEventListener('keydown', (event) => this.onTabKey(event, tab), { signal });
      });
      // Theme editor: selecting a Tab block (its panel carries the block's editor attributes) shows it
      if (this.tabs.length && window.Shopify?.designMode) {
        document.addEventListener(
          'shopify:block:select',
          (event) => {
            const tab = this.tabs.find((item) => item.getAttribute('aria-controls') === event.target.id);
            if (tab) this.select(tab);
          },
          { signal }
        );
      }

      this.track = this.querySelector('[data-strip-track]');
      this.prev = this.querySelector('[data-strip-prev]');
      this.next = this.querySelector('[data-strip-next]');
      if (this.track && this.prev && this.next) {
        this.prev.addEventListener('click', () => this.scrollStrip(-1), { signal });
        this.next.addEventListener('click', () => this.scrollStrip(1), { signal });
        this.track.addEventListener('scroll', () => this.updateArrows(), { passive: true, signal });
        // A resize, or pictures that load, change how much there is to scroll
        this.resizeObserver = new ResizeObserver(() => this.updateArrows());
        this.resizeObserver.observe(this.track);
        if (this.track.firstElementChild) this.resizeObserver.observe(this.track.firstElementChild);
        this.updateArrows();
      }
    }

    disconnectedCallback() {
      this.controller?.abort();
      this.resizeObserver?.disconnect();
    }

    select(tab, focus = false) {
      this.tabs.forEach((other) => {
        const selected = other === tab;
        other.setAttribute('aria-selected', String(selected));
        other.tabIndex = selected ? 0 : -1; // one tab stop for the whole tab row
        document.getElementById(other.getAttribute('aria-controls'))?.classList.toggle('is-active', selected);
      });
      if (focus) tab.focus();
    }

    onTabKey(event, tab) {
      const index = this.tabs.indexOf(tab);
      const last = this.tabs.length - 1;
      const rtl = getComputedStyle(this).direction === 'rtl';
      const forward = rtl ? 'ArrowLeft' : 'ArrowRight';
      const back = rtl ? 'ArrowRight' : 'ArrowLeft';
      const moves = { [forward]: index === last ? 0 : index + 1, [back]: index === 0 ? last : index - 1, Home: 0, End: last };
      if (!(event.key in moves)) return;
      event.preventDefault();
      this.select(this.tabs[moves[event.key]], true);
    }

    /** "Next" goes along the reading direction (to the left on right-to-left pages) */
    scrollStrip(step) {
      const rtl = getComputedStyle(this.track).direction === 'rtl';
      this.track.scrollBy({ left: step * (rtl ? -1 : 1) * this.track.clientWidth * 0.8 });
    }

    /** Arrows turn off at either end (1px slack for rounding). scrollLeft is 0 or negative in RTL. */
    updateArrows() {
      const { scrollLeft, scrollWidth, clientWidth } = this.track;
      const position = Math.abs(scrollLeft);
      this.prev.disabled = position <= 1;
      this.next.disabled = position + clientWidth >= scrollWidth - 1;
    }
  }

  if (!customElements.get('product-list-ui')) customElements.define('product-list-ui', ProductListUI);

})();

/* sections/product-overview.liquid */
(() => {

  /**
   * <product-overview>: a tap or Enter on a hotspot opens its card (hover and focus open it with CSS);
   * another tap, Escape or a click elsewhere closes it. One card open at a time. Before a card shows,
   * place() puts it beside the dot, on the side with more room, inside the image (below or above the
   * dot when neither side has room).
   */
  class ProductOverview extends HTMLElement {
    connectedCallback() {
      // All listeners through one signal, removed when the element leaves the page (the tabs' pinned
      // track moves it, which runs connectedCallback again: without this a tap opened and closed a card)
      this.controller = new AbortController();
      const { signal } = this.controller;
      this.media = this.querySelector('.product-overview__media');

      this.addEventListener(
        'click',
        (event) => {
          const dot = event.target.closest('[data-hotspot]');
          if (!dot) return;
          const open = dot.getAttribute('aria-expanded') === 'true';
          this.closeAll();
          dot.parentElement.removeAttribute('data-dismissed'); // a click after Escape opens the card again
          if (!open) this.place(dot.parentElement);
          dot.setAttribute('aria-expanded', String(!open));
        },
        { signal }
      );
      // Hover (mouse and pen: a touch tap is the click above) and keyboard focus show a card too
      this.addEventListener(
        'pointerover',
        (event) => {
          const hotspot = event.target.closest('.product-overview__hotspot');
          if (!hotspot || event.pointerType === 'touch' || hotspot.contains(event.relatedTarget)) return;
          if (!hotspot.querySelector('[aria-expanded="true"]')) this.closeAll(); // one card at a time
          this.place(hotspot);
        },
        { signal }
      );
      this.addEventListener('focusin', (event) => this.place(event.target.closest('.product-overview__hotspot')), {
        signal,
      });
      // A card closed with Escape stays closed until the pointer or focus leaves its hotspot
      ['pointerout', 'focusout'].forEach((type) => {
        this.addEventListener(
          type,
          (event) => {
            const hotspot = event.target.closest('.product-overview__hotspot');
            if (hotspot && !hotspot.contains(event.relatedTarget)) hotspot.removeAttribute('data-dismissed');
          },
          { signal }
        );
      });
      document.addEventListener(
        'click',
        (event) => {
          if (!event.target.closest('[data-hotspot]')) this.closeAll();
        },
        { signal }
      );
      // On the document: a hover card must close with Escape also when the focus is somewhere else. An
      // Escape for another dialog (lightbox, search, drawer) or with no card shown does nothing here
      document.addEventListener(
        'keydown',
        (event) => {
          if (event.key !== 'Escape' || event.defaultPrevented) return;
          if (!this.contains(event.target) && event.target.closest?.('dialog, [aria-modal="true"]')) return;
          const shown = this.shownHotspots();
          if (!shown.length) return;
          this.closeAll();
          shown.forEach((hotspot) => {
            if (hotspot.matches(':hover') || hotspot.querySelector(':focus-visible')) hotspot.setAttribute('data-dismissed', '');
          });
        },
        { signal }
      );
      // A resize or a turned phone changes the image: place the shown cards again
      if (this.media) {
        this.resizeObserver = new ResizeObserver(() => this.shownHotspots().forEach((hotspot) => this.place(hotspot)));
        this.resizeObserver.observe(this.media);
      }
    }

    disconnectedCallback() {
      this.controller?.abort();
      this.resizeObserver?.disconnect();
    }

    /** The hotspots with a card on screen: opened with a tap or Enter, or shown by hover or focus */
    shownHotspots() {
      return [...this.querySelectorAll('.product-overview__hotspot')].filter(
        (hotspot) =>
          !hotspot.hasAttribute('data-dismissed') &&
          (hotspot.matches(':hover') || hotspot.querySelector(':focus-visible, [aria-expanded="true"]'))
      );
    }

    closeAll() {
      this.querySelectorAll('[data-hotspot][aria-expanded="true"]').forEach((dot) => dot.setAttribute('aria-expanded', 'false'));
    }

    /**
     * Puts the card beside the dot on the side with more room; when the card doesn't fit beside it, under
     * the dot (over it near the bottom), centred and kept inside the image, never wider than the image.
     */
    place(hotspot) {
      if (!hotspot || !this.media) return;
      const card = hotspot.querySelector('.product-overview__card');
      const area = this.media.getBoundingClientRect();
      const spot = hotspot.getBoundingClientRect();
      const edge = 8; // room kept to the image's edge
      const gap = 4;
      hotspot.style.setProperty('--card-max', `${Math.max(0, area.width - edge * 2)}px`);
      hotspot.setAttribute('data-placed', ''); // first: the max width applies before the card is measured
      const width = card.offsetWidth;
      const height = card.offsetHeight;
      const roomLeft = spot.left - area.left - gap;
      const roomRight = area.right - spot.right - gap;
      let x;
      let y;
      if (Math.max(roomLeft, roomRight) >= width + edge) {
        x = roomRight >= roomLeft ? spot.right + gap : spot.left - gap - width;
        y = spot.top + spot.height / 2 - height / 2;
      } else {
        x = spot.left + spot.width / 2 - width / 2;
        const below = area.bottom - spot.bottom;
        const above = spot.top - area.top;
        y = below >= height + edge || below >= above ? spot.bottom : spot.top - height;
      }
      x = Math.min(Math.max(x, area.left + edge), area.right - edge - width);
      y = Math.max(Math.min(y, area.bottom - edge - height), area.top + edge);
      hotspot.style.setProperty('--card-left', `${Math.round(x - spot.left)}px`);
      hotspot.style.setProperty('--card-top', `${Math.round(y - spot.top)}px`);
    }
  }

  if (!customElements.get('product-overview')) customElements.define('product-overview', ProductOverview);

})();

/* sections/product-pairs.liquid */
(() => {

  /**
   * <product-pairs>: swaps in Shopify's complementary products (when the product has some), keeps the
   * summary in step with the ticked cards, follows the variant chosen in the Product section, and adds
   * all the ticked products to the cart in one request (the form also works without JavaScript).
   */
  class ProductPairs extends HTMLElement {
    connectedCallback() {
      // The theme editor can attach the section again: one controller, so no listener runs twice
      this.controller?.abort();
      this.controller = new AbortController();
      const { signal } = this.controller;
      this.list = this.querySelector('[data-pairs-list]');
      this.form = this.querySelector('[data-pairs-form]');
      this.button = this.querySelector('[data-pairs-add]');
      if (!this.list || !this.form) return;

      this.addEventListener(
        'change',
        (event) => {
          if (event.target.matches('[data-pair-toggle]')) this.update();
        },
        { signal }
      );
      this.form.addEventListener(
        'submit',
        (event) => {
          event.preventDefault();
          this.addAll();
        },
        { signal }
      );

      // This product's card follows the variant chosen in the Product section only (a Featured product
      // section with the same product sends the same event)
      document.addEventListener(
        'variant:change',
        (event) => {
          if (event.target instanceof Element && event.target.closest('product-page')) {
            this.followVariant(event.detail?.variantId);
          }
        },
        { signal }
      );

      // One request per page, not per attach: a second swap would drop the visitor's ticks
      if (!this.requested) {
        this.requested = true;
        this.loadComplementary();
      }
      this.update();
    }

    disconnectedCallback() {
      this.controller?.abort();
      clearTimeout(this.addedTimer);
      this.resetLabel();
    }

    /** Asks Shopify for this section with the complementary products; uses them if there are any */
    async loadComplementary() {
      if (!this.dataset.url) return;
      try {
        const html = await fetch(this.dataset.url).then((response) => response.text());
        const doc = new DOMParser().parseFromString(html, 'text/html');
        const limit = Number(this.dataset.limit) || 3;
        const cards = [...doc.querySelectorAll('[data-pairs-source="complementary"] [data-pair-card]')].slice(0, limit);
        if (!cards.length) return;
        this.list.querySelectorAll('[data-pair-card]:not([data-pair-current])').forEach((card) => card.remove());
        this.list.append(...cards);
        this.removeAttribute('data-empty');
        this.update();
      } catch (error) {
        // No complementary products this time: the fallback products stay
      }
    }

    /**
     * The current product's card takes the chosen variant (price, name, photo for the flight). A sold-out
     * variant, or a combination that is not a variant (variantId null), unticks the card and locks it;
     * when the visitor picks one in stock again, the card gets its tick back as it was.
     */
    async followVariant(variantId) {
      const card = this.list.querySelector('[data-pair-current]');
      const input = card?.querySelector('[data-pair-toggle]');
      if (!input) return;
      this.variantRequest = variantId;
      let variant = null;
      if (variantId) {
        variant = this.variants(card)[variantId] || (await this.loadVariant(card, variantId));
        // A newer choice came while this one loaded: that one wins
        if (this.variantRequest !== variantId) return;
      }

      if (variant) {
        card.dataset.variantId = variantId;
        card.dataset.price = variant.price;
        card.dataset.quantity = variant.quantity || 1;
        card.dataset.variant = variant.title || '';
        if (variant.image) card.dataset.image = variant.image;
        input.value = variantId;
        card.querySelector('[data-pair-price]').textContent = this.money(variant.price);
      }

      const available = Boolean(variant?.available);
      if (!available && !input.disabled) {
        card.dataset.wasChecked = String(input.checked);
        input.checked = false;
        input.disabled = true;
      } else if (available && input.disabled) {
        input.disabled = false;
        input.checked = card.dataset.wasChecked !== 'false';
      }
      const note = card.querySelector('[data-pair-note]');
      if (note) {
        note.textContent = variant ? this.dataset.labelSoldOut : this.dataset.labelUnavailable;
        note.hidden = available;
      }
      this.update();
    }

    /** The current card's variants, read one time from its JSON (the variants Liquid's loop gives) */
    variants(card) {
      if (!this.variantData) {
        try {
          this.variantData = JSON.parse(card.querySelector('[data-pair-variants]')?.textContent || '{}');
        } catch (error) {
          this.variantData = {};
        }
      }
      return this.variantData;
    }

    /**
     * A variant that is not in the JSON (a product with more variants than the Liquid loop gives): read from the product's
     * .js (Shopify's Ajax product data); null when it fails, so the card locks as "Unavailable"
     */
    async loadVariant(card, variantId) {
      try {
        const root = window.Shopify?.routes?.root || '/';
        const data = await fetch(`${root}products/${card.dataset.handle}.js`).then((response) => response.json());
        const found = data.variants?.find((item) => String(item.id) === String(variantId));
        if (!found) return null;
        const variant = {
          price: found.price,
          available: found.available,
          title: data.variants.length > 1 ? found.title : '',
          image: null,
          quantity: found.quantity_rule?.min || 1,
        };
        this.variants(card)[variantId] = variant;
        return variant;
      } catch (error) {
        return null;
      }
    }

    /** The quantity a card adds: 1, or the variant's minimum (B2B quantity rule) */
    quantity(card) {
      return Number(card.dataset.quantity) || 1;
    }

    ticked() {
      return [...this.list.querySelectorAll('[data-pair-card]')].filter((card) => {
        const input = card.querySelector('[data-pair-toggle]');
        return input?.checked && !input.disabled;
      });
    }

    /** "Product · 30 ml" for a product with options, else the title */
    lineName(card) {
      const { title = '', variant = '' } = card.dataset;
      if (!variant) return title;
      // Functions as replacements: a "      return (this.dataset.labelLine || '[title] · [variant]').replace('[title]', title).replace('[variant]', variant);" or "[variant]" in a title stays as it is
      return (this.dataset.labelLine || '[title] · [variant]')
        .replace('[variant]', () => variant)
        .replace('[title]', () => title);
    }

    /** "Your products": one line per ticked card, the total, and the button (off when nothing is ticked) */
    update() {
      const ticked = this.ticked();
      const lines = this.querySelector('[data-pairs-lines]');
      lines.replaceChildren(
        ...ticked.map((card) => {
          const line = document.createElement('li');
          line.className = 'product-pairs__line';
          const name = document.createElement('span');
          name.textContent = this.lineName(card);
          const price = document.createElement('span');
          price.textContent = this.money(Number(card.dataset.price) * this.quantity(card));
          line.append(name, price);
          return line;
        })
      );
      this.querySelector('[data-pairs-none]').hidden = ticked.length > 0;
      const total = ticked.reduce((sum, card) => sum + Number(card.dataset.price) * this.quantity(card), 0);
      this.querySelector('[data-pairs-total]').textContent = this.money(total);
      if (this.button) this.button.disabled = ticked.length === 0;
    }

    resetLabel() {
      this.button?.classList.remove('is-added');
      const label = this.querySelector('[data-pairs-add-label]');
      if (label && this.dataset.labelAdd) label.textContent = this.dataset.labelAdd;
    }

    /**
     * All the ticked products in one Cart AJAX request. While it adds: a spinner in the button. Then
     * "Added" for 2s, the ticked photos fly to the header cart one after another (the Buy buttons'
     * flight, when that block is on the page), the header count, a live message
     */
    async addAll() {
      const ticked = this.ticked();
      if (!ticked.length || this.busy) return;
      this.busy = true;
      const root = window.Shopify?.routes?.root || '/';
      const label = this.querySelector('[data-pairs-add-label]');
      const message = this.querySelector('[data-pairs-message]');
      this.button.classList.add('is-adding');
      message.hidden = true;

      try {
        const response = await fetch(`${root}cart/add.js`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
          body: JSON.stringify({ items: ticked.map((card) => ({ id: Number(card.dataset.variantId), quantity: this.quantity(card) })) }),
        });
        const data = await response.json().catch(() => ({}));
        // Shopify explains a refused add (e.g. not enough stock) in "description" or "message"
        if (!response.ok) throw new Error(data.description || data.message || '');

        label.textContent = this.dataset.labelAdded;
        this.button.classList.add('is-added');
        clearTimeout(this.addedTimer);
        this.addedTimer = setTimeout(() => this.resetLabel(), 2000);
        const status = this.querySelector('[data-pairs-status]');
        status.textContent = '';
        requestAnimationFrame(() => (status.textContent = this.dataset.labelStatus));
        this.fly(ticked);
        // The header's <cart-count> refreshes the count (and tells the cart page)
        document.dispatchEvent(new CustomEvent('cart:changed'));
      } catch (error) {
        message.textContent = error?.message || this.dataset.labelError;
        message.hidden = false;
      } finally {
        this.button.classList.remove('is-adding');
        this.busy = false;
      }
    }

    /** One photo per ticked card, 150ms apart, from the card's image; reduced motion: one bump only */
    fly(cards) {
      const BuyButtons = customElements.get('buy-buttons');
      if (typeof BuyButtons?.flyToCart !== 'function') return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        BuyButtons.flyToCart(null, null);
        return;
      }
      cards.forEach((card, index) => {
        setTimeout(() => BuyButtons.flyToCart(card.querySelector('.pair-card__media'), card.dataset.image), index * 150);
      });
    }

    /**
     * Cents → the store's money format (Settings > General > Store currency, passed in data-money-format),
     * e.g. "$" + the amount placeholder → "$185.00". Covers Shopify's usual amount placeholders.
     */
    money(cents) {
      const format = this.dataset.moneyFormat || '';
      if (!format) return (cents / 100).toFixed(2);
      const group = (value, decimals, thousands, decimal) => {
        const [whole, fraction] = (value / 100).toFixed(decimals).split('.');
        return whole.replace(/\B(?=(\d{3})+(?!\d))/g, thousands) + (fraction ? decimal + fraction : '');
      };
      return format.replace(/\{\{\s*(\w+)\s*\}\}/, (match, key) => {
        switch (key) {
          case 'amount_no_decimals':
            return group(cents, 0, ',', '.');
          case 'amount_with_comma_separator':
            return group(cents, 2, '.', ',');
          case 'amount_no_decimals_with_comma_separator':
            return group(cents, 0, '.', ',');
          case 'amount_with_apostrophe_separator':
            return group(cents, 2, "'", '.');
          default:
            return group(cents, 2, ',', '.');
        }
      });
    }
  }

  if (!customElements.get('product-pairs')) customElements.define('product-pairs', ProductPairs);

})();

/* sections/product-panels.liquid */
(() => {

  /**
   * <product-panels>: opens the strip the visitor points at, tabs to or taps (class is-active).
   * Touch: the first tap on a closed strip only opens it; a second tap follows its link.
   */
  class ProductPanels extends HTMLElement {
    connectedCallback() {
      this.panels = [...this.querySelectorAll('[data-panel]')];
      this.rowGroups = null; // measured again by the first syncRows (the section may have moved)
      if (this.panels.length < 2) return;

      /*
        One AbortController for every listener: disconnectedCallback aborts it, which removes them all
        at once. The theme editor re-attaches the section when it is moved, so connectedCallback runs
        again; without this, each strip would get a second set of listeners.
      */
      this.abortController = new AbortController();
      const { signal } = this.abortController;

      this.panels.forEach((panel) => {
        panel.addEventListener(
          'pointerenter',
          (event) => {
            if (event.pointerType === 'mouse') this.open(panel);
          },
          { signal }
        );
        panel.addEventListener(
          'focusin',
          (event) => {
            /*
              A tap focuses the link BEFORE the click event (Android Chrome). If focus opened the strip
              here, the click would find it open and follow the link on the first tap. So focus from a
              touch / pen press on this strip (less than 1s ago) is left to the click handler.
            */
            const fromTouch =
              this.lastPointer !== 'mouse' &&
              this.pointerPanel === panel &&
              event.timeStamp - this.pointerTime < 1000;
            if (!fromTouch) this.open(panel);
          },
          { signal }
        );
        panel.addEventListener(
          'pointerdown',
          (event) => {
            this.lastPointer = event.pointerType;
            this.pointerPanel = panel;
            this.pointerTime = event.timeStamp;
          },
          { signal }
        );
        panel.addEventListener(
          'click',
          (event) => {
            // Touch: the first tap opens a closed strip, a second tap follows its link.
            if (!this.opensOnTap()) return;
            if (this.lastPointer !== 'mouse' && !panel.classList.contains('is-active')) {
              event.preventDefault();
              this.open(panel);
            }
          },
          { signal }
        );
      });

      /*
        The rows change with the screen width (3, 4, 5 or 7 per row), so every row must keep exactly
        one open strip. A ResizeObserver on the section checks it after each size change (also when
        the theme editor's preview changes width).
      */
      this.resizeObserver = new ResizeObserver(() => this.syncRows());
      this.resizeObserver.observe(this);
      signal.addEventListener('abort', () => this.resizeObserver.disconnect());
    }

    disconnectedCallback() {
      this.abortController?.abort(); // removes every listener added with its signal
    }

    /*
      Groups the strips into the rows the browser drew: strips with the same top edge are in one row.
      The phone layouts count as one group: the phone grid opens one tile in the whole grid.
    */
    rows() {
      if (!window.matchMedia('(min-width: 750px)').matches) return [this.panels];
      const rows = new Map();
      this.panels.forEach((panel) => {
        const top = panel.offsetTop;
        if (!rows.has(top)) rows.set(top, []);
        rows.get(top).push(panel);
      });
      return [...rows.values()];
    }

    /*
      Each row keeps its open strip; a row with none (or more than one) opens its first strip.
      The rows are kept in this.rowGroups: they only change when the width changes, so open() (on
      every hover) doesn't measure the strips again.
      A hidden section (display: none) has no layout: every offsetTop is 0, so all strips would look
      like one row. Then nothing changes, and the rows are measured when it shows again.
    */
    syncRows() {
      if (this.offsetWidth === 0) return;
      this.rowGroups = this.rows();
      this.rowGroups.forEach((row) => {
        const open = row.filter((panel) => panel.classList.contains('is-active'));
        if (open.length === 1) return;
        row.forEach((panel, index) => {
          const keep = open.length ? panel === open[0] : index === 0;
          panel.classList.toggle('is-active', keep);
        });
      });
    }

    /*
      Strips open on tap on desktop widths and in the phone grid. The phone slider and "one per row"
      layouts show every card fully, so a tap there goes straight to the product.
    */
    opensOnTap() {
      if (window.matchMedia('(min-width: 750px)').matches) return true;
      return this.classList.contains('product-panels--mobile-grid');
    }

    /* Opens a strip and closes the others in its row only (other rows keep their open strip) */
    open(panel) {
      const groups = this.rowGroups || this.rows();
      const row = groups.find((group) => group.includes(panel)) || this.panels;
      row.forEach((item) => item.classList.toggle('is-active', item === panel));
    }
  }

  if (!customElements.get('product-panels')) {
    customElements.define('product-panels', ProductPanels);
  }

})();

/* sections/product-related.liquid */
(() => {

  /**
   * <product-related>: when the section comes near the screen, asks Shopify for this same section with
   * the related products (data-url, intent=related) and swaps in its grid. Nothing related: the
   * fallback products stay (or the section stays hidden).
   */
  class ProductRelated extends HTMLElement {
    connectedCallback() {
      if (this.started || !this.dataset.url) return;
      // Only when it's close (no request for visitors who never scroll this far, none during page load).
      // A hidden section has no box to watch: its Shopify wrapper stays in the page with zero height, and
      // an IntersectionObserver still reports a zero-height element once it is in range
      const watched = this.closest('.shopify-section') || this;
      this.observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) this.start();
      }, { rootMargin: '0px 0px 600px 0px' });
      this.observer.observe(watched);
    }

    disconnectedCallback() {
      this.observer?.disconnect();
    }

    async start() {
      if (this.started) return;
      this.started = true;
      this.observer?.disconnect();
      try {
        const response = await fetch(this.dataset.url);
        if (!response.ok) return;
        const doc = new DOMParser().parseFromString(await response.text(), 'text/html');
        const result = doc.querySelector('[data-related-response]');
        const grid = result?.querySelector('[data-related-grid]');
        if (!grid || Number(result.dataset.count) === 0) return;
        this.querySelector('[data-related-slot]').replaceChildren(grid);
        this.hidden = false;
      } catch (error) {
        // No related products this time: the fallback products (or nothing) stay
      }
    }
  }

  if (!customElements.get('product-related')) customElements.define('product-related', ProductRelated);

})();

/* sections/product-reviews.liquid */
(() => {

  /**
   * <product-reviews>: review cards in a window of data-visible cards, and a floating product image that
   * rises up the left side to the tabs bar. Card motion (data-motion):
   * - "scroll" (default): scrolling moves the cards and the image, and scrolling back reverses them.
   *   Inside the tabs' pinned block the section asks for extra scroll (data-tab-scroll) and the tabs send
   *   its progress (tab:progress, 0–1); anywhere else the progress comes from where the section is on
   *   screen.
   * - "auto": one step every data-autoplay ms (pause button; keyboard focus holds it; only on screen and
   *   while its panel shows; off with reduced motion), plus arrows.
   * - "buttons": arrows only.
   * A step slides the track up one card (--index x --step) and the cards tilt and settle. Timer / buttons
   * are endless: copies of the first cards follow the last ones, and after sliding onto them the track
   * jumps back to the start without a transition (they look the same, so the jump is invisible).
   */
  class ProductReviews extends HTMLElement {
    /**
     * The floating image's path, bottom to top (Figma image strip): progress, share of the rise, sideways
     * shift (rem), tilt (deg). At the last point it meets the tabs bar; after it, it slips under and fades.
     */
    static floatPath = [
      [0, 0, 0, 12],
      [0.25, 0.25, 0.3, -15],
      [0.5, 0.5, -0.2, 20],
      [0.75, 0.75, 0.3, -3],
      [0.92, 1, 0, -25],
    ];

    connectedCallback() {
      // Listeners go through this signal: the tabs' pinned track moves the section in the page, which
      // runs connectedCallback again (see product-how-to)
      this.controller = new AbortController();
      const { signal } = this.controller;
      // Set again by setUpScroll when the section is not pinned; pinned, the tabs send the progress
      // (an onScroll left from before a move into the pinned track would fight tab:progress)
      this.onScroll = null;
      this.motion = this.dataset.motion || 'scroll';
      this.floatMode = this.dataset.float || 'hide';
      this.float = this.querySelector('.product-reviews__float');

      // The big word fills in once the section has been on screen
      this.seenObserver = new IntersectionObserver(([entry]) => {
        if (!entry.isIntersecting) return;
        this.classList.add('is-seen');
        this.seenObserver.disconnect();
      }, { threshold: 0.3 });
      this.seenObserver.observe(this);

      this.writeLink(signal);
      this.carousel = this.hasAttribute('data-carousel') && this.setUpCarousel(signal);

      this.resizeObserver = new ResizeObserver(() => {
        this.measure();
        this.measureFloat();
        this.onScroll?.(); // a panel that was hidden shows: place the cards for where it is now
      });
      this.resizeObserver.observe(this);
      if (this.float) this.resizeObserver.observe(this.float);

      if (this.motion === 'scroll') this.setUpScroll(signal);
      else if (this.carousel && this.dataset.autoplay) this.setUpAutoplay(signal);
    }

    disconnectedCallback() {
      this.controller?.abort();
      this.seenObserver?.disconnect();
      this.resizeObserver?.disconnect();
      this.observer?.disconnect();
      this.classObserver?.disconnect();
      clearInterval(this.timer);
      this.playing = false;
    }

    /**
     * "Write a review" pointing at the app's area on this page: inside the tabs' pinned block the page
     * position of a panel isn't where it shows, so the tabs work out the scroll (reveal)
     */
    writeLink(signal) {
      const link = this.querySelector('[data-reviews-write]');
      const href = link?.getAttribute('href') || '';
      if (!href.startsWith('#')) return;
      link.addEventListener('click', (event) => {
        const target = document.getElementById(href.slice(1));
        const tabs = document.querySelector('product-tabs');
        if (target && tabs?.reveal?.(target)) event.preventDefault();
      }, { signal });
    }

    /* ---------- Cards ---------- */

    setUpCarousel(signal) {
      this.track = this.querySelector('[data-reviews-track]');
      if (!this.track) return false;
      this.visible = Number(this.dataset.visible) || 3;
      this.cards = [...this.track.children].filter((card) => !card.hasAttribute('data-clone'));
      this.count = this.cards.length;
      this.index ??= 0;
      this.active = this.count > this.visible;
      // Endless only for the timer / buttons; on scroll the cards run from the first to the last
      if (this.motion !== 'scroll') this.addClones();
      this.classList.add('is-ready');
      this.measure();

      this.querySelector('[data-reviews-prev]')?.addEventListener('click', () => this.go(this.index - 1), { signal });
      this.querySelector('[data-reviews-next]')?.addEventListener('click', () => this.go(this.index + 1), { signal });
      this.track.addEventListener('transitionend', (event) => {
        if (event.target === this.track && event.propertyName === 'transform') this.settle();
      }, { signal });

      // Theme editor: a review picked in the sidebar comes into the window and the carousel holds there
      this.addEventListener('shopify:block:select', (event) => {
        const i = this.cards.indexOf(event.target);
        if (i < 0 || !this.active) return;
        this.editorHold = true;
        this.jump(Math.min(i, this.count - this.visible));
        this.updatePlay();
      }, { signal });
      this.addEventListener('shopify:block:deselect', () => {
        this.editorHold = false;
        this.updatePlay();
      }, { signal });
      return true;
    }

    /** Copies of the first cards after the last ones (hidden from screen readers and the keyboard) */
    addClones() {
      if (this.track.querySelector('[data-clone]')) return;
      this.cards.slice(0, this.visible).forEach((card) => {
        const clone = card.cloneNode(true);
        clone.setAttribute('data-clone', '');
        clone.setAttribute('aria-hidden', 'true');
        clone.removeAttribute('data-shopify-editor-block');
        clone.inert = true;
        this.track.append(clone);
      });
    }

    /** One step = a card's height + the gap (all rows are equal: grid-auto-rows: 1fr) */
    measure() {
      const first = this.cards?.[0];
      if (!first) return;
      const gap = parseFloat(getComputedStyle(this.track).rowGap) || 0;
      const step = first.offsetHeight + gap;
      this.style.setProperty('--step', `${step}px`);
      this.style.setProperty('--viewport-height', `${step * this.visible - gap}px`);
      this.update();
    }

    /** Fades the cards outside the window */
    update() {
      [...this.track.children].forEach((card, n) => {
        card.classList.toggle('is-out', this.active && (n < this.index || n >= this.index + this.visible));
      });
      this.style.setProperty('--index', this.index);
    }

    /** Slides to card i: the track moves, the cards tilt and settle */
    slideTo(i) {
      this.index = i;
      this.classList.add('is-sliding');
      // Restart the tilt: remove the class, force a reflow, add it again
      this.classList.remove('is-tilting');
      void this.offsetWidth;
      this.classList.add('is-tilting');
      this.update();
      // Reduced motion (no transition) or a missed transitionend: settle anyway
      clearTimeout(this.settleTimer);
      this.settleTimer = setTimeout(() => this.settle(), 1000);
    }

    /** Timer / buttons: one step (endless). Before going back from the first card, jump onto its copy */
    go(i) {
      if (this.busy || !this.active) return;
      const forward = i > this.index;
      if (i < 0) {
        this.jump(this.count);
        i = this.count - 1;
      }
      this.busy = true;
      this.slideTo(i);
      this.moveFloat(this.placeFor(i % this.count), forward);
    }

    /** After a slide: on the copies, jump back to the real first card */
    settle() {
      clearTimeout(this.settleTimer);
      this.busy = false;
      this.classList.remove('is-sliding');
      if (this.index >= this.count) this.jump(this.index - this.count);
    }

    /** Moves without a transition (the cards' fade too: the real first cards must not fade in) */
    jump(i) {
      this.classList.remove('is-sliding');
      this.classList.add('is-jumping');
      this.index = i;
      this.update();
      void this.offsetWidth;
      this.classList.remove('is-jumping');
    }

    /* ---------- Scroll ---------- */

    setUpScroll(signal) {
      // The scroll in equal stretches: one per card position (the first cards, then each step) and a
      // last one where the image leaves under the tabs. Card and image change together (back up = back).
      // The steps are read each time: the floating image shows only from 1200px, so the last stretch
      // (the image leaves) comes and goes with the screen width
      const apply = (progress) => {
        if (progress === this.progress) return;
        const steps = this.carousel && this.active ? Math.max(0, this.count - this.visible) : 0;
        // The last stretch (the image leaves) only when the image shows (hidden below 1200px)
        const stretches = steps + (this.float?.offsetParent ? 2 : 1);
        const forward = progress > (this.progress ?? 0);
        this.progress = progress;
        const stretch = Math.min(stretches - 1, Math.floor(progress * stretches));
        const card = Math.min(stretch, steps);
        if (steps > 0 && card !== this.index) this.slideTo(card);
        this.moveFloat(stretch > steps ? 'out' : this.placeFor(card), forward);
      };

      // Pinned under the tabs: the section doesn't move on screen, the tabs send the progress
      if (this.closest('.product-tabs-track')) {
        this.addEventListener('tab:progress', (event) => apply(event.detail), { signal });
        return;
      }
      // Anywhere else (phones, tablets, no tabs): from the card window itself, while its centre moves
      // from 85% to 15% of the screen height, so the visitor sees each step (the whole section is much
      // taller than the window: measured from it, the cards had reached the last step before they
      // showed). A hidden panel (the phone tabs show one at a time) has no size: skipped, and placed
      // again when it shows (the ResizeObserver calls onScroll)
      const onScroll = () => {
        const box = (this.querySelector('.product-reviews__viewport') || this).getBoundingClientRect();
        if (!box.height) return;
        const screen = window.innerHeight;
        const centre = box.top + box.height / 2;
        apply(Math.min(1, Math.max(0, (screen * 0.85 - centre) / (screen * 0.7))));
      };
      this.onScroll = onScroll;
      let ticking = false;
      window.addEventListener('scroll', () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(() => {
          ticking = false;
          onScroll();
        });
      }, { passive: true, signal });
      onScroll();
    }

    /* ---------- Floating image ---------- */

    /** Where the image rests in the section (offsetTop ignores its own translate / rotate) */
    measureFloat() {
      if (!this.float?.offsetParent) return; // hidden (phones)
      this.floatBase = this.float.offsetParent.offsetTop + this.float.offsetTop;
      this.updateRise();
      this.placeFloat(this.floatProgress || 0);
    }

    /**
     * How far the image rises: from its resting place to the bottom of the tabs bar. Pinned, measured
     * live from the bar's place on screen: a panel taller than the screen has been slid up by the tabs
     * (by its extra height) before the card steps start, so the line isn't a fixed distance from the
     * section's top. Not pinned: to the section's top edge
     */
    updateRise() {
      if (this.floatBase === undefined) return;
      let line = 0;
      if (this.closest('.product-tabs-track')) {
        const bar = document.querySelector('product-tabs')?.closest('.shopify-section');
        if (bar) line = bar.getBoundingClientRect().bottom - this.getBoundingClientRect().top;
      }
      this.rise = Math.max(0, this.floatBase - line);
    }

    /**
     * Places the image at progress p (0 = bottom, 1 = gone under the tabs): between two points of the
     * path, its rise, sideways shift and tilt are mixed in proportion (linear interpolation)
     */
    placeFloat(p, fadeIn = false) {
      if (!this.float || this.rise === undefined) return;
      const path = ProductReviews.floatPath;
      let k = path.length - 1;
      while (k > 0 && p < path[k][0]) k -= 1;
      const a = path[k];
      const b = path[Math.min(k + 1, path.length - 1)];
      const t = b === a ? 0 : (p - a[0]) / (b[0] - a[0]);
      const mix = (n) => a[n] + (b[n] - a[n]) * t;
      // After the last point: under the bar by up to half its height, fading out
      const last = path[path.length - 1];
      const after = p > last[0] ? (p - last[0]) / (1 - last[0]) : 0;
      const y = mix(1) * this.rise + after * this.float.offsetHeight * 0.5;
      let opacity = 1 - after;
      if (fadeIn) opacity = Math.min(opacity, p / 0.08);
      this.float.style.translate = `${mix(2)}rem ${-y}px`;
      this.float.style.rotate = `${mix(3)}deg`;
      this.float.style.opacity = String(opacity);
    }

    /**
     * The image's place for card i (Figma strip: one place per card row, four below the tabs). "hide":
     * after the fourth it leaves ('out'); "repeat": it starts again at the bottom (i modulo 4)
     */
    placeFor(i) {
      const places = ProductReviews.floatPath.length - 1;
      if (this.floatMode === 'repeat') return i % places;
      return i < places ? i : 'out';
    }

    /**
     * Eases the image to a place (0–3 on the path, or 'out' = gone under the tabs). Going forward to a
     * lower place (repeat) or back from 'out', it first leaves under the tabs, then comes in at the
     * bottom unseen and eases up to its place
     */
    moveFloat(place, forward = true) {
      if (!this.float || place === this.floatAt) return;
      this.updateRise();
      const previous = this.floatAt ?? 0;
      this.floatAt = place;
      clearTimeout(this.floatTimer);
      this.classList.add('is-float-easing');
      const p = place === 'out' ? 1 : place / (ProductReviews.floatPath.length - 1);
      const around = forward && place !== 'out' && (previous === 'out' || place < previous);
      if (!around) {
        this.floatProgress = p;
        this.placeFloat(p);
        return;
      }
      const comeBack = () => {
        // At the bottom, see-through, without a transition for one frame; then it eases up and in
        this.classList.remove('is-float-easing');
        this.placeFloat(0, true);
        void this.float.offsetWidth;
        this.classList.add('is-float-easing');
        this.floatProgress = p;
        this.placeFloat(p);
      };
      if (previous === 'out') {
        comeBack();
        return;
      }
      this.floatProgress = 1;
      this.placeFloat(1);
      this.floatTimer = setTimeout(comeBack, 900);
    }

    /* ---------- Timer ---------- */

    setUpAutoplay(signal) {
      const delay = Number(this.dataset.autoplay);
      if (!delay) return;
      this.delay = delay;
      // Reduced motion: no autoplay and no pause button; followed when the visitor changes it
      this.reducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.reducedMotion.addEventListener('change', () => this.updatePlay(), { signal });
      this.inView = false;
      this.held = false;
      this.stopped ??= false;

      this.observer = new IntersectionObserver(([entry]) => {
        this.inView = entry.isIntersecting;
        this.updatePlay();
      }, { threshold: 0.35 });
      this.observer.observe(this);

      const pause = this.querySelector('[data-reviews-pause]');
      pause?.addEventListener('click', () => {
        this.stopped = !this.stopped;
        const label = this.stopped ? pause.dataset.labelPlay : pause.dataset.labelPause;
        pause.querySelector('[data-pause-label]').textContent = label;
        this.classList.toggle('is-stopped', this.stopped);
        this.updatePlay();
      }, { signal });

      // Keyboard focus holds it (not a mouse click on a button: it keeps focus). No hover pause: as in
      // How to use, a mouse resting on the section looked like a freeze; the pause button is there
      const hold = () => {
        this.held = Boolean(this.querySelector(':focus-visible'));
        this.updatePlay();
      };
      this.addEventListener('focusin', hold, { signal });
      this.addEventListener('focusout', () => requestAnimationFrame(hold), { signal });

      // Inside the tabs' pinned block: hidden panels (is-tab-faded / is-tab-hidden) don't play
      const wrapper = this.closest('.shopify-section');
      if (wrapper) {
        this.classObserver = new MutationObserver(() => this.updatePlay());
        this.classObserver.observe(wrapper, { attributes: true, attributeFilter: ['class'] });
      }
      this.updatePlay(); // with reduced motion the pause button hides at once
    }

    updatePlay() {
      if (!this.delay) return;
      const reduced = this.reducedMotion.matches;
      const pause = this.querySelector('[data-reviews-pause]');
      if (pause) {
        const hide = reduced || !this.active;
        // A focused button that hides would drop the focus to the page: move it to the next arrow
        if (hide && !pause.hidden && pause === document.activeElement) this.querySelector('[data-reviews-next]')?.focus();
        pause.hidden = hide;
      }
      const hidden = Boolean(this.closest('.is-tab-faded, .is-tab-hidden'));
      const play = this.active && !reduced && this.inView && !hidden && !this.held && !this.stopped && !this.editorHold;
      if (play === this.playing) return;
      this.playing = play;
      clearInterval(this.timer);
      if (play) this.timer = setInterval(() => this.go(this.index + 1), this.delay);
    }
  }

  if (!customElements.get('product-reviews')) customElements.define('product-reviews', ProductReviews);

})();

/* sections/product-tabs.liquid */
(() => {

  /**
   * <product-tabs>: the tabs bar of the product page's detail ("panel") sections (data-layout):
   * - "tabbed": one section at a time.
   *   - Scroll: the panels are pinned under the tabs and scrolling moves from one to the next (a "track"
   *     one screen per panel, with a sticky stage holding the panels in the same place). After the last
   *     panel the page carries on.
   *   - Click: a tab scrolls to its panel's part of the track.
   *   - Each panel fills the screen under the tabs; a taller one slides up while pinned until its bottom
   *     shows. Pinning needs a screen at least 990px wide, motion allowed and the storefront (not the
   *     theme editor, where moving sections around could confuse it). Otherwise a click swaps the panel
   *     in place and the others are hidden (.is-tab-hidden, still in the HTML).
   *   The URL hash follows (#highlights) and a link to /products/x#highlights opens that tab.
   * - "stacked": all sections on the page; a click scrolls to one and the tab of the section crossing a
   *   band 40% down the screen is filled as you scroll.
   * Only sections below the bar count; tabs whose section isn't there hide themselves, and with none
   * the bar hides (editor: a note). ↑ goes back to the top. Every listener is on one AbortController
   * (the editor attaches a moved section again: connectedCallback runs again).
   */
  class ProductTabs extends HTMLElement {
    connectedCallback() {
      this.controller = new AbortController();
      const { signal } = this.controller;
      this.layout = this.dataset.layout || 'tabbed';
      this.section = this.closest('.shopify-section') || this;
      this.links = [...this.querySelectorAll('[data-tab-target]')];
      this.list = this.querySelector('.product-tabs__list');
      this.row = this.querySelector('[data-tabs-row]');

      window.addEventListener('resize', () => this.onResize(), { signal });
      window.addEventListener('scroll', () => this.queueEnd(), { passive: true, signal });
      window
        .matchMedia('(prefers-reduced-motion: reduce)')
        .addEventListener('change', () => this.restart(), { signal });

      // The scroll line and the faded edges of a row that scrolls sideways (fonts change the widths too)
      this.list?.addEventListener('scroll', () => this.updateRow(), { passive: true, signal });
      if (this.list) {
        this.rowObserver = new ResizeObserver(() => this.updateRow());
        [this.list, ...this.links].forEach((element) => this.rowObserver.observe(element));
      }

      this.querySelector('[data-tabs-top]')?.addEventListener(
        'click',
        (event) => {
          event.preventDefault();
          window.scrollTo({ top: 0, behavior: this.reducedMotion() ? 'auto' : 'smooth' });
          // Keyboard: the next Tab starts at the top of the page, not back in the panels
          document.getElementById('MainContent')?.focus({ preventScroll: true });
        },
        { signal }
      );

      this.addEventListener(
        'click',
        (event) => {
          const link = event.target.closest('[data-tab-target]');
          if (!link || this.layout !== 'tabbed' || !this.targets.has(link.dataset.tabTarget)) return;
          event.preventDefault();
          this.select(link.dataset.tabTarget, true);
        },
        { signal }
      );

      if (window.Shopify?.designMode) {
        // Selecting a hidden section in the sidebar opens its tab
        document.addEventListener('shopify:section:select', (event) => this.onEditorSelect(event), { signal });
        // A section changed, added, removed or moved: check the panels again (after 50ms: an unloaded
        // section is gone by then)
        ['shopify:section:load', 'shopify:section:unload', 'shopify:section:reorder'].forEach((type) => {
          document.addEventListener(
            type,
            (event) => {
              if (this.section.id === `shopify-section-${event.detail?.sectionId}`) return;
              clearTimeout(this.restartTimer);
              this.restartTimer = setTimeout(() => this.onEditorChange(), 50);
            },
            { signal }
          );
        });
      }

      this.start(true);
    }

    disconnectedCallback() {
      this.controller?.abort();
      this.rowObserver?.disconnect();
      [this.resizeTimer, this.restartTimer, this.measureTimer, this.jumpTimer].forEach(clearTimeout);
      this.stop();
    }

    /** Finds the sections, then sets up the chosen layout */
    start(initial) {
      this.collect();
      this.updateRow();
      const empty = !this.targets.size;
      const designMode = Boolean(window.Shopify?.designMode);
      this.section.classList.toggle('is-tabs-empty', empty && !designMode);
      const note = this.querySelector('[data-tabs-note]');
      if (note) note.hidden = !empty;
      this.measureBar();
      this.overlap();
      if (!empty) {
        if (this.layout === 'tabbed') this.setUpTabbed(initial);
        else this.setUpStacked();
      }
      this.followEnd();
    }

    /** Puts every panel back as it was (shown, in its place in the page) */
    stop() {
      cancelAnimationFrame(this.pinFrame);
      clearTimeout(this.jumpTimer);
      window.removeEventListener('scrollend', this.finishJump);
      this.jumpTo = null;
      this.observer?.disconnect();
      this.observer = null;
      this.unpin();
      document
        .querySelectorAll('.is-tab-hidden, .is-tab-faded')
        .forEach((wrapper) => wrapper.classList.remove('is-tab-hidden', 'is-tab-faded'));
      this.activeId = null;
      this.links.forEach((link) => link.removeAttribute('aria-current'));
    }

    /** Builds everything again, on the same tab (editor changes, a new width, reduced motion changed) */
    restart() {
      if (!this.isConnected) return;
      this.keepId = this.activeId;
      this.stop();
      this.start(false);
    }

    /**
     * The tab targets: elements with the tab's id that sit BELOW the bar (a section above it would be
     * pulled into the pinned track under the bar). The others' tabs hide.
     */
    collect() {
      this.targets = this.findTargets();
      this.links.forEach((link) => {
        link.closest('li').hidden = !this.targets.has(link.dataset.tabTarget);
      });
      this.ids = [...this.targets.keys()];
    }

    /** tab id → its target element (only targets below the bar), in tab order */
    findTargets() {
      const targets = new Map();
      this.links.forEach((link) => {
        const id = link.dataset.tabTarget;
        const target = document.getElementById(id);
        const below =
          Boolean(target) &&
          !this.section.contains(target) &&
          Boolean(this.section.compareDocumentPosition(target) & Node.DOCUMENT_POSITION_FOLLOWING);
        if (below && !targets.has(id)) targets.set(id, target);
      });
      return targets;
    }

    /**
     * Editor: a section was loaded, removed or moved. Build the tabs again only when the panels changed
     * (another element, one more or less, one moved above the bar). Any other section (the header too:
     * "Solid header background" changes --header-space) only needs the bar measured again.
     */
    onEditorChange() {
      if (!this.isConnected) return;
      const next = this.findTargets();
      const keys = [...next.keys()];
      const same =
        keys.length === this.ids.length && keys.every((id, i) => id === this.ids[i] && next.get(id) === this.targets.get(id));
      if (!same) {
        this.restart();
        return;
      }
      this.measureBar();
      this.overlap();
      this.followEnd();
    }

    onResize() {
      this.measureBar();
      this.overlap();
      this.followEnd();
      if (this.layout !== 'tabbed' || !this.targets?.size) return;
      // Inside the track: remember the panel and how far into its part the visitor is, at the FIRST
      // resize event (before the panels' ResizeObserver measures the new heights), so the new heights
      // don't move them to another panel
      if (this.track && !this.place) this.place = this.trackPlace();
      clearTimeout(this.resizeTimer);
      this.resizeTimer = setTimeout(() => {
        const place = this.place;
        this.place = null;
        // Build the track again only when pinning starts or stops (e.g. across 990px): rebuilding takes
        // the track out of the page and the visitor loses their place. Otherwise a pinned track only
        // gets the new stage size (a new width, or a phone address bar showing / hiding).
        if (this.canPin() !== Boolean(this.track)) {
          this.restart();
        } else if (this.track) {
          this.room = Math.max(320, window.innerHeight);
          this.stageOffset = this.barTop + this.section.offsetHeight;
          this.track.style.setProperty('--stage-height', `${this.room}px`);
          this.track.style.setProperty('--stage-offset', `${this.stageOffset}px`);
          this.remeasure(place);
        }
      }, 200);
    }

    /** The panel the scroll is in and how far into its part of the track (null: not inside the track) */
    trackPlace() {
      if (!this.track || this.jumpTo) return null;
      const passed = -this.track.getBoundingClientRect().top;
      if (passed < 0 || passed >= this.track.offsetHeight - this.room) return null;
      let index = this.starts.length - 1;
      while (index > 0 && passed < this.starts[index]) index -= 1;
      return { index, into: passed - this.starts[index] };
    }

    /**
     * Measures the track again (new panel heights) and keeps the visitor at the same place in the same
     * panel. Not during a tab click's jump (place = null): the jump has its own target.
     */
    remeasure(place = this.trackPlace()) {
      if (!this.track) return;
      this.measure();
      if (place && !this.jumpTo) {
        const { index, into } = place;
        const end = (this.starts[index + 1] ?? this.track.offsetHeight - this.room) - this.starts[index];
        const top = this.track.getBoundingClientRect().top + window.scrollY + this.starts[index];
        window.scrollTo({ top: top + Math.min(into, end - 1), behavior: 'instant' });
      }
      this.onScroll?.();
    }

    /** Pinning needs a desktop-sized screen, the storefront (not the editor), motion and 2+ panels */
    canPin() {
      return (
        window.matchMedia('(min-width: 990px)').matches &&
        !window.Shopify?.designMode &&
        !this.reducedMotion() &&
        this.ids.length > 1
      );
    }

    /** The bar's sticky top (px), read once per size instead of on every scroll frame */
    measureBar() {
      this.barTop = parseFloat(getComputedStyle(this.section).top) || 0;
    }

    /**
     * The tabs section takes no room in the page (a negative bottom margin as tall as itself): the next
     * section starts under the pill, so its own colour shows around the pill, as in the Figma, instead of
     * the page's colour (the first colour scheme, set on <body>).
     */
    overlap() {
      if (this.section === this) return;
      this.section.style.marginBlockEnd = `${-this.section.offsetHeight}px`;
    }

    queueEnd() {
      if (this.endTicking) return;
      this.endTicking = true;
      requestAnimationFrame(() => {
        this.endTicking = false;
        this.followEnd();
      });
    }

    /**
     * The bar stays stuck while any of the last section is on screen, then leaves with its end. A sticky
     * element only lets go at the end of its parent (<main>, so after every later section too): instead,
     * once the bottom of the panels (the pinned track, or the lowest section) rises above the bar's
     * bottom, the bar is pushed up by the difference
     */
    followEnd() {
      if (this.section === this || !this.targets?.size) return;
      const ends = this.track ? [this.track] : [...this.targets.values()].map((target) => this.wrapper(target));
      const bottom = Math.max(...ends.map((element) => element.getBoundingClientRect().bottom));
      const push = Math.min(0, bottom - (this.barTop + this.section.offsetHeight));
      this.section.style.translate = push ? `0 ${push}px` : '';
      // Stuck = at its sticky place and not pushed up (the tabs' negative scroll margin needs it)
      const top = this.section.getBoundingClientRect().top;
      this.section.classList.toggle('is-tabs-stuck', !push && Math.abs(top - this.barTop) < 2);
    }

    /**
     * A row that scrolls sideways: data-overflow shows the scroll line (its length = the part you see,
     * its place = how far the row is scrolled), data-more-start / -end fade a cut edge.
     */
    updateRow() {
      if (!this.list || !this.row) return;
      const total = this.list.scrollWidth;
      const view = this.list.clientWidth;
      const overflow = total > view + 1;
      const scrolled = Math.abs(this.list.scrollLeft); // RTL scrollLeft is negative
      this.row.toggleAttribute('data-overflow', overflow);
      this.row.toggleAttribute('data-more-start', overflow && scrolled > 1);
      this.row.toggleAttribute('data-more-end', overflow && scrolled < total - view - 1);
      if (!overflow) return;
      // The line sits in the row, which is 10px narrower than the list (its 5px focus-ring padding and
      // negative margin): scale to the row's width, so the line ends at the row's end edge
      const width = this.row.clientWidth;
      this.row.style.setProperty('--line-size', `${(view / total) * width}px`);
      this.row.style.setProperty('--line-start', `${(scrolled / total) * width}px`);
    }

    reducedMotion() {
      return window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }

    /** The section's Shopify wrapper (the element that is moved / shown / hidden) */
    wrapper(target) {
      return target.closest('.shopify-section') || target;
    }

    /* ---------- Tabbed ---------- */

    setUpTabbed(initial) {
      // A link to a tab (#highlights) or to something inside one (the FAQ form after sending reloads at
      // #ProductFaqForm-…) opens that tab and brings it into view. After a restart: the same tab.
      const hashTarget = initial ? this.hashTarget() : null;
      let first = this.targets.has(this.keepId) ? this.keepId : this.ids[0];
      if (hashTarget) first = this.tabOf(hashTarget);

      this.show(first);
      // Measure after the browser has laid the page out, then pin if everything fits
      this.pinFrame = requestAnimationFrame(() => {
        this.tryPin(first);
        if (hashTarget) this.reveal(hashTarget);
      });
    }

    onEditorSelect(event) {
      if (this.layout !== 'tabbed' || !this.targets?.size) return;
      for (const [id, target] of this.targets) {
        if (this.wrapper(target).id === `shopify-section-${event.detail.sectionId}`) this.select(id, false);
      }
    }

    /** A tab was chosen (click or editor): scroll to the start of its part of the track, or swap it in place */
    select(id, fromClick) {
      if (this.track) {
        // A click jumps straight to the chosen panel: it shows at once, and while the page scrolls to
        // its part of the track the panels in between are skipped (they used to show one by one)
        const index = this.ids.indexOf(id);
        const top = this.track.getBoundingClientRect().top + window.scrollY + this.starts[index] + 1;
        this.jumpTo = id;
        this.show(id);
        window.scrollTo({ top, behavior: this.reducedMotion() ? 'auto' : 'smooth' });
        this.endJump(top);
      } else {
        this.show(id);
        if (fromClick) this.bringIntoView();
      }
      if (fromClick) history.replaceState(history.state, '', `#${id}`);
    }

    /** The element the URL hash points at, if it is one of the panels or inside one */
    hashTarget() {
      const hash = decodeURIComponent(window.location.hash.slice(1));
      const element = hash ? document.getElementById(hash) : null;
      return element && this.tabOf(element) ? element : null;
    }

    /** The tab whose panel holds the element (a panel holds itself) */
    tabOf(element) {
      for (const [id, target] of this.targets || []) {
        if (target.contains(element)) return id;
      }
      return null;
    }

    /**
     * Opens the panel that holds an element and scrolls the element into view under the tabs (a hash
     * into a panel, "Write a review" → the reviews app, the FAQ form after sending). Pinned, a panel's
     * place in the page isn't where it shows: the scroll is worked out from its part of the track (and,
     * in a tall panel, how far it has to slide up). Returns false when it can't help (the element isn't
     * in a panel, or the layout is stacked): the link then works as usual.
     */
    reveal(element) {
      const id = this.tabOf(element);
      if (!id || this.layout !== 'tabbed') return false;
      const behavior = this.reducedMotion() ? 'auto' : 'smooth';
      if (!this.track) {
        this.show(id);
        element.scrollIntoView({ behavior, block: 'start' }); // html's scroll-padding leaves room for the tabs
        return true;
      }
      const index = this.ids.indexOf(id);
      const wrapper = this.wrappers[index];
      // How far down its panel the element sits, less the room the tabs take at the top of the stage
      const offset = element.getBoundingClientRect().top - wrapper.getBoundingClientRect().top - this.stageOffset - 16;
      const slide = Math.min(this.overflows[index], Math.max(0, offset));
      const start = this.track.getBoundingClientRect().top + window.scrollY + this.starts[index];
      const top = start + (slide > 0 ? this.holdStart + slide : 0) + 1;
      this.jumpTo = id;
      this.show(id);
      window.scrollTo({ top, behavior });
      this.endJump(top);
      return true;
    }

    /**
     * The jump is over once the page stops scrolling ("scrollend"; older browsers: when the page reaches
     * the spot, or after 1.5s at the latest); then normal scrolling switches the panels again
     */
    endJump(top) {
      clearTimeout(this.jumpTimer);
      window.removeEventListener('scrollend', this.finishJump);
      const finish = () => {
        clearTimeout(this.jumpTimer);
        window.removeEventListener('scrollend', finish);
        this.jumpTo = null;
        this.onScroll?.();
      };
      this.finishJump = finish; // removed by the next jump or by stop()
      window.addEventListener('scrollend', finish, { once: true });
      this.jumpTimer = setTimeout(finish, 1500);
      requestAnimationFrame(() => {
        if (Math.abs(window.scrollY - top) < 2) finish();
      });
    }

    /** Shows one panel, hides (or, pinned, fades out) the others, fills its tab */
    show(id) {
      // Back = the new panel is before the one shown now: its parts come from the opposite side
      const back = this.activeId != null && this.ids.indexOf(id) < this.ids.indexOf(this.activeId);
      this.targets.forEach((target, key) => {
        const wrapper = this.wrapper(target);
        const coming = this.track && key === id && wrapper.classList.contains('is-tab-faded');
        wrapper.classList.toggle(this.track ? 'is-tab-faded' : 'is-tab-hidden', key !== id);
        wrapper.classList.toggle(this.track ? 'is-tab-hidden' : 'is-tab-faded', false);
        if (this.track) wrapper.inert = key !== id;
        // The new panel: its parts start at the chosen side for one frame, then slide in one by one
        if (coming) {
          wrapper.querySelectorAll('[data-tab-item]').forEach((item, i) => item.style.setProperty('--tab-item', i));
          wrapper.classList.toggle('is-tab-back', back);
          wrapper.classList.add('is-tab-entering');
          requestAnimationFrame(() => requestAnimationFrame(() => wrapper.classList.remove('is-tab-entering')));
        }
      });
      this.setActive(id);
    }

    /**
     * Pinning (storefront, motion allowed): the panels go into a track with a sticky stage under the tabs.
     * Each panel fills the stage (the screen under the tabs). Its part of the track is one stage height
     * (time to read it) plus, for a panel taller than the stage, its extra height: over that extra
     * scroll the panel slides up inside the stage until its bottom shows, then the next panel comes in.
     * A comment marks each panel's place, so unpin() puts every panel back exactly there (a section
     * between two panels stays in the page, after the track while pinned).
     */
    tryPin(current) {
      // Smaller screens (and the editor, reduced motion) switch panels by tapping the tabs
      if (!this.canPin()) return;
      const barBottom = this.barTop + this.section.offsetHeight;
      // The stage is the whole screen; the content starts below the tabs (barBottom)
      const room = Math.max(320, window.innerHeight);
      const wrappers = this.ids.map((id) => this.wrapper(this.targets.get(id)));

      this.markers = wrappers.map((wrapper) => {
        const marker = document.createComment('product-tabs panel');
        wrapper.before(marker);
        return marker;
      });
      // The track goes where the first panel in the page was (tab order and page order can differ)
      const firstMarker = this.markers.reduce((first, marker) =>
        first.compareDocumentPosition(marker) & Node.DOCUMENT_POSITION_PRECEDING ? marker : first
      );

      this.track = document.createElement('div');
      this.track.className = 'product-tabs-track';
      this.track.dataset.transition = this.dataset.transition || 'up';
      this.track.style.setProperty('--stage-offset', `${barBottom}px`);
      this.track.style.setProperty('--stage-height', `${room}px`);
      const stage = document.createElement('div');
      stage.className = 'product-tabs-track__stage';
      this.track.append(stage);
      firstMarker.before(this.track);
      wrappers.forEach((wrapper) => wrapper.classList.remove('is-tab-hidden'));
      stage.append(...wrappers);

      this.room = room;
      this.stageOffset = barBottom;
      this.wrappers = wrappers;
      this.measure();
      // Images load later and change a panel's height: measure again (without rebuilding the track),
      // keeping the visitor's place (taken at the first change, before anything is measured again)
      this.resizeObserver = new ResizeObserver(() => {
        if (!this.measurePlace) this.measurePlace = this.trackPlace();
        clearTimeout(this.measureTimer);
        this.measureTimer = setTimeout(() => {
          const place = this.measurePlace;
          this.measurePlace = null;
          this.remeasure(place);
        }, 100);
      });
      wrappers.forEach((wrapper) => this.resizeObserver.observe(wrapper));

      this.show(current);
      this.onScroll = () => {
        if (this.ticking || !this.track) return;
        this.ticking = true;
        requestAnimationFrame(() => {
          this.ticking = false;
          if (!this.track) return;
          const passed = Math.max(0, -this.track.getBoundingClientRect().top);
          let index = this.starts.length - 1;
          while (index > 0 && passed < this.starts[index]) index -= 1;
          // During a tab click's jump the chosen panel stays (no panels in between)
          if (this.jumpTo) index = this.ids.indexOf(this.jumpTo);
          // A tall panel slides up over its extra scroll; the others sit at the top of the stage
          this.wrappers.forEach((wrapper, i) => {
            const slide = i === index ? Math.min(this.overflows[i], Math.max(0, passed - this.starts[i] - this.holdStart)) : 0;
            wrapper.style.transform = slide > 0 ? `translateY(${-slide}px)` : '';
            // A panel that asked for extra scroll (data-tab-scroll) gets its progress through it, 0–1, on
            // every frame (also when not shown: a fast scroll past it still leaves it at 0 or 1)
            if (this.extras[i]) {
              const local = passed - this.starts[i] - this.holdStart - this.overflows[i];
              const progress = Math.min(1, Math.max(0, local / this.extras[i]));
              this.targets.get(this.ids[i]).dispatchEvent(new CustomEvent('tab:progress', { detail: progress }));
            }
          });
          if (this.ids[index] !== this.activeId) this.show(this.ids[index]);
        });
      };
      window.addEventListener('scroll', this.onScroll, { passive: true }); // removed in unpin()
      this.onScroll();
    }

    /**
     * Each panel's part of the track: a hold at the start, its extra height (measured in the stage, where
     * each panel is at least one stage tall), the scroll it asked for (data-tab-scroll on the section, in
     * screens: e.g. the reviews moving their cards on scroll), a hold at the end. The last panel then holds
     * one more screen before the pinned block lets go (it has to, so the rest of the page and the footer
     * can be reached).
     */
    measure() {
      if (!this.track) return;
      // Reading time: a hold at the start (the panel stays still: read the beginning), the slide-up of a
      // taller panel, a hold at the end before the next panel comes in. "Scroll for each section"
      // (setting, % of a screen, default 50) is shared half and half between the two holds
      const hold = (Number(this.dataset.panelScroll) || 50) / 100 / 2;
      this.holdStart = Math.round(this.room * hold);
      this.holdEnd = Math.round(this.room * hold);
      this.overflows = this.wrappers.map((wrapper) => Math.max(0, wrapper.offsetHeight - this.room));
      this.extras = this.ids.map((id) => Math.round((Number(this.targets.get(id).dataset.tabScroll) || 0) * this.room));
      this.starts = [];
      let total = 0;
      this.overflows.forEach((overflow, i) => {
        this.starts.push(total);
        total += this.holdStart + overflow + this.extras[i] + this.holdEnd;
      });
      this.track.style.blockSize = `${total + this.room}px`;
    }

    /** Puts each panel back at its marker (its old place in the page) and removes the track */
    unpin() {
      if (!this.track) return;
      this.resizeObserver?.disconnect();
      window.removeEventListener('scroll', this.onScroll);
      clearTimeout(this.measureTimer);
      this.measurePlace = null;
      this.place = null;
      this.wrappers.forEach((wrapper, i) => {
        wrapper.classList.remove('is-tab-faded');
        wrapper.style.transform = '';
        wrapper.inert = false;
        const marker = this.markers[i];
        if (marker.isConnected) marker.replaceWith(wrapper);
        else this.track.before(wrapper);
      });
      this.track.remove();
      this.track = null;
      this.onScroll = null;
    }

    /**
     * Click-only mode: scroll up only if you were past the start of the new panel. The panel's top goes to
     * the bar's stuck top (barTop), as in the page: the bar takes no room, so the panel always starts
     * under the pill and its own top padding clears it. (Comparing with the bar's current bottom moved the
     * page one bar height on every click while the bar was not stuck yet.)
     */
    bringIntoView() {
      const panel = [...this.targets.values()].map((t) => this.wrapper(t)).find((w) => !w.classList.contains('is-tab-hidden'));
      if (!panel) return;
      this.measureBar(); // --header-space can change without a resize (editor: "Solid header background")
      const top = panel.getBoundingClientRect().top;
      if (top < this.barTop - 1) {
        window.scrollBy({ top: top - this.barTop, behavior: this.reducedMotion() ? 'auto' : 'smooth' });
      }
    }

    /* ---------- Stacked ---------- */

    setUpStacked() {
      // rootMargin: only a thin band 40% down the screen counts, so one section is "in view" at a time
      this.observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) this.setActive(entry.target.id);
          });
        },
        { rootMargin: '-40% 0px -59% 0px' }
      );
      this.targets.forEach((target) => this.observer.observe(target));
    }

    /**
     * Fills the tab, and when the row scrolls sideways brings the tab to the middle of the row. Only the
     * row scrolls: scrollIntoView() would also move the page, which made the scroll jerk at each change.
     */
    setActive(id) {
      if (id === this.activeId) return;
      this.activeId = id;
      // A tab's hash in the URL (after a click) goes away once another panel shows, so the URL never
      // names another panel (#highlights while Reviews showed), and a reload keeps the browser's own
      // scroll place (a hash would jump back to its panel)
      const hash = decodeURIComponent(window.location.hash.slice(1));
      if (hash && hash !== id && this.targets?.has(hash)) {
        history.replaceState(history.state, '', window.location.pathname + window.location.search);
      }
      this.links.forEach((link) => {
        if (link.dataset.tabTarget !== id) {
          link.removeAttribute('aria-current');
          return;
        }
        link.setAttribute('aria-current', 'true');
        const list = this.list;
        if (list && list.scrollWidth > list.clientWidth) {
          // No clamp here: the browser keeps the value in range (0 and up; on RTL pages 0 and down)
          const left = link.offsetLeft - (list.clientWidth - link.offsetWidth) / 2;
          list.scrollTo({ left, behavior: this.reducedMotion() ? 'auto' : 'smooth' });
        }
      });
    }
  }

  if (!customElements.get('product-tabs')) customElements.define('product-tabs', ProductTabs);

})();

/* sections/product.liquid */
(() => {

  /**
   * <product-page>: follows the chosen variant.
   * - Puts the variant's image first and deals every medium round the columns again (middle → left →
   *   right, as Liquid does), so it leads the middle column and the columns stay balanced. Moving only
   *   that one image would empty the side columns little by little.
   * - Puts ?variant=ID in the address (replaceState: no new history step), so the link opens on it.
   */
  class ProductPage extends HTMLElement {
    connectedCallback() {
      // One controller: the theme editor re-attaches a moved section and runs connectedCallback again
      this.controller?.abort();
      this.controller = new AbortController();
      // Every medium in the merchant's order (data-media-index), whatever column it is in now
      this.media = [...this.querySelectorAll('[data-media-index]')].sort(
        (a, b) => a.dataset.mediaIndex - b.dataset.mediaIndex
      );
      this.addEventListener('variant:change', (event) => this.showVariant(event.detail || {}), {
        signal: this.controller.signal,
      });
      this.loadModelViewer();
    }

    disconnectedCallback() {
      this.controller?.abort();
    }

    /**
     * 3D models: Shopify's loader adds the viewer's controls (play, zoom, full screen) to each
     * <model-viewer>, here and in the image viewer. Only when the product has a model
     */
    loadModelViewer() {
      if (!this.querySelector('model-viewer') || this.modelViewerLoaded || !window.Shopify?.loadFeatures) return;
      this.modelViewerLoaded = true;
      // The controls' own stylesheet (Shopify's CDN): without it the zoom buttons show as big "+" boxes
      // and the poster is not laid out. One link per page, shared with Featured product
      if (!document.getElementById('ModelViewerStyle')) {
        const link = document.createElement('link');
        link.id = 'ModelViewerStyle';
        link.rel = 'stylesheet';
        link.href = 'https://cdn.shopify.com/shopifycloud/model-viewer-ui/assets/v1.0/model-viewer-ui.css';
        document.head.append(link);
      }
      window.Shopify.loadFeatures([
        {
          name: 'model-viewer-ui',
          version: '1.0',
          onLoad: (error) => {
            if (error || !window.Shopify.ModelViewerUI) return;
            this.querySelectorAll('model-viewer').forEach((model) => {
              if (!model.dataset.ui) {
                model.dataset.ui = 'true';
                new window.Shopify.ModelViewerUI(model);
              }
            });
          },
        },
      ]);
    }

    showVariant({ variantId, mediaId }) {
      if (variantId) {
        const url = new URL(window.location.href);
        url.searchParams.set('variant', variantId);
        history.replaceState(history.state, '', url);
      }

      const media = mediaId && this.media.find((item) => item.dataset.mediaId === String(mediaId));
      if (!media || media === this.lead) return;
      this.lead = media;
      this.layOut([media, ...this.media.filter((item) => item !== media)]);
      media.classList.remove('is-variant');
      void media.offsetWidth; // replay the highlight
      media.classList.add('is-variant');
    }

    /** Deals the media round the columns: place 0 → column 0 (middle), 1 → left, 2 → right, 3 → middle… */
    layOut(order) {
      const columns = [...this.querySelectorAll('[data-gallery-column]')];
      const byNumber = Object.fromEntries(columns.map((column) => [column.dataset.galleryColumn, column]));
      order.forEach((item, place) => {
        const column = columns.length < 3 ? byNumber[0] : byNumber[place % 3];
        item.style.order = ''; // the DOM order now matches, the Liquid order is no longer needed
        // The image now has the width of its new column
        if (column.dataset.sizes) item.querySelectorAll('img[sizes]').forEach((img) => (img.sizes = column.dataset.sizes));
        column.append(item);
      });
    }
  }

  if (!customElements.get('product-page')) customElements.define('product-page', ProductPage);

})();

/* sections/scrolling-showcase.liquid */
(() => {

  /**
   * <scrolling-showcase>: the Scrolling showcase's gold scroll scene. Turns the scroll position inside the section's
   * tall track into a number --p from 0 to 1; the CSS moves the band and the photos from that number.
   *
   * Switches on only when Liquid allowed it (data-scene: scene setting + theme animations on) and the
   * visitor hasn't asked for reduced motion. Listens to scroll only while the section is on screen.
   */
  class ScrollingShowcase extends HTMLElement {
    connectedCallback() {
      this.watchIntro();

      if (!this.hasAttribute('data-scene')) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

      this.track = this.querySelector('.scrolling-showcase__track');
      this.stage = this.querySelector('.scrolling-showcase__stage');
      if (!this.track || !this.stage) return;

      // Smoothing: each frame the shown progress moves this share of the way to the real scroll position.
      // 1 = follows the scroll exactly; smaller = glides after it (smooth even with a jumpy mouse wheel).
      this.ease = { off: 1, soft: 0.12, extra: 0.06 }[this.dataset.smoothing] ?? 0.12;

      // Switch the scene on BEFORE the first measure: only then is the track its full scene height.
      // (Measured first, a page reloaded half-way down got a wrong start value and glided to the right one.)
      this.setAttribute('data-scene-active', '');
      this.current = this.measure();
      this.style.setProperty('--p', this.current.toFixed(4));

      // The cards start below the clipped stage, so the browser's lazy loading would wait until each card
      // flies in and show an empty card first. Start loading them one screen before the section arrives.
      this.preloadObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          this.querySelectorAll('.scrolling-showcase__photo img[loading="lazy"]').forEach((img) => {
            img.loading = 'eager';
          });
          this.preloadObserver.disconnect();
        },
        { rootMargin: '100% 0px' }
      );
      this.preloadObserver.observe(this.track);

      this.run = () => {
        if (!this.frame) this.frame = requestAnimationFrame(() => this.step());
      };

      // Only listen to scrolling while the track is on screen
      this.observer = new IntersectionObserver(([entry]) => {
        if (entry.isIntersecting) {
          window.addEventListener('scroll', this.run, { passive: true });
          window.addEventListener('resize', this.run);
          this.run();
        } else {
          this.stopListening();
          this.current = this.measure(); // off screen: jump straight to the end state
          this.style.setProperty('--p', this.current.toFixed(4));
        }
      });
      this.observer.observe(this.track);
    }

    disconnectedCallback() {
      this.observer?.disconnect();
      this.introObserver?.disconnect();
      this.preloadObserver?.disconnect();
      this.stopListening();
    }

    /**
     * Intro: the small photos and the arrow slide in from the left, one after another, the first time
     * the sentence comes into view. data-intro (set only here, so without JS nothing is hidden) hides
     * them; data-intro-played starts the CSS animation. Plays in both text layers at once, because both
     * sit inside this element. Skipped when the theme's animations are off or with reduced motion.
     */
    watchIntro() {
      if (!document.documentElement.classList.contains('animations-on')) return;
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;
      const title = this.querySelector('.scrolling-showcase__title');
      if (!title || !this.querySelector('.scrolling-showcase__images, .scrolling-showcase__arrow')) return;

      this.setAttribute('data-intro', '');
      this.introObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          this.setAttribute('data-intro-played', '');
          this.introObserver.disconnect(); // once per page view
        },
        { threshold: 0.5 }
      );
      this.introObserver.observe(title);
    }

    stopListening() {
      window.removeEventListener('scroll', this.run);
      window.removeEventListener('resize', this.run);
      if (this.frame) cancelAnimationFrame(this.frame);
      this.frame = null;
    }

    /**
     * The real scroll progress: 0 when the track's top reaches the top of the screen (the stage pins),
     * 1 when the track's bottom reaches the stage's bottom (it lets go). Measured against the stage's own
     * height (the real 100svh), so it stays right on phones when the address bar grows or shrinks.
     */
    measure() {
      const distance = this.track.offsetHeight - this.stage.offsetHeight;
      const scrolled = -this.track.getBoundingClientRect().top;
      return distance > 0 ? Math.min(Math.max(scrolled / distance, 0), 1) : 0;
    }

    /** One frame: move the shown progress towards the real one; keep going until they meet. */
    step() {
      this.frame = null;
      const target = this.measure();
      const gap = target - this.current;
      this.current = Math.abs(gap) < 0.0005 ? target : this.current + gap * this.ease;
      this.style.setProperty('--p', this.current.toFixed(4));
      if (this.current !== target) this.run();
    }
  }

  if (!customElements.get('scrolling-showcase')) {
    customElements.define('scrolling-showcase', ScrollingShowcase);
  }

})();

/* sections/slideshow.liquid */
(() => {

  /**
   * <slideshow-section>: one slide at a time.
   * - Arrows, side dots, optional autoplay (pause button; waits while the pointer is over the slides or the
   *   keyboard focus is in a slide, while it is off screen, while the tab is hidden; off with reduced motion).
   * - Page scroll mode (data-mode="scroll"): on the live store, with motion allowed and 2+ slides, the stage
   *   pins and the scroll position picks the slide (.is-pinned). Desktop layout: the screen must be at least
   *   36rem tall. Phone layout: always (full width, own height; see the CSS). Arrows and dots scroll the page to the slide's place; the
   *   arrows are dimmed at the first and the last slide. Otherwise the buttons work as above.
   * - Images: only slides with .is-ready load them (slide 1 from Liquid; the slides next to the shown slide
   *   after the page load; a slide that is about to show).
   * - Outline word: masked with the photo's own pixels once the photo has loaded.
   * - Theme editor: selecting a Slide block shows it and holds it until it is deselected.
   */
  class SlideshowSection extends HTMLElement {
    connectedCallback() {
      /*
        One AbortController for every listener: the theme editor re-attaches a moved section, so
        connectedCallback runs again; aborting in disconnectedCallback removes all listeners at once.
      */
      this.abortController = new AbortController();
      const { signal } = this.abortController;

      this.slides = [...this.querySelectorAll('[data-slideshow-slide]')];
      this.track = this.querySelector('.slideshow__track');
      this.stage = this.querySelector('.slideshow__stage');
      this.slidesBox = this.querySelector('.slideshow__slides');
      this.reducedQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      // The desktop layout: the same conditions as the CSS media query and the block's sizes
      this.desktopQuery = window.matchMedia('(min-width: 1200px), (min-width: 1024px) and (orientation: landscape)');
      // A pointer or focus from before an editor re-attach must not hold autoplay
      this.hovered = false;
      this.focused = false;

      this.setUpMasks(signal);

      // Start from the slide marked active (after an editor re-attach it can be another slide than 1)
      this.active = Math.max(0, this.slides.findIndex((slide) => slide.classList.contains('is-active')));
      this.slides.forEach((slide, i) => {
        slide.classList.remove('is-leaving', 'is-entering', 'is-waiting');
        slide.classList.toggle('is-active', i === this.active);
        slide.inert = i !== this.active;
      });
      this.ready(this.active);

      this.setUpEntrance();
      if (this.slides.length < 2) return;

      // The slides next to the shown slide load after the page (they never compete with slide 1)
      if (document.readyState === 'complete') this.readyAround(this.active);
      else window.addEventListener('load', () => this.readyAround(this.active), { once: true, signal });

      this.current = this.querySelector('[data-slideshow-current]');
      this.dots = [...this.querySelectorAll('.slideshow__dot')];
      this.rails = [...this.querySelectorAll('.slideshow__rail')];
      this.prevArrow = this.querySelector('.slideshow__arrow--prev');
      this.nextArrow = this.querySelector('.slideshow__arrow--next');
      this.updateControls();

      this.prevArrow?.addEventListener('click', () => this.goTo(this.active - 1, true), { signal });
      this.nextArrow?.addEventListener('click', () => this.goTo(this.active + 1, true), { signal });
      this.dots.forEach((dot, i) => dot.addEventListener('click', () => this.goTo(i, true), { signal }));

      // Theme editor: a selected Slide block shows and stays until it is deselected
      document.addEventListener(
        'shopify:block:select',
        (event) => {
          const index = this.slides.indexOf(event.target);
          if (index < 0) return;
          this.editorHold = true;
          this.show(index, { instant: true });
          this.restartAutoplay();
        },
        { signal }
      );
      document.addEventListener(
        'shopify:block:deselect',
        (event) => {
          if (!this.slides.includes(event.target)) return;
          this.editorHold = false;
          this.restartAutoplay();
        },
        { signal }
      );

      this.reducedQuery.addEventListener('change', () => this.refresh(), { signal });
      this.desktopQuery.addEventListener('change', () => this.refresh(), { signal });
      window.addEventListener('scroll', () => this.onScroll(), { passive: true, signal });
      // A resize can change whether Page scroll can pin (screen height) and the scroll step
      window.addEventListener(
        'resize',
        () => {
          cancelAnimationFrame(this.resizeFrame);
          this.resizeFrame = requestAnimationFrame(() => this.refresh());
        },
        { passive: true, signal }
      );

      this.setUpAutoplay(signal);
      // The stage height can change without a resize (fonts, longer text): measure again (only while pinned)
      this.stageObserver = new ResizeObserver(() => this.measure());
      this.stageObserver.observe(this.stage);
      this.refresh();
    }

    disconnectedCallback() {
      this.abortController?.abort();
      clearTimeout(this.timer);
      clearTimeout(this.leaveTimer);
      clearTimeout(this.enterTimer);
      cancelAnimationFrame(this.frame);
      cancelAnimationFrame(this.resizeFrame);
      this.frame = 0;
      this.visibilityObserver?.disconnect();
      this.entranceObserver?.disconnect();
      this.stageObserver?.disconnect();
      // A slide held at its first frame would stay hidden after a re-attach
      this.slides?.forEach((slide) => slide.classList.remove('is-waiting', 'is-entering', 'is-leaving'));
    }

    reduced() {
      return this.reducedQuery.matches;
    }

    /** Entrance animations: "Enable animations" on, motion allowed, and a Slide entrance other than None */
    canAnimate() {
      return (
        document.documentElement.classList.contains('motion-on') &&
        !this.reduced() &&
        !this.classList.contains('slideshow--anim-none')
      );
    }

    /**
     * Page scroll needs the setting, the live store (not the editor), motion and 2+ slides. The screen height
     * this section may fill comes from the stage's scroll-margin (CSS: the small viewport height, so a phone's
     * address bar does not change it).
     * - Desktop layout: a screen at least 36rem tall (the stage's minimum; a shorter screen would cut it).
     * - Phone layout: always. The stage keeps its full width and own height (the CSS places it).
     * On other screens the buttons work instead.
     */
    canPin() {
      if (this.dataset.mode !== 'scroll' || window.Shopify?.designMode || this.reduced() || this.slides.length < 2) {
        return false;
      }
      if (!this.desktopQuery.matches) return true;
      const screen = parseFloat(getComputedStyle(this.stage).scrollMarginBlockStart) || window.innerHeight;
      const rem = parseFloat(getComputedStyle(document.documentElement).fontSize) || 16;
      return screen >= 36 * rem - 1;
    }

    /** Called on start, on resize and when the layout or the motion preference changes */
    refresh() {
      const pin = this.canPin();
      if (pin !== Boolean(this.pinned)) {
        this.pinned = pin;
        this.classList.toggle('is-pinned', pin);
      }
      this.measure();
      this.updateControls();
      this.restartAutoplay();
    }

    /**
     * The stage's sticky top and the scroll step (px), read once per size instead of on every scroll. The step
     * comes from the real track: (track height - stage height) / (slides - 1). The CSS uses svh; the window's
     * innerHeight can be different on phones (address bar), and then the last slide could not be reached.
     */
    measure() {
      if (!this.pinned) return;
      // Phone layout: the sticky top reads the stage height (CSS)
      this.style.setProperty('--slideshow-stage-h', `${this.stage.offsetHeight}px`);
      this.stickyTop = parseFloat(getComputedStyle(this.stage).top) || 0;
      this.step = (this.track.offsetHeight - this.stage.offsetHeight) / (this.slides.length - 1);
      this.onScroll();
    }

    /** Lets a slide load its images (see the CSS: images of other slides are hidden) */
    ready(index) {
      this.slides[index]?.classList.add('is-ready');
    }

    /** The slide and the slides next to it (with wrap-around, as the arrows go) */
    readyAround(index) {
      const count = this.slides.length;
      [index, index - 1, index + 1].forEach((i) => this.ready((i + count) % count));
    }

    onScroll() {
      if (!this.pinned || this.frame) return;
      this.frame = requestAnimationFrame(() => {
        this.frame = 0;
        if (!this.pinned || !this.step) return;
        const progress = (this.stickyTop - this.track.getBoundingClientRect().top) / this.step;
        const index = Math.min(this.slides.length - 1, Math.max(0, Math.round(progress)));
        if (index !== this.active) this.show(index);
      });
    }

    /** Arrows and dots. Pinned: scroll the page to the slide's place (the scroll then shows it). */
    goTo(index, byVisitor = false) {
      const count = this.slides.length;
      const target = ((index % count) + count) % count;
      if (this.pinned && this.step) {
        // No wrap-around while pinned: it would scroll the page several screens back or forward
        if (index < 0 || index >= count) return;
        const top = window.scrollY + this.track.getBoundingClientRect().top - this.stickyTop + target * this.step;
        window.scrollTo({ top: Math.ceil(top), behavior: 'smooth' });
        return;
      }
      this.show(target);
      if (byVisitor) this.restartAutoplay();
    }

    show(index, { instant = false } = {}) {
      if (index === this.active || !this.slides[index]) return;
      const previous = this.slides[this.active];
      const next = this.slides[index];
      this.active = index;
      const animate = !instant && this.canAnimate();

      // Finish a change that is still running
      clearTimeout(this.leaveTimer);
      clearTimeout(this.enterTimer);
      this.slides.forEach((slide) => {
        if (slide !== previous && slide !== next) slide.classList.remove('is-leaving', 'is-entering', 'is-waiting');
      });

      previous.classList.remove('is-active', 'is-entering', 'is-waiting');
      previous.inert = true;
      next.classList.remove('is-leaving', 'is-waiting', 'is-entering');
      next.classList.add('is-active', 'is-ready');
      // The next steps (an arrow, or one more scroll step) start to load now
      this.readyAround(index);
      next.inert = false;

      if (animate) {
        previous.classList.add('is-leaving');
        void next.offsetWidth; // restart the entrance if this slide was shown a moment ago
        next.classList.add('is-entering');
        // Timers, not animationend: a hidden tab pauses animations, and the classes must still go
        this.leaveTimer = setTimeout(() => previous.classList.remove('is-leaving'), 600);
        this.enterTimer = setTimeout(() => next.classList.remove('is-entering'), 2000);
      } else {
        previous.classList.remove('is-leaving');
      }
      this.updateControls();
    }

    /**
     * Counter, dots (aria-current), the two red rail lines next to the shown dot, and the arrows: pinned, there
     * is no wrap-around, so the arrow that can do nothing is dimmed (aria-disabled keeps it in the Tab order).
     */
    updateControls() {
      if (this.current) this.current.textContent = String(this.active + 1).padStart(2, '0');
      const ends = [
        [this.prevArrow, this.active === 0],
        [this.nextArrow, this.active === this.slides.length - 1],
      ];
      ends.forEach(([arrow, atEnd]) => {
        if (!arrow) return;
        if (this.pinned && atEnd) arrow.setAttribute('aria-disabled', 'true');
        else arrow.removeAttribute('aria-disabled');
      });
      this.dots?.forEach((dot, i) => {
        if (i === this.active) dot.setAttribute('aria-current', 'true');
        else dot.removeAttribute('aria-current');
      });
      this.rails?.forEach((rail, i) => rail.classList.toggle('is-active', i === this.active || i === this.active + 1));
    }

    /**
     * Outline word: the copy in front of the photo is masked with the photo itself (its transparent parts
     * hide the outline). The mask uses the file the browser already loaded (currentSrc: also the phone photo
     * from <picture>), so it costs no extra download. Set again when another file loads (screen resize).
     */
    setUpMasks(signal) {
      this.slides.forEach((slide) => {
        const image = slide.querySelector('.slideshow-slide__model img');
        const twin = slide.querySelector('.slideshow-slide__twin');
        if (!image || !twin) return;
        const apply = () => {
          const source = image.currentSrc || image.src;
          if (!source) return;
          twin.style.setProperty('--model-mask', `url("${source.replace(/"/g, '%22')}")`);
          twin.classList.add('has-mask');
        };
        if (image.complete && image.naturalWidth) apply();
        image.addEventListener('load', apply, { signal });
      });
    }

    /**
     * A section further down the page: slide 1 plays its entrance when the section comes on screen. Only
     * when the section is off screen now (nothing visible is ever hidden), never in the theme editor, and
     * only one time (not again after an editor re-attach).
     */
    setUpEntrance() {
      if (this.entered || !this.canAnimate() || window.Shopify?.designMode) return;
      this.entered = true;
      const rect = this.getBoundingClientRect();
      if (rect.top < window.innerHeight && rect.bottom > 0) return;
      const slide = this.slides[this.active];
      if (!slide) return;
      slide.classList.add('is-entering', 'is-waiting');
      this.entranceObserver = new IntersectionObserver(
        ([entry]) => {
          if (!entry.isIntersecting) return;
          this.entranceObserver.disconnect();
          slide.classList.remove('is-waiting');
          clearTimeout(this.enterTimer);
          this.enterTimer = setTimeout(() => slide.classList.remove('is-entering'), 2000);
        },
        { threshold: 0.2 }
      );
      this.entranceObserver.observe(this.stage);
    }

    setUpAutoplay(signal) {
      this.delay = Number(this.dataset.autoplay) || 0;
      this.pauseButton = this.querySelector('.slideshow__pause');
      if (!this.delay) return;

      this.pauseButton?.addEventListener(
        'click',
        () => {
          this.paused = !this.paused;
          this.pauseButton.setAttribute('aria-pressed', String(this.paused));
          this.restartAutoplay();
        },
        { signal }
      );
      // Hover holds only over the slides (not over the arrows, dots or pause button)
      this.slidesBox.addEventListener('pointerenter', () => (this.hovered = true), { signal });
      this.slidesBox.addEventListener(
        'pointerleave',
        () => {
          this.hovered = false;
          this.restartAutoplay();
        },
        { signal }
      );
      // Focus on the arrows, dots or pause button does not hold the slide (Play must visibly play)
      this.addEventListener(
        'focusin',
        (event) => {
          this.focused = !event.target.closest('.slideshow__controls, .slideshow__dots');
        },
        { signal }
      );
      this.addEventListener(
        'focusout',
        (event) => {
          if (this.contains(event.relatedTarget)) return;
          this.focused = false;
          this.restartAutoplay();
        },
        { signal }
      );
      document.addEventListener('visibilitychange', () => this.restartAutoplay(), { signal });
      this.visibilityObserver = new IntersectionObserver(([entry]) => {
        this.onScreen = entry.isIntersecting;
        this.restartAutoplay();
      });
      this.visibilityObserver.observe(this);
    }

    /** Autoplay can run: set, not paused, not pinned, motion allowed */
    autoplayOn() {
      return Boolean(this.delay) && !this.paused && !this.pinned && !this.reduced();
    }

    /** A full interval from now. Waits (checks again next time) while something holds the slide. */
    restartAutoplay() {
      clearTimeout(this.timer);
      if (this.pauseButton) this.pauseButton.hidden = !this.delay || this.pinned || this.reduced();
      // Screen readers: announce slide changes, except while autoplay changes them
      const running = Boolean(this.delay) && !this.pinned && !this.reduced() && !this.paused;
      this.slidesBox?.setAttribute('aria-live', running ? 'off' : 'polite');
      if (!this.autoplayOn()) return;
      this.timer = setTimeout(() => {
        const held = this.hovered || this.focused || this.editorHold || this.onScreen === false || document.hidden;
        if (!held) this.show((this.active + 1) % this.slides.length);
        this.restartAutoplay();
      }, this.delay);
    }
  }

  if (!customElements.get('slideshow-section')) customElements.define('slideshow-section', SlideshowSection);

})();

/* sections/testimonials.liquid */
(() => {

  /**
   * <testimonial-showcase>: shows one review at a time. Dots (buttons) and avatars switch reviews;
   * arrow keys move between dots; optional autoplay (with a pause button; a chosen review holds).
   * The cards list slides so the active card is at the top; the avatars move as described in
   * placeAvatars().
   */
  class TestimonialShowcase extends HTMLElement {
    connectedCallback() {
      /*
        One AbortController for every listener: disconnectedCallback aborts it, which removes them all.
        The theme editor re-attaches the section when it is moved, so connectedCallback runs again;
        without this, each listener would be added twice (pause toggling twice, arrow keys skipping 2).
      */
      this.abortController = new AbortController();
      this.signal = this.abortController.signal;
      const { signal } = this;

      this.cards = [...this.querySelectorAll('[data-review-card]')];
      this.dots = [...this.querySelectorAll('.testimonials__dot')];
      this.avatars = [...this.querySelectorAll('.testimonials__avatar')];
      this.list = this.querySelector('.testimonials__cards');
      this.viewport = this.querySelector('.testimonials__viewport');
      if (this.cards.length < 2) return;

      this.classList.add('is-enhanced');
      /*
        Start from the card the markup (or an earlier connect) marks active: when the editor moves the
        section, the element is attached again with its old state, so dots, avatars and cards must be
        put back in step with that card (show() below), not reset to review 1.
      */
      this.active = Math.max(0, this.cards.findIndex((card) => card.classList.contains('is-active')));

      /*
        The visitor CHOOSES a review: it shows, and choiceHold keeps it there (autoplay waits) until
        they leave the section (release(), set up in setUpAutoplay). Without autoplay the hold does
        nothing. One click and one focusin handler, so switching and holding never drift apart.
        - click on a dot or an avatar
        - keyboard focus on a dot (:focus-visible: a mouse click focuses the dot too, but the click
          above already handles it)
        - keyboard focus on a link inside a review: that review shows, so the link is in view
      */
      this.addEventListener('click', (event) => {
        const target = event.target.closest('[data-review-index]');
        if (!target) return;
        this.choiceHold = true;
        this.show(Number(target.dataset.reviewIndex), true);
      }, { signal });

      this.addEventListener('focusin', (event) => {
        if (event.target.matches('.testimonials__dot:focus-visible')) {
          this.choiceHold = true;
          return;
        }
        const card = event.target.closest('[data-review-card]');
        if (!card) return;
        this.choiceHold = true;
        if (!card.classList.contains('is-active')) this.show(this.cards.indexOf(card), true);
      }, { signal });

      this.querySelector('.testimonials__dots')?.addEventListener('keydown', (event) => {
        const step = { ArrowDown: 1, ArrowRight: 1, ArrowUp: -1, ArrowLeft: -1 }[event.key];
        if (!step) return;
        event.preventDefault();
        const next = (this.active + step + this.cards.length) % this.cards.length;
        this.show(next, true);
        this.dots[next]?.focus();
      }, { signal });

      /*
        Theme editor: selecting a Review block shows it and holds it (autoplay waits) while the merchant
        edits it; only the deselect of one of this section's cards releases the hold.
      */
      document.addEventListener('shopify:block:select', (event) => {
        const index = this.cards.indexOf(event.target);
        if (index < 0) return;
        this.editorHold = true;
        this.show(index, true);
      }, { signal });

      document.addEventListener('shopify:block:deselect', (event) => {
        if (!this.cards.includes(event.target)) return;
        this.editorHold = false;
        this.restartAutoplay();
      }, { signal });

      // Re-measure when the width changes (text re-wraps); height changes we cause ourselves are ignored
      this.resizeObserver = new ResizeObserver(([entry]) => {
        const width = Math.round(entry.contentRect.width);
        if (width !== this.lastWidth) {
          this.lastWidth = width;
          this.equalizeCards();
        }
        this.layout();
      });
      this.resizeObserver.observe(this.viewport);
      this.show(this.active);

      /*
        Web fonts that load later change the text height but not the width, so the observer above
        does not see it: measure again when they are ready. Only while they are still loading (after
        an editor re-attach they are always loaded, and the observer has already measured).
      */
      if (document.fonts && document.fonts.status !== 'loaded') {
        document.fonts.ready.then(() => {
          if (signal.aborted) return;
          this.equalizeCards();
          this.layout();
        });
      }

      this.setUpAutoplay();
    }

    disconnectedCallback() {
      this.abortController?.abort(); // removes every listener added with its signal
      this.resizeObserver?.disconnect();
      this.visibilityObserver?.disconnect();
      clearInterval(this.timer);
    }

    show(index, byVisitor = false) {
      const count = this.cards.length;
      this.active = (index + count) % count;
      this.cards.forEach((card, i) => card.classList.toggle('is-active', i === this.active));
      this.dots.forEach((dot, i) => dot.setAttribute('aria-current', String(i === this.active)));
      this.placeAvatars();
      this.layout();
      if (byVisitor) this.restartAutoplay();
    }

    /**
     * Avatar slots for the active review (Figma rotation):
     * - the LAST reviewer parks in the centre slot (2) and waits there;
     * - the others rotate round the ring slots (0 = the large slot, then 1, 3, 4...): the active one
     *   in slot 0, the following ones after it;
     * - on the last reviewer's turn only two move: the last one takes slot 0 and the one before it
     *   (just active) parks in the centre; the rest keep their places. On the next turn the last one
     *   returns to the centre and the ring rotates again.
     */
    placeAvatars() {
      const count = this.avatars.length;
      if (count < 2) return;
      const last = count - 1;
      const ringSize = count - 1;
      const ringSlots = ['0', '1', '3', '4', '5', '6', '7'];
      const lastIsActive = this.active === last;
      const parked = lastIsActive ? last - 1 : last;
      const ringActive = lastIsActive ? last - 1 : this.active;

      this.avatars.forEach((avatar, i) => {
        let slot;
        if (i === parked) slot = '2';
        else if (lastIsActive && i === last) slot = '0';
        else slot = ringSlots[(i - ringActive + ringSize) % ringSize];
        avatar.dataset.slot = slot;
      });
    }

    /** Gives every card the height of the tallest one (measured at their natural height first) */
    equalizeCards() {
      this.style.setProperty('--card-height', 'auto');
      const tallest = Math.max(...this.cards.map((card) => card.offsetHeight));
      this.style.setProperty('--card-height', `${tallest}px`);
    }

    /**
     * Moves the list so the active card is on top. The viewport is always the card + 70% of a card
     * (all cards share one height), also for the last review that has no next card: so the section
     * never changes height and the heading never shifts.
     */
    layout() {
      const card = this.cards[this.active];
      if (!card) return;
      const gap = parseFloat(getComputedStyle(this.list).rowGap) || 0;
      // The next card peeks in: 70% of a card, at most 256px (Figma), so tall reviews never push the
      // window off a laptop screen
      const peek = Math.min(card.offsetHeight * 0.7, 256);
      const height = card.offsetHeight + gap + peek;
      this.style.setProperty('--cards-offset', `${-card.offsetTop + this.list.offsetTop}px`);
      this.style.setProperty('--viewport-height', `${height}px`);
    }

    setUpAutoplay() {
      const delay = Number(this.dataset.autoplay);
      if (!delay || window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        this.querySelector('.testimonials__pause')?.setAttribute('hidden', '');
        return;
      }
      const { signal } = this; // from connectedCallback: removed together on disconnect
      this.delay = delay;
      this.pauseButton = this.querySelector('.testimonials__pause');
      this.pauseButton?.addEventListener('click', () => {
        this.paused = !this.paused;
        // The label stays "Pause"; aria-pressed says whether it is on (pressed = paused)
        this.pauseButton.setAttribute('aria-pressed', String(this.paused));
        this.restartAutoplay();
      }, { signal });
      /*
        What holds the current review (hovering does NOT: the reviews keep moving under the mouse):
        - the visitor CHOSE a review (choiceHold, set in connectedCallback). It stays until they leave:
          focus moves out of the section, or the mouse leaves it; then the rotation starts again from
          the chosen review.
        - the merchant selected a Review block in the editor (editorHold)
        - the section being off screen (no point changing reviews nobody sees)
      */
      this.addEventListener('focusout', (event) => {
        if (!this.contains(event.relatedTarget)) this.release();
      }, { signal });
      this.addEventListener('pointerleave', () => this.release(), { signal });
      this.visibilityObserver = new IntersectionObserver(([entry]) => {
        this.onScreen = entry.isIntersecting;
      });
      this.visibilityObserver.observe(this);
      this.restartAutoplay();
    }

    /** The visitor left after choosing a review: the rotation starts again, a full interval from now */
    release() {
      if (!this.choiceHold) return;
      this.choiceHold = false;
      this.restartAutoplay();
    }

    restartAutoplay() {
      clearInterval(this.timer);
      if (!this.delay || this.paused) return;
      this.timer = setInterval(() => {
        if (this.choiceHold || this.editorHold || this.onScreen === false) return;
        this.show(this.active + 1);
      }, this.delay);
    }
  }

  if (!customElements.get('testimonial-showcase')) {
    customElements.define('testimonial-showcase', TestimonialShowcase);
  }

})();

/* sections/video-banner.liquid */
(() => {

  /**
   * <video-banner>
   * - Video: the script gives it its file (smaller on phones) and plays it only when all are true:
   *   "Play the video automatically" on (or the visitor pressed play), the visitor allows motion (or
   *   pressed play), the section is on screen, the tab shows, and (first section) the page has loaded.
   *   The pause button stops it; aria-pressed = paused, the label stays the same.
   * - Card: shows the next product every data-interval ms while the section is on screen; the pointer
   *   or keyboard focus on the card, a hidden tab, the pause button and an editor block select stop it;
   *   reduced motion = no change (the pause button hides). The products that do not show are inert.
   * Every listener goes through one AbortController (the theme editor re-attaches a moved section,
   * which runs connectedCallback again).
   */
  class VideoBanner extends HTMLElement {
    connectedCallback() {
      this.controller = new AbortController();
      const { signal } = this.controller;
      this.reduced = window.matchMedia('(prefers-reduced-motion: reduce)');
      this.phone = window.matchMedia('(max-width: 749px)');
      this.inView = false;

      this.video = this.querySelector('[data-video]');
      this.videoButton = this.querySelector('[data-video-pause]');
      this.card = this.querySelector('[data-card]');
      this.items = [...this.querySelectorAll('[data-card-item]')];
      this.cardButton = this.querySelector('[data-card-pause]');
      this.current = this.querySelector('[data-card-current]');
      this.interval = Number(this.dataset.interval) || 6000;
      // After a move in the page the shown product is not always the first
      this.index = Math.max(0, this.items.findIndex((item) => item.classList.contains('is-active')));

      // First section: wait for the page's load (the poster is the main image; the video comes after)
      this.loaded = document.readyState === 'complete';
      if (!this.loaded) {
        window.addEventListener(
          'load',
          () => {
            this.loaded = true;
            this.update();
          },
          { once: true, signal }
        );
      }

      if (this.video) {
        this.video.muted = true;
        // The visitor's choice survives an editor re-attach; else autoplay unless reduced motion
        if (this.videoPaused === undefined) {
          this.videoPaused = !this.hasAttribute('data-autoplay') || this.reduced.matches;
        }
        this.video.addEventListener('playing', () => this.classList.add('is-video-ready'), { signal });
        this.video.addEventListener('error', () => this.classList.remove('is-video-ready'), { signal });
        if (this.videoButton) {
          this.videoButton.hidden = false;
          this.videoButton.addEventListener(
            'click',
            () => {
              this.videoPaused = !this.videoPaused;
              this.videoChosen = true;
              this.update();
            },
            { signal }
          );
        }
      }

      if (this.items.length > 1) {
        this.hovered = false;
        this.focused = false;
        this.card.addEventListener('pointerenter', () => this.setHover(true), { signal });
        this.card.addEventListener('pointerleave', () => this.setHover(false), { signal });
        // Keyboard focus on the product link holds the product (not focus on the pause button: its
        // play would then seem to do nothing)
        this.card.addEventListener(
          'focusin',
          (event) => this.setFocus(Boolean(event.target.closest('.video-banner-card__link'))),
          { signal }
        );
        this.card.addEventListener(
          'focusout',
          (event) => {
            if (!event.relatedTarget?.closest?.('.video-banner-card__link')) this.setFocus(false);
          },
          { signal }
        );
        this.cardButton?.addEventListener(
          'click',
          () => {
            this.cardPaused = !this.cardPaused;
            this.update();
          },
          { signal }
        );
      }

      /*
        Theme editor: selecting a Product card block shows it and holds it while the merchant edits it;
        only the deselect of one of this section's cards releases the hold.
      */
      document.addEventListener(
        'shopify:block:select',
        (event) => {
          const index = this.items.indexOf(event.target);
          if (index < 0) return;
          this.editorHold = true;
          this.show(index);
          this.update();
        },
        { signal }
      );
      document.addEventListener(
        'shopify:block:deselect',
        (event) => {
          if (!this.items.includes(event.target)) return;
          this.editorHold = false;
          this.update();
        },
        { signal }
      );

      this.reduced.addEventListener(
        'change',
        () => {
          // Follow the new setting unless the visitor already chose with the button
          if (this.video && !this.videoChosen) {
            this.videoPaused = !this.hasAttribute('data-autoplay') || this.reduced.matches;
          }
          this.update();
        },
        { signal }
      );
      document.addEventListener('visibilitychange', () => this.update(), { signal });

      this.observer = new IntersectionObserver(
        ([entry]) => {
          this.inView = entry.isIntersecting;
          this.update();
        },
        { threshold: 0.1 }
      );
      this.observer.observe(this);
      this.update();
    }

    disconnectedCallback() {
      this.controller?.abort();
      this.observer?.disconnect();
      this.stopTimer();
      this.video?.pause();
    }

    setHover(value) {
      this.hovered = value;
      this.update();
    }

    setFocus(value) {
      this.focused = value;
      this.update();
    }

    update() {
      const shown = this.inView && !document.hidden;

      if (this.video) {
        this.videoButton?.setAttribute('aria-pressed', String(Boolean(this.videoPaused)));
        if (shown && this.loaded && !this.videoPaused) {
          this.playVideo();
        } else if (!this.video.paused) {
          this.video.pause();
        }
      }

      if (this.items.length > 1) {
        const reduced = this.reduced.matches;
        if (this.cardButton) {
          this.cardButton.hidden = reduced;
          this.cardButton.setAttribute('aria-pressed', String(Boolean(this.cardPaused)));
        }
        const rotate = shown && !reduced && !this.cardPaused && !this.hovered && !this.focused && !this.editorHold;
        if (rotate) {
          this.startTimer();
        } else {
          this.stopTimer();
        }
      }
    }

    playVideo() {
      if (!this.video.getAttribute('src')) {
        const phoneSource = this.video.dataset.srcPhone;
        this.video.src = this.phone.matches && phoneSource ? phoneSource : this.video.dataset.src;
        this.video.preload = 'auto';
      }
      if (!this.video.paused) return;
      // The browser can refuse (power saving, data saver): show the button as paused, so a tap starts it
      // An AbortError only means our own pause() (off screen, hidden tab) came before the first frame: the
      // next update() plays it again
      this.video.play()?.catch((error) => {
        if (error?.name === 'AbortError') return;
        this.videoPaused = true;
        this.update();
      });
    }

    startTimer() {
      if (this.timer) return;
      this.timer = window.setInterval(() => this.show(this.index + 1), this.interval);
    }

    stopTimer() {
      window.clearInterval(this.timer);
      this.timer = null;
    }

    /** Shows product i (wrapping round); the others are hidden from keyboard and screen readers */
    show(i) {
      const count = this.items.length;
      this.index = (i + count) % count;
      this.items.forEach((item, n) => {
        const active = n === this.index;
        item.classList.toggle('is-active', active);
        item.inert = !active;
        if (active) {
          item.removeAttribute('aria-hidden');
        } else {
          item.setAttribute('aria-hidden', 'true');
        }
        if (!active) return;
        // The photo of a product that was hidden loads lazily: ask for it now
        item.querySelector('img[loading="lazy"]')?.setAttribute('loading', 'eager');
      });
      if (this.current) this.current.textContent = String(this.index + 1).padStart(2, '0');
    }
  }

  if (!customElements.get('video-banner')) customElements.define('video-banner', VideoBanner);

})();
