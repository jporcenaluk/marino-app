from dataclasses import dataclass
import datetime as dt
from models.daily_individual_response import DailyIndividualResponseBase
from models.transport_mode import TransportMetadata
from stats.base_calcs import individual_co2_kg

@dataclass
class DailyIndividual(DailyIndividualResponseBase):
    co2_emissions_kg: float

    def __init__(self,
                 daily_individual_response: DailyIndividualResponseBase
                 ):
        self.created_utc = daily_individual_response.created_utc
        self.distance_km = daily_individual_response.distance_km
        self.transport_mode = daily_individual_response.transport_mode
        self.tz_identifier = daily_individual_response.tz_identifier
