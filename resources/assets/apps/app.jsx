const { render } = wp.element;

import '@mantine/core/styles.css';
import '@mantine/notifications/styles.css';
import 'mantine-datatable/styles.css';

import { MantineProvider } from '@mantine/core';
import { Notifications } from '@mantine/notifications';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Demo } from './components/Demo';

const MyApp = () => {
  const pathname = window.location.pathname;
  const baseName = pathname.substring(0, pathname.indexOf('/admin.php'));

  return (
    <MantineProvider>
      <Notifications />
      <BrowserRouter basename={baseName}>
        <Routes>
          <Route path="/admin.php" element={<Demo />} />
        </Routes>
      </BrowserRouter>
    </MantineProvider>
  );
};

render(<MyApp />, document.getElementById('react-app'));
