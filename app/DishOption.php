<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DishOption extends Model
{
    protected $fillable = [
        'name',
        'description'
    ];
}
