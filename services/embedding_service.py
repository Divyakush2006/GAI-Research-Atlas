from sentence_transformers import SentenceTransformer

class EmbeddingService:

    model = SentenceTransformer(
        "all-MiniLM-L6-v2"
    )

    @staticmethod
    def embed_text(text):

        return (
            EmbeddingService.model
            .encode(text)
            .tolist()
        )