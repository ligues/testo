<?php
use \Firebase\JWT\JWT;

// Application middleware

// e.g: $app->add(new \Slim\Csrf\Guard);

class Middleware {
	protected $container;

	public function __construct($container){
		$this->container = $container;
	}
}


class AuthMiddleware extends Middleware {

	public function __invoke($request, $response, $next){

        try {
			$authArray = $request->getHeader("Authorization");		
			if (count($authArray) > 0){
				$jwt = $authArray[0];
		        $key = $this->container->get('settings')['app']['JWTKey'];;

		        $decoded = JWT::decode($jwt, $key, array('HS256'));		

		        //print_r($jwt);    
		        //print_r($decoded);    


				$response = $next($request, $response);

				return $response;
			} else {
				$data = [ 'msg' => 'Authorization header missing'];
				return $response->withStatus(501)->withJson(json_encode($data));				
			}
        } catch (Firebase\JWT\SignatureInvalidException $e) {
			 $data = [ 'msg' => 'Invalid Signing'];
			return $response->withStatus(401)->withJson(json_encode($data));
		}
	}
}