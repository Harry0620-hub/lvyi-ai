import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/layout/Layout';
import Home from './pages/Home';
import BEndPortal from './pages/BEndPortal';
import Screening from './pages/Screening';
import CEndPortal from './pages/CEndPortal';
import Verify from './pages/Verify';
import Rights from './pages/Rights';
import Database from './pages/Database';
import Admin from './pages/Admin';
import About from './pages/About';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="b-end" element={<BEndPortal />} />
          <Route path="b-end/screening" element={<Screening />} />
          <Route path="c-end" element={<CEndPortal />} />
          <Route path="c-end/verify" element={<Verify />} />
          <Route path="c-end/rights" element={<Rights />} />
          <Route path="database" element={<Database />} />
          <Route path="admin" element={<Admin />} />
          <Route path="about" element={<About />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
