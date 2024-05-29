import { Card, Stack, Text } from "@mantine/core";
import {
  ForecastListSection,
  IForeCastListSection,
} from "./forecast-list-section";

interface IForecastListProps {
  label: string;
  sections: IForeCastListSection[];
}

export const ForecastList = ({ label, sections }: IForecastListProps) => {
  return (
    <Stack gap={12}>
      <Text fw={700}>{label}</Text>
      <Card shadow="sm" padding="xs" radius="md" withBorder>
        <Stack>
          {sections.map((section) => (
            <ForecastListSection section={section} />
          ))}
        </Stack>
      </Card>
    </Stack>
  );
};
