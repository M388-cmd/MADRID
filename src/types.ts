export interface ArrivalItem {
  departureTime: string;
  departureTimeSecs?: number;
  transportTypeCode: string;
  lineBound: string;
  isNocturnal: boolean;
  lineNumber: string;
  lineDirection: string;
  lineCode: string;
}

export interface ArrivalsResponse {
  arrivals: ArrivalItem[];
  source: 'live_api' | 'simulated_fallback' | 'simulated_forced';
  fetchedAt: string;
  error?: string;
  translatedStopId?: string;
}
