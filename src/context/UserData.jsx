import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
const UserContext = createContext();

const rootURL = 'https://api.spotify.com/v1/me';
const token = localStorage.getItem('spotify_access_token');

export const UserProvider = ({ children }) => {
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState('');
  const [playList, setPlayList] = useState('');
  const [following, setFollowing] = useState('');
  const [topArtist, setTopArtist] = useState('');
  const [topTrack, setTopTracks] = useState('');
  const [topArtistYear, setTopArtistYear] = useState('');
  const [topArtistFourWeek, setTopArtistSix] = useState('');
  const [topTrackYear, setTopTrackYear] = useState('');
  const [topTrackFourWeek, setTopTrackSix] = useState('');
  const [recentTracks, setRecentTracks] = useState('');
  // const [playlistID, setPlaylistId] = useState('');
  const [playlistID, setPlaylistId] = useState(() => {
    const savedId = localStorage.getItem('playlistId');
    return savedId ? savedId : null;
  });
  const [playlistTracks, setPlaylistTracks] = useState('');
  const [currentAlbum, setCurrentAlbum] = useState('');

  const getUser = async () => {
    setIsLoading(true);
    try {
      const response = await axios(`${rootURL}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setUser(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getPlayList = async () => {
    setIsLoading(true);
    let allPlaylists = [];
    let url = `${rootURL}/playlists`;

    try {
      while (url) {
        const response = await axios.get(url, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        allPlaylists = allPlaylists.concat(data.items);
        url = data.next;
      }
      setPlayList(allPlaylists);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowing = async () => {
    setIsLoading(true);
    try {
      const response = await axios(`${rootURL}/following?type=artist`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = response.data;
      setFollowing(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getTopArtist = async () => {
    setIsLoading(true);
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
      const data = response.data;
      const yearData = byYear.data;
      const FourWeek = byFourWeek.data;
      setTopArtist(data);
      setTopArtistYear(yearData);
      setTopArtistSix(FourWeek);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getTopTrack = async () => {
    setIsLoading(true);
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
      const data = response.data;
      const yearData = byYear.data;
      const FourWeek = byFourWeek.data;
      setTopTracks(data);
      setTopTrackYear(yearData);
      setTopTrackSix(FourWeek);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getRecentTracks = async () => {
    setIsLoading(true);
    try {
      const response = await axios(
        `${rootURL}/player/recently-played?limit=50`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      setRecentTracks(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getPlaylistTracks = async () => {
    setIsLoading(true);
    let playlistTracks = [];
    let playlistUrl = `https://api.spotify.com/v1/playlists/${playlistID}/tracks?offset=0&limit=50`;

    try {
      while (playlistUrl) {
        const response = await axios(playlistUrl, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        const data = response.data;
        playlistTracks = playlistTracks.concat(data.items);
        playlistUrl = data.next;
      }
      setPlaylistTracks(playlistTracks);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  const getCurrentAlbum = async () => {
    setIsLoading(true);
    try {
      const response = await axios(
        `https://api.spotify.com/v1/playlists/${playlistID}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      const data = response.data;
      setCurrentAlbum(data);
      setIsLoading(false);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (playlistID) {
      getPlaylistTracks();
      getCurrentAlbum();
    }
  }, [playlistID]);

  useEffect(() => {
    getUser();
    getPlayList();
    getFollowing();
    getTopArtist();
    getTopTrack();
    getRecentTracks();
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
        recentTracks,
        isLoading,
        setIsLoading,
        playlistID,
        setPlaylistId,
        playlistTracks,
        currentAlbum,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(UserContext);
};
