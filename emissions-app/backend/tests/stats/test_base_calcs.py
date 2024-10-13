import pytest

from src.models.transport_mode import TransportMetadata
from src.stats.base_calcs import individual_co2_kg

def test_emissions_calc():
    """
    Test that a calculation works as expected.

    For bikes, it should 
    """
    grams_per_km = 10
    kilometers = 5
    metadata = TransportMetadata("airplane", grams_per_km)
    result = individual_co2_kg(metadata, kilometers)
    assert result == 0.05