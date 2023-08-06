import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import Home from "./pages/Home";
import Cards from "./components/Cards";
import ItemDetails from "./components/ItemDetails";
import { CookiesProvider } from "react-cookie";
import Verification from "./components/Verification";
import Auth from "./middleware/Auth";

function App() {
  return (
    <>
      <div className="App">
        <CookiesProvider>
          <BrowserRouter>
            <Routes>
              <Route path="/" element={<Home />}></Route>
              <Route path="/Login" element={<Login />}></Route>
              <Route path="/Signup" element={<SignUp />}></Route>
              <Route path="/Card" element={<Cards />}></Route>
              <Route path="/items/:itemId" element={<ItemDetails />}></Route>
              <Route path="/verification" element={<Verification />}></Route>
              <Route path="/auth/:token" element={<Auth />}></Route>
            </Routes>
          </BrowserRouter>
        </CookiesProvider>
      </div>
    </>
  );
}

export default App;
