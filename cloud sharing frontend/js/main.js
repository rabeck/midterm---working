var userCredentials = {
  userName: "",
  userPass: "",
  userID: ""
};

$(document).ready(function(){
    //Handles menu drop down
    $('.dropdown-menu').find('form').click(function (e) {
        e.stopPropagation();
    });

    $("#form-user").on("submit", function(e) {
      e.preventDefault();
      userText = $("#inputEmail").val();
      userPass = $("#inputPassword").val();
      var validUser = true;
      var validPass = true;
      console.log(userText);
      console.log(userPass);
      var findUser = function() {
        for (var i=0; i<mockUserList.length; i++) {
          console.log(i);
          if (mockUserList[i].userName === userText) {
            console.log("userName found! :)");
            console.log("user ID: " + mockUserList[i].refid);
            userCredentials.userName = mockUserList[i].userName;
            userCredentials.userID = mockUserList[i].refid;
            // return mockUserList[i].refid;

          }
          if (mockUserList[i].email === userText) {
            console.log("userEmail found :)");
            console.log("user ID: " + mockUserList[i].refid);
            userCredentials.userName = mockUserList[i].email;
            userCredentials.userID = mockUserList[i].refid;
            // return mockUserList[i].refid;
          };
        };
        return validUser = false;
      };
      // var credentialsCorrect = function(f) {
      //   if (validUser === false) {
      //     f.preventDefault();
      //     $("#panel-popover").popover();
      //   };
      // };
      var checkPass = function(checkUser) {
        if (mockUserList[userCredentials["userID"]].password === userPass) {
          console.log("password correct!");
          userCredentials.userPass = mockUserList[userCredentials["userID"]].password;
        }
        // if (mockUserList[findUser].password === undefined) {
        //   return (validUser = false);
        // }
        else {
          validPass = false;
          console.error("Password incorrect");
        };
        return validPass;
      };

      var isUserValid = function() {
        console.log(checkUser);
        console.log(validUser);
        if ( mockUserList[userCredentials["userID"]].isActive === false ) {
          console.error("User account is not active");
          $("#panel-popover").popover({content:"User account is not active. Please contact us!"}, {placement:"auto right"});
        }
        if ( validPass === false ) {
          console.error("Password incorrect");
          $("#panel-popover").popover({content:"Username or Password Incorrect"});
        // credentialsCorrect();
        }
        return validUser;
      }; 

      storeCredentials = function() {

            if(window.localStorage) {
            // set local storage if available
            // encrypts password with CryptoJS
            var encodedPass = CryptoJS.AES.encrypt(userPass, "passphrase");
            // decrypt password
            // var decrypted = CryptoJS.TripleDES.decrypt(localStorage.getItem("encodedPass"), "passphrase");
            localStorage.setItem("userName", userText);
            localStorage.setItem("encodedPass", encodedPass);
            location.replace("bootply_dashboard.html");
            // retrieve key value pairs
            // var value = localStorage.getItem(key);
            } else {
            console.error("No local storage!!")
            // do something else instead as localStorage is not available
            };
        };
    // DOM manipulation
    // findUser();
    checkUser = findUser();
    checkCredentials = checkPass(checkUser);

    isUserValid(checkCredentials);
    storeCredentials();
    });
});