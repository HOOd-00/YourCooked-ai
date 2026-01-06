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
        Analyze this image. Identify all food ingredients visible. 
        Based on these ingredients, suggest 3 creative recipes. 

        Return ONLY a valid JSON object with this structure:
        {
            "ingredients": ["item1", "item2"],
            "recipes": [
                {
                    "name": "Recipe Name",
                    "instructions": "Brief step-by-step instructions",
                    "calories": "Estimated calories"
                }
            ]
        }
        Do not create markdown blocks (like ```json). Just return the raw JSON string.
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
        return {"error": str(e)}