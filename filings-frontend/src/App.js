import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Filings } from "./components/Filings/Taxfilings";
import { Compliance } from "./components/Filings/Compliance";
import { PayrollHR} from "./components/Filings/PayrollHR";
import {EnqForm}  from "./components/Forms/EnqForm";
import { EnqAdmin } from "./components/Admin/Admin";
import HeaderBar from "./components/Sidebar/headerBar";

function App() {
  return (
    <BrowserRouter>
      <HeaderBar>
        <Routes>
          {/* <Route path="/" element={Home} /> */}
          <Route path="/tax-filing" element={<Filings />} />
          <Route path="/compliance" element={<Compliance />} />
          <Route path="/payroll-hr" element={<PayrollHR />} />
          <Route path="/enq-form" element={<EnqForm />} />
          <Route path="/enq-admin" element={<EnqAdmin />} />
          <Route path="/enq-admin" element={<EnqAdmin />} />

          <Route path="/" element={<Filings />} />
        </Routes>
      </HeaderBar>
    </BrowserRouter>
  );
}

export default App;

