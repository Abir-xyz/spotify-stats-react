import React, { createContext, useContext, useEffect, useState } from 'react';
import axios from 'axios';

const LoginContext = createContext();

export const LoginProvider = ({ children }) => {
  const accessToken = localStorage.getItem('spotify_access_token');

  // exchange authorization code with token
  const exchangeCodeForToken = async (code) => {
    try {
      const response = await axios.post('/.netlify/functions/callback', {
        code,
      });
      const { access_token, refresh_token, expires_in } = response.data;
      // Store the tokens and expiration time
      localStorage.setItem('spotify_access_token', access_token);
      localStorage.setItem('spotify_refresh_token', refresh_token);
      localStorage.setItem(
        'access_token_expiry',
        Date.now() + expires_in * 1000
      );
      return access_token;
    } catch (error) {
      console.error('Error exchanging code for token:', error);
      throw error;
    }
  };

  // extract the authorization code from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const code = urlParams.get('code');

  if (code) {
    exchangeCodeForToken(code)
      .then((accessToken) => {
        console.log('Access token obtained:', accessToken);
        // Redirect or update UI as necessary
      })
      .catch((error) => {
        console.error('Failed to exchange code for token:', error);
      });
  }

  // const refreshAccessToken = async (refreshToken) => {
  //   try {
  //     const response = await axios.post('/.netlify/functions/refresh-token', {
  //       refreshToken,
  //     });
  //     const { access_token, expires_in } = response.data;
  //     // Store the new access token and expiration time
  //     localStorage.setItem('spotify_access_token', access_token);
  //     localStorage.setItem(
  //       'access_token_expiry',
  //       Date.now() + expires_in * 1000
  //     );
  //     return access_token;
  //   } catch (error) {
  //     console.error('Error refreshing access token:', error);
  //     throw error;
  //   }
  // };

  // const checkTokenAndRefresh = async () => {
  //   const accessToken = localStorage.getItem('spotify_access_token');
  //   const refreshToken = localStorage.getItem('spotify_refresh_token');
  //   const expiresAt = localStorage.getItem('access_token_expiry');

  //   const bufferTime = 5 * 60 * 1000; // 5 minutes buffer

  //   if (Date.now() > expiresAt - bufferTime) {
  //     try {
  //       const newAccessToken = await refreshAccessToken(refreshToken);
  //       console.log('Access token refreshed:', newAccessToken);
  //       // Use the new access token for API requests
  //     } catch (error) {
  //       console.error('Failed to refresh access token:', error);
  //       // Optionally, log the user out or show an error message
  //     }
  //   } else {
  //     // Proceed with the existing access token
  //   }
  // };

  // useEffect(() => {
  //   let isMounted = true;
  //   const performCheck = async () => {
  //     if (isMounted) {
  //       await checkTokenAndRefresh();
  //     }
  //   };
  //   performCheck();
  //   return () => {
  //     isMounted = false;
  //   };
  // }, []);

  return (
    <LoginContext.Provider
      value={{
        accessToken,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  return useContext(LoginContext);
};
