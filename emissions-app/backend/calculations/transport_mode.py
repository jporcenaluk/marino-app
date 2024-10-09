from dataclasses import dataclass
from enum import Enum


class TransportMode(Enum):
    """
    The mode of transportation, and the enumeration is the
    amount of co2 emitted per kilometer
    """
    bike=25
    car_electric=47
    car_petrol_or_diesel=171
    car_plugin_hybrid=68
    motorbike=114
    train=35
    tram_or_bus=29
    walk=22