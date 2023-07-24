// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAaYoaceYk3q-jRCla2HCPiDUHJOpkAx-4",
    authDomain: "photoapplogin-48b0d.firebaseapp.com",
    databaseURL: "https://photoapplogin-48b0d-default-rtdb.firebaseio.com",
    projectId: "photoapplogin-48b0d",
    storageBucket: "photoapplogin-48b0d.appspot.com",
    messagingSenderId: "55404220547",
    appId: "1:55404220547:web:5519806fc6b77089a84bb6",
    measurementId: "G-RF3BM9QE2B"
  };
 
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  // Initialize variables
  const auth = firebase.auth()
  const database = firebase.database()
  
  function register() {
    // Get all our input fields
    
    const email = document.getElementById('signup_email').value;
    const password = document.getElementById('signup_password').value;
    const full_name = document.getElementById('full_name').value;
  
    console.log('Email:', email);
    console.log('Email:', password);
    const emailValid = validate_email(email);
    
    const passwordValid = validate_password(password);
  
    if (!emailValid) {
      alert('Invalid email address.');
      return;
    }
  
    if (passwordValid !== null) {
      alert(passwordValid);
      return;
    }
  
   // Move on with Auth
   auth.createUserWithEmailAndPassword(email, password)
   .then(function() {
     // Declare user variable
     var user = auth.currentUser
 
     // Add this user to Firebase Database
     var database_ref = database.ref()
 
     // Create User data
     var user_data = {
       email : email,
       full_name : full_name,
       last_login : Date.now()
     }
 
     // Push to Firebase Database
     database_ref.child('users/' + user.uid).set(user_data)
 
     // DOne
     alert('Account Created Sucessfully!!')  
      })
      .catch(function(error) {
        console.error('Firebase Error:', error);
        var error_code = error.code;
        var error_message = error.message;
        alert(error_message);
      });
  }
  
  function login() {
    // Get all our input fields
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    console.log('Email:', email);
    console.log('Email:', password );
    // Validate input fields
    const emailValid = validate_email(email);
    const passwordValid = validate_password(password);

  
    if (!emailValid) {
      alert('Invalid email address.');
      return;
    }
  
    if (passwordValid !== null) {
      alert(passwordValid);
      return;
    }
  
      auth.signInWithEmailAndPassword(email, password)
      .then(function() {
        // Declare user variable
        var user = auth.currentUser
    
        // Add this user to Firebase Database
        var database_ref = database.ref()
    
        // Create User data
        var user_data = {
          last_login : Date.now()
        }
    
        // Push to Firebase Database
        database_ref.child('users/' + user.uid).update(user_data)
    
        // DOne
        window.location.href = 'event.html';
    
      })
      .catch(function(error) {
        console.error('Firebase Error:', error);
        var error_code = error.code;
        var error_message = error.message;
        alert(error_message);
      });
  }
  
  

  function validate_email(email) {
    const expression = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return expression.test(email);
  }

  
  function validate_password(password) {
    // Firebase only accepts lengths greater than or equal to 6
    if (password.length < 6) {
      return 'Password must be at least 6 characters long.';
    } else {
      return null;
    }
  }
  
  
  