<?php

namespace App;

use Illuminate\Database\Eloquent\Model;

class DishOptionValue extends Model
{
    protected $fillable = [
        'description',
        'place_number'
    ];
}
