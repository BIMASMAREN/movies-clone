import "./style.css";
import Nav from "./Pages/Nav/Nav";
import Home from "./Pages/Home/Home";
import Favorite from "./Pages/Favorite/Favorite";
import Search from "./Pages/Search/Search";
import Details from "./Pages/Details/Details";
import Login from "./Pages/Login/Login";
import SignUp from "./Pages/Login/SignUp";
import Profile from "./Pages/profile/Profile";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

function App() {
  const [Logged, setLogged] = useState(false);
  const user = useSelector((state) => state.user);

  useEffect(() => {
    const LoginState = localStorage.getItem("Login");
    if (LoginState == "true") {
      setLogged(true);
    } else {
      setLogged(false);
    }
  }, [localStorage["Login"], user.LoggedIn]);
  return (
    <div className="App">
      <Router>
        {user.Profile_ && <Profile />}
        {Logged || user.LoggedIn ? (
          <>
            <Nav />
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/Top" element={<Home />} />
              <Route path="/Popular" element={<Home />} />
              <Route path="/Profile" element={<Profile />} />
              <Route path="/Favorite" element={<Favorite />} />
              <Route path="/Search" element={<Search />} />
              <Route path="/Details/:Id" element={<Details />} />
            </Routes>
          </>
        ) : (
          <>
            <Routes>
              <Route path="/" element={<Login />} />
              <Route path="/SignUp" element={<SignUp />} />
            </Routes>
          </>
        )}
      </Router>
    </div>
  );
}

export default App;
