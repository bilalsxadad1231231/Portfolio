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
          Models are the easy part
        </SplitHeading>

        <div className="mt-14 grid grid-cols-1 items-start gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          {/* The narrative */}
          <div className="flex flex-col gap-10">
            <HalfPanel index="01" title="Making them behave">
              Calling a model is a few lines. Making one dependable enough to sit
              in production is the actual work, and it is most of what I do. Every
              decision boundary in the systems I build is a typed contract —{' '}
              <Term delay={120}>Pydantic</Term> schemas, forced tool choice,
              structured outputs — so the model returns data to validate instead of
              prose to parse. Around that go retries that escalate, deterministic
              fallbacks for when a provider is down, and{' '}
              <Term delay={220}>Langfuse</Term> tracing, so cost and quality are
              measured rather than assumed.
            </HalfPanel>

            <HalfPanel index="02" title="Shipping the rest of it" delay={140}>
              The model is a small part of the product. The rest is retrieval that
              finds the right context — hierarchical chunking and hybrid dense +
              BM25 fusion over <Term delay={160}>Qdrant</Term>,{' '}
              <Term delay={230}>Pinecone</Term>, and{' '}
              <Term delay={300}>Meilisearch</Term> — the extraction pipelines that
              build the corpus in the first place, the{' '}
              <Term delay={370}>FastAPI</Term> and Node services around it, and the
              deploy on <Term delay={440}>AWS Lambda</Term>,{' '}
              <Term delay={500}>Vercel</Term>, Firebase, or DigitalOcean. I write
              the frontends too — <Term delay={560}>React</Term>,{' '}
              <Term delay={620}>Next.js</Term>, and{' '}
              <Term delay={680}>React Native</Term> — which is usually what turns a
              model into something a person will actually use.
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
