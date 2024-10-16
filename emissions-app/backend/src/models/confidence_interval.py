from dataclasses import dataclass

@dataclass
class ConfidenceInterval:
    confidence_level: int
    margin_of_error: float
    lower_bound: float
    upper_bound: float
    lower_bound_population: float
    upper_bound_population: float
    mean: float
    margin_of_error_population: float