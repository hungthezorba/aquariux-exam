import {
  Flex,
  Input,
  Loader,
  Skeleton,
  Stack,
  Text,
} from "@mantine/core";
import "./App.css";
import { useEffect, useMemo, useState } from "react";
import { useGetCurrentInfo } from "./hooks/use-get-current-info";
import { useGetCurrentWeather } from "./hooks/use-get-current-weather";
import { getWeatherIconSrc } from "./utils/get-weather-icon-src";
import { useGetCurrentForecast } from "./hooks/use-get-current-forecast";
import { IForecastListSectionItemProps } from "./components/forecast-list-section-item";
import { formatDate } from "./utils/format-date";
import { formatTime } from "./utils/format-time";
import { Home } from "./views/home";
import { useGetCoordinatesByName } from "./hooks/use-get-coordinates-by-name";
import { IHistory, SearchHistory } from "./views/search-history";

function App() {
  const [selectedLocation, setSelectedLocation] = useState({
    lat: "",
    lon: "",
    country: "",
    city: "",
  });
  const [isSearching, setIsSearching] = useState(false);
  const [searchText, setSearchText] = useState("");
  const [history, setHistory] = useState<IHistory[]>([]);

  const getCurrentInfoQuery = useGetCurrentInfo({
    staleTime: Infinity,
  });

  const getCurrentWeatherQuery = useGetCurrentWeather(
    {
      lat: selectedLocation.lat,
      lon: selectedLocation.lon,
      units: "metric",
    },
    { enabled: !!(selectedLocation.lat && selectedLocation.lon) },
  );

  const getCurrentForecastQuery = useGetCurrentForecast(
    {
      lat: selectedLocation.lat,
      lon: selectedLocation.lon,
      units: "metric",
    },
    { enabled: !!(selectedLocation.lat && selectedLocation.lon) },
  );

  const getCoordinatesByNameQuery = useGetCoordinatesByName(
    {
      q: searchText,
    },
    {
      enabled: false,
    },
  );

  useEffect(() => {
    try {
      const localStorageHistory = localStorage.getItem("history");
      if (localStorageHistory) {
        setHistory(JSON.parse(localStorageHistory));
      } else {
        setHistory([]);
      }
    } catch (error) {
      console.error(error);
    }
  }, []);

  useEffect(() => {
    if (!getCurrentInfoQuery.data) return;
    const { country, city, loc } = getCurrentInfoQuery.data;
    const [lat, lon] = loc.split(",");
    setSelectedLocation({
      lat,
      lon,
      country,
      city,
    });
  }, [getCurrentInfoQuery.data]);

  const currentWeather = useMemo(() => {
    return getCurrentWeatherQuery.data;
  }, [getCurrentWeatherQuery.data]);

  const forecast = useMemo(() => {
    const sections: Record<string, IForecastListSectionItemProps[]> = {};
    if (!currentWeather) return [];
    getCurrentForecastQuery.data?.list.forEach((item) => {
      const today = new Date().setHours(0, 0, 0, 0);
      const timestamp = item.dt * 1000 + currentWeather.timezone;
      const itemDate = new Date(timestamp);

      let key = "";

      if (today === itemDate.setHours(0, 0, 0, 0)) {
        key = "Today";
      } else {
        key = formatDate(timestamp);
      }
      if (!sections[key]) {
        sections[key] = [];
      }
      sections[key].push({
        time: formatTime(timestamp),
        temp_max: item.main.temp_max,
        temp_min: item.main.temp_min,
        description: item.weather[0].description,
        icon: getWeatherIconSrc(item.weather[0].icon),
      });
    });

    return Object.keys(sections).map((key) => ({
      label: key,
      data: sections[key],
    }));
  }, [getCurrentForecastQuery.data, currentWeather?.timezone]);

  const isMatchCountry = useMemo(
    () =>
      isSearching &&
      getCoordinatesByNameQuery.isSuccess &&
      getCoordinatesByNameQuery.data.length === 0,
    [
      isSearching,
      getCoordinatesByNameQuery.isSuccess,
      getCoordinatesByNameQuery.data?.length,
    ],
  );

  const openSearch = () => {
    setIsSearching(true);
  };

  const closeSearch = () => {
    setIsSearching(false);
  };

  const handleSearchInput = (event: React.FormEvent<HTMLInputElement>) => {
    const target = event.target as HTMLInputElement;
    setSearchText(target.value);
    if (target.value === "") {
      closeSearch();
    } else {
      openSearch();
    }
  };

  const updateHistory = (items: IHistory[]) => {
    setHistory(items);
    localStorage.setItem("history", JSON.stringify(items));
  };

  const updateSearch = (result: {
    lat: string;
    lon: string;
    city: string;
    country: string;
  }) => {
    setSelectedLocation(result);
    setIsSearching(false);
  };

  const handleSearch = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key !== "Enter") return;
    getCoordinatesByNameQuery.refetch().then((res) => {
      if (!res.data?.length) return;
      const { lat, lon, name, country } = res.data[0];
      const result = {
        lat: lat.toString(),
        lon: lon.toString(),
        city: name,
        country,
      };
      updateHistory([...history, { ...result, id: Date.now() }]);
      updateSearch(result);
    });
  };

  const handleDeleteHistory = (id: number) => {
    const filtered = history.filter((item) => item.id !== id);
    updateHistory(filtered);
  };

  const handleSelectHistory = (id: number) => {
    const found = history.find((item) => item.id === id);
    if (!found) return;
    const { lat, lon, city, country } = found;
    updateSearch({ lat, lon, city, country });
  };

  return (
    <Stack gap={4}>
      {selectedLocation.city ? (
        <Text>{`${selectedLocation.city}, ${selectedLocation.country}`}</Text>
      ) : (
        <Skeleton h={24}></Skeleton>
      )}
      <Stack gap={16}>
        <Stack gap={8}>
          <Input
            flex={1}
            placeholder="Search location..."
            onInput={handleSearchInput}
            onKeyDown={handleSearch}
          />
          {isMatchCountry && (
            <Text size="sm" c="red">
              No matching country or city
            </Text>
          )}
        </Stack>
        {isSearching ? (
          <>
            <SearchHistory
              history={history}
              label="Search History"
              onDeleteHistory={handleDeleteHistory}
              onSelectHistory={handleSelectHistory}
            />
          </>
        ) : (
          <>
            {currentWeather && forecast ? (
              <Home currentWeather={currentWeather} forecast={forecast} />
            ) : (
              <Flex justify="center" align="center">
                <Loader />
              </Flex>
            )}
          </>
        )}
      </Stack>
    </Stack>
  );
}

export default App;
