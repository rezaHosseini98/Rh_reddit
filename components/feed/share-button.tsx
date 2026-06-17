"use client";

import { Share2 } from "lucide-react";

interface ShareButtonProps {
  title: string;
  url: string;
}

export function ShareButton({ title, url }: ShareButtonProps) {
  const handleShare = async () => {
    // Construct the absolute URL using the current origin
    const absoluteUrl = `${window.location.origin}${url}`;

    if (navigator.share) {
      try {
        await navigator.share({
          title: title,
          text: `${title}\n`,
          url: absoluteUrl,
        });
      } catch (error) {
        if ((error as Error).name !== "AbortError") {
          console.error("Error sharing:", error);
        }
      }
    } else {
      // Fallback: Copy to clipboard if Web Share API is not supported
      try {
        const textToCopy = `${title}\n${absoluteUrl}`;
        await navigator.clipboard.writeText(textToCopy);
        alert("Link copied to clipboard!");
      } catch (error) {
        console.error("Could not copy link:", error);
      }
    }
  };

  return (
    <button
      type="button"
      onClick={handleShare}
      className="inline-flex items-center gap-1 hover:text-foreground hover:cursor-pointer"
    >
      <Share2 className="size-4" /> Share
    </button>
  );
}
