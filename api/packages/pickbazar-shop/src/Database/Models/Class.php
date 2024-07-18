<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;


class Customer extends Model
{
    use HasFactory;
    protected $table = 'class'; // here we relate our model with its table by giving table_name
    protected $primarykey = 'id';  // here the table primary key

    // above two codes are fixed we have to do this with every modal

}
