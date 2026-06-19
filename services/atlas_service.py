from models.atlas_schema import Atlas
from services.paper_service import PaperService
from services.github_service import GitHubService
from services.resource_service import ResourceService
from services.extractor_service import ExtractorService
from services.ranking_service import RankingService
from services.config import logger

class AtlasService:
    @staticmethod
    def generate_atlas(topic: str) -> Atlas:
        topic = topic.strip()
        if not topic:
            raise ValueError("Topic must not be empty")
        if len(topic) > 500:
            raise ValueError("Topic must not exceed 500 characters")

        logger.info(f"Generating atlas for topic: '{topic}'")

        papers = PaperService.get_papers(topic)
        for paper in papers:
            pass

        papers = RankingService.rank_papers(topic, papers)
        repositories = GitHubService.get_repositories(topic)
        resources = ResourceService.get_resources()

        datasets = ExtractorService.extract_datasets(papers)
        models = ExtractorService.extract_models(papers)

        atlas = Atlas(
            topic=topic,
            overview=f"{topic} research domain",
            papers=papers[:10],
            datasets=datasets,
            models=models,
            repositories=repositories[:5],
            resources=resources[:10],
        )

        logger.info(f"Atlas generated: {len(atlas.papers)} papers, {len(atlas.repositories)} repos, {len(atlas.resources)} resources")
        return atlas
