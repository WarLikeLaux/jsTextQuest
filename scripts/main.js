questionNumber = 0; // переменная для хранения номера текущего вопроса

var gameObject; // переменная класса Game для парсинга данных для игры

function upperFirstLetter(string) {
  return string.charAt(0).toUpperCase() + string.slice(1);
}

function arrayRandElement(arr) {
  var rand = Math.floor(Math.random() * arr.length);
  return arr[rand];
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}

function refreshParametersTables() {
  gameObject.parameters.forEach((item, i) => {
    var color;
    if (item.value == item.default) {
      color = "yellow";
    } else if (item.value < item.default) {
      color = "red";
    } else if (item.value > item.default) {
      color = "#00ff00";
    }

    for (var j = 0; j < item.winValue; j++) {
      if (j == item.value) {
        color = "white";
      }
      document.getElementById("cell:" + i + ":" + j).style.backgroundColor = color;
    }
  });
}

$('.selectGame a').click(function() {
  $.ajax({
    type: "GET",
    url: "game.php",
    dataType: "json",
    data: {
      gameName: $(this).text()
    },
    success: function(data) {

      gameObject = data;

      selectGameButtons = document.getElementsByClassName("selectGame");

      for (var i = 0; i < selectGameButtons.length; i++) {
        selectGameButtons[i].parentNode.removeChild(selectGameButtons[i]);
        i -= 1;
      }

      introductionText = document.getElementById('introductionText');
      introductionText.style.display = "block";
      introductionText.innerHTML = gameObject.introduction;

      startGameButton = document.getElementById('confirmIntroduction');
      startGameButton.style.display = "block";
    }
  });
});

$('#confirmIntroduction').click(function() {
  document.getElementById('introductionText').style.display = "none";
  document.getElementById('confirmIntroduction').style.display = "none";
  document.getElementById('rulesText').style.display = "block";
  document.getElementById('rulesText').innerHTML = gameObject.rules;
  document.getElementById('startGameButton').style.display = "block";

  gameObject.parameters.forEach((item, i) => {
    document.getElementById('parameters').innerHTML += "<p>" + item.parameter + " - " + "<span id=parameter" + i + ">" + item.default+"</span></p>";
    var table = "";
    table += "<table><tr>";
    for (var j = 0; j < item.winValue; j++) {
      table += "<td id=cell:" + i + ":" + j + "></td>";
    }
    table += "</table></tr>";
    document.getElementById('parameters').innerHTML += table;
    item.value = item.default;
  });

  refreshParametersTables();
});

$('#startGameButton').click(function() {
  document.getElementById('rulesText').style.display = "none";
  document.getElementById('startGameButton').style.display = "none";
  questionText = document.getElementById('questionText');
  questionText.style.display = "block";
  questionText.innerHTML = gameObject.questions[questionNumber].question;
  document.getElementById('answersButton').style.display = "block";
});

$('#answersButton a').click(function() {
  document.getElementById('confirmConsequenceButton').style.display = "block";
  document.getElementById('consequenceText').style.display = "block";
  var answerText = $(this).text();
  answerObject = gameObject.questions[questionNumber].answers.find(function(element) {
    return element.answer == answerText;
  })

  answerIndex = gameObject.questions[questionNumber].answers.indexOf(answerObject, 0);
  answerObject.impact.forEach((item, i) => {
    document.getElementById('parameter' + i).innerHTML = Number(gameObject.parameters[i].value) + Number(item);
    gameObject.parameters[i].value = Number(gameObject.parameters[i].value) + Number(item);
    if (item > 0) {
      document.getElementById('parameter' + i).innerHTML += "<span class='greenArrow'>↑</span>";
    } else if (item < 0) {
      document.getElementById('parameter' + i).innerHTML += "<span class='redArrow'>↓</span>";
    }
  });

  document.getElementById('consequenceText').innerHTML = gameObject.questions[questionNumber].answers[answerIndex].consequence;
  document.getElementById('questionText').style.display = "none";
  document.getElementById('answersButton').style.display = "none";

  refreshParametersTables();

});

$('#confirmConsequenceButton').click(function() {
  var continueGame = true;
  document.getElementById('confirmConsequenceButton').style.display = "none";
  document.getElementById('consequenceText').style.display = "none";

  var textCount = 0;
  var resultText;

  shuffleArray(gameObject.pretexts);

  gameObject.parameters.forEach((item, i) => {
    if (item.value == item.loseValue) {
      if (textCount == 0) {
        resultText = upperFirstLetter(item.loseText);
      } else {
        resultText = resultText + "<br /><br />" + gameObject.pretexts.pop() + item.loseText;
      }
      textCount += 1;
    } else if (item.value == item.winValue) {
      if (textCount == 0) {
        resultText = upperFirstLetter(item.winText);
      } else {
        resultText = resultText + "<br /><br />" + gameObject.pretexts.pop() + item.winText;
      }
      textCount += 1;
    }
  });

  if (textCount != 0) {
    document.getElementById('endGameText').style.display = "block";
    document.getElementById('endGameText').innerHTML = resultText;
  }

  if (textCount == 0) {
    if (++questionNumber < gameObject.questions.length) {
      document.getElementById('questionText').style.display = "block";
      document.getElementById('answersButton').style.display = "block";
      document.getElementById('questionText').innerHTML = gameObject.questions[questionNumber].question;
    } else {
      document.getElementById('endGameText').style.display = "block";
      document.getElementById('endGameText').innerHTML = gameObject.drawText;
      document.getElementById('restartGameButton').style.display = "block";
    }
  } else {
    document.getElementById('restartGameButton').style.display = "block";
  }
});

$('#restartGameButton').click(function() {
  window.location.reload();
});
