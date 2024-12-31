import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../../components/ui/sheet';

type NavigationSheetProps = {
  titles: {
    path: string;
    title: string;
  }[];
};

export default function NavigationSheet({
  titles,
}: Readonly<NavigationSheetProps>) {
  const menuIcon = () => {
    return (
      <div className="flex flex-col justify-center align-middle gap-1 *:bg-secondary *:hover:bg-secondary-foreground cursor-pointer">
        {[0, 1, 2].map((id) => {
          return (
            <div
              key={`menuBox_${id}`}
              className="rounded-sm h-2 w-10 hover:bg-inherit"
            ></div>
          );
        })}
      </div>
    );
  };
  return (
    <Sheet>
      <div className='fixed bg-transparent w-screen flex justify-end'>
      <SheetTrigger className="fixed bg-none top-7 mr-20" asChild>
        {menuIcon()}
      </SheetTrigger>
      </div>
      <SheetContent className='pl-0 pr-0'>
        <SheetHeader className="flex flex-col">
          <SheetTitle className='text-xl mb-8 ml-4'>todistusvalinta.fi</SheetTitle>
          <div className="flex flex-col">
            {titles.map((title) => {
              return (
                <a className="w-full text-lg hover:bg-card pt-4 pb-4" key={`title_${title.title}`} href={title.path}>
                  <p className='ml-4'>{title.title}</p>
                </a>
              );
            })}
          </div>
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
