import "./style.css";
import {
	IUser,
	logInUserWithEmailAndPassword,
	registerUserWithEmailAndPassword,
} from "./helpers";
import auth from "./helpers/firebase";
import logOutUser from "./helpers/logout/logout";
import { onAuthStateChanged } from "firebase/auth";

const text = document.getElementsByTagName("h1");
const button = document.querySelector<HTMLButtonElement>(".sign-up");
const button2 = document.querySelector<HTMLButtonElement>(".sign-in");
// const button3 = document.querySelector<HTMLButtonElement>(".recovery");
const button4 = document.querySelector<HTMLButtonElement>(".logout");
const button5 = document.querySelector<HTMLButtonElement>(".google");

interface userInfo {
	email?: string | null;
	uid?: string;
}

let userInfo: userInfo = {};
let currentUser = false;

onAuthStateChanged(auth, (user) => {
	if (user) {
		currentUser = true;
		text[0].innerHTML = `${auth.currentUser?.email}`;
	} else {
		currentUser = false;
		text[0].innerHTML = `No user`;
	}
});

button?.addEventListener("click", async () => {
	const newUser: IUser = await registerUserWithEmailAndPassword(
		"marlon.morales2324@icloud.com",
		"newpasswrod1"
	);
	userInfo.email = newUser.user?.email;
	userInfo.uid = newUser.user?.uid;

	if (userInfo.uid) {
		text[0].innerHTML = `${userInfo.email}`;
	} else {
		console.log(newUser.message);
		return;
	}
});

button2?.addEventListener("click", async () => {
	const lgUser: IUser = await logInUserWithEmailAndPassword(
		"marlon.morales2324@icloud.com",
		"newpasswrod1",
		true
	);

	userInfo.email = lgUser.user?.email;
	userInfo.uid = lgUser.user?.uid;

	if (userInfo.uid) {
		text[0].innerHTML = `${userInfo.email}`;
	} else {
		console.log("error ocurred");
		return;
	}
});

button4?.addEventListener("click", async () => {
	await logOutUser();
});

// button3?.addEventListener("click", async () => {
// 	console.log(await recoveryUserPassword("marlon.morales232409@gmail.com"));
// });

// button4?.addEventListener("click", async () => {
// 	if (!userInfo.uid) {
// 		console.log("There is any user to log out");
// 		return;
// 	}
// 	await logOutUser();

// 	userInfo.email = "";
// 	userInfo.uid = "";

// 	text[0].innerHTML = "No User";
// });

// button5?.addEventListener("click", async () => {
// 	if (userInfo.uid) {
// 		console.log("the user is already logged");
// 		return;
// 	}

// 	const googleUser: any = await logInWithGoogle();

// 	userInfo.email = googleUser?.email;
// 	userInfo.uid = googleUser.uid;

// 	console.log(googleUser);
// 	if (userInfo.uid) {
// 		console.log("user is: " + userInfo.email);
// 		text[0].innerHTML = `${userInfo.email}`;
// 	} else {
// 		console.log("error ocurred");
// 		return;
// 	}

// 	console.log(googleUser);
// });
