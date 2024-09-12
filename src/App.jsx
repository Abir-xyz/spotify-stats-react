import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
  Dashboard,
  Login,
  Error,
  TopArtists,
  TopTracks,
  Playlist,
  Recents,
  PlaylistTracks,
} from './pages';

import { Footer } from './components';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='top-artists' element={<TopArtists />} />
          <Route path='top-tracks' element={<TopTracks />} />
          <Route path='playlists' element={<Playlist />} />
          <Route path='recent' element={<Recents />} />
          <Route path='playlist-tracks' element={<PlaylistTracks />} />
          <Route path='*' element={<Error />} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
};

export default App;
