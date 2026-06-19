from services.paper_service import PaperService
from services.vector_store import VectorStore

papers = PaperService.get_papers(
    "AI Governance"
)

for paper in papers:
    VectorStore.add_paper(paper)

results = VectorStore.search(
    "AI risk management"
)

print(results)