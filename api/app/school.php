<?php
namespace App;

use Illuminate\Database\Eloquent\Model;

class School extends Model {

    protected $fillable = array('school','university_id','level_id');

}