import { ArrowRight } from "lucide-react";
import { business } from "../data/business";
import { img } from "../data/photos";
import { Eyebrow, IconBadge, Reveal, scrollToId } from "./ui";

const POINTS = [
  { icon: "sod" as const, title: "Lawns & Sod", text: "Ground prep and fresh sod for a full, even lawn." },
  { icon: "rock" as const, title: "Rock & Beds", text: "Clean rock borders and beds that hold their shape." },
  { icon: "repairs" as const, title: "Repairs", text: "Walls, edging and outdoor features put right." },
];

export default function About() {
  return (
    <section id="about" className="overflow-hidden px-5 py-24 md:px-6 md:py-32">
      <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2 lg:gap-20">
        <Reveal className="relative mx-auto w-full max-w-[540px]">
          <div className="relative aspect-[4/5] w-[78%] overflow-hidden rounded-2xl shadow-xl">
            <img src={img("rock-fence-line", "sm")} alt="Rock strip along a wooden fence" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div className="absolute -bottom-10 right-0 aspect-square w-[52%] overflow-hidden rounded-2xl border-[6px] border-cream shadow-2xl">
            <img src={img("rock-bed-house", "sm")} alt="River-rock bed along a home's foundation" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div aria-hidden="true" className="absolute -left-4 -top-4 -z-10 h-32 w-32 rounded-2xl border-2 border-gold/60" />
        </Reveal>

        <div className="pt-6 lg:pt-0">
          <Reveal>
            <Eyebrow>About J&amp;W</Eyebrow>
            <h2 className="h-section mt-4 text-text">
              Creating Outdoor Spaces <span className="text-bronze">You'll Love.</span>
            </h2>
            <p className="mt-6 max-w-xl text-[1.05rem] leading-relaxed text-muted">{business.description}</p>
            <p className="mt-4 max-w-xl text-[1.05rem] leading-relaxed text-muted">
              Whether it's a tired side yard, a crumbling wall or a bare patch by the driveway, we take on the
              work that makes a property look cared for.
            </p>
          </Reveal>

          <ul className="mt-10 grid gap-6 sm:grid-cols-3">
            {POINTS.map((p, i) => (
              <Reveal as="li" key={p.title} delay={0.1 + i * 0.08}>
                <IconBadge name={p.icon} size={48} />
                <h3 className="mt-4 font-semibold text-text">{p.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted">{p.text}</p>
              </Reveal>
            ))}
          </ul>

          <Reveal delay={0.3} className="mt-10">
            <button onClick={() => scrollToId("services")} className="btn-gold">
              Explore Our Services <ArrowRight className="h-4 w-4" />
            </button>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
