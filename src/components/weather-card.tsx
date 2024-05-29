import { IMain, IWind } from "@/interfaces/weather";
import { Card, Group, Image, Text, Stack, rem } from "@mantine/core";
import { IconArrowNarrowUp } from "@tabler/icons-react";

interface IWeatherCardProps {
  date: string;
  icon: string;
  main: IMain;
  wind: IWind;
  visibility: number;
  description: string;
}

export const WeatherCard = ({
  date,
  icon,
  main,
  wind,
  visibility,
  description,
}: IWeatherCardProps) => {
  const data = [
    {
      label: "Humidity",
      value: `${main.humidity} %`,
    },
    {
      label: "Winds",
      value: (
        <Group gap={1}>
          <IconArrowNarrowUp style={{ rotate: `${wind.deg}deg` }} size={20} />
          <Text fw={600}>{wind.speed} m/s</Text>
        </Group>
      ),
    },
    {
      label: "Visibility",
      value: `${visibility} km`,
    },
  ];
  return (
    <Card shadow="sm" padding="lg" radius="md" withBorder>
      <Text size="lg">{date}</Text>
      <Group gap={8} align="center" justify="center">
        <Image src={icon} w={100} h={100} />
        <Stack align="center" gap={2}>
          <Text style={{ fontSize: rem(24) }} fw={600}>
            {`${main.temp} `}&#8451;
          </Text>
          <Text>{description}</Text>
        </Stack>
      </Group>
      <Group align="center" justify="center">
        {data.map((item) => (
          <Stack key={item.label} align="center" gap={3}>
            <Text size="sm" fw={500} opacity={0.4}>
              {item.label}
            </Text>
            <Text fw={600}>{item.value}</Text>
          </Stack>
        ))}
      </Group>
    </Card>
  );
};
