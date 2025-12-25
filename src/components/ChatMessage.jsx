export default function ChatMessage({ message }) {
    const isUser = message.role === "user";
  
    return (
      <div className={`flex ${isUser ? "justify-end" : "justify-start"} mb-4`}>
        <div
          className={`max-w-[80%] px-4 py-2 rounded-2xl text-sm shadow-sm ${
            isUser
              ? "bg-blue-600 text-white rounded-tr-none"
              : "bg-gray-100 text-gray-800 rounded-tl-none border border-gray-200"
          }`}
        >
          {message.text}
        </div>
      </div>
    );
  }