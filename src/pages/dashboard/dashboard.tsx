import { Box, Stack, Tab, Tabs } from '@mui/material';
import { useMemo } from 'react';
import { Outlet, useNavigate, useParams } from 'react-router-dom';

const tabs = ['profiles', 'profiles/:id'];

function Dashboard() {
  const params = useParams();
  const navigate = useNavigate();

  const activeTab = useMemo(() => {
    if (Object.keys(params).length !== 0) {
      return tabs[1];
    }
    return tabs[0];
  }, [params]);

  const handleChangeTab = (
    _e: React.SyntheticEvent<Element, Event>,
    value: string,
  ) => {
    if (value === tabs[0]) {
      navigate(value);
    }
  };

  return (
    <Stack sx={{ width: '100vw', height: '100vh' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs
          value={activeTab}
          onChange={handleChangeTab}
          sx={{ width: '100%' }}
        >
          <Tab label="Profiles" value={tabs[0]} />
          <Tab
            label="Profile summary"
            value={tabs[1]}
            disabled={!(activeTab !== tabs[0])}
          />
        </Tabs>
      </Box>
      <Stack>
        <Outlet />
      </Stack>
    </Stack>
  );
}

export default Dashboard;
