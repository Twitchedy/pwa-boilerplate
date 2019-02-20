<?php

namespace App\Http\Controllers\Api;

use Illuminate\Http\Request;
use App\Http\Controllers\Controller;

class HelloController extends Controller
{
    public function hello()
    {
        return 'Hello, world!';
    }
}
