from services.atlas_service import AtlasService

atlas = AtlasService.generate_atlas(
    "Deepfake Detection"
)

print(atlas.model_dump_json(indent=2))