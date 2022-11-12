import { signInWithEmailAndPassword } from "firebase/auth";
import delUnverifiedUser from "../delete-user/delete-user";
import auth from "../firebase";
import logOutUser from "../logout/logout";
import { IUser } from "./interfaces";

/**
 * Allow an existenting user to logging in the app with email and password
 * @param email Email Address to create the user account
 * @param password Password for the user account
 * @returns an object with the user information, a message about the proccess and the state of the process
 */
export const logInUserWithEmailAndPassword = async (
	email: string,
	password: string,
	checkEmail: boolean
): Promise<IUser> => {
	try {
		const { user } = await signInWithEmailAndPassword(
			auth,
			email,
			password
		);

		if (checkEmail && !user.emailVerified) {
			delUnverifiedUser();
			return {
				user: null,
				message: "User was delete because the email was not verified",
				proscessOk: false,
			};
		}

		if (!user.emailVerified) {
			await logOutUser();
			return {
				user: null,
				message:
					"User login fail because the email is not verified yet",
				proscessOk: false,
			};
		} else {
			return {
				user,
				message: "User login ok",
				proscessOk: true,
			};
		}
	} catch (error) {
		return {
			user: null,
			message: "user register fail",
			proscessOk: false,
		};
	}
};
