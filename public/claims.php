 <?php

// Leagues Api.

use \Firebase\JWT\JWT;
use Illuminate\Database\Capsule\Manager as DB;

$app->post('/claims/coverage', function ($request, $response, $args) use ($app) {

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


    $coverages = DB::select("

SELECT
    B.icontract_id1 AS 'icid',
	B.svehicle_id_number AS 'vin',
    @trans := (SELECT transaction_type FROM uat_pricebook.z_contracts WHERE icontract_id = A.icontract_id ORDER BY dtcreated DESC LIMIT 1) AS 'z_transaction',
    DATE(A.dtcreated) AS dtcreated,
    A.sale_date AS sale_date,
    @expire := (SELECT DATE(dtcontract_expiration) FROM uat_production.rdv_43_raw WHERE stype = 'CONTRACT' AND icontract_id1 = A.icontract_id ORDER BY dtcreated DESC limit 1) AS expiration,
    case
		when @trans = 'Cancellation' then 'Canceled'
        when @trans = 'Activation' AND (A.expiration_date = '0000-00-00' OR A.expiration_date >= CURDATE()) then 'Active'
        when @trans = 'Reinstatement' then 'Active *'
		when A.expiration_date = '0000-00-00' then 'Active **'
		when A.expiration_date <= CURDATE() then 'Expired'
        else ''
		end AS transaction,
    A.scontract_no AS 'contract_no',
		A.splan AS 'pc',
    A.ratebook AS 'rb',
    A.contract_type AS contract_type,
    C.loss_code,
    D.description_friendly,
    D.claims_display,
    D.flow_id,
    B.sprog_desc
FROM
	uat_pricebook.z_contracts AS A
INNER JOIN
	uat_production.rdv_43_raw AS B
ON
	A.icontract_id = B.icontract_id1 AND A.transaction_type = B.stransaction_type /* AND (B.stransaction */
INNER JOIN
	uat_production.rdv_claims_losscodes AS C
ON
	C.plan_code = A.splan AND C.ratebook = A.ratebook
INNER JOIN
	uat_production.rdv_claims_components AS D
ON
	D.loss_code = C.loss_code AND D.claims_display = 1
WHERE
	B.icontract_id1 = '".$value->contract."'
GROUP BY
	D.description_friendly
ORDER BY 
	D.description_friendly ASC



    	");


    $arr = array('coverages' => $coverages);

    return $this->response->withJson($arr);





});

