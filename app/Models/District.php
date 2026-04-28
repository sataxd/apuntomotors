<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class District extends Model {
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;
    protected $fillable = ['id', 'province_id', 'description', 'active'];
}