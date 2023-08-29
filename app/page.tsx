import { ContactForm } from "@/components/contact-form";

export default function Page() {
  return (
    <div className="relative">
      <div className="sticky top-0 z-50 flex items-center bg-white px-3 py-4 shadow-md">
        <h3 className="text-sm font-semibold uppercase">Big Feast Rentals</h3>
      </div>
      <div className="px-3 py-2">
        <ContactForm />
      </div>
    </div>
  );
}
