<?php

namespace PickBazar\Http\Controllers;
 
use PickBazar\Database\Models\MarkingScheme;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\DB;

class MarkingSchemeController extends CoreController
{
    public function index()
    {
        $markingSchemes = MarkingScheme::with('course', 'exam', 'section', 'questionType')->get();

        return $markingSchemes;
    }

    public function store(Request $request)
    {
        // return $request;
        $markingScheme = MarkingScheme::create($request->all());
        return response()->json($markingScheme, 201);
    }

    public function show($id)
    {
        $markingScheme = MarkingScheme::with('course', 'exam', 'section', 'questionType')->find($id);
    
        if (!$markingScheme) {
            return response()->json(['message' => 'Marking scheme not found'], 404);
        }
    
        return response()->json($markingScheme);
    }
    

    public function update(Request $request, $id)
    {

    $markingScheme = MarkingScheme::find($id);
    if (!$markingScheme) {
        return response()->json(['error' => 'Marking scheme not found'], 404);
    }
     DB::enableQueryLog();

     $rules = [
        'course_id' => 'required|integer|exists:courses,id',
        'exam_id' => 'required|integer|exists:exams,id',
        'section_id' => 'required|integer|exists:sections,id',
        'question_type_id' => 'required|integer|exists:question_types,id',
        'marks' => 'required|numeric|min:0',
        'negative_marks' => 'required|numeric|min:0',
    ];

    //  $validator = Validator::make($request->all());

    // if ($validator->fails()) {
    //     \Log::warning('Validation failed', ['errors' => $validator->errors()]);
    //     return response()->json(['errors' => $validator->errors()], 422);
    // }

     \Log::info('Original Marking Scheme:', ['markingScheme' => $markingScheme]);
    \Log::info('Update Data:', ['requestData' => $request->all()]);

     try {
        $markingScheme->fill($request->all());
        $updateResult = $markingScheme->save();
    } catch (\Exception $e) {
        \Log::error('Exception caught during update', ['exception' => $e->getMessage()]);
        return response()->json(['error' => 'Update failed'], 500);
    }
    
     \Log::info('Update Result:', ['result' => $updateResult, 'updatedScheme' => $markingScheme]);

     $queries = DB::getQueryLog();
    \Log::info('Queries:', $queries);

     if (!$updateResult) {
        \Log::error('Update failed', ['markingScheme' => $markingScheme, 'requestData' => $request->all()]);
        return response()->json(['error' => 'Update failed'], 500);
    }

    return response()->json($markingScheme, 200);
    }


    
    public function delete($id)
{
    try {
        $markingScheme = MarkingScheme::findOrFail($id);
        $markingScheme->delete();
        return response()->json(null, 204);
    } catch (\Exception $e) {
        // Handle the exception here
        return response()->json(['error' => 'An error occurred while deleting the marking scheme.'], 500);
    }
}

}
