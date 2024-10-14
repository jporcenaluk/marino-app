from dataclasses import dataclass
import datetime as dt
from models.daily_individual_response import DailyIndividualResponseBase
from models.transport_mode import TransportModes
from stats.base_calcs import individual_co2_kg


@dataclass
class DailyIndividual(DailyIndividualResponseBase):
    co2_kg: float
    co2_kg_per_distance_km: float
    transport_mode_friendly: str

    def __init__(self, daily_individual_response: DailyIndividualResponseBase):
        super().__init__(daily_individual_response.created_utc, daily_individual_response.distance_km, daily_individual_response.transport_mode)
    
        # It is assumed that the distance is a round trip and the individual
        # entered the distance for a one-way trip.
        self.distance_km = daily_individual_response.distance_km * 2
        transport_mode = TransportModes.get_by_id(
            daily_individual_response.transport_mode
        )
        self.transport_mode_friendly = transport_mode.friendly_name
        self.co2_kg = individual_co2_kg(
            transport_mode=transport_mode, distance_km=self.distance_km
        )
        self.co2_kg_per_distance_km = self.co2_kg / self.distance_km

