from models.transport_mode import TransportMetadata

def individual_co2_kg(transport_metadata: TransportMetadata, distance_km: int) -> float:
    """
    Calculate an individual's CO2 emissions based on mode of transport and distance.
    Uses calculations from: https://ourworldindata.org/travel-carbon-footprint

    :param transport_mode: Mode of transport
    :param distance_km: Distance of travel in kilometers
    """
    return (transport_metadata.co2_grams_per_km * distance_km) / 1000

def average(total: float, count: int) -> float:
    """
    Calculates an average
    """
    return total / count

def faculty_staff_count() -> int:
    """
    Calculate the number of faculty and staff. This is a fixed number, so calculation
    can be done ahead of time - saving the computer from doing it.

    Estimated 1400 students, 100 staff, approximately 75% of which commute to school
    each day.
    
    (1400 + 100) * 0.75 = 1125
    """
    return 1125