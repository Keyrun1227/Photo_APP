window.addEventListener('DOMContentLoaded', function () {
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
        firebase.initializeApp(firebaseConfig);
        const storage = firebase.storage();
        document.getElementById('file-upload-form').addEventListener('submit', function (event) {
            event.preventDefault();
    
            // Get the event details from the form
            const eventName = document.getElementById('name').value;
            const eventPhoneNumber = document.getElementById('phone_number').value;
            const eventId = document.getElementById('event-id').value;
    
            // Get the selected file from the file input
            const fileInput = document.getElementById('file-upload');
            const file = fileInput.files[0];
    
            // Check if the event folder exists in the "ADMIN" bucket
            checkEventFolderExists(eventId)
                .then((folderExists) => {
                    if (folderExists) {
                        // Upload the photo to the event folder
                        uploadPhotoToEventFolder(eventId, file, eventName, eventPhoneNumber)
                            .then(() => {
                                console.log('Photo uploaded to event folder:', eventId);
                                // Reset the form fields
                                document.getElementById('name').value = '';
                                document.getElementById('phone_number').value = '';
                                // document.getElementById('event-id').value = '';
                                fileInput.value = '';
    
                                // Redirect to "success.html" after successful upload
                                window.location.href = "success.html";
                            })
                            .catch((error) => {
                                console.error('Error uploading photo:', error);
                            });
                    } else {
                        // Show an error message to the user that the event folder does not exist
                        console.error('Event folder does not exist:', eventId);
                    }
                })
                .catch((error) => {
                    console.error('Error checking event folder:', error);
                });
        });
    
        // Function to check if the event folder exists in the "ADMIN" bucket
        function checkEventFolderExists(eventId) {
            const eventStorageRef = storage.ref().child('ADMIN/' + eventId);
            return eventStorageRef.listAll()
                .then(() => true) // Folder exists
                .catch(() => false); // Folder does not exist
        }
    
        // Function to upload the photo to the event folder in the "ADMIN" bucket
        function uploadPhotoToEventFolder(eventId, file, name, phoneNumber) {
            const eventStorageRef = storage.ref().child('ADMIN/' + eventId + '/' + name + '_' + phoneNumber);
            return eventStorageRef.put(file);
        }
    });