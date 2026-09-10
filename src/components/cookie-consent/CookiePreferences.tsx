import { useState, useEffect } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { CookieCategory } from "./CookieCategory";
import { ConsentState } from "./useCookieConsent";

interface CookiePreferencesProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  consent: ConsentState;
  onSave: (preferences: Partial<ConsentState>) => void;
}

export function CookiePreferences({
  open,
  onOpenChange,
  consent,
  onSave,
}: CookiePreferencesProps) {
  const [localConsent, setLocalConsent] = useState({
    analytics: consent.analytics,
    marketing: consent.marketing,
  });

  // Reset local state when opened
  useEffect(() => {
    if (open) {
      setLocalConsent({
        analytics: consent.analytics,
        marketing: consent.marketing,
      });
    }
  }, [open, consent]);

  const handleSave = () => {
    onSave(localConsent);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px] p-0 overflow-hidden flex flex-col max-h-[90dvh] w-[calc(100%-2rem)] mx-auto rounded-2xl">
        <div className="p-6 pb-4 border-b border-border bg-surface/50">
          <DialogHeader>
            <DialogTitle className="text-xl">Cookie Preferences</DialogTitle>
            <DialogDescription className="mt-2 text-sm text-muted-foreground">
              Control how MatterLoop uses optional cookies to improve your experience.
            </DialogDescription>
          </DialogHeader>
        </div>

        <ScrollArea className="flex-1 overflow-y-auto px-6 py-2">
          <div className="flex flex-col">
            <CookieCategory
              id="essential"
              title="Essential"
              description="Required for core website functionality, security, and remembering your consent preferences."
              checked={true}
              onCheckedChange={() => {}}
              disabled={true}
            />
            <CookieCategory
              id="analytics"
              title="Analytics"
              description="Helps us understand website usage and improve the MatterLoop experience."
              checked={localConsent.analytics}
              onCheckedChange={(c) => setLocalConsent({ ...localConsent, analytics: c })}
            />
            <CookieCategory
              id="marketing"
              title="Marketing"
              description="Helps measure marketing campaigns and understand promotional performance."
              checked={localConsent.marketing}
              onCheckedChange={(c) => setLocalConsent({ ...localConsent, marketing: c })}
            />
          </div>
        </ScrollArea>

        <div className="p-6 pt-4 border-t border-border bg-surface/30">
          <div className="mb-4 rounded-lg border border-border/50 bg-card/50 p-4">
            <p className="text-xs font-medium text-foreground mb-3 uppercase tracking-wider">Your choices</p>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Essential</span>
                <span className="font-medium text-foreground">Always active</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Analytics</span>
                <span className="font-medium text-foreground">{localConsent.analytics ? "On" : "Off"}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Marketing</span>
                <span className="font-medium text-foreground">{localConsent.marketing ? "On" : "Off"}</span>
              </div>
            </div>
          </div>
          
          <DialogFooter className="sm:justify-end gap-3 sm:gap-0">
            <Button variant="outline" onClick={() => onOpenChange(false)} className="w-full sm:w-auto">
              Cancel
            </Button>
            <Button onClick={handleSave} className="w-full sm:w-auto bg-primary text-primary-foreground hover:bg-primary/90">
              Save preferences
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  );
}
