from dataclasses import dataclass, field

@dataclass
class TransportMetadata:
    friendly_name: str
    co2_grams_per_km: int

@dataclass
class TransportMode:
    """
    The mode of transportation, and the enumeration is the
    amount of co2 emitted per kilometer
    """
    bike: TransportMetadata = field(default_factory=lambda: TransportMetadata("Bike", 25))
    car_electric: TransportMetadata =  field(default_factory=lambda: TransportMetadata("Car (Electric)", 47))
    car_petrol_or_diesel: TransportMetadata =  field(default_factory=lambda: TransportMetadata("Car (Petrol or Diesel)", 171))
    car_plugin_hybrid: TransportMetadata =  field(default_factory=lambda: TransportMetadata("Car (Plugin Hybrid)", 68))
    motorbike: TransportMetadata =  field(default_factory=lambda: TransportMetadata("Motorbike", 114))
    train: TransportMetadata =  field(default_factory=lambda: TransportMetadata("Train", 35))
    tram_or_bus: TransportMetadata =  field(default_factory=lambda: TransportMetadata("Tram or Bus", 29))
    walk: TransportMetadata =  field(default_factory=lambda: TransportMetadata("Walk", 22))