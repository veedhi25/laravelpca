<?php 

namespace PickBazar\Http\Controllers;

use Illuminate\Http\Request;
use PickBazar\Database\Models\StudentClass;
use Illuminate\Support\Facades\Log;

class StudentClassController extends CoreController
{
    public function index() {
        // Fetch all classes with their associated stream names
        $classes = StudentClass::with('stream')->get();
        return response()->json($classes);
    }
    
    public function store(Request $request) {
        // Validate the input data
        $validated = $request->validate([
            'name' => 'required|string',
            // 'stream_id' => 'required|integer|exists:class_streams,id'  // Ensure the stream_id exists in the class_streams table
        ]);
    
        // Create a new class stream using the validated data
        $stream = StudentClass::create($validated);
    
        return response()->json($stream);
    }

    public function show($classId) {
        // Fetch a class by ID
        $class = StudentClass::findOrFail($classId);
        return response()->json($class);
    }

    public function update(Request $request, $classId) {
        // Validate and update the class
        $validated = $request->validate([
            // Add your validation rules here
        ]);
        $class = StudentClass::findOrFail($classId);
        $class->update($validated);
        return response()->json($class);
    }

    public function destroy($classId) {
        // Delete the class
        $class = StudentClass::findOrFail($classId);
        $class->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
