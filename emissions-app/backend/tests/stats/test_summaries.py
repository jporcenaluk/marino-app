import pytest
from unittest.mock import MagicMock
from src.stats.summaries import WeeklySummary, DailySummary


@pytest.fixture
def daily_summaries():
    # Mock daily summaries
    daily_summary_1 = MagicMock(DailySummary)
    daily_summary_1.total_recorded_count = 2
    daily_summary_1.total_recorded_co2_kg = 1.0
    daily_summary_1.total_recorded_distance_km = 3

    daily_summary_2 = MagicMock(DailySummary)
    daily_summary_2.total_recorded_count = 2
    daily_summary_2.total_recorded_co2_kg = 2.4
    daily_summary_2.total_recorded_distance_km = 3

    return [daily_summary_1, daily_summary_2]

def test_weekly_summary_totals(daily_summaries: list[DailySummary]):
    summary = WeeklySummary(daily_summaries=daily_summaries)
    assert summary.total_recorded_count == 4
    assert summary.total_recorded_co2_kg == 3.4
    assert summary.total_recorded_distance_km == 6

def test_weekly_summary_averages(daily_summaries: list[DailySummary]):
    summary = WeeklySummary(daily_summaries=daily_summaries)
    assert summary.avg_co2_kg_per_record == 0.85
    assert summary.avg_distance_km_per_record == 1.5
    assert round(summary.avg_co2_kg_per_record_per_distance_km, 2) == round(0.85 / 1.5, 2)