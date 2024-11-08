import { User } from "../../api/user"

export enum ActionTypes {
    SET_LOGGED_USER = "SET_LOGGED_USER",
    LOGOUT_USER = "LOGOUT_USER",
}

export function setLoggedUserAction(payload: {
    user: User,
    token: string
}) {
    return {
        type: ActionTypes.SET_LOGGED_USER,
        payload
    }
}

export function logoutUserAction() {
    return {
        type: ActionTypes.LOGOUT_USER,
      }
}
