export function generateParams<T> (item: T): T {
  return {
    ...item,
    appid: import.meta.env.VITE_OPEN_WEATHER_API_KEY
  }
}