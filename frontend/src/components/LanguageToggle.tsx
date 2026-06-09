import { Languages } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLanguage } from "@/contexts/LanguageContext";

export function LanguageToggle() {
  const { lang, toggle } = useLanguage();
  return (
    <Button variant="ghost" size="sm" onClick={toggle} className="gap-2" title="Change language">
      <Languages className="h-4 w-4" />
      <span className="font-medium">{lang === "en" ? "العربية" : "English"}</span>
    </Button>
  );
}
