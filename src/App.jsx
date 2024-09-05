import './App.css';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { Dashboard, Login, Error } from './pages';

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='*' element={<Error />} />
        </Routes>
      </BrowserRouter>
    </>
  );
};

export default App;
