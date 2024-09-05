import { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';
const UserContext = createContext();

const rootURL = 'https://api.spotify.com/v1/me';
const token = localStorage.getItem('spotify_access_token');

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState('');
  const [playList, setPlayList] = useState('');
  const [following, setFollowing] = useState('');

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
    try {
      const response = await axios(`${rootURL}/playlists`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await response.data;
      setPlayList(data);
    } catch (error) {
      console.log(error);
    }
  };

  const getFollowing = async () => {
    try {
      const response = await axios(`${rootURL}/following`, {
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

  useEffect(() => {
    getUser();
    getPlayList();
    setFollowing();
  }, []);

  return (
    <UserContext.Provider
      value={{
        user,
        playList,
      }}
    >
      {children}
    </UserContext.Provider>
  );
};

export const useDataContext = () => {
  return useContext(UserContext);
};
