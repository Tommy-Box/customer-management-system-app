<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use App\Models\User;

class AuthController extends Controller
{
    // ユーザー登録
    public function register(Request $request)
    {
        $validatedData = $request->validate([
            'name'     => 'required|string|max:255',
            'email'    => 'required|email|string|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        $user = User::create([
            'name'     => $validatedData['name'],
            'email'    => $validatedData['email'],
            'password' => Hash::make($validatedData['password']),
        ]);

        // トークンの作成
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message'      => 'ユーザー登録が成功しました',
            'access_token' => $token,
            'token_type'   => 'Bearer',
        ], 201);
    }

    // ログイン
    public function login(Request $request)
    {
        if (!auth()->attempt($request->only('email', 'password'))) {
            return response()->json([
                'message' => '認証情報が無効です'
            ], 401);
        }

        $user = User::where('email', $request['email'])->firstOrFail();

        // トークンの作成
        $token = $user->createToken('auth_token')->plainTextToken;

        return response()->json([
            'message'      => 'ログイン成功',
            'access_token' => $token,
            'token_type'   => 'Bearer',
        ]);
    }

    // ログアウト
    public function logout(Request $request)
    {
        $request->user()->tokens()->delete();

        return response()->json([
            'message' => 'ログアウトしました'
        ]);
    }
}
