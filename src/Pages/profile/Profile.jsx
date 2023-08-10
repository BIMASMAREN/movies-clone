import { useEffect, useState } from "react";
import "./style/style.css";
import firebase from "firebase/compat/app";
import { firebaseConfig } from "../../firebase/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { LogOut, setLoading } from "../../state/user";

export default function () {
  firebase.initializeApp(firebaseConfig);
  const username = localStorage["username"];
  const [user, setUser] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const User = useSelector((state) => state.user) || {};
  const [createdAt, setCreatedAt] = useState(null);

  const logout = () => {
    localStorage.setItem("username", "");
    localStorage.setItem("Login", false);
    dispatch(LogOut());
    navigate("/");
  };

  const Cancel = () => {
    dispatch(setLoading({ boolean: false }));
  };
  useEffect(() => {
    firebase
      .database()
      .ref(`${username}`)
      .once("value")
      .then((data) => {
        const userData = data.val();
        setUser(userData);
        if (userData.createdAt) {
          const created = userData.createdAt;
          const date = new Date(created);
          setCreatedAt(date.toLocaleString());
        }
      });
  }, [User]);
  return (
    user && (
      <>
        <div className="overlay" onClick={Cancel}></div>
        <div className="Profile">
          <ul>
            <li>
              <span>username :</span>
              <div className="data">{user.username}</div>
            </li>
            <li>
              <span>email : </span>

              <div className="data">{user.email}</div>
            </li>
            <li>
              <span>password :</span>
              <div className="data">{user.password}</div>
            </li>
            <li>
              <span>Created At :</span>
              <div className="data">{createdAt || ""}</div>
            </li>
          </ul>
          <a href="#" className="logout" onClick={logout}>
            Log Out
          </a>
        </div>
      </>
    )
  );
}
