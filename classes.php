<?php

class Game
{
    public $subject;
    public $introduction;
    public $rules;
    public $parameters;
    public $questions;
    public $step;

    /*
    public function fixParameters() //поменять на https://github.com/cweiske/jsonmapper
    {
        //Timer::start();
        foreach ($this->parameters as $index => $parameter) {
            $class = new Parameter();
            foreach ($parameter as $key => $value) {
                $class->$key = $value;
            }
            $this->parameters[$index] = $class;
        }
        //echo "Функция " . debug_backtrace()[0]['function'] . " заняла " . number_format(Timer::finish() * 1000 * 1000, 15) . " микросекунд</br>";
    }
    */
}

class Question
{
    public $question;
    public $answers;
}

class Parameter
{
    public $parameter;
    public $description;
    public $default;
    public $value;
    public $winValue;
    public $winText;
    public $loseValue;
    public $loseText;
}

class Answer
{
    public $answer;
    public $impact;
    public $consequence;
}

class Timer
{
    private static $start = .0;

    public static function start()
    {
        self::$start = microtime(true);
    }

    public static function finish()
    {
        return microtime(true) - self::$start;
    }
}
