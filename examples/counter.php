<?php 

$page = "";
if(isset($_GET['page'])){
    $page = $_GET['page'];
}

if(!file_exists("counter-{$page}.dat")){
    $myfile = fopen("counter-{$page}.dat", "w") or die("Unable to open file!");
    $txt = "0";
    fwrite($myfile, $txt);    
    fclose($myfile);
}

$count = file_get_contents("counter-{$page}.dat");
$count += 1;
file_put_contents("counter-{$page}.dat",$count);
echo $count;
exit;
?>