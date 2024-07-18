<?php 

namespace PickBazar\Http\Controllers;

use  PickBazar\Database\Models\StudyMaterial;
use Illuminate\Http\Request;

class StudyMaterialController extends CoreController
{
    public function index() {
        $studyMaterial = StudyMaterial::with(['course', 'pdf', 'studentClass'])->get();
        return response()->json($studyMaterial->map(function ($studyMaterial) {
            return [
                'id' => $studyMaterial->id,
                // 'name' => $studyMaterial->name,
                'course_name' => $studyMaterial->course ? $studyMaterial->course->name : null, // Assuming Course model has a 'name' field
                'pdf_url' => $studyMaterial->pdf ? $studyMaterial->pdf->url : null, // Use 'url' column from Attachment model
                'student_class' => $studyMaterial->studentClass ? $studyMaterial->studentClass->name : null, // Assuming StudentClass model has a 'name' field
                // 'author_name' => $studyMaterial->author_name,
                'description' => $studyMaterial->description,
            ];
        }));
    }
    
    public function show($studyMaterialId) {
        $studyMaterial = StudyMaterial::with(['course', 'pdf', 'studentClass'])->find($studyMaterialId);
        
        if (!$studyMaterial) {
            return response()->json(['error' => 'studyMaterial not found'], 404);
        }
        
        return response()->json([
            'id' => $studyMaterial->id,
            // 'name' => $studyMaterial->name,
            'course_id' => $studyMaterial->course ? $studyMaterial->course->id : null,
            'course_name' => $studyMaterial->course ? $studyMaterial->course->name : null,
            'pdf_id' => $studyMaterial->pdf ? $studyMaterial->pdf->id : null,
            'pdf_url' => $studyMaterial->pdf ? $studyMaterial->pdf->url : null,
            'student_class' => $studyMaterial->studentClass ? $studyMaterial->studentClass->name : null,
            'class_id' =>  $studyMaterial->studentClass ? $studyMaterial->studentClass->id : null,
            // 'author_name' => $studyMaterial->author_name,
            'description' => $studyMaterial->description,
        ]);
    }
    
    
    
    

    public function store(Request $request) {
        $studyMaterial = StudyMaterial::create($request->all());
        return response()->json($studyMaterial, 201);
    }

     

    public function update(Request $request, studyMaterial $studyMaterial) {
        $studyMaterial->update($request->all());
        return response()->json($studyMaterial);
    }

    public function destroy(studyMaterial $studyMaterial) {
        $studyMaterial->delete();
        return response()->json(null, 204);
    }

    // Add any other necessary methods or functionalities
}
