const API_BASE_URL = "http://localhost:8000";

interface Recipe {
    name: string;
    instructions: string;
    calories: string;
}

export interface AnalyzeResponse {
    ingredients: string[];
    recipes: Recipe[];
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