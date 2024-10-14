# pylint: disable=redefined-outer-name
"""
Test calc summaries
"""
import datetime as dt
from unittest.mock import MagicMock, patch
import pytest
from src.stats.summaries import WeeklySummary, DailySummary, DailyIndividual, TransportModeSummary, TransportModeSummaries


@pytest.fixture
def daily_individuals():
    daily_individual_1 = MagicMock(DailyIndividual)
    daily_individual_1.co2_kg = 1.0
    daily_individual_1.distance_km = 3
    daily_individual_1.transport_mode = "bike"
    daily_individual_1.tz_identifier = "America/New_York"
    daily_individual_1.created_utc = dt.datetime(2021, 1, 1, 0, 0, 0)

    daily_individual_2 = MagicMock(DailyIndividual)
    daily_individual_2.co2_kg = 1.2
    daily_individual_2.distance_km = 3
    daily_individual_2.transport_mode = "tram_or_bus"
    daily_individual_2.tz_identifier = "America/New_York"
    daily_individual_2.created_utc = dt.datetime(2021, 1, 1, 0, 0, 0)

    return [daily_individual_1, daily_individual_2]


@pytest.fixture(autouse=True)
def mock_total_population():
    with patch(
        "src.stats.summaries.total_population", return_value=10
    ) as mock_faculty_staff_count:
        yield mock_faculty_staff_count


def test_weekly_summary_totals(daily_individuals: list[DailyIndividual]):
    summary = WeeklySummary(daily_individuals=daily_individuals)
    assert summary.total_recorded_count == 2
    assert summary.total_recorded_co2_kg == 2.2
    assert summary.total_recorded_distance_km == 6


def test_weekly_summary_averages(daily_individuals: list[DailyIndividual]):
    summary = WeeklySummary(daily_individuals=daily_individuals)
    assert summary.avg_co2_kg_per_record == 1.1
    assert summary.avg_distance_km_per_record == 3
    assert round(summary.avg_co2_kg_per_record_per_distance_km, 2) == round(1.1 / 3, 2)


def test_weekly_summary_estimates(daily_individuals: list[DailyIndividual]):
    summary = WeeklySummary(daily_individuals=daily_individuals)
    assert summary.total_estimate_co2_kg == 1.1 * 10
    assert summary.total_estimate_distance_km == 3 * 10


def test_daily_summary_totals(daily_individuals: list[DailyIndividual]):
    summary = DailySummary(
        date=dt.datetime(2021, 1, 1), daily_individuals=daily_individuals
    )
    assert summary.total_recorded_count == 2
    assert summary.total_recorded_co2_kg == 2.2
    assert summary.total_recorded_distance_km == 6


def test_daily_summary_averages(daily_individuals: list[DailyIndividual]):
    summary = DailySummary(
        date=dt.date(2021, 1, 1), daily_individuals=daily_individuals
    )
    assert summary.avg_co2_kg_per_record == 1.1
    assert summary.avg_distance_km_per_record == 3
    assert round(summary.avg_co2_kg_per_record_per_distance_km, 2) == round(1.1 / 3, 2)


def test_daily_summary_estimates(daily_individuals: list[DailyIndividual]):
    summary = DailySummary(
        date=dt.date(2021, 1, 1), daily_individuals=daily_individuals
    )
    assert summary.total_estimate_co2_kg == 1.1 * 10
    assert summary.total_estimate_distance_km == 3 * 10

def test_transport_mode_summary_totals(daily_individuals: list[DailyIndividual]):
    summary = TransportModeSummary(
        transport_mode="bike", daily_individuals=daily_individuals, total_recorded_count=2
    )
    assert summary.total_recorded_count == 2
    assert summary.total_recorded_co2_kg == 2.2
    assert summary.total_recorded_distance_km == 6
    assert summary.percent_of_total_recorded == 1


def test_transport_mode_summary_averages(daily_individuals: list[DailyIndividual]):
    summary = TransportModeSummary(
        transport_mode="bike", daily_individuals=daily_individuals, total_recorded_count=2
    )
    assert summary.avg_co2_kg_per_record == 1.1
    assert summary.avg_distance_km_per_record == 3


def test_transport_mode_summaries(daily_individuals: list[DailyIndividual]):
    summaries = TransportModeSummaries(daily_individuals=daily_individuals)
    assert len(summaries.transport_mode_summaries) == 2

    bike_summary = next(
        summary for summary in summaries.transport_mode_summaries if summary.transport_mode == "bike"
    )
    assert bike_summary.total_recorded_count == 1
    assert bike_summary.total_recorded_co2_kg == 1.0
    assert bike_summary.total_recorded_distance_km == 3

    tram_or_bus_summary = next(
        summary for summary in summaries.transport_mode_summaries if summary.transport_mode == "tram_or_bus"
    )
    assert tram_or_bus_summary.total_recorded_count == 1
    assert tram_or_bus_summary.total_recorded_co2_kg == 1.2
    assert tram_or_bus_summary.total_recorded_distance_km == 3