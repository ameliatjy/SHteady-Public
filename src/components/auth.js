import firebase from 'firebase/app';
import 'firebase/auth';

export const logoutUser = () => {
    firebase.auth().signOut();
};

export const signUpUser = async ({ name, matric, email, password, confirmPassword }) => {
    if (name.length <= 0) { return { error: "Name cannot be empty." }
     } else if (matric.length <= 0) { return { error: "Matric cannot be empty." }
    } else if (email.length <= 0) { return { error: "Email cannot be empty." }
    } else if (password.length <= 0) { return { error: "Password cannot be empty." }
    } else if (password.length < 6) { return { error: "Password cannot be less than 6 characters."}
    } else if (confirmPassword.length <= 0) { return { error: "Please retype your password for confirmation."}
    } else if (confirmPassword != password) { return { error: "Passwords mismatch."}
    } else {
        return firebase.auth().createUserWithEmailAndPassword(email, password)
            .then(function (user) {
                console.log('matric:', matric)
                firebase.database().ref('users/' + matric).set({
                    name: name,
                    matric: matric,
                    email: email,
                    room: 'Enter room number',
                    status: 'yo hmu i am in',
                    cca: []
            })
            user.user.updateProfile({
                displayName: matric
            })
            return user.user
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

export const loginUser = async ({ matric, email, password }) => {
    if (matric.length <= 0) { return { error: "Matric number cannot be empty." }
    } else if (email.length <= 0) { return { error: "Email cannot be empty." }
    } else if (password.length <= 0) { return { error: "Password cannot be empty." }
    } else {
        return firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
            //var current = firebase.auth().currentUser;
            return user;
        }, function (error) {
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
        })
    }
};