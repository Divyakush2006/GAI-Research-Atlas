import requests
from typing import List

from models.atlas_schema import Paper

class PaperService:

    BASE_URL = "https://api.openalex.org/works"

    @staticmethod
    def reconstruct_abstract(inverted_index):

        if not inverted_index:
            return ""

        word_positions = {}

        for word, positions in inverted_index.items():

            for pos in positions:
                word_positions[pos] = word

        abstract = " ".join(
            word_positions[i]
            for i in sorted(word_positions)
        )

        return abstract

    @staticmethod
    def get_papers(topic: str, limit: int = 30) -> List[Paper]:

        params = {
            "search": topic,
            "per-page": limit
        }

        try:

            response = requests.get(
                PaperService.BASE_URL,
                params=params,
                timeout=60
            )

            response.raise_for_status()

            data = response.json()

            papers = []

            for item in data.get("results", []):

                authors = []

                for author in item.get("authorships", []):

                    if "author" in author:

                        authors.append(
                            author["author"].get(
                                "display_name",
                                ""
                            )
                        )

                abstract = (
                    PaperService.reconstruct_abstract(
                        item.get(
                            "abstract_inverted_index"
                        )
                    )
                )

                paper = Paper(
                    title=item.get(
                        "display_name",
                        "Unknown"
                    ),
                    year=item.get(
                        "publication_year"
                    ) or 0,
                    authors=authors,
                    citation_count=item.get(
                        "cited_by_count"
                    ) or 0,
                    abstract=abstract
                )

                papers.append(paper)

            return papers

        except Exception as e:

            print(
                f"Error fetching papers: {e}"
            )

            return []