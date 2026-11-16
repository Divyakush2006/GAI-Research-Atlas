from services.paper_service import PaperService
from services.vector_store import VectorStore

papers = PaperService.get_papers(
    "Deepfake Detection"
)

for paper in papers:

    VectorStore.add_paper(
        paper
    )

print(
    f"Stored {len(papers)} papers"
)