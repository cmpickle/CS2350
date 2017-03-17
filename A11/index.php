<?php
require_once 'Mobile_Detect.php';
$detect = new Mobile_Detect;
 
// Any mobile device (phones or tablets).

if ($detect->isMobile()) 
  
{
               header( 'Location: mobi/index.html' ) ;
}
        

// not a mobile device
else
  
{
echo ("<p>This would be the desktop version of my sweet photography guide. ");
echo ("unfortunately that doesn't exist.<br/>");
echo ("Please open this URL on a mobile device to see the site. I guess if you ");
echo ("really want to, you can see the sample on your ");
echo ("<a href='mobi/index.html' computer> (it will not be as pretty)</p>");
}        
 
// Any tablet device.
if( $detect->isTablet() ){
               header( 'Location: mobi/index.html' ) ; 
}
 
// Exclude tablets.
if( $detect->isMobile() && !$detect->isTablet() ){
               header( 'Location: mobi/index.html' ) ; 
}
 
// Check for a specific platform with the help of the magic methods:
if( $detect->isiOS() ){
 
echo ("<p>Your OS is iOS? I'm sorry...</p>");
}
 
if( $detect->isAndroidOS() ){
 
echo ("<p>Your OS is Android? Good choice!</p>");
}
?>