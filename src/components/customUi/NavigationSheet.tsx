import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from '../ui/sheet';

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
      <menu className="flex flex-col justify-center align-middle gap-1 *:bg-secondary *:hover:bg-secondary-foreground cursor-pointer">
        {[0, 1, 2].map((id) => {
          return <div key={`menuBox_${id}`} className="rounded-sm h-2 w-10 hover:bg-inherit"></div>;
        })}
      </menu>
    );
  };
  return (
    <Sheet>
      <SheetTrigger className="fixed top-7 right-7 bg-none" asChild>{menuIcon()}</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>todistusvalinta.fi</SheetTitle>
          {titles.map((title) => {
            return (
              <a key={`title_${title.title}`} href={title.path}>
                {title.title}
              </a>
            );
          })}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
