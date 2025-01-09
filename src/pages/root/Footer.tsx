import privacyPolicy from '@/assets/privacyPolicy.pdf';

/**  Footer shows in the bottom of every page.
 * It includes some information that customer might want to navigate
 * from every site. Base is copied from Vercel AI-chat and modified from there
 */
export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground mt-auto w-full shadow-lg shadow-secondary overflow-hidden">
      <div className="container mx-auto px-4 py-8 flex flex-col items-center justify-center gap-4">
        <h2 className="text-2xl font-bold text-primary">todistusvalinta.fi</h2>

        <nav className="flex flex-wrap gap-4">
          <a href={privacyPolicy} className="text-blue-900 underline text-base">
            Tietosuojaseloste
          </a>
        </nav>

        <p className="flex flex-row align-baseline">
          Sähköposti:{' '}
          <img
            src={'/assets/contactEmailImage.png'}
            alt="sahkopostiosoite"
            className="align-baseline ml-2 w-auto h-max relative "
          />
        </p>
      <p>
        &copy; {new Date().getFullYear()} Todistusvalinta.fi All rights
        reserved.
      </p>
      </div>

    </footer>
  );
}
