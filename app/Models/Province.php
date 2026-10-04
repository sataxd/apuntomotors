<?php
namespace App\Models;
use Illuminate\Database\Eloquent\Model;

class Province extends Model {
    public $incrementing = false;
    protected $keyType = 'string';
    public $timestamps = false;
    protected $fillable = ['id', 'department_id', 'description', 'active'];

    public function districts() {
        return $this->hasMany(District::class);
    }
}