const axios = require('axios');
const { Buffer } = require('buffer');

exports.handler = async (event) => {
  const { refreshToken } = JSON.parse(event.body);
  const client_id = process.env.VITE_SPOTIFY_CLIENT_ID;
  const client_secret = process.env.VITE_SPOTIFY_CLIENT_SECRET;

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: refreshToken,
      }),
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
          Authorization:
            'Basic ' +
            Buffer.from(`${client_id}:${client_secret}`).toString('base64'),
        },
      }
    );

    const { access_token, expires_in } = response.data;

    return {
      statusCode: 200,
      body: JSON.stringify({
        access_token,
        expires_in,
      }),
    };
  } catch (error) {
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
