from services.paper_service import PaperService
from services.extractor_service import ExtractorService

papers = PaperService.get_papers(
    "Deepfake Detection"
)

datasets = ExtractorService.extract_datasets(
    papers
)

models = ExtractorService.extract_models(
    papers
)

print("\nDATASETS")
print(datasets)

print("\nMODELS")
print(models)