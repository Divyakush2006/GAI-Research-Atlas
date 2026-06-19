import os
import logging

logging.basicConfig(
    level=logging.INFO,
    format="%(asctime)s [%(levelname)s] %(name)s: %(message)s",
    datefmt="%Y-%m-%d %H:%M:%S",
)

logger = logging.getLogger("research_atlas")

BASE_DIR = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
CHROMA_DB_PATH = os.path.join(BASE_DIR, "chroma_db")
RESOURCES_PATH = os.path.join(BASE_DIR, "data", "governance_resources.csv")

GITHUB_TOKEN = os.environ.get("GITHUB_TOKEN", "")
OPENALEX_EMAIL = os.environ.get("OPENALEX_EMAIL", "")
OPENALEX_USER_AGENT = os.environ.get("OPENALEX_USER_AGENT", "ResearchAtlas/1.0")

SCORE_WEIGHTS = {
    "semantic": 0.75,
    "citation": 0.15,
    "recency": 0.10,
}
