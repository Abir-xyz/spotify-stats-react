import { useDataContext } from '../context/UserData';
import styled from 'styled-components';
import { Navbar, UserInfo, TopArtist, TopSongs, Loading } from '../components';

const Home = () => {
  const { isLoading } = useDataContext();

  return (
    <Wrapper className='section'>
      {isLoading ? (
        <Loading />
      ) : (
        <div>
          <Navbar />
          <UserInfo />
          <TopArtist />
          <TopSongs />
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section``;

export default Home;
