import { ActionIcon, Card, Group, Stack, Text } from "@mantine/core";
import { IconSearch, IconTrash } from "@tabler/icons-react";

export interface IHistory {
  country: string;
  city: string;
  id: number;
  lat: string;
  lon: string;
}

interface ISearchHistoryProps {
  history: IHistory[];
  onDeleteHistory: (id: number) => void;
  onSelectHistory: (id: number) => void;
  label: string;
}

export const SearchHistory = ({
  history,
  onDeleteHistory,
  onSelectHistory,
  label,
}: ISearchHistoryProps) => {
  return (
    <Stack>
      <Text fw={700}>{label}</Text>
      <Card shadow="sm" padding="xs" radius="md" withBorder>
        {history.length ? (
          <Stack gap={16}>
            {history.map((item) => (
              <Group justify="space-between" px={8}>
                <Text>
                  {`${item.city}, ${item.country}`}
                </Text>
                <Group>
                  <ActionIcon
                    variant="outline"
                    aria-label="Settings"
                    onClick={() => onSelectHistory(item.id)}
                  >
                    <IconSearch />
                  </ActionIcon>
                  <ActionIcon
                    variant="outline"
                    aria-label="Settings"
                    onClick={() => onDeleteHistory(item.id)}
                  >
                    <IconTrash />
                  </ActionIcon>
                </Group>
              </Group>
            ))}
          </Stack>
        ) : (
          <Stack align="center" justify="center" p={16}>
            <Text opacity={0.8}>
              No content available
            </Text>
          </Stack>
        )}
      </Card>
    </Stack>
  );
};
