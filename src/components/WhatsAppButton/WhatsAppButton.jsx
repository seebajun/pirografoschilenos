import Button from "../Button/Button.jsx";
import { whatsappLink } from "../../data/contact.js";

export default function WhatsAppButton({ message, children }) {
  return (
    <Button href={whatsappLink(message)} target="_blank" rel="noreferrer">
      {children}
    </Button>
  );
}
