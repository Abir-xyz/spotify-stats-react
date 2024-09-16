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
        <div className='wrapper'>
          <Navbar />
          <UserInfo />
          <TopArtist />
          <TopSongs />
        </div>
      )}
    </Wrapper>
  );
};

const Wrapper = styled.section`
  @media screen and (min-width: 992px) {
    max-width: 40vw;
    margin: 0 auto;
    border: 1px solid #ffffff21;
    padding: 0 16px;
  }
`;

export default Home;
