import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
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

    return {
      coordinatorId: docRef.id,
    };
  } catch (error) {
    console.error("Error adding delegate:", error.message);
    throw error;
  }
};

export const updateDelegate = async (delegateId, updatedData) => {
  const delegateRef = doc(firestore, "delegates", delegateId);

  try {
    await updateDoc(delegateRef, updatedData);
    console.log("Delegate updated successfully!");
  } catch (error) {
    console.error("Error updating delegate:", error.message);
    throw error;
  }
};
