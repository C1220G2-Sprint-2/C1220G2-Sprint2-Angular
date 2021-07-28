importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-app.js');
importScripts('https://www.gstatic.com/firebasejs/4.6.1/firebase-messaging.js');

var config = {
    apiKey: "AIzaSyDjn5hxznLpvyKYrSFDrKGDngcFIzrr6cg",
    authDomain: "chatbox-c1220g2.firebaseapp.com",
    databaseURL: "https://chatbox-c1220g2-default-rtdb.asia-southeast1.firebasedatabase.app/",
    projectId: "chatbox-c1220g2",
    storageBucket: "chatbox-c1220g2.appspot.com",
    messagingSenderId: "74384038345",
    appId: "1:74384038345:web:9e6c3b9d7d47d1e410f018",
    measurementId: "G-8MFPR47L5N"
}

firebase.initializeApp(config);

const messaging = firebase.messaging(); // get messaging obj.
// messaging.getToken( {vapidKey: 'BD2F2YT9MI22v1LUP7JcvPzne8-2G7ZIMNjYKlC_HrDN-9QMzpBZQmOO3fN1Qf3VQfe3Ayg5g-IPVfSeCqhFBSM'} )
//     .then((currentToken) => {
//     if (currentToken) {
//         // Send the token to your server and update the UI if necessary
//         console.log("current token: " + currentToken);
//     } else {
//         // Show permission request UI
//         console.log('No registration token available. Request permission to generate one.');
//     }
//     })
//     .catch((error) => {
//         console.log('An error occurred while retrieving token. ', error);
//     });