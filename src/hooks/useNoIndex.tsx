import { useEffect } from "react";

/** * Custom hook to set the robots meta tag to "noindex" when the component mounts
 * 
 */

export default function useNoIndex() {
  useEffect(() => {
    let metaTag = document.querySelector("meta[name='robots']");

    if (!metaTag) {
      metaTag = document.createElement("meta");
      metaTag.setAttribute("name", "robots");
      document.head.appendChild(metaTag);
    }

    metaTag.setAttribute("content", "noindex");

    return () => {
      metaTag?.setAttribute("content", "index, follow");
    };
  }, []);
}