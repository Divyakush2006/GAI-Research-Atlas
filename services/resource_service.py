import csv
from typing import List

from models.atlas_schema import Resource


class ResourceService:

    @staticmethod
    def get_resources() -> List[Resource]:

        resources = []

        try:

            with open(
                "data/governance_resources.csv",
                newline="",
                encoding="utf-8"
            ) as file:

                reader = csv.DictReader(file)

                for row in reader:

                    resources.append(
                        Resource(
                            title=row["title"],
                            category=row["category"],
                            source=row["source"],
                            url=row["url"]
                        )
                    )

        except Exception as e:

            print(
                f"Error loading resources: {e}"
            )

        return resources