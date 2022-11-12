import { signInWithPopup, User } from "firebase/auth";
import auth from "../firebase";
import { googleProvider } from "../providers/google";

/**
 * Allow users log in by using google account
 * @returns the user information from google account or null if
 * the action fail
 */
export const logInWithGoogle = async (): Promise<User | null> => {
	try {
		const { user } = await signInWithPopup(auth, googleProvider);
		return user;
	} catch (error) {
		console.log("Error ocurred");
		console.log(error);
		return null;
	}
};
