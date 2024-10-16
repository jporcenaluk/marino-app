"""Basic calculations"""
import numpy as np
from scipy import stats
from models.transport_mode import TransportMode
from models.confidence_interval import ConfidenceInterval

def individual_co2_kg(transport_mode: TransportMode, distance_km: int) -> float:
    """
    Calculate an individual's CO2 emissions based on mode of transport and distance.
    Uses calculations from: https://ourworldindata.org/travel-carbon-footprint

    :param transport_mode: Mode of transport
    :param distance_km: Distance of travel in kilometers
    """
    return (transport_mode.co2_grams_per_km * distance_km) / 1000


def average(total: float, count: int) -> float:
    """
    Calculates an average
    """
    return total / count


def total_population() -> int:
    """
    Calculate the total population (the people at Marino who may use the app). This is a fixed number, so calculation
    can be done ahead of time - saving the computer from doing it.

    Estimated 1400 students, 100 staff, approximately 75% of which commute to school
    each day.

    (1400 + 100) * 0.75 = 1125
    """
    return 1125


def confidence_interval(data: list[float]) -> ConfidenceInterval:
    """
    Calculate the confidence interval. This represents how strongly we can believe the summary statistic
    by providing a range (upper and lower bounds) that we have some confidence level about in saying
    that the summary statistic (as it relates to the total population) lies between it.
    
    For example, we may calculate the Confidence Interval at a 95% confidence level - meaning we can 
    say with 95% confidence that the mean of our data lies between the resulting range, at least when
    it comes to explaining the truth of what the population actually is.

    So the more people we can get to answer the survey, the more answers recorded, the narrower the 
    range given a 95% confidence level.

    This uses a t-distribution to calculate the confidence interval and doesn't require the population standard deviation.
    However, it can be less accurate with smaller sample sizes.
    """
    # standard error of the mean
    sample_size = len(data)
    sample_mean = np.mean(data)
    std_dev = np.std(data, ddof=1)

    # confidence level
    confidence_level = 0.95

    # Calculate the t-critical value for a confidence interval
    t_critical = stats.t.ppf((1 + confidence_level) / 2, df=sample_size-1)

    # Calculate the margin of error
    margin_of_error = t_critical * (std_dev / np.sqrt(sample_size))

    # Confidence interval
    ci_lower_ttest = sample_mean - margin_of_error
    ci_upper_ttest = sample_mean + margin_of_error

    return ConfidenceInterval(
        confidence_level=confidence_level * 100,
        margin_of_error=margin_of_error,
        lower_bound=ci_lower_ttest,
        upper_bound=ci_upper_ttest,
        mean=sample_mean,
        lower_bound_population=ci_lower_ttest * total_population(),
        upper_bound_population=ci_upper_ttest * total_population(),
        margin_of_error_population=margin_of_error * total_population()
    )