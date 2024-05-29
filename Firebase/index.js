// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.2/firebase-app.js";
import {
    getDatabase,
    ref,
    push,
    onValue,
    set,
} from "https://www.gstatic.com/firebasejs/10.12.2/firebase-database.js";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyA1K0NnC4bXUqvGQlITKfGkq6lrOiiw_pI",
    authDomain: "humber-assignment.firebaseapp.com",
    projectId: "humber-assignment",
    storageBucket: "humber-assignment.appspot.com",
    messagingSenderId: "436259163495",
    appId: "1:436259163495:web:451b54ac2186eb5ada73c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const database = getDatabase();
const messagesRef = ref(database, "messages");

// Adding event listner on submit
document.getElementById("message-form").addEventListener("submit", () => {

    // Extracting ids from HTML
    const name = document.getElementById("name").value;
    const message = document.getElementById("msg").value;

    const newMessageRef = push(messagesRef);
    
    // setting the values
    set(newMessageRef, {
        createdAt: Date.now(),
        message: message,
        name: name
    });
});

// Read data and update the UI
onValue(messagesRef, (snapshot) => {
    // console.log(snapshot);
    const ul = document.getElementById("messages");
    ul.replaceChildren();

    snapshot.forEach((childSnapshot) => {
        console.log(childSnapshot.key);
        console.log(childSnapshot.val());
        
        const childData = childSnapshot.val();
        const text = document.createTextNode(childData.message + " ~ " + childData.name);
        const li = document.createElement("li");

        li.appendChild(text);
        ul.appendChild(li);
    });
});
