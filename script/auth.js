// Your web app's Firebase configuration
var firebaseConfig = {
  apiKey: "AIzaSyBEclAZfd1Ty3oUugZq-KL_Uw7-JC8G-MI",
  authDomain: "photoapplogin-6a46a.firebaseapp.com",
  projectId: "photoapplogin-6a46a",
  storageBucket: "photoapplogin-6a46a.appspot.com",
  messagingSenderId: "470235456268",
  appId: "1:470235456268:web:8dd7026e56930ab42e5f29",
  measurementId: "G-4PRSHWJ88Z"
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
  
  
  
