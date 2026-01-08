"use client"; 

import { useState } from "react";
import { Upload, ChefHat, Utensils, Loader2 } from "lucide-react";
import { analyzeImage, AnalyzeResponse } from "./lib/api";

export default function Home() {
  const [image, setImage] = useState<File | null>(null);
  const [preview, setPreview] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<AnalyzeResponse | null>(null);

  // ฟังก์ชันจัดการเมื่อเลือกรูป
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file)); // สร้าง URL จำลองเพื่อแสดงรูป Preview
      setResult(null); // ล้างผลลัพธ์เก่า
    }
  };

  // ฟังก์ชันส่งรูปไป Backend
  const handleSubmit = async () => {
    if (!image) return;

    setLoading(true);
    try {
      //เรียกใช้ Service บรรทัดเดียวจบ! สะอาดมาก
      const data = await analyzeImage(image);
      console.log('response: ', data);
      setResult(data);
    } catch (error) {
      console.log(error);
      alert("เกิดข้อผิดพลาดในการวิเคราะห์รูปภาพ");
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-gray-50 p-8 font-sans">
      <div className="max-w-4xl mx-auto space-y-8">
        
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-4xl font-extrabold text-gray-900 flex items-center justify-center gap-3">
            <ChefHat className="w-10 h-10 text-orange-500" />
            SnapCook AI
          </h1>
          <p className="text-gray-500">
            ถ่ายรูปวัตถุดิบในตู้เย็น แล้วให้ AI คิดเมนูให้คุณ!
          </p>
        </div>

        {/* Upload Section */}
        <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-100">
          <div className="flex flex-col items-center gap-4">
            {/* Preview Area */}
            {preview ? (
              <div className="relative w-full max-w-md h-64 rounded-xl overflow-hidden bg-gray-100 border-2 border-dashed border-gray-300">
                <img src={preview} alt="Preview" className="w-full h-full object-contain" />
                <button 
                  onClick={() => { setImage(null); setPreview(null); setResult(null); }}
                  className="absolute top-2 right-2 bg-white/80 p-1 rounded-full text-red-500 hover:bg-white"
                >
                  ✕
                </button>
              </div>
            ) : (
              // Upload Button UI
              <label className="w-full max-w-md h-64 flex flex-col items-center justify-center border-2 border-dashed border-gray-300 rounded-xl cursor-pointer hover:bg-gray-50 transition-colors">
                <Upload className="w-12 h-12 text-gray-400 mb-2" />
                <span className="text-gray-500 font-medium">Click to upload ingredients</span>
                <input type="file" className="hidden" accept="image/*" onChange={handleImageChange} />
              </label>
            )}

            {/* Analyze Button */}
            <button
              onClick={handleSubmit}
              disabled={!image || loading}
              className={`px-8 py-3 rounded-full font-bold text-white transition-all transform ${
                !image || loading
                  ? "bg-gray-300 cursor-not-allowed"
                  : "bg-orange-500 hover:bg-orange-600 hover:scale-105 shadow-lg"
              }`}
            >
              {loading ? (
                <span className="flex items-center gap-2">
                  <Loader2 className="w-5 h-5 animate-spin" /> Thinking...
                </span>
              ) : (
                "Create Recipes 🍳"
              )}
            </button>
          </div>
        </div>

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