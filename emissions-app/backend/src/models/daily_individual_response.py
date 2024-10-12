import datetime as dt
from dataclasses import dataclass

@dataclass
class DailyIndividualResponseBase:
    """
    The non-sensitive information for daily transport of an
    """
    created_utc: dt.datetime
    distance: int
    transport_mode: str
    tz_identifier: str = "Eire"

@dataclass
class DailyIndividualResponse(DailyIndividualResponseBase):
    """
    Adding in the sensitive info
    """
    email: str
    ip_address: str
    user_id: str