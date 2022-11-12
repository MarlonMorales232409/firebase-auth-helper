import { signOut } from "firebase/auth";
import auth from "../firebase";

/**
 * Allow user log out from our app
 */
const logOutUser = async () => {
	try {
		await signOut(auth);
		console.log("User log out");
	} catch (error) {
		console.log(error);
	}
};

export default logOutUser;
