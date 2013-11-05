<?php

  include('thumb-gen.php');

  echo '{';
  echo '"images":'. json_encode(glob("output/*.{jpg}", GLOB_BRACE)) .',';
  echo '"medium":'. json_encode(glob("output/medium/*.{jpg}", GLOB_BRACE)) .',';
  echo '"thumbs":'. json_encode(glob("output/thumbs/*.{jpg}", GLOB_BRACE));
  echo '}';

?>