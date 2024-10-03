import { Box, Center, Paper, Stack, Tabs } from '@mantine/core';
import { showNotification } from '@mantine/notifications';
import { DataTable } from 'mantine-datatable';
import { useAjax } from './use-ajax';

import classes from './Demo.module.scss';

export const Demo = () => {
  return (
    <Center w={'100%'} h={'80dvh'}>
      <Paper p={'md'} radius={'lg'} shadow="md" withBorder w={'50%'}>
        <Stack>
          <div className={classes.title}>Your Header (without Router)</div>

          <Tabs
            orientation="vertical"
            variant="outline"
            defaultValue="first-tab">
            <Tabs.List>
              <Tabs.Tab value="first-tab">First Tab</Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="first-tab" px="md">
              <GettingStartedExample />
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Paper>
    </Center>
  );
};

export function GettingStartedExample() {
  const { data, error, isLoading } = useAjax();

  console.log('!!!!', { data, error, isLoading });

  return (
    <DataTable
      fetching={isLoading}
      height={300}
      withTableBorder
      borderRadius="md"
      withColumnBorders
      striped
      highlightOnHover
      // provide data
      records={data}
      // define columns
      columns={[
        {
          accessor: 'id',
          // this column has a custom title
          title: '#',
          // right-align column
          textAlign: 'right',
        },
        { accessor: 'name' },
        {
          accessor: 'party',
          // this column has custom cell data rendering
          render: ({ party }) => (
            <Box fw={700} c={party === 'Democratic' ? 'blue' : 'red'}>
              {party.slice(0, 3).toUpperCase()}
            </Box>
          ),
        },
        { accessor: 'bornIn' },
      ]}
      // execute this callback when a row is clicked
      onRowClick={({ record: { name, party, bornIn } }) =>
        showNotification({
          title: `Clicked on ${name}`,
          message: `You clicked on ${name}, a ${party.toLowerCase()} president born in ${bornIn}`,
          withBorder: true,
        })
      }
    />
  );
}
