<?php

namespace PickBazar\Http\Controllers;

use PickBazar\Database\Models\ExamAttemptAnswer;
use PickBazar\Database\Models\QuestionOption;
use Illuminate\Http\Request;
use PickBazar\Database\Models\ExamAttempt;
use Illuminate\Support\Facades\DB;

class ExamAttemptAnswersController extends CoreController
{
    public function store(Request $request)
    {
        // Validate the request data
        $data = $request->validate([
            'exam_attempt_id' => 'required|exists:exam_attempts,id',
            'question_id' => 'required|exists:exam_questions,id',
            'option_id' => 'nullable|exists:options,id',  // Assuming you have an options table
            'answer_text' => 'nullable|string'
            // You may want to validate that either option_id or answer_text is filled, but not both
        ]);

        // Save the answer
        $response = ExamAttemptAnswer::create($data);

        return response()->json(['message' => 'Answer saved successfully.']);
    }

    public function getAnswer($id)
    {
        $response = ExamAttemptAnswer::find($id);

        if (!$response) {
            return response()->json(['message' => 'Answer not found.'], 404);
        }

        return response()->json($response);
    }


    function convertToHoursMinsSeconds($time) {
        if ($time < 1) {
            return '00:00:00';
        }
        $hours = floor($time / 3600);
        $minutes = floor(($time / 60) % 60);
        $seconds = $time % 60;
    
        return sprintf('%02d:%02d:%02d', $hours, $minutes, $seconds);
    }
    
    

   

    public function getExamAttemptAnswers($examAttemptId)
    {
        try {
            $examId = ExamAttempt::where('id', $examAttemptId)->value('exam_id');

            $examAttemptAnswers = ExamAttemptAnswer::with([
                'question',
                'question.exam_association' => function ($query) use ($examId) {
                    $query->where('exam_id', $examId)
                        ->select('question_id', 'question_subSection');
                },
                'question.questionType', 
                'question.options',
                'question.section'
            ])
            ->where('exam_attempt_id', $examAttemptId)
            ->get();

            if ($examAttemptAnswers->isEmpty()) {
                return response()->json(['message' => 'No exam attempt answers found for the given exam attempt ID.'], 404);
            }

            $accumulatedAnswers = [];
            $sectionWiseTime = [];


        
            foreach ($examAttemptAnswers as $answer) {
                $questionId = $answer->question_id;
                $questionSubSection = $answer->question->exam_association->question_subSection ?? null;
        
                if (!isset($accumulatedAnswers[$questionId])) {
                    $accumulatedAnswers[$questionId] = [
                        'question' => $answer->question,
                        'selected_options' => [],
                        'question_subSection' => $questionSubSection,
                        'answer_text' => null,
                        'added_option_ids' => [] // To keep track of added option IDs
                    ];
                }
                
                    $questionType = $answer->question->questionType->type;
                
                    if ($questionType === 'Multiple Correct') {
                        $selectedOption = QuestionOption::find($answer->option_id);
                        if ($selectedOption && !in_array($selectedOption->id, $accumulatedAnswers[$questionId]['added_option_ids'])) {
                            $accumulatedAnswers[$questionId]['selected_options'][] = $selectedOption;
                            $accumulatedAnswers[$questionId]['added_option_ids'][] = $selectedOption->id;
                        }
                    } elseif ($questionType === 'MCQ') {
                        $selectedOption = QuestionOption::find($answer->option_id);
                        if ($selectedOption) {
                            $accumulatedAnswers[$questionId]['selected_options'] = [$selectedOption];
                        }
                    }  elseif ($questionType === 'Comprehension') {
                        $selectedOption = QuestionOption::find($answer->option_id);
                        if ($selectedOption) {
                            $accumulatedAnswers[$questionId]['selected_options'] = [$selectedOption];
                        }
                    } 
                    elseif ($questionType === 'Integer') {
                        $accumulatedAnswers[$questionId]['answer_text'] = $answer->answer_text;
                    }
                    
        
                    // Fetch time spent for each question (this can be optimized to avoid fetching multiple times for the same question)
                    $timeSpentData = DB::table('exam_question_time_spent')
                    ->where('exam_attempt_id', $answer->exam_attempt_id)
                    ->where('exam_question_id', $answer->question_id)
                    ->first();

                $timeSpent = $timeSpentData ? $timeSpentData->time_spent : 0;
                $accumulatedAnswers[$questionId]['timeSpent'] = $timeSpent;

                // Accumulate section-wise time
                $section = $answer->question->section->name ?? null;
                if ($section) {
                    $sectionWiseTime[$section] = ($sectionWiseTime[$section] ?? 0) + $timeSpent;
                }
            }

            // Prepare sectionWiseTime for response
            $sectionWiseTimeArray = [];
            foreach ($sectionWiseTime as $sectionName => $time) {
                $sectionWiseTimeArray[] = [
                    'sectionName' => $sectionName,
                    'time' => $this->convertToHoursMinsSeconds($time)
                ];
            }

            // Prepare final response
            $response = [
                'answers' => array_values($accumulatedAnswers),
                'sectionWiseTime' => $sectionWiseTimeArray
            ];

            return response()->json($response);
        } catch (\Exception $e) {
            \Log::error($e->getMessage());
            return response()->json(['message' => 'An error occurred while fetching exam attempt answers.', 'error_detail' => $e->getMessage()], 500);
        }
    }
    
    
    
}
