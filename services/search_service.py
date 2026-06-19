from services.vector_store import VectorStore

class SearchService:
    @staticmethod
    def search(query: str, n_results: int = 5):
        return VectorStore.search(query=query, n_results=n_results)
