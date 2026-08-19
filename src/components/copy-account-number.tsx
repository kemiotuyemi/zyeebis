"use client";

import { useState } from "react";
import { Copy, Check } from "lucide-react";

export default function CopyAccountNumber({ account }: { account: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(account);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      setCopied(false);
    }
  };

  return (
    <button
      type="button"
      onClick={handleCopy}
      className="inline-flex items-center gap-1 text-fuchsia font-bold hover:underline min-h-[40px] min-w-[44px] justify-center"
      aria-label="Copy account number"
    >
      {account}
      {copied ? (
        <Check size={16} className="text-green-600" />
      ) : (
        <Copy size={16} />
      )}
    </button>
  );
}