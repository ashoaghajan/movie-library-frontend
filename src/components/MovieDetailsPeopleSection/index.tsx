import { Paper, Stack, Text, Title } from '@mantine/core';

type PersonItem = {
    personId: number;
    person: {
        name: string;
    };
    characterName?: string | null;
};

type Props = {
    title: string;
    people: PersonItem[];
    emptyText: string;
    showCharacterName?: boolean;
};

export const MovieDetailsPeopleSection = ({
    title,
    people,
    emptyText,
    showCharacterName = false,
}: Props) => {
    return (
        <Paper withBorder p="md" radius="md">
            <Title order={3} mb="sm">
                {title}
            </Title>

            <Stack gap="xs">
                {people.length > 0 ? (
                    people.map((item) => (
                        <Text key={item.personId}>
                            <strong>{item.person.name}</strong>
                            {showCharacterName && item.characterName
                                ? ` as ${item.characterName}`
                                : ''}
                        </Text>
                    ))
                ) : (
                    <Text c="dimmed">{emptyText}</Text>
                )}
            </Stack>
        </Paper>
    );
};