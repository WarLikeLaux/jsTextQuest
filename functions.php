<?php

ini_set('error_reporting', E_ALL);
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);

function jsonDeserialze($json, $class)
{
    //Timer::start();
    $decoded_object = json_decode($json);
    foreach ($decoded_object as $key => $value) {
        $class->$key = $value;
    }
    //echo "Функция " . debug_backtrace()[0]['function'] . " заняла " . number_format(Timer::finish() * 1000 * 1000, 15) . " микросекунд<br/>";
    return $class;
}
