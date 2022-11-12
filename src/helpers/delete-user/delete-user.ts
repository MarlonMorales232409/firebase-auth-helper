import auth from "../firebase";

/**
 * If the user is not verified yet, the email will be delete
 * @returns True if the proscess was successfully | False if an error ocurred and show the error in console
 */
const delUnverifiedUser = (): boolean => {
	try {
		if (auth.currentUser) {
			auth.currentUser?.delete();
			return true;
		}
		return false;
	} catch (error) {
		console.error(error);
		return false;
	}
};

export default delUnverifiedUser;
