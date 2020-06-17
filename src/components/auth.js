import firebase from 'firebase/app';
import 'firebase/auth';
//import spreadsheet from './spreadsheet';

export const logoutUser = () => {
    firebase.auth().signOut();
};

// export const signUpUser = async ({ name, matric, email, password, confirmPassword }) => {
//     if (name.length <= 0) {
//         return { error: "Name cannot be empty." }
//     } else if (matric.length <= 0) {
//         return { error: "Matric cannot be empty." }
//     } else if (email.length <= 0) {
//         return { error: "Email cannot be empty." }
//     } else if (password.length <= 0) {
//         return { error: "Password cannot be empty." }
//     } else if (password.length < 6) {
//         return { error: "Password cannot be less than 6 characters." }
//     } else if (confirmPassword.length <= 0) {
//         return { error: "Please retype your password for confirmation." }
//     } else if (confirmPassword != password) {
//         return { error: "Passwords mismatch." }
//     } else {
//         return firebase.auth().createUserWithEmailAndPassword(email, password)
//             .then(function (user) {
//                 console.log('signup page matric:', matric)
//                 firebase.database().ref('users/' + matric).set({
//                     name: name,
//                     matric: matric,
//                     room: 'Enter room number',
//                     status: 'yo hmu i am in',
//                     cca: 'none',
//                     profilePicUrl: 'default',
//                     mealcredit: 1
//                 })
//                 user.user.updateProfile({
//                     displayName: matric
//                 })
//                 return user.user
//             }, function (error) {
//                 console.log(error);
//                 switch (error.code) {
//                     case "auth/email-already-in-use":
//                         return {
//                             error: "E-mail already in use."
//                         };
//                     case "auth/invalid-email":
//                         return {
//                             error: "Invalid e-mail address format."
//                         };
//                     case "auth/too-many-requests":
//                         return {
//                             error: "Too many request. Try again in a minute."
//                         };
//                     default:
//                         return {
//                             error: "Check your internet connection."
//                         };
//                 }
//             })
//     }
// }

export const loginUser = async ({ matric, email, password }) => {
    if (matric.length <= 0) {
        return { error: "Matric number cannot be empty." }
    } else if (email.length <= 0) {
        return { error: "Email cannot be empty." }
    } else if (password.length <= 0) {
        return { error: "Password cannot be empty." }
    } else if (matric.startsWith("cca")) {
        return { error: "Login with admin account denied." }
    } else {
        var iscreated;
        firebase.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/users/' + matric + '/iscreated').on('value', function (snapshot) {
            if (typeof snapshot.val() === 'undefined') {
                iscreated = null;
            } else {
                iscreated = snapshot.val();
            }
        })

        if (iscreated == null) {
            return {
                // error: "Invalid user." //matric number is not a registered shearite aka not in the sheets
                error: "Please try again." //uhm need to use this phrase bc firebase takes time to get data so on first click of login, iscreated will still be null...
            }
        } else if (iscreated) { //not first time log in
            return firebase.auth().signInWithEmailAndPassword(email, password).then(function (user) {
                //var current = firebase.auth().currentUser;

                var date = new Date().getDate().toString();
                if (date.length == 1) {
                    date = "0" + date;
                }
                var month = (new Date().getMonth() + 1).toString();
                if (month.length == 1) {
                    month = "0" + month;
                }
                var year = new Date().getFullYear();
                var hours = new Date().getHours().toString();
                if (hours.length == 1) {
                    hours = "0" + hours;
                }
                var min = new Date().getMinutes().toString();
                if (min.length == 1) {
                    min = "0" + min;
                }
                var sec = new Date().getSeconds().toString();
                if (sec.length == 1) {
                    sec = "0" + sec;
                }

                var timestamp = year + month + date + ' ' + hours + ':' + min + ':' + sec;

                firebase.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/users/' + matric + '/lastloggedin').set(timestamp);
                return user;
            }, function (error) {
                switch (error.code) {
                    case "auth/invalid-email":
                        return {
                            error: "Invalid matric number."
                        };
                    case "auth/user-not-found":
                    case "auth/wrong-password":
                        return {
                            error: "Invalid matric number or password."
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
        } else {
            if (matric != password) { //first time user matric and pw is same in caps
                return { error: 'Wrong matric/password for first-time users.' }
            }
            return firebase.auth().createUserWithEmailAndPassword(email, password)
                .then(function (user) {
                    firebase.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/users/' + matric + '/iscreated').set(true);
                    firebase.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/users/' + matric + '/status').set("yo hmu i am in");
                    firebase.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/users/' + matric + '/profilePicUrl').set('default');
                    firebase.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/users/' + matric + '/mealcredit').set(0);

                    var date = new Date().getDate().toString();
                    if (date.length == 1) {
                        date = "0" + date;
                    }
                    var month = (new Date().getMonth() + 1).toString();
                    if (month.length == 1) {
                        month = "0" + month;
                    }
                    var year = new Date().getFullYear();
                    var hours = new Date().getHours().toString();
                    if (hours.length == 1) {
                        hours = "0" + hours;
                    }
                    var min = new Date().getMinutes().toString();
                    if (min.length == 1) {
                        min = "0" + min;
                    }
                    var sec = new Date().getSeconds().toString();
                    if (sec.length == 1) {
                        sec = "0" + sec;
                    }
                    var timestamp = year + month + date + ' ' + hours + ':' + min + ':' + sec;

                    firebase.database().ref('1F0zRhHHyuRlCyc51oJNn1z0mOaNA7Egv0hx3QSCrzAg/users/' + matric + '/lastloggedin').set(timestamp);
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
};