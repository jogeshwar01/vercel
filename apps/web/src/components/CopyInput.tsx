import { useState } from "react";

export function CopyInput({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset copied state after 2 seconds
    } catch (err) {
      console.error("Failed to copy: ", err);
    }
  };

  return (
    <div className="w-full max-w-[16rem] bg-white m-auto mt-6">
      <div className="relative">
        <label htmlFor="deploy-url-button" className="sr-only">
          Label
        </label>
        <input
          id="deploy-url-button"
          type="text"
          className="col-span-6 bg-white border border-black text-black text-sm rounded-lg focus:ring-black focus:border-black block w-full p-2.5"
          value={text}
          disabled
          readOnly
        />
        <button
          onClick={handleCopyToClipboard}
          className="absolute end-2 top-1/2 -translate-y-1/2 text-black hover:bg-gray-200 rounded-lg p-2 inline-flex items-center justify-center"
        >
          {copied ? (
            <span id="success-icon" className="inline-flex items-center">
              <svg
                className="w-3.5 h-3.5"
                fill="none"
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 16 12"
              >
                <path d="M1 5.917 5.724 10.5 15 1.5" />
              </svg>
            </span>
          ) : (
            <span id="default-icon">
              <svg
                className="w-3.5 h-3.5"
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 18 20"
              >
                <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
              </svg>
            </span>
          )}
        </button>
      </div>
    </div>
  );
}
