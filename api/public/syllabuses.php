<?php

// Leagues Api.

use \Firebase\JWT\JWT;
use Illuminate\Database\Capsule\Manager as DB;

$app->post('/syllabuses/{school}', function ($request, $response, $args) use ($app) {

    
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



    if($value->type_id==="1"){

    $sql = "
        select c.id class_id,class, a.area, a.id area_id, sy.short as number
        from syllabuses sy
            inner join classes c on c.id = sy.class_id 
            inner join areas a on c.area_id = a.id
        where school_id = ".$args['school'] . " 
        order by a.id  ";

    }
    else{
         $sql = "
        select c.id class_id,class, a.area, a.id area_id, sy.complete as number
        from syllabuses sy
            inner join classes c on c.id = sy.class_id 
            inner join areas a on c.area_id = a.id
        where school_id = ".$args['school'] . " 
        order by a.id  ";
    }


    $classes = DB::select($sql);


    


    $arr = $classes;

    return $this->response->withJson($arr);





});

