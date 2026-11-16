from typing import List, Set
from models.atlas_schema import Paper


class ExtractorService:

    DATASETS = [
        "FaceForensics++",
        "CelebDF",
        "DFDC",
        "ImageNet",
        "COCO"
    ]

    MODELS = [
        "CNN",
        "ResNet",
        "Xception",
        "Vision Transformer",
        "ViT",
        "BERT",
        "GPT",
        "Transformer"
    ]

    @staticmethod
    def extract_datasets(papers: List[Paper]) -> List[str]:

        found: Set[str] = set()

        for paper in papers:

            
            text = (
               paper.title +
               " " +
               paper.abstract
            ).lower()

            for dataset in ExtractorService.DATASETS:

                if dataset.lower() in text:
                    found.add(dataset)

        return sorted(list(found))

    @staticmethod
    def extract_models(papers: List[Paper]) -> List[str]:

        found: Set[str] = set()

        for paper in papers:

            text = (
               paper.title +
               " " +
               paper.abstract
            ).lower()

            for model in ExtractorService.MODELS:

                if model.lower() in text:
                    found.add(model)

        return sorted(list(found))