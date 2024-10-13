import pytest
from unittest.mock import MagicMock, patch
from src.stats.summaries import WeeklySummary, DailySummary, faculty_staff_count

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

@pytest.fixture(autouse=True)
def mock_faculty_staff_count():
    with patch("src.stats.summaries.faculty_staff_count", return_value=10) as mock_faculty_staff_count:
        yield mock_faculty_staff_count

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

def test_weekly_summary_estimates(daily_summaries: list[DailySummary]):
    summary = WeeklySummary(daily_summaries=daily_summaries)
    assert summary.estimated_total_co2_kg == 0.85 * 10
    assert summary.estimated_total_distance_km == 1.5 * 10