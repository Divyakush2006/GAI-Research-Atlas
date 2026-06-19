import requests
from typing import List
from models.atlas_schema import Paper
from services.config import logger, OPENALEX_EMAIL, OPENALEX_USER_AGENT

class PaperService:
    BASE_URL = "https://api.openalex.org/works"
    _session = None

    @classmethod
    def _get_session(cls):
        if cls._session is None:
            cls._session = requests.Session()
            headers = {"User-Agent": OPENALEX_USER_AGENT}
            if OPENALEX_EMAIL:
                headers["mailto"] = OPENALEX_EMAIL
            cls._session.headers.update(headers)
        return cls._session

    @staticmethod
    def reconstruct_abstract(inverted_index):
        if not inverted_index:
            return ""
        word_positions = {}
        for word, positions in inverted_index.items():
            for pos in positions:
                word_positions[pos] = word
        return " ".join(word_positions[i] for i in sorted(word_positions))

    @staticmethod
    def get_papers(topic: str, limit: int = 30) -> List[Paper]:
        params = {"search": topic, "per_page": limit}
        try:
            session = PaperService._get_session()
            response = session.get(PaperService.BASE_URL, params=params, timeout=60)
            response.raise_for_status()
            data = response.json()
        except requests.RequestException as e:
            logger.error(f"Failed to fetch papers from OpenAlex: {e}")
            raise

        papers = []
        for item in data.get("results", []):
            authors = []
            for author in item.get("authorships", []):
                if "author" in author and author["author"]:
                    authors.append(author["author"].get("display_name", ""))
            authors = [a for a in authors if a]

            abstract = PaperService.reconstruct_abstract(item.get("abstract_inverted_index"))
            paper = Paper(
                title=item.get("display_name", "Unknown"),
                year=item.get("publication_year") or 0,
                authors=authors,
                citation_count=item.get("cited_by_count") or 0,
                abstract=abstract,
            )
            papers.append(paper)

        logger.info(f"Fetched {len(papers)} papers for topic '{topic}'")
        return papers
