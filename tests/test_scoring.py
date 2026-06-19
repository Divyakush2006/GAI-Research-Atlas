from services.scoring_service import ScoringService

semantic = 0.9
citation = 0.7

score = ScoringService.final_score(
    semantic,
    citation
)

print(score)