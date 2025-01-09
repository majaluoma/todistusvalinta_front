import { RefObject, useEffect, useMemo, useState } from 'react';

/** custom hook to see if component is in user's screen at the moment
 * used for ads monitoring at least.
 *
 */
export default function useOnScreen(ref: RefObject<HTMLElement>) {
  const [isIntersecting, setIsIntersecting] = useState(false);

  const observer = useMemo(
    () =>
      new IntersectionObserver(([entry]) =>
        setIsIntersecting(entry.isIntersecting),
      ),
    [ref],
  );

  useEffect(() => {
    if (ref.current) {
      observer.observe(ref.current);
    }
    return () => observer.disconnect();
  }, []);

  return isIntersecting;
}
