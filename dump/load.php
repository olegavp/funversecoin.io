<?php 
/* 
source: https://codeshack.io/super-fast-php-mysql-database-class/

*/ 
if (!$_COOKIE['disclaimer'] or $_COOKIE['disclaimer'] !== '1' or !$_COOKIE['terms'] or $_COOKIE['terms'] !== '1') {
    return false;
}

$ip = $_SERVER['REMOTE_ADDR'];
echo $ip;
include 'db.php';

$dbhost = 'localhost';
$dbuser = 'fanverse_usr';
$dbpass = 'lMAjNsw2nqaCUpqe';
$dbname = 'fanverse';

$db = new db($dbhost, $dbuser, $dbpass, $dbname);

/* Fetch a record from a database: */

$ipin = $db->query('SELECT * FROM ip WHERE ip = ?', $ip)->fetchArray();
if (count($ipin) > 0) {
	return true;
} else {
	$insert = $db->query('INSERT INTO ip (ip) VALUES (?)', $ip);
	if ($insert->affectedRows() == 1) {
		return true;
	} else {
		return false;
	}
}
