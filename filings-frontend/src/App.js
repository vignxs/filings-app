import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Filings } from "./components/Filings/Filings";

function App() {
  return <BrowserRouter>
    <Routes>
      {/* <Route path="/" element={Home} /> */}
      <Route path="/tax-filing" element={ <Filings />} />
      <Route path="/" element={<Filings />} />

    </Routes>
  </BrowserRouter>;
}

export default App;

