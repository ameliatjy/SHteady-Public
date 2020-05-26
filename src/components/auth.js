import firebase from 'firebase/app';
import 'firebase/auth';

export const logoutUser = () => {
    firebase.auth().signOut();
};

export const signUpUser = async ({ name, email, password }) => {
    if (name.length <= 0) { return { error: "Name cannot be empty." }
    } else if (email.length <= 0) { return { error: "Email cannot be empty." }
    } else if (password.length <= 0) { return { error: "Password cannot be empty." }
    } else {
        return firebase.auth().createUserWithEmailAndPassword(email, password).then(function (user) {
            var user = firebase.auth().currentUser;
            // console.log(user);
            return user;
            // loginUser(user); // Optional
        }, function (error) {
            console.log(error);
            switch (error.code) {
                case "auth/email-already-in-use":
                    return {
                        error: "E-mail already in use."
                    };
                case "auth/invalid-email":
                    return {
                        error: "Invalid e-mail address format."
                    };
                case "auth/too-many-requests":
                    return {
                        error: "Too many request. Try again in a minute."
                    };
                default:
                    return {
                        error: "Check your internet connection."
                    };
            }
        })
    }
}

export const loginUser = async ({ email, password }) => {
    try {
        await firebase.auth().signInWithEmailAndPassword(email, password);
        return {};
    } catch (error) {
        switch (error.code) {
            case "auth/invalid-email":
                return {
                    error: "Invalid email address format."
                };
            case "auth/user-not-found":
            case "auth/wrong-password":
                return {
                    error: "Invalid email address or password."
                };
            case "auth/too-many-requests":
                return {
                    error: "Too many request. Try again in a minute."
                };
            default:
                return {
                    error: "Check your internet connection."
                };
        }
    }
};