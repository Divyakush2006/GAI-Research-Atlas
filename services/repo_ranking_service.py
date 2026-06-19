import math

from services.embedding_service import EmbeddingService


class RepoRankingService:

    @staticmethod
    def cosine_similarity(
        vec1,
        vec2
    ):

        dot_product = sum(
            a * b
            for a, b in zip(
                vec1,
                vec2
            )
        )

        norm1 = (
            sum(
                a * a
                for a in vec1
            )
        ) ** 0.5

        norm2 = (
            sum(
                b * b
                for b in vec2
            )
        ) ** 0.5

        if norm1 == 0 or norm2 == 0:
            return 0

        return (
            dot_product
            /
            (
                norm1 * norm2
            )
        )

    @staticmethod
    def rank_repositories(
        topic,
        repositories
    ):

        if not repositories:
            return []

        max_stars = max(
            repo.stars
            for repo in repositories
        )

        query_words = set(
            topic.lower().split()
        )

        topic_embedding = (
            EmbeddingService.embed_text(
                topic
            )
        )

        scored_repos = []

        for repo in repositories:

            text = (
                repo.name +
                " " +
                repo.description
            ).lower()

            repo_embedding = (
                EmbeddingService.embed_text(
                    text
                )
            )

            description_relevance = (
                RepoRankingService.cosine_similarity(
                    topic_embedding,
                    repo_embedding
                )
            )

            repo_words = set(
                text.split()
            )

            overlap_score = (
                len(
                    query_words &
                    repo_words
                )
                /
                len(query_words)
            )

            star_score = (
                math.log1p(repo.stars)
                /
                math.log1p(max_stars)
            )

            final_score = (
                0.60 * description_relevance
                +
                0.25 * overlap_score
                +
                0.15 * star_score
            )

            repo.score = round(
                final_score * 100,
                2
            )

            print("\n")
            print(repo.name)
            print(
                "Description Relevance:",
                round(description_relevance, 3)
            )
            print(
                "Overlap:",
                round(overlap_score, 3)
            )
            print(
                "Star Score:",
                round(star_score, 3)
            )
            print(
                "Final Score:",
                round(final_score, 3)
            )

            scored_repos.append(
                (
                    final_score,
                    repo
                )
            )

        scored_repos.sort(
            reverse=True,
            key=lambda x: x[0]
        )

        return [
            repo
            for score, repo
            in scored_repos
        ]