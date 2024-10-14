import logging
import datetime as dt
from dataclasses import dataclass
from stats.daily_individual import DailyIndividual
from stats.base_calcs import total_population, average

logger = logging.getLogger(__name__)

class LongerThanWeekException(Exception):
    pass


@dataclass
class SummaryBase:
    """
    Base class for summaries
    """

    # recorded totals
    total_recorded_count: int
    total_recorded_co2_kg: float
    total_recorded_distance_km: float

    # averages recorded
    avg_co2_kg_per_record: float
    avg_distance_km_per_record: float
    avg_co2_kg_per_record_per_distance_km: float

    # estimated totals (Marino-specific)
    total_estimate_co2_kg: float
    total_estimate_distance_km: float


    def __init__(self, daily_individuals: list[DailyIndividual]):
        self.total_recorded_count = len(daily_individuals)
        self.total_recorded_co2_kg = sum(
            emissions.co2_kg for emissions in daily_individuals
        )
        self.total_recorded_distance_km = sum(
            emissions.distance_km for emissions in daily_individuals
        )
        self.avg_co2_kg_per_record = average(
            self.total_recorded_co2_kg, self.total_recorded_count
        )
        self.avg_distance_km_per_record = average(
            self.total_recorded_distance_km, self.total_recorded_count
        )
        self.avg_co2_kg_per_record_per_distance_km = average(
            self.avg_co2_kg_per_record, self.avg_distance_km_per_record
        )
        self.total_estimate_co2_kg = self.avg_co2_kg_per_record * total_population()
        self.total_estimate_distance_km = (
            self.avg_distance_km_per_record * total_population()
        )


@dataclass
class DailySummary(SummaryBase):
    """
    The daily stats
    """

    date: dt.date

    def __init__(self, date: dt.date, daily_individuals: list[DailyIndividual]):
        super().__init__(daily_individuals)
        self.date = date


@dataclass
class DailySummaries:
    """
    The daily stats
    """

    daily_summaries: list[DailySummary]

    def __init__(self, daily_individuals: list[DailyIndividual]):
        logger.info(f"Daily individuals: {daily_individuals}")
        grouped_by_day = {}
        
        for individual in daily_individuals:
            date = individual.created_utc.date()
            if date not in grouped_by_day:
                grouped_by_day[date] = []
            grouped_by_day[date].append(individual)

        self.daily_summaries = [
            DailySummary(date=date, daily_individuals=daily_individuals)
            for date, daily_individuals in grouped_by_day.items()
        ]


@dataclass
class WeeklySummary(SummaryBase):
    """
    The weekly stats
    """

    def __init__(self, daily_individuals: list[DailyIndividual]):
        super().__init__(daily_individuals)
        # raise an exception if the dates span more than a week (min and max dates)
        max_date = max(emissions.created_utc for emissions in daily_individuals)
        min_date = min(emissions.created_utc for emissions in daily_individuals)
        if (max_date - min_date).days > 7:
            raise LongerThanWeekException

@dataclass
class TransportModeSummary:
    """
    Transport mode summary

    :param transport_mode: str
    :param daily_individuals: list of DailyIndividual
    :param total_recorded_count: int
    """

    transport_mode: str
    transport_mode_friendly: str
    total_recorded_count: int
    total_recorded_co2_kg: float
    total_recorded_distance_km: float
    percent_of_total_recorded: float

    # averages recorded
    avg_co2_kg_per_record: float
    avg_distance_km_per_record: float

    def __init__(self, transport_mode: str, daily_individuals: list[DailyIndividual], total_recorded_count: int):
        self.transport_mode = transport_mode
        self.transport_mode_friendly = daily_individuals[0].transport_mode_friendly
        self.percent_of_total_recorded = len(daily_individuals) / total_recorded_count
        self.total_recorded_count = len(daily_individuals)
        self.total_recorded_co2_kg = sum(
            emissions.co2_kg for emissions in daily_individuals
        )
        self.total_recorded_distance_km = sum(
            emissions.distance_km for emissions in daily_individuals
        )
        self.avg_co2_kg_per_record = average(
            self.total_recorded_co2_kg, self.total_recorded_count
        )
        self.avg_distance_km_per_record = average(
            self.total_recorded_distance_km, self.total_recorded_count
        )

@dataclass
class TransportModeSummaries:
    """
    Transport mode summaries

    :param daily_individuals: list of DailyIndividual
    """

    transport_mode_summaries: list[TransportModeSummary]

    def __init__(self, daily_individuals: list[DailyIndividual]):
        grouped_by_transport_mode = {}
        recorded_count = len(daily_individuals)
        for individual in daily_individuals:
            transport_mode = individual.transport_mode
            if transport_mode not in grouped_by_transport_mode:
                grouped_by_transport_mode[transport_mode] = []
            grouped_by_transport_mode[transport_mode].append(individual)

        self.transport_mode_summaries = [
            TransportModeSummary(transport_mode=transport_mode, daily_individuals=daily_individuals, total_recorded_count=recorded_count)
            for transport_mode, daily_individuals in grouped_by_transport_mode.items()
        ]