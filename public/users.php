<?php

// User_accounts Api.

use \Firebase\JWT\JWT;
use Illuminate\Database\Capsule\Manager as DB;


$app->post('/User_accounts/login', function ($request, $response, $args) use ($app) {

    // Get User_account by field
    $value = json_decode($request->getBody());
    
    $User_account = App\User_account::where('username', $value->username)
                            //->where('password', hash('sha512',$value->password))
                            ->first();

    $password = hash('sha512', $value->password . $User_account->salt );


    if ($User_account->password == $password) {
        $key = $app->getContainer()->get('settings')['app']['JWTKey'];;
        $token = array(
            "iss" => "http://example.org",
            "aud" => "http://example.com",
            "iat" => time(),
            //"nbf" => 1357000000,
            "id" => $User_account->user_id,
            "email" => $User_account->username
        );

        $jwt = JWT::encode($token, $key);
        $arr = array('token' => $jwt, 'user_id' => $User_account->user_id, 'username' => $User_account->username);

        return $this->response->withJson($arr);


    } else {

        $error = array(
            "error" => "User_account not found or invalid password"
            );

         return $this->response->withJson($error);
        
    }

     
    
});
