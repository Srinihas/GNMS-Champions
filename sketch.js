var app;
var auth;
var database;
var inputEmail;
var inputPassword;
var buttonSignIn;
var buttonUpdate;
var inputUpdatePlace_grade, inputUpdatePlace_section, inputUpdatePlace_name, inputUpdatePlace_stars;
var buttonShow;

function setup() {
  createCanvas(windowWidth, windowHeight);

  // Initialize Firebase
  var firebaseConfig = {
    apiKey: "AIzaSyAX8pwHV753YkKxbCTYV-hGIQSyS3zWsHw",
    authDomain: "gnms-champions.firebaseapp.com",
    databaseURL: "https://gnms-champions-default-rtdb.europe-west1.firebasedatabase.app",
    projectId: "gnms-champions",
    storageBucket: "gnms-champions.appspot.com",
    messagingSenderId: "418635478536",
    appId: "1:418635478536:web:3f412a862bd491e5b903bd"
  };
  app = firebase.initializeApp(firebaseConfig);
  auth = firebase.auth();
  database = firebase.database();

  // Create HTML elements
  inputEmail = createInput('Email');
  inputEmail.position(windowWidth/2 - 50, windowHeight/2 - 100);
  inputPassword = createInput('Password', 'password');
  inputPassword.position(windowWidth/2 - 50, windowHeight/2 - 70);
  buttonSignIn = createButton('Sign In');
  buttonSignIn.position(windowWidth/2 - 50, windowHeight/2 - 40);

  // Add event listeners
  buttonSignIn.mousePressed(signIn);
}

async function signIn() {
  var email = inputEmail.value();
  var password = inputPassword.value();
  if (email == "gnmschampions@gmail.com" && password == "T3AMARSH"){
        console.log("Access granted")
        inputUpdatePlace_grade = createInput("Grade");
        inputUpdatePlace_section = createInput("Section");
        buttonShow = createButton('Show list');
        inputUpdatePlace_grade.position(windowWidth/2 - 50, windowHeight/2 - 125);
        inputUpdatePlace_section.position(windowWidth/2 - 50, windowHeight/2 - 100);
        buttonShow.position(windowWidth/2 - 50, windowHeight/2 - 50);
        inputPassword.position(-100, -100);
        inputEmail.position(-100, -100);
        buttonSignIn.position(-100, -100);
        let students_array = await database.ref("/Grade-"+inputUpdatePlace_grade.value()+"/"+inputUpdatePlace_section.value()+"/Students").get();
        students_array = students_array.val();
        if (students_array) {
          for (let index = 0; index < students_array.length; index++) {
            text(students_array[index], logoimg.x+200, 20+(index*10))
            print("IT WORKS")
          }
        } else {
          text("Server is currently offline", buttonShow.x, buttonShow.y + 20)
        }        
        
      } else {
        auth.signInWithEmailAndPassword(email, password)
          .then((userCredential) => {
            console.log('User signed in');
            
            inputUpdatePlace_grade = createInput("Grade");
            inputUpdatePlace_section = createInput("Section");
            inputUpdatePlace_name = createInput("Full Name");
            inputUpdatePlace_stars = createInput("Number of stars given");
            buttonUpdate = createButton('Update');
            inputUpdatePlace_grade.position(windowWidth/2 - 50, windowHeight/2 - 150);
            inputUpdatePlace_section.position(windowWidth/2 - 50, windowHeight/2 - 125);
            inputUpdatePlace_name.position(windowWidth/2 - 50, windowHeight/2 - 100);
            inputUpdatePlace_stars.position(windowWidth/2 - 50, windowHeight/2 - 75);
            buttonUpdate.position(windowWidth/2 - 50, windowHeight/2 - 50);
            buttonUpdate.mousePressed(updateDatabase);
            inputPassword.position(-100, -100);
            inputEmail.position(-100, -100);
            buttonSignIn.position(-100, -100);
         })
         .catch((error) => {
           console.log(error);
         });
       }
}

function updateDatabase() {
  var newData = database.ref("path/to/data").get().then((snapshot) => {
    return snapshot.val() + inputUpdatePlace_stars.value();
  });
  database.ref(inputUpdatePlace_grade.value() + "/"+ inputUpdatePlace_section.value() + "/Students/" + inputUpdatePlace_name.value()).set(newData)
    .then(() => {
      console.log('Database updated');
    });
}
