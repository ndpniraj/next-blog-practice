import React, { useState } from "react";

export default function CopyBtnDemo() {
  const [copied, setCopied] = useState(false);

  const copyToClipboard = () => {
    navigator.clipboard.writeText("You copied it from ndpniraj.com").then(
      () => {
        setCopied(true);
        setTimeout(() => {
          setCopied(false);
        }, 2000);
      },
      (err) => {
        console.log("failed to copy", err.message);
      }
    );
  };
  const btnStyle = copied
    ? "bg-low-contrast dark:bg-low-contrast-dark dark:text-primary-dark text-secondary"
    : "";

  return (
    <div className="text-center my-5">
      <button
        onClick={copyToClipboard}
        className={
          btnStyle +
          " text-sm border w-36 border-low-contrast dark:border-low-contrast-dark dark:text-low-contrast-dark text-low-contrast rounded p-2 transition"
        }
      >
        {copied ? "Copied" : "Copy to clipboard"}
      </button>
    </div>
  );
}
