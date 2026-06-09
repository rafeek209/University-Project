import { useState } from "react";
import { cn } from "@/lib/utils";
import { 
  Trophy, 
  Palette, 
  Code, 
  Music, 
  Dumbbell, 
  BookOpen, 
  Lightbulb, 
  Globe,
  Camera,
  Heart,
  Check
} from "lucide-react";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const interests = [
  { id: "sports", label: "Sports", icon: Dumbbell, color: "bg-blue-500/20 text-blue-400 border-blue-500/30" },
  { id: "tech", label: "Technology", icon: Code, color: "bg-cyan-500/20 text-cyan-400 border-cyan-500/30" },
  { id: "art", label: "Art & Design", icon: Palette, color: "bg-pink-500/20 text-pink-400 border-pink-500/30" },
  { id: "music", label: "Music", icon: Music, color: "bg-purple-500/20 text-purple-400 border-purple-500/30" },
  { id: "competitions", label: "Competitions", icon: Trophy, color: "bg-yellow-500/20 text-yellow-400 border-yellow-500/30" },
  { id: "academic", label: "Academic", icon: BookOpen, color: "bg-green-500/20 text-green-400 border-green-500/30" },
  { id: "entrepreneurship", label: "Entrepreneurship", icon: Lightbulb, color: "bg-orange-500/20 text-orange-400 border-orange-500/30" },
  { id: "languages", label: "Languages", icon: Globe, color: "bg-indigo-500/20 text-indigo-400 border-indigo-500/30" },
  { id: "photography", label: "Photography", icon: Camera, color: "bg-rose-500/20 text-rose-400 border-rose-500/30" },
  { id: "volunteering", label: "Volunteering", icon: Heart, color: "bg-red-500/20 text-red-400 border-red-500/30" },
];

interface InterestsSelectorProps {
  selectedInterests?: string[];
  onInterestsChange?: (interests: string[]) => void;
  className?: string;
  editable?: boolean;
}

export function InterestsSelector({
  selectedInterests: initialInterests = ["tech", "sports", "competitions"],
  onInterestsChange,
  className,
  editable = false,
}: InterestsSelectorProps) {
  const [selectedInterests, setSelectedInterests] = useState<string[]>(initialInterests);
  const [isEditing, setIsEditing] = useState(false);

  const toggleInterest = (interestId: string) => {
    if (!isEditing && !editable) return;
    
    const newInterests = selectedInterests.includes(interestId)
      ? selectedInterests.filter(id => id !== interestId)
      : [...selectedInterests, interestId];
    
    setSelectedInterests(newInterests);
    onInterestsChange?.(newInterests);
  };

  const selectedInterestData = interests.filter(i => selectedInterests.includes(i.id));

  return (
    <Card variant="glass" className={cn("p-4", className)}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="font-semibold text-sm">Your Interests</h3>
          <p className="text-xs text-muted-foreground">Get personalized event notifications</p>
        </div>
        {editable && (
          <Button 
            variant="ghost" 
            size="sm" 
            onClick={() => setIsEditing(!isEditing)}
          >
            {isEditing ? "Done" : "Edit"}
          </Button>
        )}
      </div>

      {isEditing ? (
        <div className="grid grid-cols-2 gap-2">
          {interests.map((interest) => {
            const Icon = interest.icon;
            const isSelected = selectedInterests.includes(interest.id);
            
            return (
              <button
                key={interest.id}
                onClick={() => toggleInterest(interest.id)}
                className={cn(
                  "flex items-center gap-2 p-3 rounded-xl border transition-all duration-200",
                  isSelected 
                    ? interest.color 
                    : "bg-surface-2/50 border-border text-muted-foreground hover:bg-surface-2"
                )}
              >
                <Icon className="h-4 w-4" />
                <span className="text-sm font-medium flex-1 text-left">{interest.label}</span>
                {isSelected && <Check className="h-4 w-4" />}
              </button>
            );
          })}
        </div>
      ) : (
        <div className="flex flex-wrap gap-2">
          {selectedInterestData.map((interest) => {
            const Icon = interest.icon;
            return (
              <Badge 
                key={interest.id} 
                className={cn("gap-1.5 px-3 py-1.5 border", interest.color)}
              >
                <Icon className="h-3.5 w-3.5" />
                {interest.label}
              </Badge>
            );
          })}
        </div>
      )}
    </Card>
  );
}
