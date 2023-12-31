import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { collection, addDoc, doc, updateDoc } from "firebase/firestore";
import { firestore } from "../firebase/firebase-config";

const generateRandomPassword = () => {
  const charset =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const passwordLength = 8;
  let password = "";
  for (let i = 0; i < passwordLength; i++) {
    const randomIndex = Math.floor(Math.random() * charset.length);
    password += charset[randomIndex];
  }
  return password;
};

export const submitAddCoor = async (formData) => {
  try {
    const auth = getAuth();

    if (!auth.currentUser) {
      throw new Error("User not authenticated");
    }

    const password = generateRandomPassword();

    const userCredential = await createUserWithEmailAndPassword(
      auth,
      formData.email,
      password
    );
    const user = userCredential.user;

    formData.uid = user.uid;
    formData.role = "coordinator";

    const Collection = collection(firestore, "users");
    const docRef = await addDoc(Collection, {
      ...formData,
    });

    return {
      coordinatorId: docRef.id,
      userId: user.uid,
    };
  } catch (error) {
    console.error("Error adding coordinator:", error.message);
    throw error;
  }
};

export const updateCoor = async (coorId, updatedData) => {
  const coorRef = doc(firestore, "users", coorId);

  try {
    await updateDoc(coorRef, updatedData);
    console.log("Delegate updated successfully!");
  } catch (error) {
    console.error("Error updating delegate:", error.message);
    throw error;
  }
};
