<?php

   header('Content-Type: text/html; charset=utf-8');

   ini_set('error_reporting', E_ALL);
   ini_set('display_errors', 1);
   ini_set('display_startup_errors', 1);

   session_start();
?>

<html>

<head>
  <link href="https://fonts.googleapis.com/css?family=Roboto+Slab&display=swap" rel="stylesheet">
  <meta name="viewport" content="width=device-width, initial-scale=1">
  <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css" integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh" crossorigin="anonymous">
  <link rel="stylesheet" href="css/style.css">
  <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
  <title>Я в профессии</title>
</head>

<body>
  <nav class="navbar navbar-expand-lg navbar-ligh">
    <div class="container">
      <div>
        <h3>Я в профессии</h3>
      </div>
      <div>
        <a class="navbar-brand text-dark">
          <img class="logo" src="img/logo.png">
        </a>
      </div>
    </div>
  </nav>

  <div class="container">


    <div id="game">
      <div class="selectGame">
        <a>Я учитель</a>
        <a>Я вожатый</a>
      </div>

      <div id="parameters"></div>

      <div id="introductionText"></div>
      <a id="confirmIntroduction">Далее</a>

      <div id="rulesText"></div>
      <a id="startGameButton">Начать игру</a>

      <div id="questionText"></div>
      <div id="answersButton">
        <a>Да</a>
        <a>Нет</a>
      </div>

      <div id="consequenceText"></div>
      <a id="confirmConsequenceButton">Понял, принял</a>

      <div id="endGameText">Конец игры.</div>

      <a id="restartGameButton">Заново</a>
    </div>
  </div>

  <footer class="footer">
    <div class="container">
      <div class="row">
        <div class="col">
          <p class="text-left">+79045846902</p>
        </div>
        <div class="col">
          <p class="text-right">oktjabrina@omgpu.ru</p>
        </div>
      </div>
    </div>
  </footer>
  <script src="scripts/main.js"></script>

</body>

</html>
