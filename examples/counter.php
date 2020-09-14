<?php 
$count = file_get_contents("counter.dat");
$count += 1;
file_put_contents("counter.dat",$count);
echo $count;
exit;
?>