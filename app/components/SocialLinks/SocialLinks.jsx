import { useState } from "react";

function ShareLinks({ url }) {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
  };

  return (
    <div className="flex gap gap-4 w-full text-center mx-auto justify-center">
      <a
        href={url}
        target="_blank"
      >
        Δες τον χάρτη live
      </a>
      <a
        href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(
          url
        )}`}
        target="_blank"
      >
        Share on Facebook
      </a>
      <a
        href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}`}
        target="_blank"
      >
        Share on Twitter
      </a>
      <a
        href={`mailto:?subject=This%20is%20my%20vote%20map&body=${encodeURIComponent(
          url
        )}`}
        target="_blank"
      >
        Send via Email
      </a>
      <button onClick={handleCopyToClipboard}>
        {copied ? "Copied!" : "Copy to Clipboard"}
      </button>
    </div>
  );
}

export default ShareLinks;
