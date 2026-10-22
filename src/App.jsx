import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Layout from './components/Layout';
import Home from './pages/Home';
import ServiceDetail from './pages/ServiceDetail';
import VideoGallery from './pages/VideoGallery';
import ServiceVideoDetail from './pages/ServiceVideoDetail';

const App = () => (
  <BrowserRouter>
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Home />} />
        <Route path="services/:service" element={<ServiceDetail />} />
        <Route path="videos" element={<VideoGallery />} />
        <Route path="services/:category/:service" element={<ServiceVideoDetail />} />
      </Route>
    </Routes>
  </BrowserRouter>
);

export default App;