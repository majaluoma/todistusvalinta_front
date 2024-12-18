import privacyPolicy from '@/assets/privacyPolicy.pdf';
/**  Footer shows in the bottom of every page.
 * It includes some information that customer might want to navigate
 * from every site. Base is copied from Vercel AI-chat and modified from there
 */
export default function Footer() {
  return (
    <footer className="bg-muted text-muted-foreground mt-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col md:flex-row justify-between items-center mb-8">
          <div className="mb-4 md:mb-0 flex items-center">
            <h2 className="text-2xl font-bold text-primary">Todistusvalinta.fi</h2>
          </div>
          <nav className="flex flex-wrap justify-center md:justify-end gap-4">
            <a href={privacyPolicy} className="text-blue-900 underline">
              Tietosuoja
            </a>
          </nav>
        </div>

        <div className="flex flex-col md:flex-row justify-between items-center">
          <div className="text-center md:text-left mb-4 md:mb-0">
            <h3 className="font-semibold mb-2">Yhteystiedot</h3>

            <p className="flex flex-row align-baseline">
              Sähköposti:{' '}
              <img
                src={""}
                alt="sahkopostiosoite"
                className="align-baseline ml-2 w-auto h-[18px] relative top-1"
              />
            </p>
          </div>
        </div>

        <div className="mt-8 text-center text-sm">
          <p>
            &copy; {new Date().getFullYear()} Todistusvalinta.fi All
            rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}