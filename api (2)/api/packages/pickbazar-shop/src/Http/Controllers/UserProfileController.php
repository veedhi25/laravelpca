<?php


namespace PickBazar\Http\Controllers;

use Carbon\Carbon;
use PickBazar\Database\Models\UserProfile;
use PickBazar\Database\Models\User;
use Illuminate\Http\Request;
 




class UserProfileController extends CoreController
{

    public function index()
    {
        $profiles = UserProfile::all();
        return response()->json($profiles);
    }

    // Function to fetch a user profile by its ID
    public function show($id)
{
    $profile = UserProfile::where('user_id', $id)->firstOrFail();
    return response()->json($profile);
}


public function store(Request $request)
{
    $request['user_id'] = $request->user()->id;

    $validatedData = $request->validate([
        'user_id' => 'required|exists:users,id',
        'gender' => 'required|in:male,female,other',
        'day' => 'nullable|integer|min:1|max:31',
        'month' => 'nullable|integer|min:1|max:12',
        'year' => 'nullable|integer|min:1900|max:' . (date('Y') - 18),
        'bio' => 'nullable|string',
        'interests' => 'required|array',
    ]);

    // Initialize dateOfBirth as null
    $dateOfBirth = null;

    // Check if day, month, and year values are provided
    if (isset($validatedData['day']) && isset($validatedData['month']) && isset($validatedData['year'])) {
        $dateOfBirth = sprintf('%04d-%02d-%02d', $validatedData['year'], $validatedData['month'], $validatedData['day']);
    } else {
        // If not provided, try to fetch date_of_birth from users table
        $user = User::find($validatedData['user_id']);
        if ($user && $user->date_of_birth) {
            // Parse the date from the 'DD-MM-YYYY' format to 'YYYY-MM-DD'
            $dateOfBirth = Carbon::createFromFormat('d-m-Y', $user->date_of_birth)->format('Y-m-d');
        }
    }

    $profile = UserProfile::create([
        'user_id' => $validatedData['user_id'],
        'gender' => $validatedData['gender'],
        'date_of_birth' => $dateOfBirth,
        'bio' => $validatedData['bio'],
        'interests' => $validatedData['interests'],
    ]);

    return response()->json($profile, 201);
}



    public function update(Request $request, $id)
{
    // Find the profile by id
   
    $profile = UserProfile::where('user_id', $id)->firstOrFail();

    // Validation rules
    $validatedData = $request->validate([
        'gender' => 'sometimes|required|in:male,female,other',
        'day' => 'sometimes|required|integer|min:1|max:31',
        'month' => 'sometimes|required|integer|min:1|max:12',
        'year' => 'sometimes|required|integer|min:1900|max:' . (date('Y') - 18),
        'bio' => 'sometimes|required|string',
        'interests' => 'sometimes|required|array',
    ]);

    // If the date fields are provided, format them into a date string
    if (isset($validatedData['day'], $validatedData['month'], $validatedData['year'])) {
        $validatedData['date_of_birth'] = sprintf('%02d-%02d-%04d', $validatedData['day'], $validatedData['month'], $validatedData['year']);
        unset($validatedData['day'], $validatedData['month'], $validatedData['year']);
    }

    // Update the profile fields based on the validated data
    $profile->update($validatedData);

    // Return the updated profile
    return response()->json($profile, 200);
}

    
}