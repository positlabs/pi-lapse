<?php

$thumbsFolder = 'output/thumbs/';
$mediumFolder = 'output/medium/';
$originalsFolder = 'output/';

$originals = glob("output/*.jpg");
$thumbs = glob("output/thumbs/*.jpg");

// only process the images that are missing
$diff = array_diff($originals, $thumbs);
foreach ($diff as $file) {
  processImage($file, $thumbsFolder, 150);
  processImage($file, $mediumFolder, 600);
}

function processImage($imagePath, $outputFolder, $targetWidth){

  $imageSize = getimagesize($imagePath);
  $originalWidth = $imageSize[0];
  $originalHeight = $imageSize[1];
  $targetHeight = round($originalHeight * $targetWidth / $originalWidth);

  $urlElements = explode("/", $imagePath);
  $fileName = array_pop($urlElements);
  $fileName = explode(".", $fileName);
  $ext = array_pop($fileName);
  $newFilePath = $outputFolder.join($fileName, "").".".$ext;

  if(file_exists($newFilePath)) {

  } else {
          $im = imagecreatefromjpeg($imagePath);
          $sm = imagecreatetruecolor($targetWidth, $targetHeight);
          imagealphablending($sm, false);
          imagecopyresampled($sm, $im, 0, 0, 0, 0, $targetWidth, $targetHeight, $originalWidth, $originalHeight);
          imagejpeg($sm, $newFilePath, 75);
  }
}

?>