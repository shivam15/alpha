<?php 
$file_name = $_FILES['ufile']['name'];
$path_parts = pathinfo($file_name);
$random_digit=rand(0000,9999);
$new_file_name=$file_name;
mkdir($random_digit, 0777, true);

$path= "img/IMAGES".'/'.$new_file_name;
if(copy($_FILES['ufile']['tmp_name'], $path))
{
	echo "The upload is successful<BR/>"; 
	echo "File Renamed to: ".$new_file_name." for processing.<BR/>"; 
	echo "File Size :".$_FILES['ufile']['size']."<BR/>"; 
	echo "<strong><a style='color:#6A8DBC; text-decoration:none' href='".$link_address."'>Proceed to the next phase of the importation of data to the system</a></strong></br>";
}
else
{
	echo "Error";
}

$zip = new ZipArchive;
$res = $res = $zip->open($path);
if ($res === TRUE) {
	$zip->extractTo("img/IMAGES/".$path_parts['filename'].'/');
	$zip->close();
	echo 'extraction successful';
	header("Location:https://xxx.com/xxx-backend/xxx-vendor/#/addProduct"); /* Redirect browser */
      exit();
} else {
	echo 'extraction error';
}
?>