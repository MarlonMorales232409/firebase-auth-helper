import { sendPasswordResetEmail } from "firebase/auth";
import auth from "../firebase";

/**
 * Allow to recover the user password the account password by
 * sending an email to the address used for register
 * @param email user email wich want to recover it passwrod
 * @returns True if the recovery email was send | False if an error ocurred showing the error in console
 */
export const recoveryUserPassword = async (email: string): Promise<boolean> => {
	try {
		await sendPasswordResetEmail(auth, email);
		return true;
	} catch (error) {
		console.error(error);
		return false;
	}
};
