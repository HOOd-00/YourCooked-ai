import React from "react";
import { Flame, Bike, PersonStanding, Dumbbell, Waves, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "./card";
import { Button } from "./button";
import { cn } from "../lib/utils";

interface Activity {
  name: string;
  icon: React.ReactNode;
  duration: string;
  caloriesBurned: number;
  intensity: "Low" | "Medium" | "High";
}

const activities: Activity[] = [
  {
    name: "Walking",
    icon: <PersonStanding className="w-6 h-6" />,
    duration: "45 min",
    caloriesBurned: 150,
    intensity: "Low",
  },
  {
    name: "Cycling",
    icon: <Bike className="w-6 h-6" />,
    duration: "30 min",
    caloriesBurned: 250,
    intensity: "Medium",
  },
  {
    name: "Swimming",
    icon: <Waves className="w-6 h-6" />,
    duration: "25 min",
    caloriesBurned: 300,
    intensity: "Medium",
  },
  {
    name: "Weight Training",
    icon: <Dumbbell className="w-6 h-6" />,
    duration: "40 min",
    caloriesBurned: 200,
    intensity: "High",
  },
];

const foodItems = [
  { name: "Tomatoes (2 medium)", calories: 44 },
  { name: "Bell Peppers (1 cup)", calories: 46 },
  { name: "Garlic (3 cloves)", calories: 13 },
  { name: "Olive Oil (1 tbsp)", calories: 119 },
  { name: "Onion (1 medium)", calories: 44 },
  { name: "Fresh Herbs", calories: 5 },
];

const totalCalories = foodItems.reduce((sum, item) => sum + item.calories, 0);

interface CalorieDisplayProps {
  onBack: () => void;
}

export default function CalorieDisplay({ onBack } : CalorieDisplayProps ) {
    const getIntensityColor = (intensity: string) => {
        switch (intensity) {
        case "Low":
            return "text-accent bg-accent/10";
        case "Medium":
            return "text-primary bg-primary/10";
        case "High":
            return "text-destructive bg-destructive/10";
        default:
            return "text-muted-foreground bg-muted";
        }
    };

    return (
        <div className="w-full max-w-4xl mx-auto">
        {/* Calorie Summary */}
            <div className="text-center mb-8 animate-slide-up">
                <div className="inline-flex items-center justify-center w-32 h-32 rounded-full gradient-coral shadow-glow mb-4">
                    <div className="text-center text-primary-foreground">
                        <Flame className="w-8 h-8 mx-auto mb-1" />
                        <span className="text-3xl font-bold">{totalCalories}</span>
                        <span className="text-sm block">kcal</span>
                    </div>
                </div>
                <h2 className="text-2xl font-bold text-foreground mb-2">
                    Estimated Calories
                </h2>
                <p className="text-muted-foreground">
                    Based on the ingredients detected in your image
                </p>
            </div>

        {/* Food Breakdown */}
            <Card
                variant="elevated"
                className="mb-8 animate-slide-up animation-delay-100"
            >
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Flame className="w-5 h-5 text-primary" />
                        Calorie Breakdown
                    </CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {foodItems.map((item, index) => (
                        <div
                            key={index}
                            className="flex items-center justify-between py-2 border-b border-border last:border-0"
                        >
                            <span className="text-foreground">{item.name}</span>
                            <span className="font-semibold text-primary">
                            {item.calories} kcal
                            </span>
                        </div>
                        ))}
                        <div className="flex items-center justify-between pt-2 font-bold text-lg">
                            <span>Total</span>
                            <span className="text-primary">{totalCalories} kcal</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

        {/* Activity Suggestions */}
        <div className="animate-slide-up animation-delay-200">
            <h3 className="text-xl font-bold text-foreground mb-4 flex items-center gap-2">
                <PersonStanding className="w-5 h-5 text-accent" />
                Activities to Burn {totalCalories} kcal
            </h3>

        <div className="grid sm:grid-cols-2 gap-4">
          {activities.map((activity, index) => (
            <Card
                key={index}
                variant="activity"
                className={cn(
                    "animate-slide-up",
                    `animation-delay-${(index + 3) * 100}`
                )}
            >
                <CardContent className="p-4">
                    <div className="flex items-start gap-4">
                        <div className="p-3 rounded-xl bg-accent/10 text-accent">
                            {activity.icon}
                        </div>
                        <div className="flex-1">
                            <div className="flex items-center justify-between mb-1">
                                <h4 className="font-semibold text-foreground">
                                    {activity.name}
                                </h4>
                                <span
                                    className={cn(
                                    "px-2 py-0.5 rounded-full text-xs font-medium",
                                    getIntensityColor(activity.intensity)
                                    )}
                                >
                                    {activity.intensity}
                                </span>
                            </div>
                            <div className="flex items-center gap-4 text-sm text-muted-foreground">
                                <div className="flex items-center gap-1">
                                    <Clock className="w-4 h-4" />
                                    <span>{activity.duration}</span>
                                </div>
                                <div className="flex items-center gap-1 text-accent font-medium">
                                    <Flame className="w-4 h-4" />
                                    <span>~{activity.caloriesBurned} kcal</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </CardContent>
            </Card>
          ))}
        </div>
    </div>

        <div className="mt-8 text-center">
            <Button variant="outline" onClick={onBack} size="lg">
                Analyze Another Image
            </Button>
        </div>
    </div>
    );
}