import PageRenderer, { pageMetadata } from '@/components/PageRenderer';

type Search = Record<string, string | string[] | undefined>;

export const generateMetadata = () => pageMetadata('account-login');

/** Sign-in and password page: rendered on every request (it shows form messages and looks at the session). */
export default async function Page({ searchParams }: { searchParams: Promise<Search> }) {
  return <PageRenderer slug="account-login" path="/account/login" visitor context={{ searchParams: { ...(await searchParams) } }} />;
}
