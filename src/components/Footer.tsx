import { Mail, MapPin, Phone, Clock } from "lucide-react";
import { business, services } from "../data/business";
import { FacebookIcon } from "./Header";
import { Logo, scrollToId } from "./ui";

const LINKS = [
  { id: "home", label: "Home" },
  { id: "about", label: "About" },
  { id: "services", label: "Services" },
  { id: "projects", label: "Projects" },
  { id: "gallery", label: "Gallery" },
  { id: "contact", label: "Contact" },
];

export default function Footer() {
  const hasDetails = business.phone || business.email || business.address || business.hours || business.serviceAreas.length > 0;
  return (
    <footer className="grain bg-ink px-5 pt-20 text-cream/75 md:px-6">
      <div className="mx-auto grid max-w-7xl gap-12 pb-14 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1.2fr]">
        <div>
          <div className="flex items-center gap-3">
            <Logo size={72} />
            <span className="font-display text-2xl text-cream">
              J&amp;W <span className="text-gold">Landscaping</span>
            </span>
          </div>
          <p className="mt-5 max-w-sm text-sm leading-relaxed">{business.description}</p>
          {business.social.facebook && (
            <a
              href={business.social.facebook}
              target="_blank"
              rel="noreferrer"
              aria-label="J&W Landscaping on Facebook"
              className="mt-6 inline-grid h-10 w-10 place-items-center rounded-full border border-cream/20 text-cream transition-colors hover:border-gold hover:bg-gold hover:text-ink"
            >
              <FacebookIcon className="h-4 w-4" />
            </a>
          )}
        </div>

        <nav aria-label="Footer">
          <h3 className="eyebrow text-gold-light">Quick Links</h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {LINKS.map((l) => (
              <li key={l.id}>
                <button onClick={() => scrollToId(l.id)} className="transition-colors hover:text-gold-light">{l.label}</button>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className="eyebrow text-gold-light">Services</h3>
          <ul className="mt-5 space-y-2.5 text-sm">
            {services.map((s) => (
              <li key={s.id}>{s.title}</li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="eyebrow text-gold-light">Get in Touch</h3>
          {hasDetails ? (
            <ul className="mt-5 space-y-3 text-sm">
              {business.phone && (
                <li className="flex gap-3"><Phone className="h-4 w-4 shrink-0 text-gold" /><a href={`tel:${business.phone}`} className="hover:text-gold-light">{business.phone}</a></li>
              )}
              {business.email && (
                <li className="flex gap-3"><Mail className="h-4 w-4 shrink-0 text-gold" /><a href={`mailto:${business.email}`} className="hover:text-gold-light">{business.email}</a></li>
              )}
              {(business.address || business.serviceAreas.length > 0) && (
                <li className="flex gap-3"><MapPin className="h-4 w-4 shrink-0 text-gold" />{business.address || `Serving ${business.serviceAreas.join(", ")}`}</li>
              )}
              {business.hours && (
                <li className="flex gap-3"><Clock className="h-4 w-4 shrink-0 text-gold" />{business.hours}</li>
              )}
            </ul>
          ) : (
            <p className="mt-5 text-sm leading-relaxed">
              Use the{" "}
              <button onClick={() => scrollToId("contact")} className="text-gold-light underline-offset-4 hover:underline">
                contact form
              </button>{" "}
              to request a free estimate.
            </p>
          )}
        </div>
      </div>

      <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-2 border-t border-cream/10 py-6 text-xs text-cream/50 sm:flex-row">
        <p>© {new Date().getFullYear()} {business.name}. All rights reserved.</p>
        <p>Repairs · Demo · Rock · Sprinklers · Sod · Snow Removal</p>
      </div>
    </footer>
  );
}
