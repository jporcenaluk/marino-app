from dataclasses import dataclass
from stats.daily_individual import IndividualResponse

class Summary:
    total_co2_kg: float
    total_distance_km: float
    total_responses: int
    daily_avg_distance_km: float
    daily_avg_co2_kg: float
    
    # TODO: get summary stats