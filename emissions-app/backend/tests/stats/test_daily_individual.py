import pytest
from unittest.mock import patch
from datetime import datetime
from src.models.daily_individual_response import DailyIndividualResponseBase
from src.models.transport_mode import TransportModes
from src.stats.daily_individual import DailyIndividual

@pytest.fixture
def daily_individual_response():
    return DailyIndividualResponseBase(
        created_utc=datetime(2021, 1, 1),
        distance_km=10,
        transport_mode="bike"
    )

@pytest.fixture
def transport_mode(daily_individual_response):
    return TransportModes.get_by_id(daily_individual_response.transport_mode)

def test_daily_individual_init(daily_individual_response, transport_mode):
    daily_individual = DailyIndividual(daily_individual_response)

    assert daily_individual.created_utc == daily_individual_response.created_utc
    assert daily_individual.distance_km == daily_individual_response.distance_km
    assert daily_individual.transport_mode == daily_individual_response.transport_mode
    assert daily_individual.transport_mode_friendly == transport_mode.friendly_name
    assert daily_individual.co2_kg_per_distance_km == transport_mode.co2_grams_per_km / 1000 / daily_individual_response.distance_km
    assert daily_individual.co2_kg == 0.25