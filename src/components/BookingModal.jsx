import { useState, useEffect } from 'react';
import emailjs from '@emailjs/browser';

const BookingModal = ({ onClose, selectedPackage }) => {
  const [form, setForm] = useState({
    name: '',
    phone: '',
    service: selectedPackage,
    vehicle: '',
    date: '',
    notes: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [isSending, setIsSending] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSending(true);

    const templateParams = {
      name: form.name,
      phone: form.phone,
      vehicle: form.vehicle,
      service: form.service,
      date: form.date,
      notes: form.notes || 'No additional notes',
      to_email: 'support@shineprocars.com',
    };

    // --- ADDED THE VARIABLES HERE ---
    const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
    const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
    const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;
    // --------------------------------

    emailjs.send(SERVICE_ID, TEMPLATE_ID, templateParams, PUBLIC_KEY)
      .then(() => {
        setIsSending(false);
        setSubmitted(true);
        setTimeout(() => onClose(), 3000);
      })
      .catch((error) => {
        setIsSending(false);
        console.error('Email send failed:', error);
        alert('Failed to send enquiry. Please try again or contact us via WhatsApp.');
      });
  };

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') onClose();
    };
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="booking-modal-title"
    >
      <div
        className="bg-white rounded-3xl w-full max-w-md p-8 relative shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-8 h-8 rounded-full bg-gray-100 hover:bg-red-600 hover:text-white flex items-center justify-center transition"
          aria-label="Close modal"
        >
          ✕
        </button>

        {submitted ? (
          <div className="text-center py-12">
            <div className="text-5xl mb-4">✅</div>
            <h3 id="booking-modal-title" className="text-2xl font-black mb-2">Enquiry Sent!</h3>
            <p className="text-gray-500 text-sm">
              We've received your details and will call you shortly to confirm and share a quote.
            </p>
          </div>
        ) : (
          <>
            <h3 id="booking-modal-title" className="text-2xl font-black mb-1">Get a Quote</h3>
            <p className="text-sm text-gray-500 mb-6">
              Share a few details and we'll get back to you.
            </p>

            <form onSubmit={handleSubmit} className="space-y-4">
              <input
                required
                type="text"
                placeholder="Your Name"
                value={form.name}
                onChange={(e) => setForm({ ...form, name: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                required
                type="tel"
                placeholder="Phone Number"
                value={form.phone}
                onChange={(e) => setForm({ ...form, phone: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <input
                type="text"
                placeholder="Vehicle (e.g. Thar Roxx, Fortuner)"
                value={form.vehicle}
                onChange={(e) => setForm({ ...form, vehicle: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              />
              <select
                value={form.service}
                onChange={(e) => setForm({ ...form, service: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500"
              >
                <option>PPF WRAPPING</option>
                <option>CERAMIC + GRAPHENE</option>
                <option>DETAIL + UPGRADES</option>
                <option>PPF wrapping</option>
                <option>Ceramic coating</option>
                <option>Graphene coating</option>
                <option>Detailing & restoration</option>
                <option>Protection extras</option>
                <option>Studio upgrades</option>
              </select>
              <input
                type="date"
                value={form.date}
                onChange={(e) => setForm({ ...form, date: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 text-gray-500"
              />
              <textarea
                rows="3"
                placeholder="Additional notes (optional)"
                value={form.notes}
                onChange={(e) => setForm({ ...form, notes: e.target.value })}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-red-500 resize-none"
              />
              <button
                type="submit"
                disabled={isSending}
                className={`w-full font-semibold py-3 rounded-full transition-all duration-200 ${
                  isSending 
                    ? 'bg-gray-400 cursor-not-allowed text-white' 
                    : 'bg-red-600 hover:bg-red-700 text-white hover:scale-[1.02] active:scale-95 shadow-lg shadow-red-600/30'
                }`}
              >
                {isSending ? 'Sending...' : 'Send Enquiry'}
              </button>
            </form>
          </>
        )}
      </div>
    </div>
  );
};

export default BookingModal;