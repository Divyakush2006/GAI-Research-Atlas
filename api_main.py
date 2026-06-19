from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field
from services.atlas_service import AtlasService
from services.config import logger

app = FastAPI(
    title="Research Atlas API",
    description="AI-powered research exploration API for AI governance intelligence",
    version="1.0.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:5173", "http://localhost:5174"],
    allow_credentials=True,
    allow_methods=["GET", "POST"],
    allow_headers=["Content-Type", "Authorization"],
)


class GenerateRequest(BaseModel):
    topic: str = Field(..., min_length=1, max_length=500, description="Research topic to generate atlas for")


@app.get("/health")
def health():
    return {"status": "ok"}


@app.post("/api/atlas")
def generate_atlas(req: GenerateRequest):
    try:
        atlas = AtlasService.generate_atlas(req.topic)
        return atlas
    except ValueError as e:
        logger.warning(f"Invalid request: {e}")
        raise HTTPException(status_code=400, detail=str(e))
    except Exception as e:
        logger.error(f"Atlas generation failed: {e}")
        raise HTTPException(status_code=500, detail="Atlas generation failed. Check backend logs.")
