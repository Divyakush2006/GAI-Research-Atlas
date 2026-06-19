class ScoringService:
    @staticmethod
    def normalize_citations(citation_count: int, max_citations: int) -> float:
        if max_citations == 0:
            return 0.0
        return citation_count / max_citations

    @staticmethod
    def semantic_score(distance: float) -> float:
        return 1 / (1 + distance)
