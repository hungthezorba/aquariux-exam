import { Flex, Group, Image, Text } from "@mantine/core";

export interface IForecastListSectionItemProps {
  time: string
  temp_min: number
  temp_max: number
  icon: string
  description: string
}

export const ForecastListSectionItem = ({ time, temp_max, temp_min, icon, description } : IForecastListSectionItemProps) => {
  
  return (
    <Group align="center">
      <Text flex={1} size="sm">{time}</Text>
      <Group flex={3}>
        <Image w={40} h={40} src={icon} />
        <Text size="sm">{`${temp_min}/${temp_max}`}&#8451;</Text>
      </Group>
      <Flex flex={1} justify={'flex-end'}>
        <Text fw={600} size="sm">{description}</Text>
      </Flex>
    </Group>
  )  
}