import { useState } from "react";
import { firebaseConfig } from "../../firebase/firebase";
import "./style/style.css";
import firebase from "firebase/compat/app";
import Error from "../../Components/Error/Error";
import { useNavigate } from "react-router-dom";
import "firebase/compat/database";
import { useDispatch } from "react-redux";
import { LoginUser } from "../../state/user";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const [error, setError] = useState("");

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const SignUpUser = (user) => {
    console.log(user);
    firebase
      .database()
      .ref(`${user.username}`)
      .set(user)
      .catch((error) => {
        console.log(error);
        setError("An error occurred. Please try again later.");
      });
  };

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

  const fetcher = (id) => document.getElementById(`${id}`).value;

  const handleSubmit = (event) => {
    event.preventDefault();
    const username = fetcher("username");
    const password = fetcher("password");
    const email = fetcher("email");

    if (username && email && password) {
      const auth = firebase.auth();
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((userCredential) => {
          if (userCredential) {
            const Username = email.slice(0, email.indexOf("@"));
            SignUpUser({
              username: Username,
              email: email,
              password: password,
              createdAt: Date.now(),
            });
            localStorage.setItem("username", Username);
            localStorage.setItem("Login", true);
            dispatch(LoginUser());
            navigate("/");
          }
        })
        .catch((error) => {
          console.log(error.code);
          setError(switcher(error));
          setTimeout(() => {
            setError("");
          }, 1500);
        });
    } else {
      setError("Please complete all inputs.");
      setTimeout(() => {
        setError("");
      }, 1500);
    }
  };

  return (
    <>
      <div className="signup-container">
        <h1>Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input type="text" id="username" />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" id="password" />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input type="email" id="email" />
          </div>
          <div className="submit-controls">
            <button type="submit">Sign Up</button>
            <a className="SignUp" onClick={() => navigate("/")}>
              Log In
            </a>
          </div>
        </form>
      </div>
      {error != "" && <Error message={error} />}
    </>
  );
}
