import { AppShell } from '@mantine/core';
import { Outlet } from 'react-router';
import { Header } from '../Header';
import { Footer } from '../Footer';

export function HomeLayout() {
  return (
    <AppShell header={{ height: { base: 48, sm: 60 } }} padding='md' pb={'xs'}>
      <Header />
      <AppShell.Main>
        <Outlet />
      </AppShell.Main>
      <Footer />
    </AppShell>
  );
}
