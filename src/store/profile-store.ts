import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import type { ProfileType, ProfileConfig } from '@/types';

/**
 * Profile configurations for personalized experience
 */
export const profileConfigs: Record<ProfileType, ProfileConfig> = {
  recruiter: {
    type: 'recruiter',
    tagline: 'Enterprise-ready. Startup-tested. Impact-driven.',
    description: 'Full-Stack Developer with 4 years of experience building AI-powered experiences for Gaming & Entertainment. I turn complex challenges into elegant, scalable solutions.',
    primaryCTA: {
      text: 'Download Resume',
      href: '/resume.pdf',
    },
    secondaryCTA: {
      text: 'View My Work',
      href: '#work',
    },
  },
  business: {
    type: 'business',
    tagline: 'From idea to impact—faster than you\'d expect.',
    description: 'I help businesses build high-impact digital products—from AI integrations to seamless tech migrations. Let\'s turn your vision into measurable results.',
    primaryCTA: {
      text: 'Let\'s Discuss Your Project',
      href: '#contact',
    },
    secondaryCTA: {
      text: 'View Case Studies',
      href: '#work',
    },
  },
  collaborator: {
    type: 'collaborator',
    tagline: 'Let\'s build something worth talking about.',
    description: 'I experiment fearlessly with AI, animations, and cutting-edge tech. Passionate about Gaming, Entertainment, and Education. Always looking for exciting projects and like-minded builders.',
    primaryCTA: {
      text: 'Let\'s Connect',
      href: '#contact',
    },
    secondaryCTA: {
      text: 'See What I\'m Building',
      href: '#work',
    },
  },
  explorer: {
    type: 'explorer',
    tagline: 'Full-stack for the future. Built for impact.',
    description: 'Full-Stack Developer crafting AI-powered experiences for Gaming & Entertainment. I build what matters.',
    primaryCTA: {
      text: 'View My Work',
      href: '#work',
    },
    secondaryCTA: {
      text: 'Get in Touch',
      href: '#contact',
    },
  },
};

interface ProfileState {
  // State
  selectedProfile: ProfileType | null;
  hasSelectedProfile: boolean;
  showProfileSelector: boolean;
  
  // Actions
  setProfile: (profile: ProfileType) => void;
  clearProfile: () => void;
  toggleProfileSelector: (show?: boolean) => void;
  
  // Getters
  getProfileConfig: () => ProfileConfig;
}

export const useProfileStore = create<ProfileState>()(
  persist(
    (set, get) => ({
      // Initial state
      selectedProfile: null,
      hasSelectedProfile: false,
      showProfileSelector: true,
      
      // Actions
      setProfile: (profile) => {
        set({
          selectedProfile: profile,
          hasSelectedProfile: true,
          showProfileSelector: false,
        });
      },
      
      clearProfile: () => {
        set({
          selectedProfile: null,
          hasSelectedProfile: false,
          showProfileSelector: true,
        });
      },
      
      toggleProfileSelector: (show) => {
        set((state) => ({
          showProfileSelector: show ?? !state.showProfileSelector,
        }));
      },
      
      // Getters
      getProfileConfig: () => {
        const { selectedProfile } = get();
        return profileConfigs[selectedProfile || 'explorer'];
      },
    }),
    {
      name: 'anirudh-portfolio-profile',
      partialize: (state) => ({
        selectedProfile: state.selectedProfile,
        hasSelectedProfile: state.hasSelectedProfile,
      }),
    }
  )
);

