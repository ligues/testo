<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class User_account extends Model {

    protected $fillable = array('password','email', 'salt');

}