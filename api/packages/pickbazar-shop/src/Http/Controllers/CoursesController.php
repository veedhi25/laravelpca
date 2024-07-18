<?php


namespace PickBazar\Http\Controllers;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use PickBazar\Database\Models\Course;
use PickBazar\Database\Repositories\FeedbackRepository;
use PickBazar\Exceptions\PickbazarException;
use PickBazar\Http\Requests\FeedbackCreateRequest;
use PickBazar\Http\Requests\FeedbackUpdateRequest;
use Prettus\Validator\Exceptions\ValidatorException;
 
class CoursesController extends CoreController
{


    public function index()
    {
        $courses = Course::all();

        return response()->json(['courses' => $courses], 200);
    }
     
     public function store(Request $request)
     {

        // return $request;
        $validatedData = $request->validate([
            'courseName' => 'required|max:255', // Validates the courseName field
        ]);

        $course = new Course;
        $course->name = $request->courseName; // Assumes your Course model has a 'name' field
        $course->save();

        return response()->json(['message' => 'Course successfully created'], 201);
     }

      /**
     * Display the specified resource.
     *
     * @param  int  $id
     * @return \Illuminate\Http\Response
     */
    public function show($id)
    {
        $course = Course::find($id);

        if (!$course) {
            return response()->json(['message' => 'Course not found'], 404);
        }

        return response()->json(['course' => $course], 200);
    }
    

    public function update(Request $request, $id)
{
    $validatedData = $request->validate([
        'courseName' => 'required|max:255', // Validates the courseName field
    ]);

    $course = Course::find($id);

    if (!$course) {
        return response()->json(['message' => 'Course not found'], 404);
    }

    $course->name = $request->courseName;
    $course->save();

    return response()->json(['message' => 'Course successfully updated'], 200);
}

    
}
