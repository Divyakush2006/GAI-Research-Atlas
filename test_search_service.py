from services.search_service import SearchService

results = SearchService.search(
    query="AI risk management",
    n_results=5
)

print(results)