<?php

// Users Api.

use \Firebase\JWT\JWT;
use Illuminate\Database\Capsule\Manager as DB;


//TODO: Revisar las funciones que se usan y las que no.

$app->get('/users', function ($request, $response, $args) {

    $all = App\User::all();
    return $this->response->withJson($all);
});

$app->get('/users/{id}', function ($request, $response, $args) {
    // Get user by id
    $userById = App\User::find($args['id']);
    if ($userById)
        return $this->response->withJson($userById);
    else 
        return $this->response->withJson("{}");
});

$app->post('/users', function ($request, $response, $args) {


    //TODO: Agregar validación de usuario que ya existe

    $allUsers = App\User::all();
    $value = json_decode($request->getBody());

    // Create a new user
    $user = new App\User(array(
        'user' => $value->user,
        'password' => hash('sha512',$value->password)
    ));
    $user->save();

    return $this->response->withJson($allUsers);


});

$app->put('/users/{id}', function ($request, $response, $args) {

    // Get user by id
    $user = App\User::find($args['id']);    
    $value = json_decode($request->getBody());
    $user->email = $value->email;
    $user->save();

    return $this->response->withJson($user);
});

$app->delete('/users/{id}', function ($request, $response, $args) {

    $user = App\User::find($args['id']);
    if ($user)
        $user->delete();
    $allUsers = App\User::all();

    return $this->response->withJson($allUsers);
});

$app->post('/users/login', function ($request, $response, $args) use ($app) {

    //TODO: Cambiar el dominio que se usa para le token

    $value = json_decode($request->getBody());
    
    $user = App\User::where('user', $value->user)
                            ->where('password', hash('sha512',$value->password))
                            ->first();
    if ($user){
        $key = $app->getContainer()->get('settings')['app']['JWTKey'];;
        $token = array(
            "iss" => "http://example.org",
            "aud" => "http://example.com",
            "iat" => time(),
            //"nbf" => 1357000000,
            "id" => $user->id,
            "email" => $user->user
        );

        $jwt = JWT::encode($token, $key);
        $arr = array('token' => $jwt, 'id' => $user->id, 'user' => $user->user);


        

        return $this->response->withJson($arr);


        //$decoded = JWT::decode($jwt, $key, array('HS256'));

        //print_r($jwt);    
        //print_r($decoded);    
    } else {

        $error = array(
            "error" => "User not found or invalid password"
            );

         return $this->response->withJson($error);
        
    }
    
});
