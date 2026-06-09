import { AlertTriangle, Phone, Shield } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export function EmergencyButton() {
  const [isOpen, setIsOpen] = useState(false);
  const [isActivated, setIsActivated] = useState(false);

  const handleEmergency = () => {
    setIsActivated(true);
    // In real app, this would trigger emergency protocols
    setTimeout(() => setIsActivated(false), 3000);
  };

  return (
    <>
      <button
        onClick={() => setIsOpen(true)}
        className="emergency-button"
        aria-label="Emergency"
      >
        <AlertTriangle className="h-7 w-7" />
      </button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="glass-card border-destructive/50 max-w-md">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-destructive">
              <AlertTriangle className="h-5 w-5" />
              Emergency Alert
            </DialogTitle>
            <DialogDescription>
              This will immediately alert campus security and share your location.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4 pt-4">
            <Button
              variant="destructive"
              className="w-full h-14 text-lg font-bold"
              onClick={handleEmergency}
              disabled={isActivated}
            >
              {isActivated ? (
                <>
                  <Shield className="h-5 w-5 animate-pulse" />
                  Alert Sent - Help is Coming
                </>
              ) : (
                <>
                  <AlertTriangle className="h-5 w-5" />
                  Send Emergency Alert
                </>
              )}
            </Button>

            <div className="grid grid-cols-2 gap-3">
              <Button variant="outline" className="h-12 gap-2">
                <Phone className="h-4 w-4" />
                Call Security
              </Button>
              <Button variant="outline" className="h-12 gap-2">
                <Phone className="h-4 w-4" />
                Call Emergency
              </Button>
            </div>

            <p className="text-xs text-muted-foreground text-center">
              False emergency alerts may result in disciplinary action
            </p>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
