import { useState } from "react";
import Image from "next/image";

export default function Post({ data }) {
  const [showMedia, setShowMedia] = useState(false);

  const isValidUrl = (url) => {
    const allowed = ["i.redd.it", "i.imgur.com"];
    return allowed.some((sub) => url.includes(sub));
  };

  return (
    <div
      className="p-2 max-w-xs bg-blue-500 rounded shadow items-center"
      onClick={() => setShowMedia(!showMedia)}
    >
      <div className="text-xl font-medium text-black">{data.title}</div>

      {isValidUrl(data.url) && (
        <div className="image-container">
          <p className="text-sm">
            Click to {showMedia ? "hide" : "show"} media
          </p>

          {showMedia && (
            <Image src={data.url} alt="media" width={500} height={500} />
          )}
        </div>
      )}
    </div>
  );
}
