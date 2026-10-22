

const whatsappNumber = '916361291895';
const whatsappMessage = encodeURIComponent(
  "Hi Shine Pro! I'd like a quote for PPF / ceramic coating / detailing."
);
const whatsappLink = `https://wa.me/${whatsappNumber}?text=${whatsappMessage}`;

const WhatsAppButton = () => (
  <a
    href={whatsappLink}
    target="_blank"
    rel="noopener noreferrer"
    aria-label="Chat on WhatsApp"
    className="fixed bottom-6 right-6 z-50 flex items-center gap-3 bg-[#25D366] hover:bg-[#1EBE5A] text-white rounded-full shadow-2xl shadow-green-500/30 transition-all duration-300 hover:scale-105 active:scale-95 group"
  >
    <span className="w-14 h-14 flex items-center justify-center shrink-0">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32" width="30" height="30" fill="currentColor">
        <path d="M19.11 17.205c-.372 0-1.088 1.39-1.518 1.39a.63.63 0 0 1-.315-.1c-.802-.402-1.504-.817-2.163-1.447-.545-.516-1.146-1.29-1.46-1.963a.426.426 0 0 1-.073-.215c0-.33.99-.945.99-1.49 0-.143-.73-2.09-.832-2.335-.143-.372-.214-.487-.6-.487-.187 0-.36-.043-.53-.043-.302 0-.53.115-.746.315-.688.645-1.032 1.318-1.06 2.264v.114c-.015.99.472 1.977 1.017 2.78 1.23 1.82 2.506 3.41 4.554 4.34.616.287 2.035.888 2.722.888.817 0 2.15-.515 2.478-1.318.102-.258.16-.545.16-.83 0-.115-.045-.215-.13-.315-.36-.402-1.62-1.134-1.62-1.506 0 0 0 0 0 0z" />
        <path d="M16.04 0C7.18 0 0 7.18 0 16.04c0 2.83.73 5.48 2.03 7.79L0 32l8.43-2.21a15.94 15.94 0 0 0 7.61 1.95h.01c8.86 0 16.04-7.18 16.04-16.04S24.9 0 16.04 0zm0 29.14h-.01a13.2 13.2 0 0 1-6.73-1.85l-.48-.28-5.02 1.32 1.34-4.9-.31-.5a13.17 13.17 0 0 1-2.02-7.03c0-7.29 5.93-13.22 13.23-13.22 3.53 0 6.86 1.38 9.36 3.88a13.16 13.16 0 0 1 3.87 9.35c0 7.3-5.94 13.23-13.23 13.23z" />
      </svg>
    </span>
    <span className="hidden sm:block max-w-0 group-hover:max-w-[180px] overflow-hidden whitespace-nowrap font-semibold text-sm transition-all duration-300 pr-0 group-hover:pr-6">
      Chat with us
    </span>
  </a>
);

export default WhatsAppButton;