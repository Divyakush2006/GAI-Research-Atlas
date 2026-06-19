import re
from typing import List, Set
from models.atlas_schema import Paper
from services.config import logger

class ExtractorService:
    DATASETS = [
        "FaceForensics++",
        "CelebDF",
        "DFDC",
        "ImageNet",
        "COCO",
    ]

    MODELS = [
        "CNN",
        "ResNet",
        "Xception",
        "Vision Transformer",
        "ViT",
        "BERT",
        "GPT",
        "Transformer",
    ]

    @staticmethod
    def extract_datasets(papers: List[Paper]) -> List[str]:
        found: Set[str] = set()
        for paper in papers:
            text = f"{paper.title} {paper.abstract}"
            for dataset in ExtractorService.DATASETS:
                if re.search(rf"\b{re.escape(dataset)}\b", text, re.IGNORECASE):
                    found.add(dataset)
        result = sorted(found)
        if result:
            logger.info(f"Extracted datasets: {result}")
        return result

    @staticmethod
    def extract_models(papers: List[Paper]) -> List[str]:
        found: Set[str] = set()
        for paper in papers:
            text = f"{paper.title} {paper.abstract}"
            for model in ExtractorService.MODELS:
                if re.search(rf"\b{re.escape(model)}\b", text, re.IGNORECASE):
                    found.add(model)
        result = sorted(found)
        if result:
            logger.info(f"Extracted models: {result}")
        return result
