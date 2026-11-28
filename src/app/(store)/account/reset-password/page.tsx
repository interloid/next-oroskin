import PageRenderer, { pageMetadata } from '@/components/PageRenderer';

type Search = Record<string, string | string[] | undefined>;

export const generateMetadata = () => pageMetadata('account-reset-password');

/** Sign-in and password page: rendered on every request (it shows form messages and looks at the session). */
export default async function Page({ searchParams }: { searchParams: Promise<Search> }) {
  return <PageRenderer slug="account-reset-password" path="/account/reset-password" visitor context={{ searchParams: { ...(await searchParams) } }} />;
}
