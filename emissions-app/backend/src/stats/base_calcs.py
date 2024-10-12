from models import TransportMetadata

def individual_co2_kg(transport_metadata: TransportMetadata, distance_km: int) -> float:
    """
    Calculate an individual's CO2 emissions based on mode of transport and distance.
    Uses calculations from: https://ourworldindata.org/travel-carbon-footprint

    :param transport_mode: Mode of transport
    :param distance_km: Distance of travel in kilometers
    """
    return (transport_metadata.co2_grams_per_km * distance_km) / 1000