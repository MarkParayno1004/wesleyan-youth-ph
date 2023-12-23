import { collection, addDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase-config";
import { getAuth } from "@firebase/auth";

export const submitAddDelegate = async (formData) => {
  try {
    const auth = getAuth();

    if (!auth.currentUser) {
      throw new Error("User not authenticated");
    }

    formData.role = "delegate";

    const Collection = collection(firestore, "delegates");
    const docRef = await addDoc(Collection, {
      ...formData,
    });

    console.log("Coordinator added with ID: ", docRef.id);

    return {
      coordinatorId: docRef.id,
    };
  } catch (error) {
    console.error("Error adding delegate:", error.message);
    throw error;
  }
};
