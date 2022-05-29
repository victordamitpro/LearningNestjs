import { Container } from '@material-ui/core';
import { FC } from 'react';
import { Outlet } from 'react-router-dom';
import Header from '../components/Shared/Header';

const DefaultLayout: FC = () => {
  return (
    <div>
      <Header></Header>
      <Container
        fixed
        style={{
          backgroundColor: '#cfe8fc',
          height: '100vh',
          paddingTop: '122px',
        }}
      >
        <Outlet />
      </Container>
    </div>
  );
};

export default DefaultLayout;
