import { MessageCircle } from 'lucide-react';

const WHATSAPP_NUMBER = '27000000000'; // Replace with actual number

export const WhatsAppButton = () => {
  const handleClick = () => {
    const message = encodeURIComponent('Hi! I would like to inquire about your nail services.');
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${message}`, '_blank');
  };

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-6 right-6 z-50 flex items-center justify-center w-14 h-14 rounded-full bg-whatsapp text-whatsapp-foreground shadow-lg hover:scale-110 transition-transform duration-200 animate-float"
      aria-label="Contact us on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
};
