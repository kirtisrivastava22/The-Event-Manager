<?php
    // getting all values from the HTML form
   
    {
        $username = $_POST['username'];
        $password = $_POST['password'];
        $email = $_POST['email'];
    }

    // database details
    $host = "localhost";
    $usernameoff = "root";
    $passwordoff = "";
    $dbname = "event";

    // creating a connection
    $con = mysqli_connect($host,$usernameoff, $passwordoff, $dbname);

    // to ensure that the connection is made
    if (!$con)
    {
        die("Connection failed!" . mysqli_connect_error());
    }

    // using sql to create a data entry query
    $sql = "INSERT INTO users (email, username, password) VALUES ('$email', '$username', '$password')";
  
    // send query to the database to add values and confirm if successful
    $rs = mysqli_query($con, $sql);
    if($rs)
    {
        echo "Entries added!";
    }
     //Redirect user to welcome page
     header("location: login.html");

    // close connection
    mysqli_close($con);
    
?>