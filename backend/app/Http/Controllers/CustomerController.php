<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Customer;

class CustomerController extends Controller
{
    public function index(Request $request)
    {
        $user = $request->user();
        return $user->customers()->get();
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'name'    => 'required|string|max:255',
            'email'   => 'required|email|unique:customers',
            'phone'   => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'address' => 'nullable|string',
        ]);

        $customer = $request->user()->customers()->create($validatedData);

        return response()->json($customer, 201);
    }

    public function show(Request $request, $id)
    {
        $customer = $request->user()->customers()->findOrFail($id);

        return $customer;
    }

    public function update(Request $request, $id)
    {
        $customer = $request->user()->customers()->findOrFail($id);

        $validatedData = $request->validate([
            'name'    => 'string|max:255',
            'email'   => 'email|unique:customers,email,' . $customer->id,
            'phone'   => 'nullable|string|max:20',
            'company' => 'nullable|string|max:255',
            'address' => 'nullable|string',
        ]);

        $customer->update($validatedData);

        return response()->json($customer);
    }

    public function destroy(Request $request, $id)
    {
        $customer = $request->user()->customers()->findOrFail($id);
        $customer->delete();

        return response()->json(null, 204);
    }
}
