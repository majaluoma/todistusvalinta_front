import { useEffect, useState } from "react";

/** Changes the document title to the given title and resets it to default after that
 * 
 * @param title
 */
export default function useTitle () {
    const [title, setTitle] = useState(document.title);
    useEffect(() => {
        const originalTitle = document.title; 
        document.title = title;
    
        return () => {
          document.title = originalTitle;
        };
      
    }, [title]);

    return { title, setTitle }
  }