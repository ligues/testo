<?php

// Leagues Api.

use \Firebase\JWT\JWT;
use Illuminate\Database\Capsule\Manager as DB;


$app->post('/questions/{class}/{questions}', function ($request, $response, $args) use ($app) {

    
    $authArray = $request->getHeader("Authorization");

    if(!$authArray){
        return $response
            ->withStatus(500)
            ->withHeader('Content-Type', 'text/html')
            ->write('Authorization not found');
    }
    
    try {
        $jwt = $authArray[0];
        $key = $app->getContainer()->get('settings')['app']['JWTKey'];;
        $jwtArray = JWT::decode($jwt, $key, array('HS256'));     
    } catch (Exception $e) {
        return $response
            ->withStatus(500)
            ->withHeader('Content-Type', 'text/html')
            ->write('Wrong Token');
    } 

    $value = json_decode($request->getBody());


    $data = DB::select(" 

        SELECT * FROM questions  
        where class_id = ".$args['class'] . "
        ORDER BY RAND()
        LIMIT ".$args['questions']  
    );


    $questions = array();

    $i = 0;
    foreach ($data as $question) {  
        $questions[$i]["question_id"] = $question->id;
        $questions[$i]["question"] = $question->question;
        $questions[$i]["image"] = $question->image;
        $questions[$i]["class_id"] = $question->class_id;
        $questions[$i]["answer"] = $question->answer; 

        $tmp_answers= array();

        $tmp_answers[0]["answer"] = $question->answer;
        $tmp_answers[0]["valid"] = 1;
        $tmp_answers[1]["answer"] = $question->wrong_answer_1;
        $tmp_answers[1]["valid"] = 0;
        $tmp_answers[2]["answer"] = $question->wrong_answer_2;
        $tmp_answers[2]["valid"] = 0;
        $tmp_answers[3]["answer"] = $question->wrong_answer_3;
        $tmp_answers[3]["valid"] = 0;
        $tmp_answers[4]["answer"] = $question->wrong_answer_4;
        $tmp_answers[4]["valid"] = 0;
        
        shuffle($tmp_answers);

        $questions[$i]["answers"] = $tmp_answers;

        $i++;

    }

    $arr = $questions;

    return $this->response->withJson($arr);





});
