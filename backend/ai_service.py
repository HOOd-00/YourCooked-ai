import google.generativeai as genai
import os
import json
from PIL import Image
import io

# set API key from env
genai.configure(api_key=os.environ.get("GOOGLE_API_KEY"))

model = genai.GenerativeModel('gemini-2.5-flash')

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

        # 3. sending prompt + image
        response = model.generate_content([prompt, image])
        print(f'response: {response}')
        content = response.content

        return json.loads(content)

    # callback
    except Exception as e:
        print(f"Error calling Gemini: {e}")
        return {"error": str(e)}