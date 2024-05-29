interface ICoord {
  lon: number;
  lat: number;
}

interface IWeather {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface IMain {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
  sea_level: number;
  grnd_level: number;
}

export interface IWind {
  speed: number;
  deg: number;
  gust: number;
}

interface IRain {
  "1h": number;
}

interface IClouds {
  all: number;
}

interface ISys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface IWeatherData {
  coord: ICoord;
  weather: IWeather[];
  base: string;
  main: IMain;
  visibility: number;
  wind: IWind;
  rain: IRain;
  clouds: IClouds;
  dt: number;
  dt_txt: string;
  sys: ISys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}
