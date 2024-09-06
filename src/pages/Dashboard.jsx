import styled from 'styled-components';
import { useEffect, useState } from 'react';
import Login from './Login';
import { Navbar, UserInfo, TopArtist } from '../components';

const accessToken = localStorage.getItem('spotify_access_token');

const Dashboard = () => {
  const [isToken, setIsToken] = useState('');

  useEffect(() => {
    setIsToken(accessToken);
  });

  return (
    <Wrapper className='section'>
      {isToken ? (
        <div>
          <Navbar />
          <UserInfo />
          <TopArtist />
        </div>
      ) : (
        <div>
          <Login />
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section``;

export default Dashboard;
