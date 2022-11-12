import { User } from "firebase/auth";

export interface IUser {
	user: User | null;
	message: string;
	proscessOk: boolean;
}
