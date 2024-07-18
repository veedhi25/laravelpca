<?php 

namespace PickBazar\Http\Controllers;

use Illuminate\Http\Request;
use PickBazar\Database\Models\ClassStream;
use Illuminate\Support\Facades\Log;

class ClassStreamController extends CoreController
{
    public function index() {
        // Fetch all class streams
        $streams = ClassStream::all();
        return response()->json($streams);
    }

    public function store(Request $request) {
        // Validate and create a new class stream
        $validated = $request->validate([
            // Add your validation rules here
        ]);
        $stream = ClassStream::create($validated);
        return response()->json($stream);
    }

    public function show($streamId) {
        // Fetch a class stream by ID
        $stream = ClassStream::findOrFail($streamId);
        return response()->json($stream);
    }

    public function update(Request $request, $streamId) {
        // Validate and update the class stream
        $validated = $request->validate([
            // Add your validation rules here
        ]);
        $stream = ClassStream::findOrFail($streamId);
        $stream->update($validated);
        return response()->json($stream);
    }

    public function destroy($streamId) {
        // Delete the class stream
        $stream = ClassStream::findOrFail($streamId);
        $stream->delete();
        return response()->json(['message' => 'Deleted successfully']);
    }
}
