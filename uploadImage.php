<?php
print_r("uploading......image");
$target_dir = "img/IMAGES/";
print_r($_FILES["image"]);
$name = "sn_".incrementalHash(8).".jpg";
$target_file = $target_dir .$name;
$uploadOk = 1;
$imageFileType = strtolower(pathinfo($target_file,PATHINFO_EXTENSION));
if($_POST['imageVal']==1)
setcookie("imageName1",$name);
if($_POST['imageVal']==2)
setcookie("imageName2",$name);
if($_POST['imageVal']==3)
setcookie("imageName3",$name);
if($_POST['imageVal']==4)
setcookie("imageName4",$name);
// Check if image file is a actual image or fake image
move_uploaded_file( $_FILES['image']['tmp_name'], $target_file);
    $check = getimagesize($_FILES["image"]["tmp_name"]);
    if($check !== false) {
        echo "File is an image - " . $check["mime"] . ".";
        $uploadOk = 1;
        print_r($uploadOk);
    } else {
        echo "File is not an image.";
        $uploadOk = 0;
    }
 function incrementalHash($len = 8){
  $charset = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
  $base = strlen($charset);
  $result = '';

  $now = explode(' ', microtime())[1];
  while ($now >= $base){
    $i = $now % $base;
    $result = $charset[$i] . $result;
    $now /= $base;
  }
  return substr($result, -5);
}
?>