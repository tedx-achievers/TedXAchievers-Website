import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import Volunteers from './pages/Volunteers';
import Timeline from './pages/Timeline';
import Team from './pages/Team';
import Speakers from './pages/Speakers';
import Tickets from './pages/Tickets';
import About from './pages/About';
import Register from './pages/Register';
import ScrollToTop from './components/ScrollToTop';

const App = () => {
  return (
    <BrowserRouter>
      <ScrollToTop />
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="volunteers" element={<Volunteers />} />
          <Route path="timeline" element={<Timeline />} />
          <Route path="team" element={<Team />} />
          <Route path="speakers" element={<Speakers />} />
          <Route path="tickets" element={<Tickets />} />
          <Route path="about" element={<About />} />
          <Route path="register" element={<Register />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;