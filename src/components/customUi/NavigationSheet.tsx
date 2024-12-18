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
  } [];
};

export default function NavigationSheet({
  titles,
}: Readonly<NavigationSheetProps>) {
  return (
    <Sheet>
      <SheetTrigger className="sticky top-2 right-2">Valikko</SheetTrigger>
      <SheetContent>
        <SheetHeader>
          <SheetTitle>todistusvalinta.fi</SheetTitle>
          {titles.map((title => {
              return <a key={`title_${title.title}`} href={title.path}>{title.title}</a>
          }))}
        </SheetHeader>
      </SheetContent>
    </Sheet>
  );
}
