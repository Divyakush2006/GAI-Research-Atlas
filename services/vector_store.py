import chromadb
from services.embedding_service import EmbeddingService
from services.config import logger, CHROMA_DB_PATH

COLLECTION_NAME = "research_papers"

class VectorStore:
    client = chromadb.PersistentClient(path=CHROMA_DB_PATH)
    collection = client.get_or_create_collection(name=COLLECTION_NAME)

    @staticmethod
    def reset_collection():
        try:
            VectorStore.client.delete_collection(COLLECTION_NAME)
        except ValueError:
            pass
        VectorStore.collection = VectorStore.client.get_or_create_collection(name=COLLECTION_NAME)

    @staticmethod
    def add_paper(paper):
        text = f"{paper.title} {paper.abstract}"
        embedding = EmbeddingService.embed_text(text)
        VectorStore.collection.add(
            ids=[paper.title],
            embeddings=[embedding],
            documents=[text],
        )

    @staticmethod
    def search(query: str, n_results: int = 5):
        embedding = EmbeddingService.embed_text(query)
        results = VectorStore.collection.query(
            query_embeddings=[embedding],
            n_results=n_results,
        )
        return results
