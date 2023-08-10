import { firebaseConfig } from "../../firebase/firebase";
import firebase from "firebase/compat/app";
import { useState } from "react";
import { useEffect } from "react";
import Card from "../../Components/Card/Card";
import './style/style.css'
export default function Favorite() {
  const user = localStorage["username"];
  const [saved, setSaved] = useState(null);
  firebase.initializeApp(firebaseConfig)
  useEffect(() => {
    firebase
      .database()
      .ref(`${user}/Saved`)
      .once("value")
      .then((data) => {
        const parced = data.val();
        if(parced) setSaved(parced);
      });
  }, [user]);

  return (
    <>
      <div className="favorite">
        {saved &&
          Object.entries(saved).map(([id, val]) => {
            return <Card key={id} movie={val} />;
          })}
      </div>
    </>
  );
}
