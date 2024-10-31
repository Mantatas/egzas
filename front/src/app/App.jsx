import "bootstrap/dist/css/bootstrap.min.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import UnregisteredRoutes from "../routes/UnregisteredRoutes";
import RegisteredRoutes from "../routes/RegisteredRoutes";
import AdminRoutes from "../routes/AdminRoutes";
import Header from "../header/Header";
import Register from "../user/register/Register";
import Login from "../user/login/Login";
import Main from "../main/Main";
import AddListing from "../listingManagement/addListing/AddListing";
import AdminDash from "../adminDash/AdminDash";

function App() {
  return (
    <>
      <Router>
        <div>
          <Header />
          <div>
            <Routes>
              <Route element={<UnregisteredRoutes />}>
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
              </Route>
              <Route element={<RegisteredRoutes />}>
                <Route path="/" element={<Main />} />
                <Route path="/addlisting" element={<AddListing />} />
              </Route>
              <Route element={<AdminRoutes />}></Route>
              <Route path="/admin" element={<AdminDash />} />
            </Routes>
          </div>
        </div>
      </Router>
    </>
  );
}

export default App;
