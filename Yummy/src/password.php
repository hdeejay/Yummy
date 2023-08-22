<?php
    $host =  'localhost';
    $user = 'root';
    $password = '';

    // Set DSN
    $dsn = 'mysql:host='. $host;

    // Create a PDO instance
    $pdo = new PDO($dsn, $user, $password);
    $pdo->setAttribute(PDO::ATTR_DEFAULT_FETCH_MODE, PDO::FETCH_OBJ);
    $pdo->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);
    
    $sql_use_database = 'USE yummy;';
    $stmt = $pdo->prepare($sql_use_database);
    $stmt->execute();
    $statusMsg = '';

    $targetDir = "img/";
    $fileName = basename($_FILES["image"]["name"]);
    $targetFilePath = $targetDir . $fileName;
    $fileType = pathinfo($targetFilePath, PATHINFO_EXTENSION);
    echo $_FILES["image"]["tmp_name"] . '<br>';
    echo $targetFilePath . '<br>';
    if(isset($_POST["submit"]) && !empty($_FILES["image"]["name"])){
        // Allow certain file formats
        $allowTypes = array('jpg','png','jpeg','gif','pdf');
        if(in_array($fileType, $allowTypes)){
            // Upload file to server
            if(move_uploaded_file($_FILES["image"]["tmp_name"], $targetFilePath)){
                // Insert image file name into database
                $insert = $pdo->query("INSERT into images (file_name, uploaded_on) VALUES ('".$fileName."', NOW())");
                if($insert){
                    $statusMsg = "The file ".$fileName. " has been uploaded successfully.";
                }else{
                    $statusMsg = "File upload failed, please try again.";
                } 
            }else{
                $statusMsg = "Sorry, there was an error uploading your file.";
            }
        }else{
            $statusMsg = 'Sorry, only JPG, JPEG, PNG, GIF, & PDF files are allowed to upload.';
        }
    }else{
        $statusMsg = 'Please select a file to upload.';
    }

    // Display status message
    echo $statusMsg;
    $query = $pdo->query("SELECT * FROM images ORDER BY uploaded_on DESC");
    if($query->num_rows > 0){
        while($row = $query->fetch_assoc()){
            $imageURL = 'img/'.$row["file_name"];
    ?>
        <img src="<?php echo $imageURL; ?>" alt="" />
    <?php }
    }else{ ?>
        <p>No image(s) found...</p>
    <?php }
?>