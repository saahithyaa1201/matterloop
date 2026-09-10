import { Button } from "@/components/ui/button";
import { Link } from "@tanstack/react-router";
import { ShieldCheck, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface CookieBannerProps {
  onAcceptAll: () => void;
  onRejectNonEssential: () => void;
  onManagePreferences: () => void;
  onClose?: () => void;
}

export function CookieBanner({
  onAcceptAll,
  onRejectNonEssential,
  onManagePreferences,
  onClose,
}: CookieBannerProps) {
  return (
    <div className="fixed bottom-0 left-0 right-0 z-50 p-4 sm:p-6 sm:bottom-6 sm:left-6 sm:right-auto pointer-events-none flex flex-col items-center sm:items-start animate-in fade-in slide-in-from-bottom-4 duration-500 ease-out fill-mode-forwards">
      <div className="pointer-events-auto w-full max-w-[24rem] sm:max-w-md rounded-2xl border border-border bg-background/95 backdrop-blur-xl p-5 sm:p-6 shadow-2xl glass">
        
        <div className="flex items-start justify-between gap-4 mb-3">
          <div className="flex items-center gap-2">
            <div className="flex h-8 w-8 items-center justify-center rounded-full bg-surface-2/10 text-primary">
              <ShieldCheck className="h-4 w-4" />
            </div>
            <h3 className="font-semibold text-foreground tracking-tight">Privacy at MatterLoop</h3>
          </div>
          {onClose && (
            <button 
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors cursor-pointer p-1"
              aria-label="Close"
            >
              <X className="h-4 w-4" />
            </button>
          )}
        </div>
        
        <div className="mb-5 space-y-3">
          <p className="text-sm text-muted-foreground leading-relaxed">
            We use cookies to keep MatterLoop secure, understand website usage, and improve your experience.
          </p>
          <div className="flex flex-wrap gap-x-4 gap-y-2 text-xs">
            <Link to="/privacy-policy" className="text-cyan hover:text-primary transition-colors underline-offset-4 hover:underline">
              Privacy Policy
            </Link>
            {/* Omitted Cookie Policy until a valid page exists as per requirements */}
          </div>
        </div>

        <div className="flex flex-col gap-2.5 sm:grid sm:grid-cols-2">
          <Button 
            variant="default" 
            className="w-full bg-primary text-primary-foreground hover:bg-primary/90 order-1 sm:order-none sm:col-span-2"
            onClick={onAcceptAll}
          >
            Accept all
          </Button>
          <Button 
            variant="secondary" 
            className="w-full bg-surface hover:bg-surface/80 text-foreground order-2 sm:order-none"
            onClick={onRejectNonEssential}
          >
            Reject non-essential
          </Button>
          <Button 
            variant="outline" 
            className="w-full order-3 sm:order-none"
            onClick={onManagePreferences}
          >
            Manage preferences
          </Button>
        </div>
      </div>
    </div>
  );
}
