import { useDispatch } from "react-redux";
import "./style/style.css";
import { useNavigate, NavLink } from "react-router-dom";
import { setLoading } from "../../state/user";
import { useState } from "react";

export default function Nav() {
  const navigate = useNavigate();
  const [visible, setVisible] = useState(false);
  const dispatch = useDispatch();

  const Navigator = (direction) => {
    setVisible(!visible);
    navigate(direction);
  };

  const showProfile = () => {
    dispatch(setLoading({ boolean: true }));
  };

  return (
    <div className="nav">
      <NavLink
        to="/List/Home"
        className="logo"
        onClick={() => setVisible(false)}
      >
        Web<span>Flex</span>
      </NavLink>
      <nav>
        <ul>
          <li>
            <NavLink to="/" className="icon" activeclassname="active">
              <i className="fa-solid fa-house hide"></i>
              <span>Home</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/Top" className="icon" activeclassname="active">
              <i className="fa-solid fa-bolt hide"></i>
              <span>Top</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/Popular" className="icon" activeclassname="active">
              <i className="fa-solid fa-fire hide"></i>
              <span>Popular</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/Search" className="icon" activeclassname="active">
              <i className="fa-solid fa-magnifying-glass hide"></i>
              <span>Search</span>
            </NavLink>
          </li>
          <li>
            <NavLink to="/Favorite" className="icon" activeclassname="active">
              <i className="fa-solid fa-bookmark hide"></i>
              <span>Saved</span>
            </NavLink>
          </li>
        </ul>
      </nav>

      <div className="eclipse" onClick={showProfile}>
        <i className="fa-solid fa-user"></i>
      </div>
    </div>
  );
}
