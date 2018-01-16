<?php

// Leagues Api.

use \Firebase\JWT\JWT;
use Illuminate\Database\Capsule\Manager as DB;

$app->post('/classes/{class}/{questions}', function ($request, $response, $args) use ($app) {

    
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


    $questions = DB::select("

        SELECT * FROM questions
        where class_id = ".$args['class'] . "
        ORDER BY RAND()
        LIMIT ".$args['questions'] 
    );


    $arr = array('questions' => $questions);

    return $this->response->withJson($arr);





});

