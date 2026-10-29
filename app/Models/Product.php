<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Product extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'sku',
        'price',
        'pv',
        'bv',
        'commission_rate',
        'active',
    ];

    protected $casts = [
        'price' => 'decimal:2',
        'commission_rate' => 'decimal:4',
        'active' => 'boolean',
    ];

    public function orders()
    {
        return $this->hasMany(Order::class);
    }
}
