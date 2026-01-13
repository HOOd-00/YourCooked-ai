"use client"; 

import { useState } from "react";
import { Upload, ChefHat, Utensils, Loader2, Section, Heading1, Divide } from "lucide-react";
import { analyzeImage, AnalyzeResponse } from "./lib/api";
import Header from "./components/Header";
import ImageUpload from "./components/ImageUpload";
import OptionSelector from "./components/OptionSelector";
import RecipeCard from "./components/RecipeCards";
import CalorieDisplay from "./components/CalorieDisplay";

type AppState = "upload" | "options" | "recipes" | "calories";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("upload")
  const [image, setImage] = useState<File | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);

  const handleImageUpload = async (file: File, preview: string) => {
    setImage(file);
    setUploadedImage(preview);
    setLoading(true);
    
    try {
      const data = await analyzeImage(file);
      setResult(data);
      setAppState("options");
    } catch (error) {
      console.error(error);
      alert("เกิดข้อผิดพลาดในการวิเคราะห์รูปภาพ");
      setAppState("upload");
    } finally {
      setLoading(false);
    }
  };

  const handleClearImage = () => {
    setUploadedImage(null);
    setAppState("upload");
  };

  const handleSelectOption = (option: "recipes" | "calories") => {
    setAppState(option);
  }

  const handleBack = () => {
    setUploadedImage(null);
    setAppState("upload");
  }

  // ฟังก์ชันส่งรูปไป Backend
  const handleSubmit = async () => {
    if (!image) return;

    setLoading(true);
    try {
      const data = await analyzeImage(image);
      setResult(data);
    } catch (error) {
      console.log(error);
      alert("เกิดข้อผิดพลาดในการวิเคราะห์รูปภาพ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen gradient-warm">
      <Header />
        <main className="container max-w-4xl mx-auto py-8">
          {/* Hero Section */}
          {appState === 'upload' && (
            <section className="py-8 mb-8">
              <div className="text-center animate-slide-up">
                <h1 className="text-4xl md:text-5xl font-extrabold text-foreground mb-4 leading-tight">
                    Cooking,{" "}
                    <span className="text-primary">with Your AI Cook</span>
                </h1>
                <p className="text-lg text-muted-foreground mb-8 max-w-lg mx-auto">
                  Upload a photo of your ingredients and let AI suggest
                  delicious recipes or track your calories with activity
                  recommendations!
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm">
                      <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                      <span className="text-secondary-foreground font-medium">
                        Instant Recipe Ideas
                      </span>
                    </div>
                    <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-secondary text-sm">
                      <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                      <span className="text-secondary-foreground font-medium">
                        Calorie Tracking
                      </span>
                    </div>
                  </div>
              </div>
            </section>
          )}

          {/* Content Section */}
          <section className="py-8">
            {/* Upload State */}
              {appState === "upload" && (
                <div className="animate-slide-up animation-delay-300">
                  <ImageUpload 
                    onImageUpload={handleImageUpload}
                    uploadedImage={uploadedImage}
                    onClear={handleClearImage}
                  />
                </div>
              )}

            {/* Preview & Options State */}
            {appState === "options" && uploadedImage && (
              <div>
                <div className="max-w-md mx-auto">
                  <div className="relative rounded-2xl overflow-hidden shadow-medium mb-8 animate-scale-in">
                    <img 
                      src={uploadedImage} 
                      alt="Uploaded Ingredients" 
                      className="w-full h-48 object-cover"
                    />
                    <div className="absolute inset-0 bg-linear-to-t from-charcoal/50 to-transparent" />
                    <div className="absolute bottom-4 left-4 text-primary-foreground">
                      <p className="text-sm font-medium">Image uploaded successfully</p>
                    </div>
                  </div>
                </div>
                { loading ? (
                  <div className="max-w-md mx-auto ">
                    <span className="flex items-center justify-center gap-2">
                      <Loader2 className="w-5 h-5 animate-spin" /> Thinking...
                    </span>
                  </div>
              ) : (
                  <OptionSelector onSelectOption={handleSelectOption} />
                )}
              </div>
            )}

            {appState === "recipes" && result && 
              <RecipeCard recipeResults={result.recipes} onBack={handleBack} 
            />} 

            {appState === "calories" && <CalorieDisplay onBack={handleBack} />}
          </section>
        </main>
        <footer className="py-6 text-center text-sm text-muted-foreground border-t border-border">
            <p>
              YourCooked &copy; 2025 — AI-Powered Food Analysis.
            </p>
        </footer>
    </div>
  );
}