import chromadb

from services.embedding_service import EmbeddingService


class VectorStore:

    client = chromadb.PersistentClient(
        path="./chroma_db"
    )

    collection = client.get_or_create_collection(
        name="research_papers"
    )

    @staticmethod
    def reset_collection():

        try:
            VectorStore.client.delete_collection(
                "research_papers"
            )
        except:
            pass

        VectorStore.collection = (
            VectorStore.client.get_or_create_collection(
                name="research_papers"
            )
        )

    @staticmethod
    def add_paper(paper):

        text = (
            paper.title +
            " " +
            paper.abstract
        )

        embedding = (
            EmbeddingService.embed_text(text)
        )

        VectorStore.collection.add(
            ids=[paper.title],
            embeddings=[embedding],
            documents=[text]
        )

    @staticmethod
    def search(query, n_results=5):

        embedding = (
            EmbeddingService.embed_text(query)
        )

        results = (
            VectorStore.collection.query(
                query_embeddings=[embedding],
                n_results=n_results
            )
        )

        return results