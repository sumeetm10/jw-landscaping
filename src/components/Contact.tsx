import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ArrowRight, Info, Mail, MapPin, Phone } from "lucide-react";
import { business, services } from "../data/business";
import { img } from "../data/photos";
import { EASE, Eyebrow, Reveal } from "./ui";

type Form = { name: string; phone: string; email: string; service: string; message: string };
const EMPTY: Form = { name: "", phone: "", email: "", service: "", message: "" };

const DEMO_NOTICE = "This is a website preview. The contact form will be connected when the website goes live.";

function validate(f: Form) {
  const e: Partial<Record<keyof Form, string>> = {};
  if (!f.name.trim()) e.name = "Please enter your name.";
  if (!f.phone.trim() && !f.email.trim()) e.phone = "Please give a phone number or an email.";
  if (f.email.trim() && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(f.email.trim())) e.email = "That email doesn't look right.";
  if (f.phone.trim() && f.phone.replace(/\D/g, "").length < 7) e.phone = "That phone number looks too short.";
  if (!f.message.trim()) e.message = "Tell us a little about the project.";
  return e;
}

export default function Contact() {
  const [form, setForm] = useState<Form>(EMPTY);
  const [errors, setErrors] = useState<ReturnType<typeof validate>>({});
  const [sent, setSent] = useState(false);

  const set = (k: keyof Form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm((f) => ({ ...f, [k]: e.target.value }));
    if (errors[k]) setErrors((x) => ({ ...x, [k]: undefined }));
  };

  const submit = (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate(form);
    setErrors(errs);
    if (Object.keys(errs).length) {
      document.getElementById(`f-${Object.keys(errs)[0]}`)?.focus();
      return;
    }
    setSent(true);
  };

  const field =
    "w-full rounded-md border bg-white px-4 py-3 text-[0.95rem] text-text placeholder:text-muted/70 transition-colors focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/30";
  const border = (k: keyof Form) => (errors[k] ? "border-red-500" : "border-text/15");
  const Err = ({ k }: { k: keyof Form }) =>
    errors[k] ? (
      <p id={`e-${k}`} className="mt-1.5 text-sm text-red-600">
        {errors[k]}
      </p>
    ) : null;

  return (
    <section id="contact" className="px-5 py-24 md:px-6 md:py-32">
      <div className="mx-auto grid max-w-7xl overflow-hidden rounded-2xl shadow-[0_40px_80px_-40px_rgba(23,19,16,0.5)] lg:grid-cols-[0.9fr_1.1fr]">
        <div className="relative min-h-[360px] overflow-hidden bg-ink text-cream">
          <img src={img("side-yard-after", "sm")} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-45" />
          <div className="absolute inset-0 bg-gradient-to-br from-ink/90 via-ink/70 to-ink/40" />
          <div className="relative flex h-full flex-col p-8 md:p-12">
            <Reveal>
              <Eyebrow light>Contact Us</Eyebrow>
              <h2 className="h-section mt-4">
                Let's Bring Your Outdoor Project <span className="text-gold">to Life.</span>
              </h2>
              <p className="mt-5 max-w-sm leading-relaxed text-cream/75">
                Tell us what you're planning and we'll be in touch to talk it through and arrange an estimate.
              </p>
            </Reveal>
            {(business.phone || business.email || business.address || business.serviceAreas.length > 0) && (
              <ul className="mt-auto space-y-4 pt-10 text-cream/85">
                {business.phone && (
                  <li className="flex items-center gap-3">
                    <Phone className="h-5 w-5 text-gold" />
                    <a href={`tel:${business.phone}`} className="hover:text-gold-light">{business.phone}</a>
                  </li>
                )}
                {business.email && (
                  <li className="flex items-center gap-3">
                    <Mail className="h-5 w-5 text-gold" />
                    <a href={`mailto:${business.email}`} className="hover:text-gold-light">{business.email}</a>
                  </li>
                )}
                {(business.address || business.serviceAreas.length > 0) && (
                  <li className="flex items-center gap-3">
                    <MapPin className="h-5 w-5 text-gold" />
                    {business.address || `Serving ${business.serviceAreas.join(", ")}`}
                  </li>
                )}
              </ul>
            )}
          </div>
        </div>

        <div className="bg-cream p-8 md:p-12">
          <AnimatePresence mode="wait">
            {sent ? (
              <motion.div
                key="sent"
                role="status"
                className="flex h-full min-h-[420px] flex-col items-center justify-center text-center"
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.45, ease: EASE }}
              >
                <span className="grid h-16 w-16 place-items-center rounded-full bg-gold text-ink">
                  <Info className="h-7 w-7" />
                </span>
                <p className="mt-6 max-w-sm text-lg leading-relaxed text-text">{DEMO_NOTICE}</p>
                <button
                  onClick={() => {
                    setForm(EMPTY);
                    setSent(false);
                  }}
                  className="mt-8 text-sm font-semibold text-bronze underline-offset-4 hover:underline"
                >
                  Back to the form
                </button>
              </motion.div>
            ) : (
              <motion.form
                key="form"
                noValidate
                onSubmit={submit}
                className="grid gap-5 sm:grid-cols-2"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <div className="sm:col-span-2">
                  <label htmlFor="f-name" className="mb-1.5 block text-sm font-medium text-text">Name</label>
                  <input id="f-name" autoComplete="name" value={form.name} onChange={set("name")} className={`${field} ${border("name")}`} aria-invalid={!!errors.name} aria-describedby={errors.name ? "e-name" : undefined} />
                  <Err k="name" />
                </div>
                <div>
                  <label htmlFor="f-phone" className="mb-1.5 block text-sm font-medium text-text">Phone</label>
                  <input id="f-phone" type="tel" autoComplete="tel" value={form.phone} onChange={set("phone")} className={`${field} ${border("phone")}`} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? "e-phone" : undefined} />
                  <Err k="phone" />
                </div>
                <div>
                  <label htmlFor="f-email" className="mb-1.5 block text-sm font-medium text-text">Email</label>
                  <input id="f-email" type="email" autoComplete="email" value={form.email} onChange={set("email")} className={`${field} ${border("email")}`} aria-invalid={!!errors.email} aria-describedby={errors.email ? "e-email" : undefined} />
                  <Err k="email" />
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="f-service" className="mb-1.5 block text-sm font-medium text-text">Service needed</label>
                  <select id="f-service" value={form.service} onChange={set("service")} className={`${field} ${border("service")}`}>
                    <option value="">Select a service (optional)</option>
                    {services.map((s) => (
                      <option key={s.id} value={s.title}>{s.title}</option>
                    ))}
                    <option value="Other">Something else</option>
                  </select>
                </div>
                <div className="sm:col-span-2">
                  <label htmlFor="f-message" className="mb-1.5 block text-sm font-medium text-text">Project details</label>
                  <textarea id="f-message" rows={5} value={form.message} onChange={set("message")} className={`${field} ${border("message")} resize-y`} aria-invalid={!!errors.message} aria-describedby={errors.message ? "e-message" : undefined} />
                  <Err k="message" />
                </div>
                <div className="sm:col-span-2">
                  <button type="submit" className="btn-gold w-full py-4 sm:w-auto">
                    Send My Request <ArrowRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.form>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
