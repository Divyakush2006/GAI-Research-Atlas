from pydantic import BaseModel
from typing import List

class Paper(BaseModel):
    title: str
    year: int
    authors: List[str]
    citation_count: int
    abstract: str = ""

    score: float = 0.0


class Repository(BaseModel):
    name: str
    description: str
    stars: int
    url: str

class Resource(BaseModel):
    title: str
    category: str
    source: str
    url: str

class Atlas(BaseModel):
    topic: str
    overview: str

    papers: List[Paper]

    datasets: List[str]

    models: List[str]

    repositories: List[Repository]

    resources: List[Resource]