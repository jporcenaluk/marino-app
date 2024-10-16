"""
Test base calcs
"""
from src.models.transport_mode import TransportMode
from src.stats.base_calcs import individual_co2_kg, confidence_interval, total_population
import numpy as np

def test_emissions_calc():
    """
    Test that a calculation works as expected.

    For bikes, it should
    """
    grams_per_km = 10
    kilometers = 5
    metadata = TransportMode(
        id="airplaine", friendly_name="airplane", co2_grams_per_km=grams_per_km
    )
    result = individual_co2_kg(metadata, kilometers)
    assert result == 0.05

def test_confidence_interval():
    """
    Test that a calculation works as expected.
    """
    sample_size = 1000
    sample_mean = 30
    data = np.random.normal(loc=sample_mean, scale=10, size=sample_size)

    # calculate the confidence interval
    ci = confidence_interval(data)

    # check that the confidence interval is within the bounds
    total_population_sum = sample_mean * total_population()
    assert float(ci.lower_bound_population) <= total_population_sum <= (ci.upper_bound_population)
    assert ci.lower_bound_population < ci.upper_bound_population
    assert round(ci.mean, 0) == sample_mean
    assert ci.lower_bound < ci.upper_bound
    assert ci.lower_bound < sample_mean < ci.upper_bound
    assert ci.confidence_level == 0.95
