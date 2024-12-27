import { CustomAdProps } from "./types";
export default function CustomAd({ad} : Readonly<CustomAdProps>) {
    const handleClick = () => {
        console.log("clicked");
    }
  
    return (
    <a
      onClick={handleClick}
      href={ad.osoite}
    >
      <img
        src={`assets/${ad.kuva}`}
        alt={ad.kuvaus}
      />
    </a>
  );
}
