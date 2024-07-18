<?php

namespace PickBazar\Http\Controllers;

use Carbon\Carbon;
use Illuminate\Http\Request;
use PickBazar\Enums\Permission;
use Illuminate\Support\Facades\DB;
use PickBazar\Database\Models\QuestionType;
use PickBazar\Exceptions\PickbazarException;
use Illuminate\Validation\ValidationException;
 

class QuestionTypeController extends CoreController
{
    public function index()
    {
        $questionTypes = QuestionType::all();
        return response()->json($questionTypes);
    }

    public function store(Request $request)
    {
        $questionType = QuestionType::create($request->all());
        return response()->json($questionType, 201);
    }

    public function show($id)
    {
        $questionType = QuestionType::findOrFail($id);
        return response()->json($questionType);
    }

    public function update(Request $request, $id)
    {
        $questionType = QuestionType::findOrFail($id);
        $questionType->update($request->all());
        return response()->json($questionType, 200);
    }

    public function destroy($id)
    {
        QuestionType::destroy($id);
        return response()->json(null, 204);
    }
}
