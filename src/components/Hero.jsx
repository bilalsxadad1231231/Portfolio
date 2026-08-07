import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-scroll';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faDownload, faPaperPlane, faArrowDown } from '@fortawesome/free-solid-svg-icons';
import { faGithub, faLinkedin } from '@fortawesome/free-brands-svg-icons';
import { personalData } from '../data/personalData';
import { projectsData } from '../data/projectData';
import profileImage from '../assetes/myProfile.png';
import LatentField from './three/LatentField';

const READOUT = [
  ['projects', String(projectsData.length)],
  ['focus', 'LLMs · agents'],
  ['also', 'vision · MLOps'],
];

const Hero = () => {
  const [fieldReady, setFieldReady] = useState(false);

  // Let the type land first, then bring the field up under it.
  useEffect(() => {
    const id = requestAnimationFrame(() => setFieldReady(true));
    return () => cancelAnimationFrame(id);
  }, []);

  const openInNewTab = useCallback((url) => () => window.open(url, '_blank'), []);

  return (
    <section
      id="home"
      className="relative isolate min-h-screen w-full overflow-hidden bg-void text-bone"
    >
      {/* Signature: the latent field. Decorative, so it sits behind everything. */}
      <div
        className={`pointer-events-none absolute inset-0 -z-10 transition-opacity duration-[1600ms] ${
          fieldReady ? 'opacity-100' : 'opacity-0'
        }`}
      >
        <LatentField />
      </div>
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-b from-void/80 via-transparent to-void" />
      {/* Scrim so the field never competes with the type it sits behind. */}
      <div className="pointer-events-none absolute inset-0 -z-10 bg-gradient-to-r from-void via-void/55 to-transparent lg:via-void/40" />

      <div className="mx-auto grid min-h-screen max-w-6xl grid-cols-1 items-center gap-12 px-6 pb-24 pt-28 md:px-10 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
        {/* Left: the thesis */}
        <div className="animate-rise">
          <p className="font-mono text-[11px] uppercase tracking-[0.32em] text-accent">
            {personalData.designation}
          </p>

          <h1 className="mt-6 font-display text-[clamp(3rem,11vw,7.5rem)] font-semibold leading-[0.88] tracking-tight">
            Muhammad
            <br />
            <span className="text-glow">Bilal</span>
          </h1>

          <p className="mt-8 max-w-xl text-base leading-relaxed text-fog md:text-lg">
            I build systems that reason — retrieval pipelines, agent graphs, and
            fine-tuned models — and ship them behind APIs that hold up in
            production.
          </p>

          {/* Data readout: the numbers that actually describe the work */}
          <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-4 font-mono text-xs">
            {READOUT.map(([label, value]) => (
              <div key={label}>
                <dt className="uppercase tracking-[0.2em] text-fog/60">{label}</dt>
                <dd className="mt-1 text-sm text-bone">{value}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap items-center gap-4">
            <Link to="projects" smooth duration={600} offset={-64}>
              <button className="group rounded-full bg-accent px-6 py-3 text-sm font-semibold text-onAccent transition-transform duration-200 hover:-translate-y-0.5 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent">
                See the work
                <FontAwesomeIcon
                  icon={faArrowDown}
                  className="ml-2 transition-transform duration-200 group-hover:translate-y-0.5"
                />
              </button>
            </Link>

            <button
              onClick={openInNewTab('/resume.pdf')}
              className="rounded-full border border-bone/20 px-6 py-3 text-sm font-semibold text-bone transition-colors duration-200 hover:border-glow hover:text-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glow"
            >
              Resume <FontAwesomeIcon icon={faDownload} className="ml-1.5" />
            </button>

            <Link to="contact" smooth duration={600} offset={-64}>
              <button className="rounded-full border border-bone/20 px-6 py-3 text-sm font-semibold text-bone transition-colors duration-200 hover:border-glow hover:text-glow focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-glow">
                Contact <FontAwesomeIcon icon={faPaperPlane} className="ml-1.5" />
              </button>
            </Link>
          </div>

          <div className="mt-8 flex items-center gap-5">
            <button
              onClick={openInNewTab(personalData.github)}
              aria-label="GitHub profile"
              className="text-fog transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <FontAwesomeIcon icon={faGithub} size="lg" />
            </button>
            <button
              onClick={openInNewTab('https://linkedin.com/in/muhammad-bilal-866750280/')}
              aria-label="LinkedIn profile"
              className="text-fog transition-colors hover:text-accent focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-accent"
            >
              <FontAwesomeIcon icon={faLinkedin} size="lg" />
            </button>
          </div>
        </div>

        {/* Right: the portrait, treated as a node in the field rather than an avatar */}
        <div className="animate-rise-slow relative mx-auto w-full max-w-sm lg:mx-0">
          <div className="relative aspect-[4/5] overflow-hidden rounded-2xl border border-bone/10 bg-surface/60 backdrop-blur-sm">
            <img
              src={profileImage}
              alt={`${personalData.name}, ${personalData.designation.toLowerCase()}`}
              className="h-full w-full object-cover object-top grayscale-[0.4] transition-all duration-700 hover:grayscale-0"
              decoding="async"
            />
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-glow/25 via-transparent to-accent/10" />
          </div>
          <p className="mt-4 font-mono text-[11px] uppercase tracking-[0.2em] text-fog">
            {personalData.email}
          </p>
        </div>
      </div>
    </section>
  );
};

export default Hero;
