"use client"; 

import { useState } from "react";
import { Upload, ChefHat, Utensils, Loader2, Section } from "lucide-react";
import { analyzeImage, AnalyzeResponse } from "./lib/api";
import Header from "./components/Header";
import ImageUpload from "./components/ImageUpload";

type AppState = "upload" | "options" | "recipes" | "calories";

export default function Home() {
  const [appState, setAppState] = useState<AppState>("upload")
  const [image, setImage] = useState<File | null>(null);
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);

  const handleImageUpload = (file: File, preview: string) => {
    setUploadedImage(preview);
    setAppState("options");
  };

  const handleClearImage = () => {
    setUploadedImage(null);
    setAppState("upload");
  };

  const handleSelectOption = (option: "recipes" | "calories") => {
    setAppState(option);
  }

  const handleBack = () => {
    setImage(null);
    setPreview(null);
    setResult(null);
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
    <main className="min-h-screen gradient-warm">
      <Header />
      <div className="max-w-4xl mx-auto py-8">
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

        {/* Upload Section */}
        <section className="py-8">
            {appState === "upload" && (
              <div className="animate-slide-up animation-delay-300">
                <ImageUpload 
                  onImageUpload={handleImageUpload}
                  uploadedImage={uploadedImage}
                  onClear={handleClearImage}
                />
              </div>
            )}
        </section>

        {/* Results Section */}
        {result && (
          <div className="space-y-6 animate-in fade-in slide-in-from-bottom-4 duration-700">
            
            {/* Ingredients Found */}
            <div className="bg-orange-50 p-4 rounded-xl border border-orange-100">
              <h3 className="font-semibold text-orange-800 mb-2 flex items-center gap-2">
                <Utensils className="w-4 h-4" /> Ingredients Found:
              </h3>
              <div className="flex flex-wrap gap-2">
                {result.ingredients.map((item, idx) => (
                  <span key={idx} className="px-3 py-1 bg-white text-orange-600 rounded-full text-sm border border-orange-200 shadow-sm">
                    {item}
                  </span>
                ))}
              </div>
            </div>

            {/* Recipe Cards */}
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              {result.recipes.map((recipe, idx) => (
                <div key={idx} className="bg-white p-6 rounded-xl shadow-md border border-gray-100 hover:shadow-xl transition-shadow flex flex-col">
                  <h3 className="text-xl font-bold text-gray-800 mb-2">{recipe.name}</h3>
                  <span className="text-xs font-semibold text-green-600 bg-green-50 px-2 py-1 rounded-md w-fit mb-4">
                    🔥 {recipe.calories}
                  </span>
                  <p className="text-gray-600 text-sm grow whitespace-pre-line">
                    {recipe.instructions}
                  </p>
                </div>
              ))}
            </div>

          </div>
        )}

      </div>
    </main>
  );
}