from services.search_service import SearchService
from services.scoring_service import ScoringService
from services.config import logger, SCORE_WEIGHTS

class RankingService:
    @staticmethod
    def rank_papers(topic: str, papers):
        if not papers:
            return []

        results = SearchService.search(query=topic, n_results=len(papers))
        ranked_titles = results["ids"][0]
        distances = results["distances"][0]

        max_citations = max(p.citation_count for p in papers)
        min_year = min(p.year for p in papers)
        max_year = max(p.year for p in papers)
        year_range = max_year - min_year

        scored_papers = []
        for title, distance in zip(ranked_titles, distances):
            matching_paper = next((p for p in papers if p.title == title), None)
            if matching_paper is None:
                continue

            semantic = ScoringService.semantic_score(distance)
            citation = ScoringService.normalize_citations(matching_paper.citation_count, max_citations)
            recency = 1.0 if year_range == 0 else (matching_paper.year - min_year) / year_range

            final_score = (
                SCORE_WEIGHTS["semantic"] * semantic
                + SCORE_WEIGHTS["citation"] * citation
                + SCORE_WEIGHTS["recency"] * recency
            )

            matching_paper.score = round(final_score * 100, 2)
            scored_papers.append((final_score, matching_paper))

        scored_papers.sort(key=lambda x: x[0], reverse=True)
        ranked = [paper for _, paper in scored_papers]

        logger.info(f"Ranked {len(ranked)} papers for '{topic}'")
        return ranked
