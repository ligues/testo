<?php

// Leagues Api.

use \Firebase\JWT\JWT;
use Illuminate\Database\Capsule\Manager as DB;

$app->post('/schools/{level}', function ($request, $response, $args) use ($app) {

    
    

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


    $schools = DB::select("
        select s.id school_id, school, university
        from schools s
            inner join universities u on s.university_id = u.id
        where level_id = ".$args['level'] . " 
        Order by school"
    );


    $arr = array('schools' => $schools);

    return $this->response->withJson($arr);





});

