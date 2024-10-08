import { useEffect, useState } from 'react';
import styled from 'styled-components';
import { useDataContext } from '../context/UserData';
import Loading from '../components/Loading';

const TopArtists = () => {
  const { topArtistYear, topArtist, topArtistFourWeek, isLoading } =
    useDataContext();
  const yearly = topArtistYear && topArtistYear.items;

  const [termValue, setTermValue] = useState(yearly);

  const sixMonth = topArtist && topArtist.items;
  const FourWeek = topArtistFourWeek && topArtistFourWeek.items;

  const handleActiveBtn = () => {
    const btns = document.querySelectorAll('.btn');
    btns.forEach((btn) => {
      btn.addEventListener('click', (e) => {
        btns.forEach((b) => b.classList.remove('active'));
        e.target.classList.add('active');
      });
    });
  };

  const handleYearFetch = () => {
    setTermValue(yearly);
  };
  const handleSixMonthFetch = () => {
    setTermValue(sixMonth);
  };
  const handleFourWeekFetch = () => {
    setTermValue(FourWeek);
  };

  useEffect(() => {
    handleActiveBtn();
  }, []);

  if (isLoading) {
    return <Loading />;
  }

  return (
    <Wrapper className='section'>
      <div className='container'>
        <div className='heading'>
          <p>Top Artists</p>
          <div className='btn-wrapper'>
            <button className='btn active' onClick={handleYearFetch}>
              All Time
            </button>
            <button className='btn' onClick={handleSixMonthFetch}>
              Last 6 Months
            </button>
            <button className='btn' onClick={handleFourWeekFetch}>
              Last 4 Weeks
            </button>
          </div>
        </div>
        <div className='content'>
          {termValue ? (
            <div className='content-wrapper'>
              {termValue &&
                termValue.map((item) => {
                  return (
                    <div className='main' key={item.id}>
                      <img
                        src={item.images[2].url}
                        alt='image'
                        className='item-img'
                      />
                      <p className='title'>{item.name}</p>
                    </div>
                  );
                })}
            </div>
          ) : (
            <div className='content-wrapper'>
              {yearly ? (
                yearly.map((item) => {
                  return (
                    <div className='main' key={item.id}>
                      <img
                        src={item.images[0].url}
                        alt='image'
                        className='item-img'
                      />
                      <p className='title'>{item.name}</p>
                    </div>
                  );
                })
              ) : (
                <div className='load'>
                  <p>Loading...</p>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </Wrapper>
  );
};

const Wrapper = styled.section`
  .container {
    max-width: 90vw;
    margin: 0 auto;
    min-height: 100vh;
  }
  .heading {
    text-align: center;
    margin: 3rem 0;
    p {
      font-size: 1.5rem;
      font-weight: 600;
    }
  }
  .btn-wrapper {
    margin-top: 2rem;
    display: flex;
    align-items: center;
    justify-content: space-around;
  }
  .btn {
    font-size: 1rem;
    font-weight: 500;
    background: none;
    border: none;
    outline: none;
    color: #cacaca;
    cursor: pointer;
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    text-decoration: none;
  }
  .active {
    color: var(--darkTxt);
    text-decoration: underline;
  }
  .item-img {
    height: 100px;
    width: 100px;
    border-radius: 50%;
    margin-bottom: 10px;
  }
  .title {
    font-size: 1.1rem;
    text-align: center;
  }
  .main {
    margin: 26px 0;
    display: flex;
    align-items: center;
    flex-direction: column;
  }
  .load {
    height: 60vh;
    width: 90vw;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .content {
    margin-bottom: 5rem;
  }

  @media screen and (max-width: 768px) {
    .content-wrapper {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      align-items: center;
    }
    .main {
      grid-column: span 1;
    }
  }
  @media screen and (max-width: 600px) {
    .content-wrapper {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      align-items: center;
    }
    .main {
      grid-column: span 1;
    }
  }

  @media screen and (min-width: 728px) {
    .content-wrapper {
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      gap: 16px;
      align-items: center;
    }
    .main {
      grid-column: span 1;
    }
  }

  @media screen and (min-width: 1160px) {
    .content-wrapper {
      display: grid;
      grid-template-columns: repeat(3, 1fr);
      gap: 16px;
      align-items: center;
    }
    .main {
      grid-column: span 1;
    }
  }

  @media screen and (min-width: 992px) {
    .container {
      max-width: 40vw;
      margin: 0 auto;
      border: 1px solid #ffffff21;
      padding: 0 16px;
    }
    .load {
      height: 60vh;
      width: 40vw;
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }
`;

export default TopArtists;
