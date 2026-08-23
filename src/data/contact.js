export const WHATSAPP_NUMBER = import.meta.env.VITE_WHATSAPP_NUMBER ?? "";

export function whatsappLink(message) {
  if (!WHATSAPP_NUMBER) {
    console.warn("VITE_WHATSAPP_NUMBER no está definido en .env");
  }
  return `https://wa.me/${WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;
}
