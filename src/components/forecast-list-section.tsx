import { Stack, Text } from "@mantine/core";
import { ForecastListSectionItem, IForecastListSectionItemProps } from "./forecast-list-section-item";

export interface IForeCastListSection {
  label: string;
  data: IForecastListSectionItemProps[];
}

interface IForecastListSectionProps {
  section: IForeCastListSection;
}

export const ForecastListSection = ({ section }: IForecastListSectionProps) => {
  return (
    <Stack>
      <Text fw={600} opacity={0.4}>{section.label}</Text>
      <Stack>
        {section.data.map((item, index) => (
          <ForecastListSectionItem key={index} {...item} />
        ))}
      </Stack>
    </Stack>
  );
};
