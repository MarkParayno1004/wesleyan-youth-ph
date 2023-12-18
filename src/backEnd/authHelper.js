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
    // Check if email is empty or undefined
    if (!email) {
      console.error("Email is missing");
      return;
    }

    const { user } = await signInWithEmailAndPassword(auth, email, password);
    console.log("User logged in");
    // Set loggedIn to true or do any other logic as needed
    setLoggedIn(true);
    const userUid = user.uid;

    // Get Firestore instance
    const db = getFirestore();

    // Fetch user role from Firestore
    const userDoc = await getDocs(
      query(collection(db, "users"), where("UID", "==", user.uid))
    );

    if (!userDoc.empty) {
      const userData = userDoc.docs[0].data();

      // Check if user data is retrieved and has a role field
      if (userData && userData.role) {
        const { role } = userData;

        // Redirect based on user role
        if (role.toLowerCase() === "coordinator") {
          navigate("/coordinator-dashboard");
          console.log("Navigated to Coordinator");
        } else if (role.toLowerCase() === "admin") {
          navigate("/Admin-MainPage");
          console.log("Navigated to Admin");
        } else {
          // If it's a different role, you can handle it here
          console.log("Unknown role:", role);
        }
      } else {
        // Handle the case when user data or role is missing
        console.log("User data or role missing");
      }
    } else {
      console.error("User not found");
    }
  } catch (error) {
    console.error("Login failed:", error.message);
  }
};
