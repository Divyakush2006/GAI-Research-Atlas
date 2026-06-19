class GraphService:

    @staticmethod
    def generate_graph(atlas):

        nodes = []
        edges = []

        nodes.append(
            {
                "id": atlas.topic,
                "label": atlas.topic,
                "type": "topic"
            }
        )

        for paper in atlas.papers:

            nodes.append(
                {
                    "id": paper.title,
                    "label": paper.title,
                    "type": "paper"
                }
            )

            edges.append(
                {
                    "source": atlas.topic,
                    "target": paper.title,
                    "relation": "contains"
                }
            )

        for repo in atlas.repositories:

            nodes.append(
                {
                    "id": repo.name,
                    "label": repo.name,
                    "type": "repository"
                }
            )

            edges.append(
                {
                    "source": atlas.topic,
                    "target": repo.name,
                    "relation": "implemented_by"
                }
            )

        for dataset in atlas.datasets:

            nodes.append(
                {
                    "id": dataset,
                    "label": dataset,
                    "type": "dataset"
                }
            )

            edges.append(
                {
                    "source": atlas.topic,
                    "target": dataset,
                    "relation": "uses"
                }
            )

        for model in atlas.models:

            nodes.append(
                {
                    "id": model,
                    "label": model,
                    "type": "model"
                }
            )

            edges.append(
                {
                    "source": atlas.topic,
                    "target": model,
                    "relation": "model"
                }
            )

        return {
            "nodes": nodes,
            "edges": edges
        }