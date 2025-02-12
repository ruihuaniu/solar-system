export interface Moon {
  name: string;
  size: number;
  distance: number;
  texture: string;
}

interface MultilingualContent {
  en: string;
  zh: string;
}

interface MultilingualArray {
  en: string[];
  zh: string[];
}

export interface Planet {
  name: string;
  size: number;
  distanceFromSun: number;
  distanceFromSunKm: string;
  orbitalPeriod: number;
  diameter: number;
  averageTemp: number;
  rotationSpeed: number;
  orbitSpeed: number;
  texture: string;
  description: MultilingualContent;
  funFacts: MultilingualArray;
  moons?: Moon[];
}