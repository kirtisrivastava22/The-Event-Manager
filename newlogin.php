<?php
    // getting all values from the HTML form
   
    {
        $gotpassword = $_POST['password'];
        $email = $_POST['email'];
    }

    // database details
    $host = "localhost";
    $usernameoff = "root";
    $passwordoff = "";
    $dbname = "event";

    // creating a connection
    $con = new mysqli($host,$usernameoff, $passwordoff, $dbname);

    // to ensure that the connection is made
    if ($con->connect_error)
    {
        die("Connection failed!" . mysqli_connect_error());
    }
    $sql = "SELECT email, username, password FROM users";
    $result = $con->query($sql);
    $no=0;
    if ($result->num_rows > 0) {
      // output data of each row
      while($row = $result->fetch_assoc()) {
        if($row["email"]==$email){
            $no=$no+1;
            if($row["password"]==$gotpassword){
                    // this means the password is corrct. Allow user to login
                    session_start();
                    $_SESSION["username"] = $username;
                    $_SESSION["email"] = $email;
                    $_SESSION["loggedin"] = true;
                        //Redirect user to welcome page
                        header("location: corporate.html");
                        }    
            
            else{
                $err = "Wrong Password,Please enter correct password";
                header("location:login.html");
            }
        }
        if($no==0){
            echo"email not registered";
            header("location: signin.html");

        }
      }
    }
      //Redirect user to welcome page
      else{
     echo "First signup to login";
     header("location: signin.html");
      }
    // close connection
    mysqli_close($con);
    
