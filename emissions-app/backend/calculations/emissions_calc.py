from calculations.transport_mode import TransportMode

class EmissionsCalc:
    """
    Calculates CO2 emissions based on different forms of transport.
    Uses calculations from: https://ourworldindata.org/travel-carbon-footprint
    """
    def individual_co2_kg(transport_mode: TransportMode, distance_km: int) -> int:
        """
        Calculate an individual's CO2 emissions based on mode of transport and distance.

        :param transport_mode: Mode of transport
        :param distance_km: Distance of travel in kilometers
        """
        return (transport_mode.value * distance_km) / 1000
    