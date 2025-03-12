interface Geocoding {
  name: string;
  local_name?: Record<string, string>;
  lat: number;
  lon: number;
  country: string;
  state?: string;
}

export default Geocoding;
