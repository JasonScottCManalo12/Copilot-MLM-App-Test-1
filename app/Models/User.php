<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class User extends Model
{
    use HasFactory;

    protected $fillable = [
        'first_name',
        'last_name',
        'email',
        'sponsor_id',
        'plan_id',
        'status',
        'rank',
        'city',
        'country',
    ];

    public function sponsor()
    {
        return $this->belongsTo(User::class, 'sponsor_id');
    }

    public function downline()
    {
        return $this->hasMany(User::class, 'sponsor_id');
    }

    public function plan()
    {
        return $this->belongsTo(Plan::class);
    }

    public function orders()
    {
        return $this->hasMany(Order::class);
    }

    public function commissions()
    {
        return $this->hasMany(Commission::class);
    }
}
