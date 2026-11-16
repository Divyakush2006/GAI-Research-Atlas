"""from services.paper_service import PaperService

topic = input("Enter research topic: ")

papers = PaperService.get_papers(topic)

print(f"\nFound {len(papers)} papers\n")

for paper in papers[:5]:
    print("=" * 50)
    print(paper.title)
    print(f"Year: {paper.year}")
    print(f"Citations: {paper.citation_count}")
    print(f"Authors: {paper.authors[:3]}")"""


from services.paper_service import PaperService

papers = PaperService.get_papers(
    "Deepfake Detection"
)

print("\nABSTRACT LENGTH:")
print(len(papers[0].abstract))

print("\nABSTRACT PREVIEW:")
print(papers[0].abstract[:500])