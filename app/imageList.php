<?php

  echo '{"images":'. json_encode(glob("output/*.{jpg}", GLOB_BRACE)) .'}';

?>