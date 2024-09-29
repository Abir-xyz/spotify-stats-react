const axios = require('axios');

exports.handler = async function (event, context) {
  // Check for the refresh token in the query string
  const refresh_token = event.queryStringParameters.refresh_token;

  // Spotify API credentials
  const client_id = process.env.VITE_SPOTIFY_CLIENT_ID;
  const client_secret = process.env.VITE_SPOTIFY_CLIENT_SECRET;

  const authOptions = {
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
      Authorization:
        'Basic ' +
        Buffer.from(client_id + ':' + client_secret).toString('base64'),
    },
    data: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refresh_token,
    }).toString(),
  };

  try {
    // Make the POST request to Spotify API
    const response = await axios(authOptions);

    // Extract the tokens
    const { access_token, refresh_token: new_refresh_token } = response.data;

    // Return the tokens in the response
    return {
      statusCode: 200,
      body: JSON.stringify({
        access_token: access_token,
        refresh_token: new_refresh_token || refresh_token,
      }),
    };
  } catch (error) {
    // Return the error if any
    return {
      statusCode: error.response.status || 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
