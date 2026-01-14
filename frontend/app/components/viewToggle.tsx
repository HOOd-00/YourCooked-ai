import React from "react";
import { Utensils, Flame } from "lucide-react";
import { cn } from "../lib/utils";

interface ViewToggleProps {
  activeView: "recipes" | "calories";
  onToggle: (view: "recipes" | "calories") => void;
}

export function ViewToggle({ activeView, onToggle } : ViewToggleProps) {
    return (
        <div className="flex justify-center mb-8 animate-fade-in">
            <div className="inline-flex rounded-full bg-secondary p-1 shadow-soft">
                <button
                onClick={() => onToggle("recipes")}
                className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    activeView === "recipes"
                    ? "bg-primary text-primary-foreground shadow-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
                >
                <Utensils className="w-4 h-4" />
                <span>Recipes</span>
                </button>
                <button
                onClick={() => onToggle("calories")}
                className={cn(
                    "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                    activeView === "calories"
                    ? "bg-accent text-accent-foreground shadow-medium"
                    : "text-muted-foreground hover:text-foreground"
                )}
                >
                <Flame className="w-4 h-4" />
                <span>Calories</span>
                </button>
            </div>
        </div>
    );
}
