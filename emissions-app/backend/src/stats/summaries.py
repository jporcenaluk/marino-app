import datetime as dt
from dataclasses import dataclass
from stats.daily_individual import DailyIndividual
from stats.base_calcs import faculty_staff_count, average

class LongerThanWeekException(Exception):
    pass

@dataclass
class DailySummary:
    """
    The daily stats
    """
    date: dt.date

    # recorded totals for the day
    total_recorded_count: int
    total_recorded_co2_kg: float
    total_recorded_distance_km: int

    # averages recorded for the day
    avg_co2_kg_per_record: float
    avg_distance_km_per_record: float
    avg_co2_kg_per_record_per_distance_km: float

    # estimated totals for the day (Marino-specific)
    estimated_total_co2_kg: float
    estimated_total_distance_km: float

    def __init__(
            self,
            date: dt.datetime,
            individual_emissions: list[DailyIndividual]
        ):
            self.date = date.date()
            self.total_recorded_count = len(individual_emissions)
            self.total_recorded_co2_kg = sum([emissions.co2_emissions_kg for emissions in individual_emissions])
            self.total_recorded_distance_km = sum([emissions.distance_km for emissions in individual_emissions])
            self.avg_co2_kg_per_record = average(self.total_recorded_co2_kg, self.total_recorded_count)
            self.avg_distance_km_per_record = average(self.total_recorded_distance_km, self.total_recorded_count)
            self.avg_co2_kg_per_record_per_distance_km = average(self.avg_co2_kg_per_record, self.avg_distance_km_per_record)
            self.estimated_total_co2_kg = self.avg_co2_kg_per_record * faculty_staff_count()
            self.estimated_total_distance_km = self.avg_distance_km_per_record * faculty_staff_count()


@dataclass
class WeeklySummary:
    """
    The weekly stats
    """
    # recorded totals for the week
    total_recorded_count: int
    total_recorded_co2_kg: float
    total_recorded_distance_km: float

    # averages recorded for the week
    avg_co2_kg_per_record: float
    avg_distance_km_per_record: float
    avg_co2_kg_per_record_per_distance_km: float

    # estimated totals for the week (Marino-specific)
    estimated_total_co2_kg: float
    estimated_total_distance_km: float

    def __init__(self, daily_summaries: list[DailySummary]):
        if len(daily_summaries) >= 7:
             raise LongerThanWeekException("Too many daily summaries; cannot compute a week - filter beforehand")
        self.total_recorded_count = sum([summary.total_recorded_count for summary in daily_summaries])
        self.total_recorded_co2_kg = sum([summary.total_recorded_co2_kg for summary in daily_summaries])
        self.total_recorded_distance_km = sum([summary.total_recorded_distance_km for summary in daily_summaries])
        self.avg_co2_kg_per_record = average(self.total_recorded_co2_kg, self.total_recorded_count)
        self.avg_distance_km_per_record = average(self.total_recorded_distance_km, self.total_recorded_count)
        self.avg_co2_kg_per_record_per_distance_km = average(self.avg_co2_kg_per_record, self.avg_distance_km_per_record)
        self.estimated_total_co2_kg = self.avg_co2_kg_per_record * faculty_staff_count()
        self.estimated_total_distance_km = self.avg_distance_km_per_record * faculty_staff_count()