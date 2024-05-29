import { ForecastList } from "@/components/forecast-list";
import { IForecastListSectionItemProps } from "@/components/forecast-list-section-item";
import { WeatherCard } from "@/components/weather-card";
import { IWeatherData } from "@/interfaces/weather";
import { formatDate } from "@/utils/format-date";
import { getWeatherIconSrc } from "@/utils/get-weather-icon-src";

interface IHomeProps {
  forecast: {
    label: string;
    data: IForecastListSectionItemProps[];
  }[];
  currentWeather: IWeatherData;
}

export const Home = ({ forecast, currentWeather }: IHomeProps) => {
  return (
    <>
      <WeatherCard
        date={`${formatDate(Date.now())}`}
        main={currentWeather.main}
        wind={currentWeather.wind}
        visibility={currentWeather.visibility / 1000}
        description={currentWeather.weather[0].description}
        icon={getWeatherIconSrc(currentWeather.weather[0].icon)}
      />
      <ForecastList label="5-day Forecast (3 Hours)" sections={forecast} />
    </>
  );
};
