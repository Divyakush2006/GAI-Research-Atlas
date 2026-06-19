import requests
from typing import List

from models.atlas_schema import Repository


class GitHubService:

    BASE_URL = "https://api.github.com/search/repositories"

    @staticmethod
    def get_repositories(
        topic: str,
        limit: int = 5
    ) -> List[Repository]:

        params = {
            "q": topic,
            "sort": "stars",
            "order": "desc",
            "per_page": limit
        }

        try:

            response = requests.get(
                GitHubService.BASE_URL,
                params=params,
                timeout=15
            )

            response.raise_for_status()

            data = response.json()

            repos = []

            for item in data.get("items", []):

                repo = Repository(
                    name=item["name"],
                    description=item.get(
                        "description", ""
                    ) or "",
                    stars=item.get(
                        "stargazers_count", 0
                    ),
                    url=item["html_url"]
                )

                repos.append(repo)

            return repos

        except Exception as e:

            print(f"GitHub Error: {e}")

            return []