import React from "react";
import { Camera, Sparkles } from "lucide-react";

export default function Header() {
    return (
        <header className="w-full py-6 px-4">
            <div className="container mx-auto flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="p-2 rounded-4xl gradient-coral shadow-soft">
                        <Camera className="w-6 h-6 text-primary-foreground" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-foreground tracking-tight">
                            Your<span className="text-primary">Cooked</span>
                        </h1>
                        <p className="text-xs text-muted-foreground">AI-Powered Food Analysis</p>
                    </div>
                </div>
                
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full bg-secondary text-sm font-medium text-secondary-foreground">
                    <Sparkles className="w-4 h-4 text-primary" />
                    <span>AI Ready</span>
                </div>
            </div>
        </header>
    );
}