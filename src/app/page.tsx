"use client";

import { useEffect, useRef, useState } from "react";
import { useProfileStore, profileConfigs } from "@/store/profile-store";
import { useMounted } from "@/hooks/use-mounted";
import type { ProfileType } from "@/types";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import {
  BriefcaseIcon,
  RocketIcon,
  UsersIcon,
  SparklesIcon,
  ArrowRightIcon,
  LinkedInIcon,
  GitHubIcon,
  TwitterIcon,
  PlayIcon,
  SkipBackIcon,
  SkipForwardIcon,
} from "@/components/icons";

// Register GSAP plugins
if (typeof window !== "undefined") {
  gsap.registerPlugin(ScrollTrigger);
}

const profiles: { type: ProfileType; icon: typeof BriefcaseIcon; title: string; subtitle: string; color: string }[] = [
  { type: "recruiter", icon: BriefcaseIcon, title: "Hiring", subtitle: "Looking for talent", color: "#8B5CF6" },
  { type: "business", icon: RocketIcon, title: "Building", subtitle: "Have a project", color: "#FF6B35" },
  { type: "collaborator", icon: UsersIcon, title: "Collaborating", subtitle: "Want to connect", color: "#06B6D4" },
  { type: "explorer", icon: SparklesIcon, title: "Exploring", subtitle: "Just browsing", color: "#10B981" },
];

export default function Home() {
  const mounted = useMounted();
  const { selectedProfile, hasSelectedProfile, setProfile } = useProfileStore();
  const config = profileConfigs[selectedProfile || "explorer"];

  if (!mounted) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="w-16 h-16 rounded-full border-2 border-primary/20 border-t-primary animate-spin" />
      </div>
    );
  }

  if (!hasSelectedProfile) {
    return <GramophoneSelector onSelect={setProfile} />;
  }

  return <PortfolioView selectedProfile={selectedProfile} config={config} />;
}

// Gramophone Selector with Circular Vinyl Animation
function GramophoneSelector({ onSelect }: { onSelect: (profile: ProfileType) => void }) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const hasAutoSelected = useRef(false);

  // Calculate vinyl positions - active vinyl centered, others hidden to sides
  const getVinylTransform = (index: number) => {
    const offset = index - activeIndex;
    
    // Active vinyl is centered (0,0), others are off to the sides
    const x = offset * 400; // Horizontal offset for non-active
    const y = Math.abs(offset) * 50; // Push down slightly when not active
    const rotation = offset * -15; // Slight tilt
    const scale = offset === 0 ? 1 : 0.7; // Active is full size
    const opacity = offset === 0 ? 1 : Math.max(0, 0.4 - Math.abs(offset) * 0.2);
    
    return {
      x,
      y,
      rotation,
      scale,
      opacity,
      isActive: offset === 0,
    };
  };

  // Setup scroll-based animation
  useEffect(() => {
    if (!containerRef.current) return;

    const ctx = gsap.context(() => {
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: "top top",
        end: "bottom bottom",
        onUpdate: (self) => {
          const progress = self.progress;
          
          // Calculate active index based on scroll progress
          const totalProfiles = profiles.length;
          const segmentSize = 1 / (totalProfiles + 0.5); // Add buffer for auto-select
          const newIndex = Math.min(
            Math.floor(progress / segmentSize),
            totalProfiles - 1
          );
          setActiveIndex(newIndex);
          
          // Auto-select when scrolled past all profiles
          if (progress > 0.9 && !hasAutoSelected.current) {
            hasAutoSelected.current = true;
            setTimeout(() => {
              onSelect(profiles[newIndex].type);
            }, 300);
          }
        },
      });
    }, containerRef);

    return () => ctx.revert();
  }, [onSelect]);

  const handlePlay = () => {
    if (isPlaying) return;
    setIsPlaying(true);
    setTimeout(() => {
      onSelect(profiles[activeIndex].type);
    }, 800);
  };

  const handleNav = (direction: 'prev' | 'next') => {
    if (direction === 'prev' && activeIndex > 0) {
      setActiveIndex(activeIndex - 1);
    } else if (direction === 'next' && activeIndex < profiles.length - 1) {
      setActiveIndex(activeIndex + 1);
    }
  };

  return (
    <div ref={containerRef} className="h-[500vh] relative">
      {/* Fixed View */}
      <div className="fixed inset-0 overflow-hidden">
        {/* Background */}
        <div className="absolute inset-0 bg-background" />
        
        {/* Ambient Glow */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[200px] transition-all duration-700 opacity-30"
          style={{ backgroundColor: profiles[activeIndex].color }}
        />

        {/* Content Container */}
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          
          {/* Header */}
          <div className="absolute top-12 left-0 right-0 text-center z-10">
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-2">
              <span className="text-text">I&apos;m </span>
              <span className="gradient-text">Anirudh</span>
            </h1>
            <p className="text-text-muted">Full-Stack Developer</p>
          </div>

          {/* Gramophone Container - Centered */}
          <div className="relative flex items-center justify-center" style={{ width: '340px', height: '340px' }}>
            
            {/* Turntable Base - moved up */}
            <div className="absolute inset-0 flex items-center justify-center z-[1] -translate-y-12">
              <div className="relative w-64 h-64 md:w-72 md:h-72">
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-700 to-zinc-800 shadow-2xl" />
                <div className="absolute inset-1 rounded-full bg-gradient-to-br from-zinc-800 to-zinc-900" />
                <div className="absolute inset-2 rounded-full bg-gradient-to-br from-zinc-900 to-black" />
                <div className="absolute inset-4 rounded-full border border-zinc-700/30" />
                <div className="absolute inset-8 rounded-full border border-zinc-700/20" />
                <div className="absolute inset-12 rounded-full border border-zinc-700/15" />
                <div className="absolute inset-16 rounded-full border border-zinc-700/10" />
              </div>
            </div>

            {/* Vinyl Records - Multiple discs that slide - moved up */}
            {profiles.map((profile, index) => {
              const offset = index - activeIndex;
              const Icon = profile.icon;
              
              // Calculate position - active disc centered, others to the sides
              const translateX = offset * 280;
              const translateY = (Math.abs(offset) * 30) - 48; // -48px to move up
              const scale = offset === 0 ? 1 : 0.75;
              const opacity = offset === 0 ? 1 : Math.max(0, 0.5 - Math.abs(offset) * 0.2);
              const rotation = offset * -10;
              const zIndex = offset === 0 ? 10 : 5 - Math.abs(offset);
              
              return (
                <div
                  key={profile.type}
                  className="absolute flex items-center justify-center transition-all duration-500 ease-out"
                  style={{
                    transform: `translateX(${translateX}px) translateY(${translateY}px) scale(${scale}) rotate(${rotation}deg)`,
                    opacity,
                    zIndex,
                  }}
                >
                  <div 
                    className={`w-56 h-56 md:w-64 md:h-64 rounded-full relative ${
                      isPlaying && offset === 0 ? 'animate-[spin_2s_linear_infinite]' : ''
                    }`}
                  >
                    {/* Vinyl surface */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-zinc-800 to-black shadow-2xl" />
                    
                    {/* Grooves */}
                    <div className="absolute inset-[4%] rounded-full border border-zinc-600/40" />
                    <div className="absolute inset-[8%] rounded-full border border-zinc-600/30" />
                    <div className="absolute inset-[12%] rounded-full border border-zinc-600/20" />
                    <div className="absolute inset-[16%] rounded-full border border-zinc-600/15" />
                    
                    {/* Center Label */}
                    <div 
                      className="absolute inset-[22%] rounded-full flex flex-col items-center justify-center"
                      style={{ backgroundColor: profile.color }}
                    >
                      <Icon className="w-5 h-5 md:w-6 md:h-6 text-white/90 mb-1" />
                      <span className="text-white font-bold text-xs md:text-sm">{profile.title}</span>
                      <span className="text-white/70 text-[9px] md:text-[10px] mt-0.5">{profile.subtitle}</span>
                    </div>
                    
                    {/* Vinyl shine */}
                    <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/10 via-transparent to-transparent pointer-events-none" />
                  </div>
                </div>
              );
            })}
            
            {/* Center spindle - on top - moved up */}
            <div className="absolute inset-0 flex items-center justify-center z-[15] pointer-events-none -translate-y-12">
              <div className="relative w-3 h-3">
                <div className="absolute inset-0 rounded-full bg-zinc-600" />
                <div className="absolute inset-[15%] rounded-full bg-zinc-400" />
              </div>
            </div>

            {/* Tonearm - in playing position */}
            <div 
              className="absolute z-[20]"
              style={{ 
                top: '8%',
                right: '2%',
                transformOrigin: 'top center',
                transform: 'rotate(32deg)',
                transition: 'transform 0.7s ease-out',
              }}
            >
              {/* Pivot */}
              <div className="w-5 h-5 rounded-full bg-zinc-700 border-2 border-zinc-600 shadow-lg" />
              {/* Arm */}
              <div className="absolute top-4 left-1/2 -translate-x-1/2 w-1 h-20 md:h-24 bg-gradient-to-b from-zinc-600 to-zinc-400 rounded-full" />
              {/* Headshell */}
              <div className="absolute top-[88px] md:top-[104px] left-1/2 -translate-x-1/2 w-3 h-2 bg-zinc-500 rounded-sm" />
              {/* Stylus */}
              <div className="absolute top-[96px] md:top-[112px] left-1/2 -translate-x-1/2 w-1.5 h-1.5 bg-zinc-300 rounded-full" />
            </div>
          </div>

          {/* Profile Info */}
          <div className="absolute bottom-[174px] md:bottom-[190px] left-0 right-0 text-center z-10">
            <h2 
              className="text-3xl md:text-4xl lg:text-5xl font-heading font-bold mb-3 transition-all duration-500"
              style={{ color: profiles[activeIndex].color }}
            >
              {profiles[activeIndex].title}
            </h2>
            <p className="text-text-muted text-base md:text-lg">{profiles[activeIndex].subtitle}</p>
          </div>

          {/* Controls */}
          <div className="absolute bottom-20 md:bottom-24 left-0 right-0 flex items-center justify-center gap-6 z-10">
            <button
              onClick={() => handleNav('prev')}
              disabled={activeIndex === 0}
              className="w-12 h-12 rounded-full bg-surface/80 backdrop-blur border border-border flex items-center justify-center text-text-muted hover:text-text hover:border-primary/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <SkipBackIcon className="w-5 h-5" />
            </button>

            <button
              onClick={handlePlay}
              disabled={isPlaying}
              className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white flex items-center justify-center shadow-lg hover:scale-105 transition-all disabled:opacity-70"
            >
              <PlayIcon className="w-7 h-7 md:w-8 md:h-8 text-black ml-1" />
            </button>

            <button
              onClick={() => handleNav('next')}
              disabled={activeIndex === profiles.length - 1}
              className="w-12 h-12 rounded-full bg-surface/80 backdrop-blur border border-border flex items-center justify-center text-text-muted hover:text-text hover:border-primary/50 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <SkipForwardIcon className="w-5 h-5" />
            </button>
          </div>

          {/* Track Indicators - Matching the gramophone position */}
          <div className="absolute bottom-6 md:bottom-7 left-4 right-4 md:left-8 md:right-8 flex items-center justify-center gap-4 z-10">
            {profiles.map((profile, i) => (
              <button
                key={profile.type}
                onClick={() => setActiveIndex(i)}
                className="group flex flex-col items-center gap-1.5"
              >
                <span 
                  className={`text-xs font-medium transition-all duration-300 ${
                    i === activeIndex ? 'opacity-100 scale-110' : 'opacity-40 group-hover:opacity-70'
                  }`} 
                  style={{ color: i === activeIndex ? profile.color : '#9CA3AF' }}
                >
                  {profile.title}
                </span>
                <div 
                  className={`h-1 rounded-full transition-all duration-300 ${
                    i === activeIndex ? 'w-6' : 'w-1.5 group-hover:w-3'
                  }`}
                  style={{ 
                    backgroundColor: i === activeIndex ? profile.color : 'rgba(255,255,255,0.2)',
                  }}
                />
              </button>
            ))}
          </div>

          {/* Scroll Hint */}
          <div className="absolute bottom-2 left-0 right-0 text-center">
            <p className="text-text-subtle text-xs animate-pulse">
              Scroll to browse • Click play to select
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

// Portfolio View Component
function PortfolioView({ 
  selectedProfile, 
  config 
}: { 
  selectedProfile: ProfileType | null; 
  config: typeof profileConfigs[ProfileType];
}) {
  const mainRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  
  // Get the profile color
  const profileColor = config.color;
  
  // Generate color variations
  const getColorWithOpacity = (opacity: number) => {
    const hex = profileColor.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  useEffect(() => {
    if (!heroRef.current) return;

    const ctx = gsap.context(() => {
      gsap.fromTo(
        heroRef.current?.querySelectorAll('.animate-item') || [],
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          stagger: 0.12,
          ease: "power3.out",
          delay: 0.3,
        }
      );
    }, mainRef);

    return () => ctx.revert();
  }, []);

  // CSS custom properties for profile-specific theming
  const themeStyles = {
    '--profile-color': profileColor,
    '--profile-color-10': getColorWithOpacity(0.1),
    '--profile-color-20': getColorWithOpacity(0.2),
    '--profile-color-30': getColorWithOpacity(0.3),
    '--profile-color-50': getColorWithOpacity(0.5),
  } as React.CSSProperties;

  return (
    <main ref={mainRef} className="min-h-screen relative" style={themeStyles}>

      {/* Hero */}
      <section id="hero" className="min-h-screen flex items-center justify-center px-6 py-20 relative overflow-hidden">
        <GradientOrbs color={profileColor} />

        <div ref={heroRef} className="w-full max-w-4xl mx-auto text-center relative z-10">
          {/* Badge */}
          <div 
            className="animate-item inline-flex items-center gap-3 px-4 py-2 rounded-full bg-surface/60 backdrop-blur-sm border mb-10 transition-colors duration-500"
            style={{ borderColor: getColorWithOpacity(0.3) }}
          >
            <span className="relative flex h-2 w-2">
              <span 
                className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75" 
                style={{ backgroundColor: profileColor }}
              />
              <span 
                className="relative inline-flex rounded-full h-2 w-2" 
                style={{ backgroundColor: profileColor }}
              />
            </span>
            <span className="text-sm text-text-muted capitalize">{selectedProfile}</span>
            <button
              onClick={() => useProfileStore.getState().clearProfile()}
              className="text-text-subtle hover:text-text transition-colors text-xs ml-2"
              style={{ ['--hover-color' as string]: profileColor }}
            >
              Change
            </button>
          </div>

          <p className="animate-item text-text-muted text-lg mb-4">Hey, I&apos;m Anirudh</p>
          
          <h1 className="animate-item text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-heading font-bold mb-8 tracking-tight leading-[1.1]">
            <span 
              className="bg-clip-text text-transparent transition-all duration-500"
              style={{ 
                backgroundImage: `linear-gradient(135deg, ${profileColor} 0%, ${profileColor}99 50%, ${profileColor}66 100%)`,
              }}
            >
              {config.tagline}
            </span>
          </h1>

          <p className="animate-item text-lg sm:text-xl text-text-secondary max-w-2xl mx-auto mb-12 leading-relaxed">
            {config.description}
          </p>

          <div className="animate-item flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href={config.primaryCTA.href}
              className="group relative px-8 py-4 rounded-xl font-medium text-white overflow-hidden transition-all duration-300 hover:shadow-lg"
              style={{ 
                background: profileColor,
                boxShadow: `0 4px 20px ${getColorWithOpacity(0.3)}`,
              }}
            >
              <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity bg-white/10" />
              <span className="relative flex items-center gap-2">
                {config.primaryCTA.text}
                <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </span>
            </a>
            <a
              href={config.secondaryCTA.href}
              className="px-8 py-4 rounded-xl font-medium text-text border hover:bg-surface/50 transition-all duration-300"
              style={{ 
                borderColor: getColorWithOpacity(0.3),
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = getColorWithOpacity(0.6)}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = getColorWithOpacity(0.3)}
            >
              {config.secondaryCTA.text}
            </a>
          </div>

          {/* Stats */}
          <div className="animate-item mt-20 grid grid-cols-2 md:grid-cols-4 gap-6">
            {[
              { value: "4+", label: "Years" },
              { value: "10+", label: "Projects" },
              { value: "10K+", label: "Users" },
              { value: "100%", label: "Dedication" },
            ].map((stat) => (
              <div key={stat.label}>
                <p 
                  className="text-2xl md:text-3xl font-heading font-bold transition-colors duration-500"
                  style={{ color: profileColor }}
                >
                  {stat.value}
                </p>
                <p className="text-text-muted text-sm">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 hidden md:flex flex-col items-center gap-2 text-text-subtle">
          <span className="text-xs uppercase tracking-widest">Scroll</span>
          <div className="w-px h-10 bg-gradient-to-b from-text-subtle to-transparent" />
        </div>
      </section>

      {/* About */}
      <section id="about" className="min-h-screen flex items-center px-6 py-24 bg-surface/50">
        <ScrollReveal>
          <div className="w-full max-w-5xl mx-auto grid md:grid-cols-2 gap-12 items-center">
            <div className="order-2 md:order-1">
              <div className="aspect-square rounded-2xl bg-gradient-to-br from-surface to-background border border-border flex items-center justify-center relative overflow-hidden">
                <div className="relative w-32 h-32">
                  <div 
                    className="absolute inset-0 rounded-full animate-[spin_15s_linear_infinite] transition-colors duration-500" 
                    style={{ border: `1px solid ${getColorWithOpacity(0.3)}` }}
                  />
                  <div 
                    className="absolute inset-4 rounded-full animate-[spin_10s_linear_infinite_reverse] transition-colors duration-500" 
                    style={{ border: `1px solid ${getColorWithOpacity(0.5)}` }}
                  />
                  <div 
                    className="absolute inset-[40%] rounded-full blur-sm transition-colors duration-500" 
                    style={{ backgroundColor: profileColor }}
                  />
                </div>
              </div>
            </div>
            <div className="order-1 md:order-2">
              <span 
                className="text-sm font-medium tracking-widest uppercase transition-colors duration-500"
                style={{ color: profileColor }}
              >
                About
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3 mb-5">The Journey</h2>
              <p className="text-text-secondary leading-relaxed mb-6">
                From a curious PHP intern to crafting AI-powered experiences at scale. 
                I build things that matter—products that solve real problems.
              </p>
              <div className="flex flex-wrap gap-2">
                {["Problem Solver", "Team Player", "Quick Learner"].map((t) => (
                  <span 
                    key={t} 
                    className="px-3 py-1.5 rounded-lg bg-background text-text-muted text-sm transition-colors duration-300"
                    style={{ border: `1px solid ${getColorWithOpacity(0.2)}` }}
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Work */}
      <section id="work" className="min-h-screen flex items-center px-6 py-24">
        <ScrollReveal>
          <div className="w-full max-w-5xl mx-auto">
            <div className="text-center mb-12">
              <span 
                className="text-sm font-medium tracking-widest uppercase transition-colors duration-500"
                style={{ color: profileColor }}
              >
                Portfolio
              </span>
              <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3">Selected Work</h2>
            </div>
            <div className="grid md:grid-cols-2 gap-5">
              {[
                { name: "Sinplay 2.0", type: "Music Streaming" },
                { name: "Aditus", type: "School Management" },
                { name: "Rotaract 3012", type: "Club Platform" },
                { name: "Sinplay PWA", type: "Progressive Web App" },
              ].map((project) => (
                <div 
                  key={project.name} 
                  className="group rounded-xl bg-surface border overflow-hidden transition-all cursor-pointer"
                  style={{ borderColor: 'rgba(255,255,255,0.08)' }}
                  onMouseEnter={(e) => e.currentTarget.style.borderColor = getColorWithOpacity(0.4)}
                  onMouseLeave={(e) => e.currentTarget.style.borderColor = 'rgba(255,255,255,0.08)'}
                >
                  <div className="aspect-video bg-gradient-to-br from-background to-surface flex items-center justify-center relative">
                    <div 
                      className="w-16 h-16 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all"
                      style={{ backgroundColor: getColorWithOpacity(0.2) }}
                    >
                      <PlayIcon className="w-6 h-6 text-white ml-1" />
                    </div>
                  </div>
                  <div className="p-5">
                    <p className="text-text-subtle text-xs uppercase tracking-wider mb-1">{project.type}</p>
                    <h3 
                      className="font-semibold text-text transition-colors duration-300 group-hover:text-current"
                      style={{ ['--tw-text-opacity' as string]: 1 }}
                      onMouseEnter={(e) => e.currentTarget.style.color = profileColor}
                      onMouseLeave={(e) => e.currentTarget.style.color = ''}
                    >
                      {project.name}
                    </h3>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Contact */}
      <section id="contact" className="min-h-screen flex items-center px-6 py-24 bg-surface/50">
        <ScrollReveal>
          <div className="w-full max-w-2xl mx-auto text-center">
            <span 
              className="text-sm font-medium tracking-widest uppercase transition-colors duration-500"
              style={{ color: profileColor }}
            >
              Contact
            </span>
            <h2 className="text-3xl md:text-4xl font-heading font-bold mt-3 mb-5">Let&apos;s Connect</h2>
            <p className="text-text-secondary mb-10">
              Have a project in mind? I&apos;m always open to discussing new opportunities.
            </p>
            <a
              href="mailto:hello@anirudh.dev"
              className="group inline-flex items-center gap-2 px-8 py-4 rounded-xl font-semibold text-white transition-all hover:-translate-y-0.5"
              style={{ 
                backgroundColor: profileColor,
                boxShadow: `0 4px 20px ${getColorWithOpacity(0.3)}`,
              }}
              onMouseEnter={(e) => e.currentTarget.style.boxShadow = `0 8px 30px ${getColorWithOpacity(0.4)}`}
              onMouseLeave={(e) => e.currentTarget.style.boxShadow = `0 4px 20px ${getColorWithOpacity(0.3)}`}
            >
              Get in Touch
              <ArrowRightIcon className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="mt-12 flex items-center justify-center gap-3">
              {[
                { icon: LinkedInIcon, label: "LinkedIn" },
                { icon: GitHubIcon, label: "GitHub" },
                { icon: TwitterIcon, label: "Twitter" },
              ].map(({ icon: Icon, label }) => (
                <a
                  key={label}
                  href="#"
                  aria-label={label}
                  className="w-11 h-11 rounded-lg bg-background flex items-center justify-center text-text-muted transition-all"
                  style={{ border: `1px solid ${getColorWithOpacity(0.2)}` }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = getColorWithOpacity(0.5);
                    e.currentTarget.style.color = profileColor;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = getColorWithOpacity(0.2);
                    e.currentTarget.style.color = '';
                  }}
                >
                  <Icon className="w-5 h-5" />
                </a>
              ))}
            </div>
          </div>
        </ScrollReveal>
      </section>

      {/* Now Playing Bar */}
      <NowPlayingBar profile={selectedProfile || "explorer"} color={profileColor} />
      <div className="h-24" />
    </main>
  );
}

function GradientOrbs({ color }: { color: string }) {
  const getColorWithOpacity = (opacity: number) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      <div 
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full blur-[150px] animate-blob transition-colors duration-700" 
        style={{ backgroundColor: getColorWithOpacity(0.15) }}
      />
      <div 
        className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full blur-[150px] animate-blob transition-colors duration-700" 
        style={{ backgroundColor: getColorWithOpacity(0.1), animationDelay: "2s" }}
      />
    </div>
  );
}

function ScrollProgress({ color }: { color: string }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const update = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
    };
    window.addEventListener("scroll", update, { passive: true });
    return () => window.removeEventListener("scroll", update);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 h-0.5 bg-surface/50 z-50">
      <div 
        className="h-full transition-all duration-300" 
        style={{ 
          width: `${progress}%`,
          background: `linear-gradient(to right, ${color}, ${color}cc)`,
        }} 
      />
    </div>
  );
}

function ScrollReveal({ children }: { children: React.ReactNode }) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const ctx = gsap.context(() => {
      gsap.fromTo(ref.current, { opacity: 0, y: 50 }, {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 85%", toggleActions: "play none none reverse" },
      });
    });
    return () => ctx.revert();
  }, []);

  return <div ref={ref}>{children}</div>;
}

// Portfolio sections for navigation
const sections = [
  { id: 'hero', label: 'Intro' },
  { id: 'about', label: 'About' },
  { id: 'work', label: 'Work' },
  { id: 'contact', label: 'Contact' },
];

function NowPlayingBar({ profile, color }: { profile: ProfileType; color: string }) {
  const config = profileConfigs[profile];
  const Icon = profiles.find(p => p.type === profile)?.icon || SparklesIcon;
  const [scrollProgress, setScrollProgress] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  
  const getColorWithOpacity = (opacity: number) => {
    const hex = color.replace('#', '');
    const r = parseInt(hex.substring(0, 2), 16);
    const g = parseInt(hex.substring(2, 4), 16);
    const b = parseInt(hex.substring(4, 6), 16);
    return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  };

  // Track scroll progress and current section
  useEffect(() => {
    const updateProgress = () => {
      const scrollTop = window.scrollY;
      const docHeight = document.documentElement.scrollHeight - window.innerHeight;
      setScrollProgress(docHeight > 0 ? (scrollTop / docHeight) * 100 : 0);
      
      // Determine current section based on scroll position
      const sectionElements = sections.map(s => document.getElementById(s.id));
      const viewportMiddle = scrollTop + window.innerHeight / 2;
      
      for (let i = sectionElements.length - 1; i >= 0; i--) {
        const el = sectionElements[i];
        if (el && el.offsetTop <= viewportMiddle) {
          setCurrentSection(i);
          break;
        }
      }
    };
    window.addEventListener("scroll", updateProgress, { passive: true });
    updateProgress();
    return () => window.removeEventListener("scroll", updateProgress);
  }, []);

  // Navigate to section
  const navigateToSection = (index: number) => {
    const targetIndex = Math.max(0, Math.min(index, sections.length - 1));
    const section = document.getElementById(sections[targetIndex].id);
    if (section) {
      section.scrollIntoView({ behavior: 'smooth' });
      setCurrentSection(targetIndex);
    }
  };

  // Play button - go to next section or loop back
  const handlePlay = () => {
    setIsPlaying(true);
    const nextIndex = currentSection < sections.length - 1 ? currentSection + 1 : 0;
    navigateToSection(nextIndex);
    setTimeout(() => setIsPlaying(false), 1000);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 z-40 hidden md:block">
      {/* Scroll Progress Bar - Top Border */}
      <div className="h-1 bg-white/10 w-full">
        <div 
          className="h-full transition-all duration-150 ease-out"
          style={{ 
            width: `${scrollProgress}%`, 
            backgroundColor: color,
            boxShadow: `0 0 10px ${getColorWithOpacity(0.5)}`
          }}
        />
      </div>
      
      {/* Player Content */}
      <div className="h-16 bg-surface/98 backdrop-blur-xl transition-colors duration-500">
        <div 
          className="h-full flex items-center justify-between"
          style={{ paddingLeft: '40px', paddingRight: '40px' }}
        >
          {/* Left - Now Playing Info */}
          <div className="flex items-center gap-3">
            <div 
              className="w-11 h-11 rounded flex items-center justify-center flex-shrink-0 transition-all duration-500"
              style={{ backgroundColor: color }}
            >
              <Icon className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <p className="font-medium text-text text-sm truncate">Anirudh&apos;s Portfolio</p>
              <p className="text-text-muted text-xs truncate max-w-[180px]">{config.tagline}</p>
            </div>
          </div>

          {/* Center - Playback Controls */}
          <div className="flex flex-col items-center gap-1">
            <div className="flex items-center gap-5">
              <button 
                onClick={() => navigateToSection(currentSection - 1)}
                disabled={currentSection === 0}
                className="text-text-muted hover:text-text transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                title="Previous section"
              >
                <SkipBackIcon className="w-5 h-5" />
              </button>
              <button 
                onClick={handlePlay}
                className={`w-9 h-9 rounded-full flex items-center justify-center bg-white hover:scale-105 transition-transform ${isPlaying ? 'scale-95' : ''}`}
                title="Next section"
              >
                <PlayIcon className="w-4 h-4 text-black ml-0.5" />
              </button>
              <button 
                onClick={() => navigateToSection(currentSection + 1)}
                disabled={currentSection === sections.length - 1}
                className="text-text-muted hover:text-text transition-colors disabled:opacity-30 disabled:cursor-not-allowed"
                title="Next section"
              >
                <SkipForwardIcon className="w-5 h-5" />
              </button>
            </div>
            {/* Current section indicator */}
            <span className="text-[10px] text-text-muted">
              {sections[currentSection]?.label || 'Intro'}
            </span>
          </div>

          {/* Right - Profile */}
          <div className="flex items-center">
            <button
              onClick={() => useProfileStore.getState().clearProfile()}
              className="flex items-center gap-2 px-4 py-2 rounded-full text-sm transition-all hover:bg-white/5"
              style={{ border: `1px solid ${getColorWithOpacity(0.3)}` }}
            >
              <div 
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-text-secondary capitalize">{profile}</span>
              <span className="text-text-muted">•</span>
              <span className="text-text-muted hover:text-text">Change</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
