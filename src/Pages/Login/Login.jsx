import "./style/style.css";

import firebase from "firebase/compat/app";
import { firebaseConfig } from "../../firebase/firebase";
import "firebase/compat/auth";

import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { LoginUser } from "../../state/user";
import { toast } from "react-toastify";

import Logo from "/public/Images/Logo.png";

firebase.initializeApp(firebaseConfig);

export default function Login() {
  const dispatch = useDispatch();
  const Navigate = useNavigate();

  const fetcher = (id) => document.getElementById(`${id}`).value;

  const switcher = (error) => {
    let message = "";

    switch (error.code) {
      case "auth/email-already-in-use":
        message = "This email is already in use.";
        break;
      case "auth/invalid-email":
        message = "Invalid email address.";
        break;
      case "auth/user-disabled":
        message = "This account has been disabled.";
        break;
      case "auth/user-not-found":
        message = "This email address is not registered.";
        break;
      case "auth/wrong-password":
        message = "Incorrect password.";
        break;
      default:
        message = "An error occurred. Please try again later.";
        break;
    }
    return message;
  };

  const handleSubmit = (event) => {
    event.preventDefault();

    const email = fetcher("email");
    const password = fetcher("password");

    if (email && password) {
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then((userCredential) => {
          toast.success("Successfully logged in.");
          const Username = email.slice(0, email.indexOf("@"));
          localStorage.setItem("Login", true);
          dispatch(LoginUser());
          localStorage.setItem("username", Username);
          Navigate("/");
        })
        .catch((error) => {
          toast.error(switcher(error));
        });
    } else {
      toast.error("Please enter all inputs.");
    }
  };
  return (
    <>
      <div className="login-container">
        <img src={Logo} alt="" style={{ width: 150 }} />
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Email</label>
            <input type="text" id="email" placeholder="Email address" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" placeholder="Password" />
          </div>
          <div className="submit-controls">
            <button type="submit">Login</button>
            <a className="SignUp" onClick={() => Navigate("/SignUp")}>
              Sign Up
            </a>
          </div>
        </form>
      </div>
    </>
  );
}
