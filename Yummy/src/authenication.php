<?php
    include 'connection.php';
    session_start();
    if ($_SESSION['status'] == 1) {
        echo "sucess";
    }
    else if ($_SESSION['status'] == 0) {
        echo "error";
    }
?>