import { MessageCircleMore } from "lucide-react";

export default function ChatButton() {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <button className="bg-primary hover:bg-white text-background-dark p-4 rounded-full shadow-[0_0_20px_rgba(0,255,127,0.4)] transition-all duration-300 transform hover:scale-110 flex items-center justify-center group">
        <MessageCircleMore
          size={24}
          className="group-hover:rotate-12 transition-transform"
        />
      </button>
    </div>
  );
}
