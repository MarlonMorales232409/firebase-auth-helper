import auth from "../firebase";
import {
	createUserWithEmailAndPassword,
	sendEmailVerification,
} from "firebase/auth";
import { IUser } from "./interfaces";

/**
 * Allow create a new user in firebase by using Email and Passwrod, and send the
 * verification link to the email used to create the account.
 * @param email Email Address to create the user account
 * @param password Password for the user account
 * @returns an object with the user information, a message about the proccess and the state of the process
 */
export const registerUserWithEmailAndPassword = async (
	email: string,
	password: string
): Promise<IUser> => {
	try {
		const { user } = await createUserWithEmailAndPassword(
			auth,
			email,
			password
		);

		if (!auth.currentUser)
			return {
				user: null,
				message: "user register fail",
				proscessOk: false,
			};

		// ? Send an email verification to the new user
		await sendEmailVerification(auth.currentUser);

		return { user, message: "user register correctly", proscessOk: true };
	} catch (error) {
		return {
			user: null,
			message: "user register fail",
			proscessOk: false,
		};
	}
};
