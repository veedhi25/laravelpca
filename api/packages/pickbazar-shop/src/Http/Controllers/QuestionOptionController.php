<?php

namespace PickBazar\Http\Controllers;

use Exception;
use Illuminate\Http\Request;
use Pickbazar\Enums\Permission;
use Illuminate\Http\JsonResponse;
use PickBazar\Database\Models\QuestionOption;
use PickBazar\Database\Models\Image;


class QuestionOptionController extends CoreController
{
    public function index() {
        return QuestionOption::with('image')->get();
    }

    public function store(Request $request) {
        $validatedData = $request->validate([
            'value' => 'required|string',
            'question_id' => 'required|integer|exists:exam_questions,id',
            'is_correct' => 'boolean',
            'image_id' => 'nullable|integer|exists:attachments,id'
        ]);
        return QuestionOption::create($validatedData);
        
    }
}
