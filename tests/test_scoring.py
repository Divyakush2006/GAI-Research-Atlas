"""Tests for the Research Atlas backend scoring service."""
from services.scoring_service import ScoringService


def test_semantic_score_zero_distance():
    assert ScoringService.semantic_score(0.0) == 1.0


def test_semantic_score_positive_distance():
    score = ScoringService.semantic_score(1.0)
    assert score == 0.5


def test_semantic_score_large_distance():
    score = ScoringService.semantic_score(100.0)
    assert score == 1 / 101


def test_normalize_citations_zero_max():
    assert ScoringService.normalize_citations(10, 0) == 0.0


def test_normalize_citations_half():
    assert ScoringService.normalize_citations(5, 10) == 0.5


def test_normalize_citations_equal():
    assert ScoringService.normalize_citations(10, 10) == 1.0
