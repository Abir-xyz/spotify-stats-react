import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
const UserContext = createContext();

const rootURL = 'https://api.spotify.com/v1/me';
const token = localStorage.getItem('spotify_access_token');

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [playList, setPlayList] = useState('');
  const [following, setFollowing] = useState('');
  const [topArtist, setTopArtist] = useState('');
  const [topTrack, setTopTracks] = useState('');
  const [topArtistYear, setTopArtistYear] = useState('');
  const [topArtistFourWeek, setTopArtistSix] = useState('');
  const [topTrackYear, setTopTrackYear] = useState('');
  const [topTrackFourWeek, setTopTrackSix] = useState('');

  const getUser = async () => {
    try {
      const response = await axios(`${rootURL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data;
      setUser(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getPlayList = async () => {
    let allPlaylists = [];
    let url = `${rootURL}/playlists`;

    try {
      while (url) {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = await response.data;
        allPlaylists = allPlaylists.concat(data.items);
        url = data.next;
      }
      setPlayList(allPlaylists);
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowing = async () => {
    try {
      const response = await axios(`${rootURL}/following?type=artist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data;
      setFollowing(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getTopArtist = async () => {
    try {
      const response = await axios(`${rootURL}/top/artists?limit=50`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const byYear = await axios(
        `${rootURL}/top/artists?limit=50&time_range=long_term`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const byFourWeek = await axios(
        `${rootURL}/top/artists?limit=50&time_range=short_term`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.data;
      const yearData = await byYear.data;
      const FourWeek = await byFourWeek.data;
      setTopArtist(data);
      setTopArtistYear(yearData);
      setTopArtistSix(FourWeek);
    } catch (error) {
      console.log(error);
    }
  };

  const getTopTrack = async () => {
    try {
      const response = await axios(`${rootURL}/top/tracks?limit=50`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const byYear = await axios(
        `${rootURL}/top/tracks?limit=50&time_range=long_term`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const byFourWeek = await axios(
        `${rootURL}/top/tracks?limit=50&time_range=short_term`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = await response.data;
      const yearData = await byYear.data;
      const FourWeek = await byFourWeek.data;
      setTopTracks(data);
      setTopTrackYear(yearData);
      setTopTrackSix(FourWeek);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUser();
    getPlayList();
    getFollowing();
    getTopArtist();
    getTopTrack();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        playList,
        following,
        topArtist,
        topTrack,
        topArtistYear,
        topArtistFourWeek,
        topTrackFourWeek,
        topTrackYear,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(UserContext);
};
