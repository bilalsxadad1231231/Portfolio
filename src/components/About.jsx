import IdBadge from './IdBadge';
import SplitHeading from './about/SplitHeading';
import HalfPanel, { Term } from './about/HalfPanel';

const CERTIFICATIONS = ['AWS', 'Google IT', 'Deep Learning'];

const About = () => {
  return (
    <section
      id="about"
      className="relative w-full overflow-hidden bg-void pb-12 pt-24 text-bone"
    >
      <div className="mx-auto max-w-6xl px-6 md:px-10">
        <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-accent">
          About
        </p>
        <SplitHeading className="mt-4 max-w-3xl text-[clamp(2.25rem,6vw,4rem)]">
          Two halves of the same job
        </SplitHeading>

        <div className="mt-14 grid grid-cols-1 items-start gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* The narrative, split the way the heading claims it is */}
          <div className="flex flex-col gap-10">
            <HalfPanel index="01" title="Generative & agentic">
              I build AI systems end to end. Most of my recent work is generative
              and agentic — retrieval pipelines, agent graphs in{' '}
              <Term delay={120}>LangChain</Term> and <Term delay={200}>LangGraph</Term>,
              and fine-tuned language models — wrapped in{' '}
              <Term delay={280}>FastAPI</Term> services and shipped with{' '}
              <Term delay={360}>Docker</Term> and CI/CD on <Term delay={440}>AWS</Term>{' '}
              and <Term delay={520}>Azure</Term>.
            </HalfPanel>

            <HalfPanel index="02" title="Vision & interface" delay={140}>
              The other half is computer vision and diffusion models: detection,
              segmentation, tracking, OCR, and image generation. I write the
              frontends too, in <Term delay={160}>React</Term> and{' '}
              <Term delay={240}>React Native</Term>, which is usually what turns a
              model into something a person can actually use.
            </HalfPanel>

            <div className="border-t border-bone/10 pt-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog/70">
                Certified in
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {CERTIFICATIONS.map((cert) => (
                  <li
                    key={cert}
                    className="rounded-md border border-bone/10 px-2.5 py-1 font-mono text-[11px] text-fog transition-colors duration-200 hover:border-accent/50 hover:text-bone"
                  >
                    {cert}
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* The badge */}
          <IdBadge />
        </div>
      </div>
    </section>
  );
};

export default About;
