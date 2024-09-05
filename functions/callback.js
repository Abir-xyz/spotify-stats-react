const axios = require('axios');
const { Buffer } = require('buffer');

exports.handler = async (event) => {
  const { code } = JSON.parse(event.body);
  const client_id = process.env.VITE_SPOTIFY_CLIENT_ID;
  const client_secret = process.env.VITE_SPOTIFY_CLIENT_SECRET;
  const redirect_uri = process.env.VITE_SPOTIFY_REDIRECT_URI;

  try {
    const response = await axios.post(
      'https://accounts.spotify.com/api/token',
      new URLSearchParams({
        grant_type: 'authorization_code',
        code,
        redirect_uri,
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

    const { access_token, refresh_token, expires_in } = response.data;

    // Respond with the access token and refresh token
    return {
      statusCode: 200,
      body: JSON.stringify({
        access_token,
        refresh_token,
        expires_in,
      }),
    };
  } catch (error) {
    console.error(
      'Error exchanging code for token:',
      error.response?.data || error.message
    );
    return {
      statusCode: error.response?.status || 500,
      body: JSON.stringify({
        error: error.message,
      }),
    };
  }
};
