from google import genai
from google.genai import types
import os
import json
from PIL import Image
import io

# set API key from env
client = genai.Client(api_key=os.environ.get("GOOGLE_API_KEY"))

def analyze_image_from_bytes(image_bytes):
    try:
        # 1. convert bytes to image
        image = Image.open(io.BytesIO(image_bytes))

        # 2. set prompt
        prompt = """
            Analyze this image to identify food ingredients. 
            Based on these ingredients, suggest 3 healthy and creative recipes.
            Also, suggest physical activities that would help burn off the calories from these meals.

            Return ONLY a valid JSON object (no markdown, no backticks) matching this exact structure:
            {
                "ingredients": [
                    { "name": "Item1 Name", "unit": "e.g. 2 medium", "calories": e.g. 44 },
                    { "name": "Item2 Name, "unit": "e.g. 1 cup", "calories": e.g. 13 },
                ],
                "recipes": [
                    {
                        "name": "Recipe Name",
                        "cookTime": "e.g. 15 min",
                        "servings": "e.g. 2",
                        "calories": "e.g. 450 kcal, 200 cal",
                        "difficulty": "Easy/Medium/Hard",
                        "ingredients": ["List", "of", "ingredients", "for", "this", "recipe"],
                        "steps": ["Step 1...", "Step 2...", "Step 3..."]
                    }
                ],
                "activity": [
                    {
                        "name": "Activity Name (e.g. Running, Yoga)",
                        "icon": "Lucide Icon Name (e.g. Footprints, Dumbbell, Bike, Flame, PersonStanding)",
                        "duration": "e.g. 30 min",
                        "caloriesBurned": 200,
                        "intensity": "Low/Medium/High"
                    }
                ]
            }
            """

        # 3. caling model and sending prompt + image
        response = client.models.generate_content(
            model='gemini-2.5-flash',
            contents=[prompt, image],
            config=types.GenerateContentConfig(
                response_mime_type='application/json'
            )
        )

        return json.loads(response.text)

    # callback
    except Exception as e:
        print(f"Error calling Gemini: {e}")
        return {
            "error": str(e),
            "ingredients": [], 
            "recipes": [],
            "activity": []
        }