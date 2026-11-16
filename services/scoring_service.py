import math
class ScoringService:

    @staticmethod
    def normalize_citations(
        citation_count: int,
        max_citations: int
    ) -> float:

        if max_citations == 0:
            return 0.0
        
        return (
         math.log1p(citation_count)
         /
         math.log1p(max_citations)
         )
    
    @staticmethod
    def semantic_score(distance: float) -> float:

      return 1 / (1 + distance)
    
    @staticmethod
    def final_score(
    semantic_score: float,
    citation_score: float
    ) -> float:

     return (
        0.9 * semantic_score
        +
        0.1 * citation_score
    )