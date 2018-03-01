<?php

// Leagues Api.

use \Firebase\JWT\JWT;
use Illuminate\Database\Capsule\Manager as DB;


$app->post('/tests/', function ($request, $response, $args) use ($app) {

    
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
    

    $sql = "select * from syllabuses
            where school_id = " . $value->school_id;


    $syllabuses = DB::select($sql);

    $questions = array();


    

    foreach ($syllabuses as $syllabus) {
        

        $sql = "";

         if($value->type_id==="1"){
            $sql = "SELECT * FROM questions  
            where class_id = ".$syllabus->class_id . "
            ORDER BY RAND()
            LIMIT "."1";//$syllabus->short ;
        }
        else{
             $sql = "SELECT * FROM questions  
            where class_id = ".$syllabus->class_id . "
            ORDER BY RAND()
            LIMIT ".$syllabus->complete ;
        }

        $data = DB::select($sql); 


        foreach ($data as $question) {
        
           array_push($questions, $question);

        }

    }


    $questions_return = array();

    $i = 0;

    foreach ($questions as $question) {  
        $questions_return[$i]["question_id"] = $question->id;
        $questions_return[$i]["question"] = $question->question;
        $questions_return[$i]["image"] = $question->image;
        $questions_return[$i]["class_id"] = $question->class_id;
        $questions_return[$i]["answer"] = $question->answer;

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

        $questions_return[$i]["answers"] = $tmp_answers;

        $i++;

    }


    shuffle($questions_return);

    $return = array('test_id' => 0,'questions' => $questions_return);

    return $this->response->withJson($questions_return);

});


$app->post('/tests/add', function ($request, $response, $args) use ($app) {

    
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


    DB::insert("INSERT INTO tests values(null,$value->user_id,NOW(),0,$value->type_id,$value->school_id)");

    $test_id = DB::getPdo()->lastInsertId();
    


    $answers = json_decode($value->answers);
    
    //print_r($answers);

    foreach ($answers as $answer) {

        DB::insert("INSERT INTO test_answers values($test_id,$answer->question_id,'$answer->answer',$answer->correct,'$answer->answer_correct')");

    }

        $sql = "";

         
        $sql = "select count(*) total
                from tests T inner join test_answers TA on T.id = TA.test_id
                where T.id = $test_id

                UNION 

                select count(*) 
                from tests T inner join test_answers TA on T.id = TA.test_id
                where T.id = $test_id
                and TA.correct = 1";
        

        $data = DB::select($sql);

        $total = $data[0]->total;
        $corrects = $data[1]->total;
        $result = ($corrects / $total) * 100;




    $return = array('test_id' => $test_id,
                'total' => $total,
                'corrects' => $corrects,
                'result' => $result);
    

       

    return $this->response->withJson($return);





});
