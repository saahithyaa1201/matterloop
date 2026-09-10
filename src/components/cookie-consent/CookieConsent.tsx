import { useEffect } from "react";
import { CookieBanner } from "./CookieBanner";
import { CookiePreferences } from "./CookiePreferences";
import { useCookieConsent } from "./useCookieConsent";

export function CookieConsent() {
  const {
    isMounted,
    showBanner,
    showPreferences,
    setShowPreferences,
    consent,
    saveConsent,
    acceptAll,
    rejectNonEssential,
  } = useCookieConsent();

  // Prevent hydration mismatch
  if (!isMounted) return null;

  return (
    <>
      {showBanner && !showPreferences && (
        <CookieBanner
          onAcceptAll={acceptAll}
          onRejectNonEssential={rejectNonEssential}
          onManagePreferences={() => setShowPreferences(true)}
        />
      )}
      
      <CookiePreferences
        open={showPreferences}
        onOpenChange={setShowPreferences}
        consent={consent}
        onSave={saveConsent}
      />
    </>
  );
}
