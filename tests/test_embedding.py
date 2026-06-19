"""from services.embedding_service import (
    EmbeddingService
)

text = 
Face forgery by deepfake is widely spread...


embedding = (
    EmbeddingService.embed_text(text)
)

print(len(embedding))"""

from services.embedding_service import EmbeddingService
from sklearn.metrics.pairwise import cosine_similarity

text1 = "Deepfake detection using transformers"
text2 = "Synthetic media detection with vision transformers"
text3 = "Cancer diagnosis from MRI images"

emb1 = EmbeddingService.embed_text(text1)
emb2 = EmbeddingService.embed_text(text2)
emb3 = EmbeddingService.embed_text(text3)

print(
    cosine_similarity([emb1], [emb2])[0][0]
)

print(
    cosine_similarity([emb1], [emb3])[0][0]
)