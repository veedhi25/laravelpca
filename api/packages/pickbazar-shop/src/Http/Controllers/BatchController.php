<?php 

namespace PickBazar\Http\Controllers;

use  PickBazar\Database\Models\Batch;
use Illuminate\Http\Request;

class BatchController extends CoreController
{
    public function index()
    {
        // Eager load the studentClass relationship
        $batches = Batch::with('studentClass')->get();
    
        // Return as a JSON response
        return response()->json($batches);    }
    
    public function show(Batch $batch)
    {
        // Eager load the studentClass relationship
        $batchWithClass = $batch->load('studentClass');
    
        // Return as a JSON response
        return response()->json($batch);
    }

    public function store(Request $request)
    {
        $batch = Batch::create($request->all());
        return response()->json($batch, 201);
    }

    

    public function update(Request $request, Batch $batch)
    {
        $batch->update($request->all());
        return response()->json($batch);
    }

    public function destroy(Batch $batch)
    {
        $batch->delete();
        return response()->json(null, 204);
    }
}
