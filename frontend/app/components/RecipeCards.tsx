import React, { useState } from "react";
import {
  Clock,
  Users,
  Flame,
  ChevronDown,
  ChevronUp,
  Utensils,
} from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../components/card";
import { Button } from "./button";
import { cn } from "../lib/utils";

interface Recipe {
  id: number;
  name: string;
  image: string;
  cookTime: string;
  servings: number;
  calories: number;
  difficulty: "Easy" | "Medium" | "Hard";
  ingredients: string[];
  steps: string[];
}

const mockRecipes: Recipe[] = [
  {
    id: 1,
    name: "Mediterranean Veggie Bowl",
    image:
      "https://images.unsplash.com/photo-1512621776951-a57141f2eefd?w=400&h=300&fit=crop",
    cookTime: "25 min",
    servings: 2,
    calories: 380,
    difficulty: "Easy",
    ingredients: [
      "Mixed vegetables",
      "Olive oil",
      "Feta cheese",
      "Quinoa",
      "Lemon juice",
    ],
    steps: [
      "Cook quinoa according to package instructions",
      "Roast vegetables with olive oil at 400°F for 20 mins",
      "Combine quinoa and roasted vegetables",
      "Top with crumbled feta and drizzle with lemon juice",
      "Season with salt, pepper, and herbs",
    ],
  },
  {
    id: 2,
    name: "Fresh Garden Stir-Fry",
    image:
      "https://images.unsplash.com/photo-1543339308-43e59d6b73a6?w=400&h=300&fit=crop",
    cookTime: "15 min",
    servings: 3,
    calories: 290,
    difficulty: "Easy",
    ingredients: [
      "Bell peppers",
      "Broccoli",
      "Garlic",
      "Soy sauce",
      "Sesame oil",
    ],
    steps: [
      "Heat sesame oil in a large wok over high heat",
      "Add minced garlic and stir for 30 seconds",
      "Add vegetables and stir-fry for 5-7 minutes",
      "Add soy sauce and toss to coat",
      "Serve immediately over rice or noodles",
    ],
  },
  {
    id: 3,
    name: "Rustic Vegetable Soup",
    image:
      "https://images.unsplash.com/photo-1547592166-23ac45744acd?w=400&h=300&fit=crop",
    cookTime: "35 min",
    servings: 4,
    calories: 220,
    difficulty: "Medium",
    ingredients: [
      "Tomatoes",
      "Onions",
      "Carrots",
      "Vegetable broth",
      "Italian herbs",
    ],
    steps: [
      "Sauté onions and garlic in olive oil until soft",
      "Add chopped carrots and cook for 5 minutes",
      "Add tomatoes and vegetable broth, bring to boil",
      "Reduce heat and simmer for 25 minutes",
      "Season with herbs, salt, and pepper to taste",
    ],
  },
];

interface RecipeCardProps {
    onBack: () => void;
}

export default function RecipeCard({ onBack } : RecipeCardProps) {
    const [expandedRecipe, setExpandedRecipe] = useState<number | null>(null);

    const getDifficultyColor = (difficulty: string) => {
        switch (difficulty) {
        case "Easy":
            return "text-accent bg-accent/10";
        case "Medium":
            return "text-primary bg-primary/10";
        case "Hard":
            return "text-destructive bg-destructive/10";
        default:
            return "text-muted-foreground bg-muted";
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
            <div className="text-center mb-8 animate-slide-up">
                <h2 className="text-2xl font-bold text-foreground mb-2">
                Recipe Suggestions
                </h2>
                <p className="text-muted-foreground">
                Based on your ingredients, here are 3 delicious ideas
                </p>
            </div>

            `<div className="grid md:grid-cols-3 gap-6">
                {mockRecipes.map((recipe, index) => (
                <Card
                    key={recipe.id}
                    variant="recipe"
                    className={cn(
                    "overflow-hidden animate-slide-up",
                    `animation-delay-${(index + 1) * 100}`
                    )}
                >
                    <div className="relative h-40 overflow-hidden">
                        <img
                            src={recipe.image}
                            alt={recipe.name}
                            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
                        />
                        <div className="absolute top-3 right-3">
                            <span
                            className={cn(
                                "px-2 py-1 rounded-full text-xs font-medium",
                                getDifficultyColor(recipe.difficulty)
                            )}
                            >
                            {recipe.difficulty}
                            </span>
                        </div>
                    </div>

                    <CardHeader className="pb-2">
                        <CardTitle className="text-lg line-clamp-2">
                            {recipe.name}
                        </CardTitle>
                    </CardHeader>

                    <CardContent>
                    <div className="flex items-center gap-4 text-sm text-muted-foreground mb-4">
                        <div className="flex items-center gap-1">
                            <Clock className="w-4 h-4" />
                            <span>{recipe.cookTime}</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <Users className="w-4 h-4" />
                            <span>{recipe.servings}</span>
                        </div>
                        <div className="flex items-center gap-1 text-primary font-medium">
                            <Flame className="w-4 h-4" />
                            <span>{recipe.calories} cal</span>
                        </div>
                    </div>

                    <button
                        onClick={() =>
                        setExpandedRecipe(
                            expandedRecipe === recipe.id ? null : recipe.id
                        )
                        } className="flex items-center gap-2 text-sm font-medium text-primary hover:text-primary/80 transition-colors"
                    >
                        <Utensils className="w-4 h-4" />
                        <span>
                        {expandedRecipe === recipe.id ? "Hide Steps" : "View Steps"}
                        </span>
                        {expandedRecipe === recipe.id ? (
                        <ChevronUp className="w-4 h-4" />
                        ) : (
                        <ChevronDown className="w-4 h-4" />
                        )}
                    </button>

                    {expandedRecipe === recipe.id && (
                        <div className="mt-4 pt-4 border-t border-border animate-fade-in">
                            <h4 className="font-semibold text-sm mb-2">Ingredients:</h4>
                            <ul className="text-sm text-muted-foreground mb-4 space-y-1">
                                {recipe.ingredients.map((ingredient, i) => (
                                <li key={i} className="flex items-center gap-2">
                                    <span className="w-1.5 h-1.5 rounded-full bg-primary" />
                                    {ingredient}
                                </li>
                                ))}
                            </ul>

                            <h4 className="font-semibold text-sm mb-2">Steps:</h4>
                            <ol className="text-sm text-muted-foreground space-y-2">
                                {recipe.steps.map((step, i) => (
                                <li key={i} className="flex gap-3">
                                    <span className="shrink-0 w-6 h-6 rounded-full bg-primary/10 text-primary text-xs flex items-center justify-center font-medium">
                                    {i + 1}
                                    </span>
                                    <span>{step}</span>
                                </li>
                                ))}
                            </ol>
                        </div>
                    )}
                    </CardContent>
                </Card>
                ))}
            </div>

            <div className="mt-8 text-center">
                <Button variant="outline" onClick={onBack} size="lg">
                    Analyze Another Image
                </Button>
            </div>
        </div>
    );
}