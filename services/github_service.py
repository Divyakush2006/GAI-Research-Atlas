import requests
from typing import List
from models.atlas_schema import Repository
from services.config import logger, GITHUB_TOKEN

class GitHubService:
    BASE_URL = "https://api.github.com/search/repositories"
    _session = None

    @classmethod
    def _get_session(cls):
        if cls._session is None:
            cls._session = requests.Session()
            cls._session.headers.update({"Accept": "application/vnd.github.v3+json"})
            if GITHUB_TOKEN:
                cls._session.headers.update({"Authorization": f"token {GITHUB_TOKEN}"})
                logger.info("GitHub API: using authenticated requests (higher rate limit)")
            else:
                logger.warning("GitHub API: no token set — rate limit is 60 req/hr")
        return cls._session

    @staticmethod
    def get_repositories(topic: str, limit: int = 5) -> List[Repository]:
        params = {"q": topic, "sort": "stars", "order": "desc", "per_page": limit}
        try:
            session = GitHubService._get_session()
            response = session.get(GitHubService.BASE_URL, params=params, timeout=15)
            response.raise_for_status()
            data = response.json()
        except requests.RequestException as e:
            logger.error(f"Failed to fetch repositories from GitHub: {e}")
            raise

        repos = []
        for item in data.get("items", []):
            repo = Repository(
                name=item["name"],
                description=item.get("description", "") or "",
                stars=item.get("stargazers_count", 0),
                url=item["html_url"],
            )
            repos.append(repo)

        remaining = response.headers.get("X-RateLimit-Remaining", "unknown")
        logger.info(f"Fetched {len(repos)} repositories (rate limit remaining: {remaining})")
        return repos
