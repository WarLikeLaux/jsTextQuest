<?php
require_once("classes.php");
require_once("functions.php");

header('Content-Type: application/json');

$game = new Game();

$game = jsonDeserialze(file_get_contents($_GET["gameName"] .".json"), $game);

// $game->fixQuestions();

// $game->fixParameters();

echo json_encode($game, JSON_PRETTY_PRINT | JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
