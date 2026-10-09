import { ArrowRight } from "lucide-react";
import { img } from "../data/photos";
import { Reveal, scrollToId } from "./ui";

export default function FinalCta() {
  return (
    <section className="px-5 pb-24 md:px-6 md:pb-32">
      <Reveal className="relative mx-auto max-w-7xl overflow-hidden rounded-2xl bg-ink text-cream">
        <img src={img("sod-strip", "sm")} alt="" aria-hidden="true" loading="lazy" className="absolute inset-0 h-full w-full object-cover opacity-30" />
        <div className="absolute inset-0 bg-gradient-to-r from-ink via-ink/85 to-ink/50" />
        <div className="relative flex flex-col items-start justify-between gap-8 px-8 py-14 md:flex-row md:items-center md:px-14 md:py-16">
          <div>
            <h2 className="h-section max-w-xl">
              Ready to Transform Your <span className="text-gold">Outdoor Space?</span>
            </h2>
            <p className="mt-4 max-w-lg text-cream/75">Tell us about the job and we'll get back to you with next steps.</p>
          </div>
          <button onClick={() => scrollToId("contact")} className="btn-gold shrink-0 px-7 py-4">
            Let's Talk About Your Project <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </Reveal>
    </section>
  );
}
