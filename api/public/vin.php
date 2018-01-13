<?php

// Leagues Api.

use \Firebase\JWT\JWT;
use Illuminate\Database\Capsule\Manager as DB;

$app->post('/vin/lockup', function ($request, $response, $args) use ($app) {

    
    

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
   
    //$user = App\User_account::find($jwtArray->id);

    $value = json_decode($request->getBody());


    $contracts = DB::select("SELECT 
A.icontract_id,
B.scontract_holder_fname AS firstname,
B.Textbox11 AS lastname,
B.scontract_holder_city,
B.scontract_holder_state,
A.vin,
B.ivehicle_year,
B.smake,
B.smodel,
DATE(B.dtcontract_sale_date) AS sale_date,
B.scontract_no,
C.plan_desc_friendly AS plan_desc,
@stat := (SELECT stransaction_type FROM uat_production.rdv_43_raw WHERE icontract_id1 = A.icontract_id ORDER BY dtcreated DESC, stransaction_type DESC LIMIT 1) AS cstatus,
(SELECT DATE(dtcontract_expiration) FROM uat_production.rdv_43_raw WHERE icontract_id1 = A.icontract_id ORDER BY dtcreated DESC, stransaction_type DESC LIMIT 1) AS expiration,
case
    when @stat = 'Cancellation' then (SELECT DATE(dtcontract_eff_cancell) FROM uat_production.rdv_43_raw WHERE icontract_id1 = A.icontract_id ORDER BY dtcreated DESC, stransaction_type DESC LIMIT 1) 
    else '0000-00-00'
end AS cancellation,
B.sdealer_number,
B.sdealer_name   
FROM
uat_production.rdv_vin_lookup AS A
INNER JOIN
uat_production.rdv_43_raw AS B
ON A.icontract_id = B.icontract_id1
INNER JOIN
uat_pricebook.plan_legend AS C 
ON B.splan = C.plan_code AND B.rate_book = C.ratebook
WHERE
A.vin LIKE '%".$value->vin."%'
GROUP BY 
A.icontract_id
ORDER BY
cstatus ASC, B.dtcreated DESC;");


    $arr = array('contracts' => $contracts);

    return $this->response->withJson($arr);





});

