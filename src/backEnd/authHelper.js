import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
} from "firebase/firestore";
import { auth } from "../firebase/firebase-config";
import {
  signInWithEmailAndPassword,
  sendPasswordResetEmail,
} from "firebase/auth";

export const handleLogin = async (email, password, navigate, setLoggedIn) => {
  try {
    if (!email) {
      console.error("Email is missing");
      return;
    }

    const { user } = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in");
    setLoggedIn(true);
    const userUid = user.uid;

    const db = getFirestore();

    const userDoc = await getDocs(
      query(collection(db, "users"), where("uid", "==", user.uid))
    );

    if (!userDoc.empty) {
      const userData = userDoc.docs[0].data();

      if (userData && userData.role) {
        const { role } = userData;

        if (role.toLowerCase() === "coordinator") {
          navigate("/Coordinator-MainPage");
          console.log("Navigated to Coordinator");
        } else if (role.toLowerCase() === "admin") {
          navigate("/Admin-MainPage");
          console.log("Navigated to Admin");
        } else {
          console.log("Unknown role:", role);
        }
      } else {
        console.log("User data or role missing");
      }
    } else {
      console.error("User not found");
    }
  } catch (error) {
    console.error("Login failed:", error.message);
  }
};
