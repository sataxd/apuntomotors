<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Concerns\HasUuids;
use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Complaint extends Model
{
    use HasFactory, HasUuids;
    public $incrementing = false;
    protected $keyType = 'string';
    
    protected $fillable = [
        'correlative', 'fullname', 'document_type', 'document_number', 
        'phone', 'email', 'department', 'province', 'district', 'address', 
        'contract_type', 'claimed_amount', 'product_description', 
        'type', 'incident_date', 'order_number', 'details', 'status'
    ];
}
