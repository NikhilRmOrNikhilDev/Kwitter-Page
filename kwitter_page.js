//YOUR FIREBASE LINKS
// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
      apiKey: "AIzaSyDpfsQ4r-nJoLNjDRBSGdzgtC0Yc0aNfaM",
      authDomain: "a2a2-ac153.firebaseapp.com",
      projectId: "a2a2-ac153",
      storageBucket: "a2a2-ac153.appspot.com",
      messagingSenderId: "325820001567",
      appId: "1:325820001567:web:280c2c0fb8a7d0341ed42a"
    };
    
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);
room_name = localStorage.getItem("room_name");
username = localStorage.getItem("username");
function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;

         //Start Code
           name1 = message_data['name'];
           message = message_data['message'];
           like = message_data['like'];

           n_w_t = "<h4> " + name1 + "<img class='tick_mark' src='tick.png'></h4>";
           m_w_t = "<h4 class='message_h4'>" + message + "</h4>";
           l_btn = "<button class='btn btn-warning' id="+firebase_message_id+" value="+like+" onclick='updateLike(this.id)'>";
           s_w_t = "<span class='glyphicon glyphicon-thumbs-up'>Like: "+ like +"</span></button><hr>"

           row = n_w_t + m_w_t +l_btn + s_w_t;
           document.getElementById("output").innerHTML += row;
         //End Code
      } });  }); }
getData();

function updateLike(message_id){
  button_id = message_id;
  likes = document.getElementById(button_id).value;
  updated_likes = Number(likes) + 1;

  firebase.database().red(room_name).child(message_id).update({
    like : updated_likes
  })
}

function send(){
      msg = document.getElementById("msg").value;
      firebase.database().ref(room_name).push({
            name:username,
            message:msg,
            like:0
      });

      document.getElementById("msg").value = "";
}
function logout(){
      localStorage.removeItem("username");
      localStorage.removeItem("room_name");
      window.location = "index.html";
}