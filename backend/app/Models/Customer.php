<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Customer extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'email',
        'phone',
        'company',
        'address',
        'user_id',
    ];

    // ユーザーとのリレーションを定義
    public function user()
    {
        return $this->belongsTo(User::class);
    }
}
