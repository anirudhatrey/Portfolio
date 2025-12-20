"use client";

import { useProfileStore, profileConfigs } from "@/store/profile-store";
import type { ProfileType } from "@/types";

export default function Home() {
  const { selectedProfile, hasSelectedProfile, setProfile, getProfileConfig } =
    useProfileStore();

  const config = getProfileConfig();

  // Profile selector view
  if (!hasSelectedProfile) {
    return (
      <main className="min-h-screen flex flex-col items-center justify-center p-8">
        <div className="text-center mb-12 animate-fade-in">
          <h1 className="text-4xl md:text-6xl font-heading font-bold mb-4">
            Hi, I&apos;m <span className="gradient-text">Anirudh</span> 👋
          </h1>
          <p className="text-xl text-text-muted max-w-xl mx-auto">
            Full-Stack Developer crafting AI-powered experiences for Gaming &
            Entertainment.
          </p>
        </div>

        <div className="text-center mb-8">
          <p className="text-lg text-text-secondary mb-2">
            What brings you here today?
          </p>
          <p className="text-sm text-text-muted">
            Choose your path for a tailored experience
          </p>
        </div>

        {/* Profile Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl w-full mb-8">
          <ProfileCard
            type="recruiter"
            icon="👔"
            title="Hiring Talent"
            description="Looking to add a developer to your team"
            onClick={() => setProfile("recruiter")}
          />
          <ProfileCard
            type="business"
            icon="💼"
            title="Need a Developer"
            description="Have a project that needs building"
            onClick={() => setProfile("business")}
          />
          <ProfileCard
            type="collaborator"
            icon="🤝"
            title="Build Together"
            description="Interested in partnering or connecting"
            onClick={() => setProfile("collaborator")}
          />
        </div>

        {/* Skip option */}
        <button
          onClick={() => setProfile("explorer")}
          className="text-text-muted hover:text-primary transition-colors text-sm flex items-center gap-2"
        >
          Just Exploring
          <span>→</span>
        </button>
      </main>
    );
  }

  // Main portfolio view (placeholder for now)
  return (
    <main className="min-h-screen">
      {/* Hero Section */}
      <section className="min-h-screen flex flex-col items-center justify-center p-8 relative">
        <div className="text-center max-w-4xl animate-fade-in">
          <p className="text-text-muted mb-4 text-lg">Hi, I&apos;m Anirudh 👋</p>

          <h1 className="text-4xl md:text-6xl lg:text-7xl font-heading font-bold mb-6">
            <span className="gradient-text">&quot;{config.tagline}&quot;</span>
          </h1>

          <p className="text-lg md:text-xl text-text-secondary max-w-2xl mx-auto mb-8">
            {config.description}
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href={config.primaryCTA.href}
              className="gradient-bg px-8 py-4 rounded-lg font-medium text-white hover:opacity-90 transition-opacity animate-pulse-glow"
            >
              {config.primaryCTA.text}
            </a>
            <a
              href={config.secondaryCTA.href}
              className="px-8 py-4 rounded-lg font-medium border border-primary text-primary hover:bg-primary-muted transition-colors"
            >
              {config.secondaryCTA.text}
            </a>
          </div>

          {/* Profile indicator */}
          <div className="mt-8 flex items-center justify-center gap-2 text-text-muted text-sm">
            <span>Viewing as:</span>
            <span className="px-3 py-1 rounded-full bg-primary-muted text-primary capitalize">
              {selectedProfile}
            </span>
            <button
              onClick={() => useProfileStore.getState().clearProfile()}
              className="text-text-subtle hover:text-text-muted underline ml-2"
            >
              Change
            </button>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 border-text-muted flex items-start justify-center p-2">
            <div className="w-1 h-2 bg-text-muted rounded-full" />
          </div>
        </div>
      </section>

      {/* Placeholder sections */}
      <section id="about" className="min-h-screen flex items-center justify-center p-8 bg-surface">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">About</h2>
          <p className="text-text-muted">Coming in Phase 5...</p>
        </div>
      </section>

      <section id="work" className="min-h-screen flex items-center justify-center p-8">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Work</h2>
          <p className="text-text-muted">Coming in Phase 5...</p>
        </div>
      </section>

      <section id="contact" className="min-h-screen flex items-center justify-center p-8 bg-surface">
        <div className="text-center">
          <h2 className="text-3xl md:text-5xl font-heading font-bold mb-4">Contact</h2>
          <p className="text-text-muted">Coming in Phase 5...</p>
        </div>
      </section>
    </main>
  );
}

// Profile Card Component
function ProfileCard({
  type,
  icon,
  title,
  description,
  onClick,
}: {
  type: ProfileType;
  icon: string;
  title: string;
  description: string;
  onClick: () => void;
}) {
  return (
    <button
      onClick={onClick}
      className="group p-6 rounded-xl bg-surface border border-border hover:border-primary 
                 transition-all duration-300 text-left
                 hover:shadow-glow-primary hover:-translate-y-1"
    >
      <div className="text-4xl mb-4">{icon}</div>
      <h3 className="text-xl font-heading font-bold mb-2 group-hover:text-primary transition-colors">
        {title}
      </h3>
      <p className="text-text-muted text-sm">{description}</p>
    </button>
  );
}
