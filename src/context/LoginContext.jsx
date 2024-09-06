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

  // logout
  const handleLogout = () => {
    localStorage.removeItem('spotify_access_token');
    localStorage.removeItem('access_token_expiry');
    localStorage.removeItem('spotify_refresh_token');
    window.location.href = '/';
  };

  return (
    <LoginContext.Provider
      value={{
        accessToken,
        handleLogout,
      }}
    >
      {children}
    </LoginContext.Provider>
  );
};

export const useLoginContext = () => {
  return useContext(LoginContext);
};
