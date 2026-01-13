import React from "react";
import { ChefHat, Flame, ArrowRight } from "lucide-react";
import { cn } from "../lib/utils";

interface OptionSelectorProps {
    onSelectOption: (option: "recipes" | "calories") => void;
}

export default function OptionSelector({ onSelectOption, } : OptionSelectorProps )  {
    return (
        <div className="w-full max-w-2xl mx-auto animate-slide-up">
            <h2 className="text-2xl font-bold text-center mb-2 text-foreground">
                What would you like to do?
            </h2>
            <p className="text-center text-muted-foreground mb-8">
                Choose how you want to analyze your food
            </p>

            <div className="grid md:grid-cols-2 gap-6">
                {/* Recipe Generation Option */}
                <button
                    onClick={() => onSelectOption("recipes")}
                    className={cn(
                        "group relative p-6 rounded-2xl border-2 border-border bg-card",
                        "hover:border-primary hover:shadow-medium transition-all duration-300",
                        "hover:scale-[1.02] active:scale-[0.98]"
                    )}
                >
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className="p-4 rounded-full gradient-coral shadow-soft group-hover:shadow-glow transition-all duration-300">
                        <ChefHat className="w-8 h-8 text-primary-foreground" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-foreground mb-2">
                                Generate Recipes
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Get 3 delicious recipe ideas with step-by-step instructions and
                                calorie info
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-primary font-medium">
                            <span>Get Recipes</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </button>

                {/* Calorie Estimation Option */}
                <button
                    onClick={() => onSelectOption("calories")}
                    className={cn(
                        "group relative p-6 rounded-2xl border-2 border-border bg-card",
                        "hover:border-accent hover:shadow-medium transition-all duration-300",
                        "hover:scale-[1.02] active:scale-[0.98]"
                    )}
                >
                    <div className="flex flex-col items-center text-center gap-4">
                        <div className="p-4 rounded-full gradient-green shadow-soft group-hover:shadow-medium transition-all duration-300">
                            <Flame className="w-8 h-8 text-accent-foreground" />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold text-foreground mb-2">
                                Count Calories
                            </h3>
                            <p className="text-sm text-muted-foreground">
                                Estimate calories and get personalized activity suggestions to
                                burn them
                            </p>
                        </div>
                        <div className="flex items-center gap-2 text-accent font-medium">
                            <span>Analyze Food</span>
                            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </div>
                    </div>
                </button>
            </div>
        </div>
    );
}
