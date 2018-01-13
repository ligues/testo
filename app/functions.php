<?php

use \Firebase\JWT\JWT;
use Illuminate\Database\Capsule\Manager as DB;

function user_validation($request, $response, $args,$app){
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

    $user = App\User::find($jwtArray->id);

    print_r($user);

    return $user;
}