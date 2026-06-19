from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from services.atlas_service import AtlasService

app = FastAPI(
    title="Research Atlas API",
    description="AI-powered research exploration API for AI governance intelligence",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class GenerateRequest(BaseModel):
    topic: str

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/api/atlas")
def generate_atlas(req: GenerateRequest):
    atlas = AtlasService.generate_atlas(req.topic)
    return atlas
