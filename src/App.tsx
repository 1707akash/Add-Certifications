
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min.js';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

import UploadCertificate from './Pages/UploadCertificate';
import CertificatesList from './Pages/CertificatesList';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<UploadCertificate />} />
        <Route path="/certificates" element={<CertificatesList />} />
      </Routes>
    </Router>
  );
}

export default App;
