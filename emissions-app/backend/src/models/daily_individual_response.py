import datetime as dt
from dataclasses import dataclass


@dataclass
class DailyIndividualResponseBase:
    """
    The non-sensitive information for daily transport of an
    """

    created_utc: dt.datetime
    distance_km: int
    transport_mode: str

    def __post_init__(self):
        try:
            if isinstance(self.created_utc, str):
                self.created_utc = dt.datetime.strptime(self.created_utc)
        except ValueError as e:
            raise ValueError("created_utc must be a datetime object or a string") from e

@dataclass
class DailyIndividualResponse(DailyIndividualResponseBase):
    """
    Adding in the sensitive info
    """

    email: str
    ip_address: str
    user_id: str
    tz_identifier: str = "Europe/London"
