import "./style/style.css";
import { firebaseConfig } from "/src/firebase/firebase";
import firebase from "firebase/compat/app";
import { useNavigate } from "react-router-dom";
import "firebase/compat/database";
import { useDispatch } from "react-redux";
import { LoginUser } from "/src/state/user";
import { toast } from "react-toastify";
import Logo from "/public/Images/Logo.png";

export default function SignUp() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
  }

  const SignUpUser = (user) => {
    firebase
      .database()
      .ref(`${user.username}`)
      .set(user)
      .catch(() => {
        toast.error("An error occurred. Please try again later.");
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
            toast.success("Successfully Signed up.");
            dispatch(LoginUser());
            navigate("/");
          }
        })
        .catch((error) => {
          toast.error(switcher(error));
        });
    } else {
      toast.error("Please complete all inputs.");
    }
  };

  return (
    <>
      <div className="signup-container">
        <img src={Logo} alt="" style={{ width: 150 }} />
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
    </>
  );
}
