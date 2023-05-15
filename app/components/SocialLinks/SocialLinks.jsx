import { useState } from "react";
import Image from "next/image";
import web from "../../assets/web.svg";
import copyImage from "../../assets/copy.svg";
import twitterImage from "../../assets/twitter.svg";
import facebookImage from "../../assets/facebook.svg";
import emailImage from "../../assets/email.svg";

function ShareLinks({ url }) {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
  };

  return (
    <div className="flex gap gap-4 w-full text-center mx-auto justify-center">
      <a href={url} target="_blank">
        <Image src={web} alt="Facebook" width={25} height={25} />
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`}
        target="_blank"
      >
        <Image src={facebookImage} alt="Facebook" width={20} height={20} />
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`}
        target="_blank"
      >
        <Image src={twitterImage} alt="Twitter" width={20} height={20} />
      </a>
      <a
        href={`mailto:?subject=This%20is%20my%20vote%20map&body=${encodeURIComponent(
          url
        )}`}
        target="_blank"
      >
        <Image src={emailImage} alt="Email" width={20} height={20} />
      </a>
      <button className="h-fit" onClick={handleCopyToClipboard}>
        {copied ? (
          "Copied!"
        ) : (
          <Image src={copyImage} alt="Copy" width={20} height={20} />
        )}
      </button>
    </div>
  );
}

export default ShareLinks;
