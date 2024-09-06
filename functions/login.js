require('dotenv').config();

const querystring = require('querystring');

exports.handler = async function (event, context) {
  const client_id = process.env.VITE_SPOTIFY_CLIENT_ID;
  const redirect_uri = process.env.VITE_SPOTIFY_REDIRECT_URI;

  // const scopes = encodeURIComponent('user-read-private user-read-email');
  const scopes = encodeURIComponent(
    'user-read-private user-read-email user-follow-read playlist-read-private'
  );

  const authUrl =
    'https://accounts.spotify.com/authorize?' +
    querystring.stringify({
      response_type: 'code',
      client_id: client_id,
      scope: scopes,
      redirect_uri: redirect_uri,
    });

  return {
    statusCode: 302,
    headers: {
      Location: authUrl,
    },
    body: '',
  };
};
