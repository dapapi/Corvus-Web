<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;

class ClientController extends Controller
{
    public function detail(Request $request)
    {
       $cookies = $request->cookie();

       dd($cookies);
//       if($cookie == '泰洋川禾')
//           return view('trail.detail');
    }
}
