import csv
from typing import List
from models.atlas_schema import Resource
from services.config import logger, RESOURCES_PATH

class ResourceService:
    @staticmethod
    def get_resources() -> List[Resource]:
        resources = []
        try:
            with open(RESOURCES_PATH, newline="", encoding="utf-8") as file:
                reader = csv.DictReader(file)
                for row in reader:
                    resources.append(
                        Resource(
                            title=row.get("title", ""),
                            category=row.get("category", ""),
                            source=row.get("source", ""),
                            url=row.get("url", ""),
                        )
                    )
        except FileNotFoundError:
            logger.error(f"Resources CSV not found at {RESOURCES_PATH}")
            return []
        except Exception as e:
            logger.error(f"Error loading resources CSV: {e}")
            return []

        logger.info(f"Loaded {len(resources)} trusted resources")
        return resources
