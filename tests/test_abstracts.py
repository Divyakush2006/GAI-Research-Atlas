from services.paper_service import PaperService

papers = PaperService.get_papers(
    "Deepfake Detection"
)

for paper in papers[:3]:

    print("\n" + "=" * 60)

    print("TITLE:")
    print(paper.title)

    print("\nABSTRACT LENGTH:")
    print(len(paper.abstract))

    print("\nABSTRACT PREVIEW:")
    print(paper.abstract[:500])