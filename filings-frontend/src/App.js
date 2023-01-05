import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Filings } from "./components/Filings/Taxfilings";
import { Compliance } from "./components/Filings/Compliance";
import { PayrollHR} from "./components/Filings/PayrollHR";
import {EnqForm}  from "./components/Forms/EnqForm";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* <Route path="/" element={Home} /> */}
        <Route path="/tax-filing" element={<Filings />} />
        <Route path="/compliance" element={<Compliance />} />
        <Route path="/payroll-hr" element={<PayrollHR />} />
        <Route path="/enq-form" element={<EnqForm />} />
        <Route path="/" element={<Filings />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;

