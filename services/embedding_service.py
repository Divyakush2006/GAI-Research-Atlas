from sentence_transformers import SentenceTransformer
from services.config import logger

class EmbeddingService:
    _model = None

    @classmethod
    def _get_model(cls):
        if cls._model is None:
            logger.info("Loading sentence-transformer model (first call)")
            cls._model = SentenceTransformer("all-MiniLM-L6-v2")
        return cls._model

    @staticmethod
    def embed_text(text: str):
        model = EmbeddingService._get_model()
        return model.encode(text).tolist()
