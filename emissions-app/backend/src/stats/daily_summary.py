import datetime as dt
from datetime import timezone
from stats.daily_individual import Individual
from dataclasses import dataclass

@dataclass
class Daily:
    """
    The daily stats
    """
    date: dt.date
    total_people: int
    total_co2_kg: float
    total_distance_km: int
    avg_co2_kg_per_person: float
    avg_distance_km_per_person: float
    avg_co2_kg_per_person_per_distance_km: float

    def __init__(
            self,
            date: dt.datetime,
            individual_emissions: list[Individual]
        ):
            self.date = date.date()
            self.total_people = len(individual_emissions)
            self.total_co2_kg = sum([emissions.total_emissions for emissions in individual_emissions])
            self.total_distance_km = sum([emissions.distance for emissions in individual_emissions])
            self.avg_co2_kg_per_person = self.total_co2_kg / self.total_people
            self.avg_distance_km_per_person = self.total_distance_km / self.total_people
            self.avg_co2_kg_per_person_per_distance_km = self.avg_co2_kg_per_person / self.avg_distance_km_per_person