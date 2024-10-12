from dataclasses import dataclass
import datetime as dt
from models.transport_mode import TransportMetadata
from stats.base_calcs import individual_co2_kg

@dataclass
class DailyIndividual:
    created_utc: dt.datetime
    distance_km: int
    transport_mode: str
    tz_identifier: str
    co2_emissions_kg: float

    def __init__(self,
                 created_utc: str,
                 distance_km: str,
                 transport_mode: str,
                 tz_identifer: str,
                 ):
        self.created_utc = created_utc.strftime()