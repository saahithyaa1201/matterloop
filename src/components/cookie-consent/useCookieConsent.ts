import { useState, useEffect } from "react";

export type ConsentState = {
  version: string;
  essential: boolean;
  analytics: boolean;
  marketing: boolean;
  timestamp: string | null;
};

const CONSENT_VERSION = "1.0";
const CONSENT_KEY = "matterloop-cookie-consent";

const defaultState: ConsentState = {
  version: CONSENT_VERSION,
  essential: true, // Always true
  analytics: false,
  marketing: false,
  timestamp: null,
};

export function useCookieConsent() {
  const [consent, setConsent] = useState<ConsentState>(defaultState);
  const [isMounted, setIsMounted] = useState(false);
  const [showBanner, setShowBanner] = useState(false);
  const [showPreferences, setShowPreferences] = useState(false);

  useEffect(() => {
    setIsMounted(true);
    try {
      const stored = localStorage.getItem(CONSENT_KEY);
      if (stored) {
        const parsed = JSON.parse(stored) as ConsentState;
        if (parsed.version === CONSENT_VERSION) {
          setConsent(parsed);
          setShowBanner(false);
        } else {
          setShowBanner(true);
        }
      } else {
        setShowBanner(true);
      }
    } catch (e) {
      console.error("Failed to parse cookie consent", e);
      setShowBanner(true);
    }

    const handleOpenPreferences = () => {
      setShowPreferences(true);
      setShowBanner(false);
    };

    window.addEventListener("open-cookie-preferences", handleOpenPreferences);
    return () => {
      window.removeEventListener("open-cookie-preferences", handleOpenPreferences);
    };
  }, []);

  const saveConsent = (newConsent: Partial<ConsentState>) => {
    const updated: ConsentState = {
      ...consent,
      ...newConsent,
      essential: true,
      version: CONSENT_VERSION,
      timestamp: new Date().toISOString(),
    };
    setConsent(updated);
    try {
      localStorage.setItem(CONSENT_KEY, JSON.stringify(updated));
    } catch (e) {
      console.error("Failed to save cookie consent", e);
    }
    setShowBanner(false);
    setShowPreferences(false);
    
    // Dispatch an event so other parts of the app can react if needed
    window.dispatchEvent(new CustomEvent("cookie-consent-updated", { detail: updated }));
  };

  const acceptAll = () => {
    saveConsent({
      analytics: true,
      marketing: true,
    });
  };

  const rejectNonEssential = () => {
    saveConsent({
      analytics: false,
      marketing: false,
    });
  };

  return {
    isMounted,
    consent,
    showBanner,
    showPreferences,
    setShowPreferences,
    saveConsent,
    acceptAll,
    rejectNonEssential,
  };
}
