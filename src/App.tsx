import { useEffect, useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import Admin from './pages/Admin';
import Home from './pages/Home';
import Pengadaan from './pages/Pengadaan';

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  const preloader = document.getElementById('preloader');

  if (preloader) {
    setTimeout(() => {
      preloader.style.display = 'none';
      setLoading(false);
    }, 2000);
  }

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <p className=" text-center text-danger">Failed to lead app</p>
  ) : (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/admin" element={<Admin />} />
        <Route path="/pengadaan" element={<Pengadaan />} />
      </Routes>
    </>
  );
}

export default App;
