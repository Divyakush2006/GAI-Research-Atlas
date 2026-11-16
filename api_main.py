from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel, Field

from services.atlas_service import AtlasService
from services.graph_service import GraphService

app = FastAPI(title="Research Atlas API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class AtlasRequest(BaseModel):
    topic: str = Field(..., min_length=1, description="Research topic to generate atlas for")

@app.get("/health")
def health():
    return {"status": "ok"}

@app.post("/api/atlas")
def generate_atlas(req: AtlasRequest):
    topic = req.topic.strip()
    if not topic:
        raise HTTPException(status_code=400, detail="Topic must not be empty")
    try:
        atlas = AtlasService.generate_atlas(topic)
        return atlas
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))

@app.post("/api/graph")
def generate_graph(req: AtlasRequest):
    topic = req.topic.strip()
    if not topic:
        raise HTTPException(status_code=400, detail="Topic must not be empty")
    try:
        atlas = AtlasService.generate_atlas(topic)
        graph = GraphService.generate_graph(atlas)
        return graph
    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))
