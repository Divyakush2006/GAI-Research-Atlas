from services.search_service import SearchService

results = SearchService.search(
    query="AI Governance",
    n_results=10
)

print("\nTop Ranked Papers:\n")

for i, title in enumerate(results["ids"][0], start=1):

    print(f"{i}. {title}")