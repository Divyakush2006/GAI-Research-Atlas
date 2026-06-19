from models.atlas_schema import *

paper = Paper(
    title="Deepfake Detection Survey",
    year=2024,
    authors=["John Doe"],
    citation_count=100,
    abstract="Survey of deepfake detection."
)

repo = Repository(
    name="DeepfakeBench",
    description="Benchmark repository",
    stars=5000,
    url="https://github.com/example"
)

atlas = Atlas(
    topic="Deepfake Detection",
    overview="Research area focused on detecting manipulated media.",
    papers=[paper],
    datasets=["FaceForensics++"],
    models=["Xception"],
    repositories=[repo]
)

print(atlas.model_dump_json(indent=2))