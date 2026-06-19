from services.vector_store import VectorStore


class SearchService:

    @staticmethod
    def search(query: str, n_results: int = 5):

        results = VectorStore.search(
            query=query,
            n_results=n_results
        )

        return results