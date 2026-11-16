from services.search_service import SearchService
from services.scoring_service import ScoringService


class RankingService:

    @staticmethod
    def rank_papers(topic, papers):

        results = SearchService.search(
            query=topic,
            n_results=len(papers)
        )

        ranked_titles = results["ids"][0]
        distances = results["distances"][0]

        max_citations = max(
            paper.citation_count
            for paper in papers
        )

        min_year = min(
         paper.year
         for paper in papers
         )

        max_year = max(
        paper.year
        for paper in papers
         )

        scored_papers = []

        for title, distance in zip(
            ranked_titles,
            distances
        ):

            matching_paper = None

            for paper in papers:

                if paper.title == title:
                    matching_paper = paper
                    break

            if matching_paper is None:
                continue


            semantic_score = (
             ScoringService.semantic_score(
             distance
             )
             )

          

            citation_score = (
                ScoringService.normalize_citations(
                    matching_paper.citation_count,
                    max_citations
                )
            )
            
            if max_year == min_year:
             recency_score = 1.0
            else:
             recency_score = (
               matching_paper.year - min_year
            ) / (
             max_year - min_year
             )

            query_words = set(
            topic.lower().split()
              )

            title_words = set(
              matching_paper.title.lower().split()
              )

            overlap_score = (
             len(query_words & title_words)
             /
            len(query_words)
             )

            final_score = (
            0.65 * semantic_score
             +
            0.10 * citation_score
             +
             0.10 * recency_score
             +
             0.15 * overlap_score
             )
            
            print("\n")
            print("Recency:", recency_score)
            print(matching_paper.title)
            print("Distance:", distance)
            print("Semantic:", semantic_score)
            print("Citation:", citation_score)
            print("Overlap:", overlap_score)
            print("Final:", final_score)
            
            
            matching_paper.score = round(
            50 + (final_score * 50),
             2
            )
            scored_papers.append(
                (
                    final_score,
                    matching_paper
                )
            )

        scored_papers.sort(
            key=lambda x: x[0],
            reverse=True
        )

        ranked_papers = [
            paper
            for score, paper
            in scored_papers
        ]

        return ranked_papers