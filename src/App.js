import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Header from "./layout/header";
import Footer from "./layout/footer";
import SignUp from "./auth/signup";
import PrivateComponent from "./components/privateComponent";

function App() {
  return (
    <div className="main-app h-100">
      <BrowserRouter>
        <div className="d-flex flex-column justify-content-between h-100">
          <div>
            <Header />
          </div>
          <div className="content-wrapper">
            <Routes>
              <Route element={<PrivateComponent />}>
                <Route path="/" element={<h1>Products List</h1>} />
                <Route path="/add" element={<h1>Add Products</h1>} />
                <Route path="/update" element={<h1>Update Products</h1>} />
                <Route path="/logout" element={<h1>Logout Page</h1>} />
                <Route path="/profile" element={<h1>Profile Page</h1>} />
              </Route>
              <Route path="/signup" element={<SignUp />} />
            </Routes>
          </div>
          <div>
            <Footer />
          </div>
        </div>
      </BrowserRouter>
    </div>
  );
}

export default App;
