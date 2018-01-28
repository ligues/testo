<?php

use \Psr\Http\Message\ServerRequestInterface as Request;
use \Psr\Http\Message\ResponseInterface as Response;
 
require '../vendor/autoload.php';
require '../app/functions.php';
require '../app/user.php';

$settings = require '../src/settings.php';
$app = new \Slim\App($settings);

// Set up dependencies
require '../src/dependencies.php';

// Register middleware
require '../src/middleware.php';

$app->get('/', function (Request $request, Response $response) {
    $name = $request->getAttribute('name');
    $response->getBody()->write("Working");

    return $response;
});

$app->getContainer()->get("db");

require 'users.php';
require 'schools.php';
require 'syllabuses.php';
require 'questions.php';
//require 'api_functions.php';


$app->run();
 