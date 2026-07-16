// components/TokenDisplay.tsx
"use client"

import { useState } from "react"

const TokenDisplay = ({ token }: { token: string }) => {
  const [copied, setCopied] = useState(false)

  const handleCopy = async () => {
    await navigator.clipboard.writeText(token)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <button
      onClick={handleCopy}
      className="flex items-center justify-between gap-2 bg-gray-700 hover:bg-gray-600 px-3 py-2 rounded-md text-sm font-mono cursor-pointer transition-colors"
      title="Click to copy"
    >
      {token}
      <span className="text-xs text-gray-300">
        {copied ? "copied!" : "copy"}
      </span>
    </button>
  )
}

export default TokenDisplay