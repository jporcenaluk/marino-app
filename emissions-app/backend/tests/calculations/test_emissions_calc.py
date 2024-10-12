import pytest

from app.calculations.transport_mode import TransportMetadata
from app.calculations.emissions_calc import EmissionsCalc

def test_emissions_calc():
    """
    Test that a calculation works as expected.

    For bikes, it should 
    """
    grams_per_km = 10
    kilometers = 5
    metadata = TransportMetadata("airplane", grams_per_km)
    result = EmissionsCalc.individual_co2_kg(metadata, kilometers)
    assert result == 0.05