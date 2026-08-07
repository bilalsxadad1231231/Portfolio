import IdBadge from './IdBadge';

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
        <h2 className="mt-4 max-w-3xl font-display text-[clamp(2.25rem,6vw,4rem)] font-semibold leading-[0.95] tracking-tight">
          Two halves of the same job
        </h2>

        <div className="mt-14 grid grid-cols-1 items-start gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* The narrative */}
          <div>
            <p className="text-base leading-relaxed text-fog md:text-lg">
              I build AI systems end to end. Most of my recent work is generative
              and agentic — retrieval pipelines, agent graphs in LangChain and
              LangGraph, and fine-tuned language models — wrapped in FastAPI
              services and shipped with Docker and CI/CD on AWS and Azure.
            </p>
            <p className="mt-6 text-base leading-relaxed text-fog md:text-lg">
              The other half is computer vision and diffusion models: detection,
              segmentation, tracking, OCR, and image generation. I write the
              frontends too, in React and React Native, which is usually what
              turns a model into something a person can actually use.
            </p>

            <div className="mt-10 border-t border-bone/10 pt-6">
              <p className="font-mono text-[11px] uppercase tracking-[0.2em] text-fog/70">
                Certified in
              </p>
              <ul className="mt-3 flex flex-wrap gap-2">
                {CERTIFICATIONS.map((cert) => (
                  <li
                    key={cert}
                    className="rounded-md border border-bone/10 px-2.5 py-1 font-mono text-[11px] text-fog"
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
