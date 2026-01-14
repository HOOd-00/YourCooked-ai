const API_BASE_URL = "http://localhost:8000";

export interface Ingredients {
    name: string;
    unit: string;
    calories: number;
}

export interface Recipe {
  name: string;
  cookTime: string;
  servings: string;
  calories: string;
  difficulty: "Easy" | "Medium" | "Hard";
  ingredients: string[];
  steps: string[];
}

export interface Activity {
    name: string;
    icon: string;
    duration: string;
    caloriesBurned: number,
    intensity: "Easy" | "Medium" | "Hard";
}

export interface AnalyzeResponse {
    ingredients: Ingredients[];
    recipes: Recipe[];
    activity: Activity[];
    error?: string[];
}

export const analyzeImage = async (file: File): Promise<AnalyzeResponse> => {
    const formData = new FormData();
    formData.append("file", file);

    try {
        const response = await fetch(`${API_BASE_URL}/analyze-image`, {
            method: "POST",
            body: formData,
        });

        if (!response.ok) {
            throw new Error(`API Error: ${response.statusText}`);
        }

        const data: AnalyzeResponse = await response.json();
        return data;

    } catch (err) {
        console.error("Service Error: ", err);
        throw err;
    }
}