"use client"

import { useNotification } from "./NotificationContext"

export default function Notification() {
  const { message, type } = useNotification()

  if (!message) return null

  const backgroundColor = type === "success" ? "bg-[#16a34a]" : "bg-[#dc2626]"

  return (
    <div className={`${backgroundColor} text-white px-4 py-2 mb-2.5 rounded-sm`}>
      {message}
    </div>
  )
}