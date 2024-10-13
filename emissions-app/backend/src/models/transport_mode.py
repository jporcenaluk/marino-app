from dataclasses import dataclass


@dataclass
class TransportMode:
    """
    The mode of transportation
    """
    id: str
    friendly_name: str
    co2_grams_per_km: int


class TransportModes:
    """
    The mode of transportation, and the enumeration is the
    amount of co2 emitted per kilometer
    """

    _transport_modes = [
        TransportMode(id="bike", friendly_name="Bike", co2_grams_per_km=25),
        TransportMode(
            id="car_electric", friendly_name="Car (Electric)", co2_grams_per_km=47
        ),
        TransportMode(
            id="car_petrol_or_diesel",
            friendly_name="Car (Petrol or Diesel)",
            co2_grams_per_km=171,
        ),
        TransportMode(
            id="car_plugin_hybrid",
            friendly_name="Car (Plugin Hybrid)",
            co2_grams_per_km=68,
        ),
        TransportMode(id="motorbike", friendly_name="Motorbike", co2_grams_per_km=114),
        TransportMode(id="train", friendly_name="Train", co2_grams_per_km=35),
        TransportMode(
            id="tram_or_bus", friendly_name="Tram or Bus", co2_grams_per_km=29
        ),
        TransportMode(id="walk", friendly_name="Walk", co2_grams_per_km=22),
    ]

    # Create a dictionary for easy lookup by ID
    transport_mode_dict = {mode.id: mode for mode in _transport_modes}

    @classmethod
    def get_by_id(cls, mode_id: str) -> TransportMode:
        """
        Retrieves a transport mode by its ID

        :param mode_id: The ID of the transport mode
        """
        return cls.transport_mode_dict.get(mode_id)
