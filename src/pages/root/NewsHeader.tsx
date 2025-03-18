/** Shown to user at the top of site
 */
type NewsHeaderProps = {
  classname?: string;
  news : string;
};

export default function NewsHeader({ classname, news }: Readonly<NewsHeaderProps>) {
  return (
    
    <div
      className={`
        ${classname}
        ${news === '' ? 'bg-inherit' : ''}
        w-screen bg-card flex justify-center lg:p-2 md:p-2 p-1 overflow-hidden will-change-scroll:w-10`}
    >
      <p className="overflow-hidden px-1">
         {news}
      </p>
    </div>
  );
}