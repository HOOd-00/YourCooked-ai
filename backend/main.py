from fastapi import FastAPI, UploadFile, File, HTTPException
from ai_service import analyze_image_from_bytes

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "YourCooked Backend is Ready!"}

@app.get("/health")
def health_check():
    return {"status": "ok"}

@app.post("/analyze-image")
async def analyze_image(file: UploadFile = File(...)):
    # 1. image validation
    if not file.content_type.startswith("image/"):
        raise HTTPException(status_code=400, detail="File must be an image")

    # 2. convert image into bytes
    contents = await file.read()

    # 3. get genai response
    result = analyze_image_from_bytes(contents)

    return result