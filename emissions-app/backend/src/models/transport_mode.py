from dataclasses import dataclass, field

@dataclass
class TransportMetadata:
    id: str
    friendly_name: str
    co2_grams_per_km: int

@dataclass
class TransportMode:
    """
    The mode of transportation, and the enumeration is the
    amount of co2 emitted per kilometer
    """
    _transport_modes = [
        TransportMetadata(id="bike", friendly_name="Bike", co2_grams_per_km=25),
        TransportMetadata(id="car_electric", friendly_name="Car (Electric)", co2_grams_per_km=47),
        TransportMetadata(id="car_petrol_or_diesel", friendly_name="Car (Petrol or Diesel)", co2_grams_per_km=171),
        TransportMetadata(id="car_plugin_hybrid", friendly_name="Car (Plugin Hybrid)", co2_grams_per_km=68),
        TransportMetadata(id="motorbike", friendly_name="Motorbike", co2_grams_per_km=114),
        TransportMetadata(id="train", friendly_name="Train", co2_grams_per_km=35),
        TransportMetadata(id="tram_or_bus", friendly_name="Tram or Bus", co2_grams_per_km=29),
        TransportMetadata(id="walk", friendly_name="Walk", co2_grams_per_km=22),
    ]
    
    # Create a dictionary for easy lookup by ID
    transport_mode_dict = {mode.id: mode for mode in _transport_modes}

    @classmethod
    def get_by_id(cls, mode_id: str) -> TransportMetadata:
        return cls.transport_mode_dict.get(mode_id)
