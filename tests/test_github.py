from services.github_service import GitHubService

repos = GitHubService.get_repositories(
    "deepfake detection"
)

for repo in repos:

    print()

    print(repo.name)

    print(repo.stars)

    print(repo.url)