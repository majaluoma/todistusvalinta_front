export default function Header() {
  return (
    <div className="fixed top-0 z-40 bg-primary w-screen flex justify-center lg:p-5 md:p-4 p-3 shadow-sm shadow-secondary overflow-hidden will-change-scroll:w-10">
      <a href="/">
        <h1 className="text-center text-xl md:text-3xl md:px-8 sm:text-2xl sm:px-7 bg-secondary px-6 py-2 text-white w-min rounded-full">
          todistusvalinta.fi
        </h1>
      </a>
    </div>
  );
}
