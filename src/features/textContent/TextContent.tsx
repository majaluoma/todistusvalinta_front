import Markdown from 'react-markdown';
import { useEffect, useState } from 'react';
import './markdown.css';
/**
 * Made for "Meistä" -site .
 * It should include description of the company and it's products
 */
export default function TextContent({markdownFile} : Readonly<{markdownFile : string}>) {
  const [text, setText] = useState('');
  
  useEffect(() => {
    const componentWillMount = async () => {
      // Get the contents from the Markdown file and put them in the React state, so we can reference it in render() below.
      const res = await fetch(markdownFile);
      setText(await res.text());
    };
  
    componentWillMount();
  }, []);

  //Custom styles in markdown.css -file
  return <Markdown className={'markdown'}>{text}</Markdown>;
}