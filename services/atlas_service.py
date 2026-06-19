from models.atlas_schema import Atlas
from services.vector_store import VectorStore


from services.paper_service import PaperService
from services.github_service import GitHubService
from services.resource_service import ResourceService
from services.extractor_service import ExtractorService



from services.ranking_service import RankingService

class AtlasService:

    @staticmethod
    def generate_atlas(topic: str) -> Atlas:


        VectorStore.reset_collection()
        
        # Fetch papers
        papers = PaperService.get_papers(topic)

        #store papers in vector store
        for paper in papers:
          VectorStore.add_paper(paper)

        papers = RankingService.rank_papers(
         topic,
          papers
        )

        # Fetch GitHub repositories
        repositories = GitHubService.get_repositories(
            topic
        )

        # Fetch trusted governance resources
        resources = ResourceService.get_resources()

        # Extract datasets and models
        datasets = ExtractorService.extract_datasets(
            papers
        )

        models = ExtractorService.extract_models(
            papers
        )

        # Limit results to avoid information overload
        papers = papers[:10]

        repositories = repositories[:5]

        resources = resources[:10]

        # Build Atlas
        atlas = Atlas(
            topic=topic,
            overview=f"{topic} research domain",

            papers=papers,

            datasets=datasets,

            models=models,

            repositories=repositories,

            resources=resources
        )

        return atlas