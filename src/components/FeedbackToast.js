'use client';

import { useFeedback } from "@/context/FeedBackContext";

export default function FeedbackToast() {
  const { message } = useFeedback();

  if (!message) return null;

  return (
    <div className="fixed bottom-5 right-5 bg-green-500 text-white px-4 py-2 rounded shadow-lg transition-opacity duration-300">
      {message}
    </div>
  );
}
