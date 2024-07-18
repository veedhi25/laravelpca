<?php

namespace PickBazar\Http\Controllers;

use PickBazar\Database\Models\ExamAttempt;
use Illuminate\Http\Request;
use PickBazar\Database\Models\ExamQuestionAssoc;
use PickBazar\Database\Models\ExamAttemptAnswer;
use PickBazar\Database\Models\User;
use PickBazar\Database\Models\ExamQuestionTimeSpent;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Log;
use PickBazar\Database\Models\ExamQuestion;
use Illuminate\Support\Facades\DB;
use PickBazar\Database\Models\Course;
use Illuminate\Pagination\Paginator;
use Illuminate\Pagination\LengthAwarePaginator;


class ExamAttemptsController extends CoreController
{
    public function startAttempt(Request $request)
{
    // Validate the nested structure along with is_mock
    $data = $request->validate([
        'examData.user_id' => 'required|exists:users,id',
        'examData.exam_id' => 'required|exists:exams,id',
        'examData.is_mock' => 'required|boolean'  // Validate that is_mock is present and is a boolean
    ]);

    // Create the attempt using the nested data and the is_mock value
    $attempt = ExamAttempt::create([
        'user_id' => $data['examData']['user_id'],
        'exam_id' => $data['examData']['exam_id'],
        'is_mock' => $data['examData']['is_mock'] // Store the is_mock value
    ]);
    
    if (!$attempt) {
        return response()->json(['message' => 'Failed to start attempt.'], 500);
    }

    return response()->json(['message' => 'Attempt started successfully.', 'attempt_id' => $attempt->id]);
}


    public function endAttempt(Request $request, $id)
    {

        $correctAnswersCount = 0;
        $incorrectAnswersCount = 0;
        $notAttemptedCount = 0;
        $attemptedCount = 0;
        $unsavedQuestions = [
            'correct' => 0,
            'incorrect' => 0
        ];

        \Log::info('Entering endAttempt function.');
    
        $attempt = ExamAttempt::find($id);
    
        if (!$attempt) {
            return response()->json(['message' => 'Attempt not found.'], 404);
        }
    
        $student_id = $request->input('student_id');
        if (!$student_id) {
            return response()->json(['message' => 'Student ID is required.'], 400);
        }
    
        $user = User::find($student_id);
        if (!$user) {
            return response()->json(['message' => 'Invalid Student ID.'], 400);
        }
    
        $answers = $request->input('answers');
        $score = $request->input('score');
    
        $rules = [
            'answers.*.questionId' => 'required|integer',
            'answers.*.marks' => 'required|numeric',
            'answers.*.negative' => 'required|numeric',
        ];
    
        $validator = Validator::make($request->all(), $rules);
    
        if ($validator->fails()) {
            return response()->json(['message' => 'The given data was invalid.', 'errors' => $validator->errors()], 400);
        }

        $questionIds = array_column($answers, 'questionId');
        $questionAssociations = ExamQuestionAssoc::with('question.questionType')
            ->whereIn('question_id', $questionIds)
            ->get()
            ->keyBy('question_id');
    
        $examAttemptAnswers = [];
        $examQuestionTimeSpentData = [];
    
        $totalScore = 0;
    
        foreach ($answers as $answer) {

            $isUnattempted = !isset($answer['selectedId']) || (isset($answer['selectedId']) && $answer['selectedId'] === 0);

            if ($isUnattempted) {
                $notAttemptedCount++;
                continue; // Skip further processing for this question
            }
            

            \Log::info('Entering endAttempt foeach function.');

            $isCorrect = false;
        
            $questionAssociation = $questionAssociations[$answer['questionId']];
           
        
            if (!$questionAssociation || !$questionAssociation->question || !$questionAssociation->question->questionType) {
                \Log::error('Question type is null for question association ID: ' . ($questionAssociation ? $questionAssociation->id : 'Not Found'));
                continue;
            }
        
            $questionType = $questionAssociation->question->questionType->type;
        
            switch ($questionType) {
                case 'MCQ':
                    $correctId = $answer['correct_id'][0]['id'];
                    $isCorrect = isset($correctId) && (string)$answer['selectedId'] == (string)$correctId;
                    if ($isCorrect) {
                        $totalScore += (float)$answer['marks']; // add the marks for the correct answer
                    } else {
                        $totalScore -= (float)$answer['negative']; // subtract the negative marks for the incorrect answer
                    }
                    break;
            
                    case 'Integer':
                        $correctAnswers = json_decode($answer['correct_id'], true);
                        $selectedId = isset($answer['selectedId']) ? $answer['selectedId'] : null;
                        $isCorrect = in_array($selectedId, $correctAnswers);
                        if ($isCorrect) {
                            $totalScore += (float)$answer['marks']; // add the marks for the correct answer
                        } else {
                            $totalScore -= (float)$answer['negative']; // subtract the negative marks for the incorrect answer
                        }
                        break;
                    
            
    
                        case 'Multiple Correct':
                            $selectedIds = is_array($answer['selectedId']) ? $answer['selectedId'] : [];
                            $correctOptionIds = array_map(function ($option) {
                                return (string)$option['id'];
                            }, $answer['correct_id']);
                    
                            $isAnyIncorrect = count(array_diff($selectedIds, $correctOptionIds)) > 0;
                            if ($isAnyIncorrect) {
                                $totalScore -= (float)$answer['negative'];
                            } else {
                                $marksPerOption = (float)$answer['marks'] / count($correctOptionIds);
                                $totalScore += $marksPerOption * count(array_intersect($selectedIds, $correctOptionIds));
                            }
                            $isCorrect = !$isAnyIncorrect;
                            break;
                        

                    case 'Comprehension':
                        $correctId = $answer['correct_id'][0]['id'];
                        $isCorrect = isset($correctId) && (string)$answer['selectedId'] == (string)$correctId;
                        if ($isCorrect) {
                            $totalScore += (float)$answer['marks']; // add the marks for the correct answer
                        } else {
                            $totalScore -= (float)$answer['negative']; // subtract the negative marks for the incorrect answer
                        }
                        break;
                    
            }   
            
            if ($answer['selectedId'] != 0 || (is_array($answer['selectedId']) && count($answer['selectedId']) > 0)) {
                $attemptedCount++;
                if ($isCorrect) {
                    $correctAnswersCount++;
                } else {
                    // $totalScore -= $answer['negative'];
                    $incorrectAnswersCount++;
                }
            } else {
                $notAttemptedCount++;
            }
            
            
            if ($questionType == 'Integer') {
                $examAttemptAnswers[] = [
                    'exam_attempt_id' => $attempt->id,
                    'question_id' => $answer['questionId'],
                    'option_id' => null,
                    'is_correct' => $isCorrect,
                    'answer_text' => (string)$answer['selectedId']
                ];
            } else {
                foreach ((array)$answer['selectedId'] as $optionId) {
                    $examAttemptAnswers[] = [
                        'exam_attempt_id' => $attempt->id,
                        'question_id' => $answer['questionId'],
                        'option_id' => $optionId,
                        'is_correct' => $isCorrect,
                        'answer_text' => null
                    ];
                }
            }
    
            if (isset($answer['time'])) {
                $examQuestionTimeSpentData[] = [
                    'exam_attempt_id' => $attempt->id,
                    'exam_question_id' => $answer['questionId'],
                    'time_spent' => $answer['time']
                ];
            }
        }

        DB::beginTransaction();  // Start the transaction

        try {
            ExamAttemptAnswer::insert($examAttemptAnswers, ['exam_attempt_id', 'question_id', 'option_id', 'is_correct', 'answer_text']);

            ExamQuestionTimeSpent::insert($examQuestionTimeSpentData);
        
            $attempt->user_id = $student_id;
            $attempt->score = round($score, 2);
            $attempt->is_submit = 1;  // Set is_submit to 1 to indicate the attempt has been submitted
            // $attempt->created_at = now();
            $attempt->save();
        
            DB::commit();  // Commit the transaction if all went well
        
            $notAttemptedCount = $request->input('total_questions') - $attemptedCount - $unsavedQuestions['correct'];
            $details = [
                'score' => round($request->input('score'), 2),
                'attemptedQuestionCount' => $attemptedCount,
                'correctAnswersCount' => $correctAnswersCount,
                'incorrectAnswersCount' => $incorrectAnswersCount,
                'notAttemptedCount' => $notAttemptedCount,
                'unsavedQuestions' => $unsavedQuestions,
            ];
            return response()->json(['message' => 'Attempt Ended Successfully.', 'details' => $details]);
        } catch (\Exception $e) {
            DB::rollBack();  // Roll back the transaction in case of errors
            return response()->json(['message' => 'An error occurred. Please try again.', 'error' => $e->getMessage()], 500);
        }
        
    }

   public function show($examId, Request $request) {
    $page = $request->input('page', 1);
    $isMock = $request->input('is_mock', 1);

    $query = ExamAttempt::with([
        'user:id,name,parents_email,parent_phone_number',
        'user',
        'answers.question.section',
        'answers.question.examAssociations' => function ($query) use ($examId) {
            $query->where('exam_id', $examId);
        },
        'answers.question.options',
        'answers.question.questionType',
        'exam'
    ])
    ->where('exam_id', $examId);

    if (!is_null($isMock)) {
        $query->where('is_mock', $isMock);
    }

    $examAttempts = $query->paginate(10, ['*'], 'page', $page);

    // Fetch sub_section data
    $examQuestionAssocData = ExamQuestionAssoc::where('exam_id', $examId)->get();
    $subSectionQuestionLimits = [];
    foreach ($examQuestionAssocData as $data) {
        foreach ($data->sub_section as $sectionData) {
            if (isset($sectionData['subSections'])) {
                foreach ($sectionData['subSections'] as $subSection) {
                    $subSectionQuestionLimits[$subSection['name']] = $subSection['questionLimit'] ?? PHP_INT_MAX;
                }
            }
        }
    }

    $transformedAttempts = $examAttempts->getCollection()->map(function ($examAttempt) use ($subSectionQuestionLimits) {
        $sectionScores = [];
        $handledQuestions = [];

        // Organizing answers by subsection and correctness
        $subSectionAnswers = [];
        foreach ($examAttempt->answers as $answer) {
            $assoc = $answer->question->examAssociations->firstWhere('exam_id', $examAttempt->exam_id);
            $subSectionName = $assoc ? $assoc->question_subSection : null;
            $subSectionAnswers[$subSectionName][$answer->is_correct][] = $answer;
        }

        foreach ($subSectionAnswers as $subSectionName => $answers) {
            $questionLimit = $subSectionQuestionLimits[$subSectionName] ?? PHP_INT_MAX;

            // Interpret 0 as no restriction
            if ($questionLimit === 0) {
                $questionLimit = PHP_INT_MAX;
            }

            // Prioritize correct answers first within the question limit
            $answersToProcess = array_slice($answers[1] ?? [], 0, $questionLimit);
            $remainingLimit = $questionLimit - count($answersToProcess);

            // Add incorrect answers if there's remaining capacity within the limit
            if ($remainingLimit > 0) {
                $answersToProcess = array_merge($answersToProcess, array_slice($answers[0] ?? [], 0, $remainingLimit));
            }

            foreach ($answersToProcess as $answer) {
                $assoc = $answer->question->examAssociations->firstWhere('exam_id', $examAttempt->exam_id);
                $sectionName = $answer->question->section->name;
                $subSectionName = $assoc ? $assoc->question_subSection : null;
                $questionType = $answer->question->questionType->type ?? 'Unknown Type';
                $marks = $assoc ? $assoc->marks : 0;
                $negativeMarks = $assoc ? $assoc->negative_marks : 0;

                // Skip already processed questions for "Multiple Correct" type
                if ($questionType == 'Multiple Correct' && in_array($answer->question_id, $handledQuestions)) {
                    continue;
                }

                // Initialize section if not present
                if (!isset($sectionScores[$sectionName])) {
                    $sectionScores[$sectionName] = [
                        'name' => $sectionName,
                        'marks' => 0,
                        'sub_section' => []
                    ];
                }

                // Initialize sub-section if not present
                if (!isset($sectionScores[$sectionName]['sub_section'][$subSectionName])) {
                    $sectionScores[$sectionName]['sub_section'][$subSectionName] = [
                        'name' => $subSectionName,
                        'marks' => 0,
                        'question_type' => ['name' => $questionType, 'marks' => 0],
                        'question_ids' => []
                    ];
                }

                // Scoring logic
                $scoreToAdd = $answer->is_correct ? floor($marks) : -floor($negativeMarks);
                if ($questionType == 'Multiple Correct') {
                    $selectedOptionsForQuestion = $examAttempt->answers->where('question_id', $answer->question_id);
                    $correctOptionsCount = DB::table('question_options')
                                            ->where('question_id', $answer->question_id)
                                            ->where('is_correct', 1)
                                            ->count();

                    $selectedCorrectOptionsCount = $selectedOptionsForQuestion->where('is_correct', 1)->count();
                    $selectedIncorrectOptionsCount = $selectedOptionsForQuestion->where('is_correct', 0)->count();

                    $marksPerOption = $correctOptionsCount > 0 ? $marks / $correctOptionsCount : 0;

                    if ($selectedIncorrectOptionsCount > 0) {
                        $scoreToAdd = -$negativeMarks; // Deduct negative marks for incorrect selections
                    } else {
                        $scoreToAdd = floor($selectedCorrectOptionsCount * $marksPerOption); // Partial marks for partial correct selections
                    }
                } else {
                    $scoreToAdd = $answer->is_correct ? floor($marks) : -floor($negativeMarks);
                }

                if ($questionType == 'Multiple Correct') {
                    $handledQuestions[] = $answer->question_id;
                }

                // Update scores and counters
                $sectionScores[$sectionName]['marks'] += $scoreToAdd;
                $sectionScores[$sectionName]['sub_section'][$subSectionName]['marks'] += $scoreToAdd;
                $sectionScores[$sectionName]['sub_section'][$subSectionName]['question_ids'][] = $answer->question_id;
                $sectionScores[$sectionName]['sub_section'][$subSectionName]['question_type']['name'] = $questionType;
                $sectionScores[$sectionName]['sub_section'][$subSectionName]['question_type']['marks'] += $scoreToAdd;
            }
        }

        // Convert sub_section to an array of objects
        foreach ($sectionScores as &$sectionData) {
            $sectionData['sub_section'] = array_values($sectionData['sub_section']);
        }
        
        return [
            'exam_attempt_id' => $examAttempt->id,
            'is_mock' => $examAttempt->is_mock,
            'user_id' => $examAttempt->user_id,
            'user_name' => optional($examAttempt->user)->name,
            'parents_phone_number' => optional($examAttempt->user)->parent_phone_number,
            'score' => $examAttempt->score,
            'exam_id' => $examAttempt->exam_id,
            'parents_email' => optional($examAttempt->user)->parents_email,
            'exam_name' => optional($examAttempt->exam)->name,
            'total_marks' => $examAttempt->exam->total_marks,
            'total_questions' => $examAttempt->exam->total_questions,
            'exam_sections' => $examAttempt->exam->sections->pluck('name')->toArray(),
            'section_scores' => array_values($sectionScores),
            'created_at' => $examAttempt->created_at,
            'updated_at' => $examAttempt->updated_at
        ];
    });

    $examAttempts->setCollection($transformedAttempts);

    return response()->json($examAttempts, 200);
}

    
    
    

    public function isExamSubmitted($examId, $userId)
    {
        // Check if there's any exam attempt with is_submit set to 1 for the given exam ID and user ID
        $isSubmitted = ExamAttempt::where('exam_id', $examId)
                                ->where('user_id', $userId)
                                ->where('is_submit', 1)
                                ->exists();

        return response()->json(['is_submitted' => $isSubmitted]);
    }


   
    public function showUserExamAttempts($userId, $examId, Request $request) {
        $page = $request->input('page', 1);
        $isMock = $request->input('is_mock');
        
        $examAttempts = ExamAttempt::with([
                'user', 'answers.question.section', 'answers.question.questionType',
                'answers.question.examAssociations', 'answers.question.options', 'exam'
            ])
            ->where('user_id', $userId)
            ->where('exam_id', $examId)
            ->when($isMock !== null, function ($query) use ($isMock) {
                return $query->where('is_mock', $isMock);
            })
            ->get(['id', 'user_id', 'score', 'exam_id', 'created_at', 'updated_at']);
    
        $examQuestionAssocData = ExamQuestionAssoc::where('exam_id', $examId)->get();
        $subSectionQuestionLimits = [];
        foreach ($examQuestionAssocData as $data) {
            foreach ($data->sub_section as $sectionData) {
                foreach ($sectionData['subSections'] as $subSection) {
                    $subSectionQuestionLimits[$subSection['name']] = $subSection['questionLimit'] ?? PHP_INT_MAX;
                }
            }
        }
    
        $examAttempts = $examAttempts->map(function ($examAttempt) use ($subSectionQuestionLimits) {
            $sectionScores = [];
    
            $subSectionAnswers = [];
            foreach ($examAttempt->answers as $answer) {
                $assoc = $answer->question->examAssociations->firstWhere('exam_id', $examAttempt->exam_id);
                $subSectionName = $assoc ? $assoc->question_subSection : null;
                $subSectionAnswers[$subSectionName][] = $answer;
            }
    
            foreach ($subSectionAnswers as $subSectionName => $answers) {
                $questionLimit = $subSectionQuestionLimits[$subSectionName] ?? PHP_INT_MAX;
    
                // Check if question limit is zero, which implies no restriction
                if ($questionLimit === 0) {
                    $questionLimit = PHP_INT_MAX; // No restriction on the number of answers
                }
    
                // Separate correct and incorrect answers
                $correctAnswers = array_filter($answers, function($answer) { return $answer->is_correct; });
                $incorrectAnswers = array_filter($answers, function($answer) { return !$answer->is_correct; });
    
                // Apply question limit prioritizing correct answers
                $answersToProcess = array_slice($correctAnswers, 0, $questionLimit);
                $remainingLimit = $questionLimit - count($answersToProcess);
                if ($remainingLimit > 0) {
                    $answersToProcess = array_merge($answersToProcess, array_slice($incorrectAnswers, 0, $remainingLimit));
                }
        
                foreach ($answersToProcess as $answer) {
                    $assoc = $answer->question->examAssociations->firstWhere('exam_id', $examAttempt->exam_id);
                    $sectionName = $answer->question->section->name;
                    $subSectionName = $assoc ? $assoc->question_subSection : null;
                    $questionType = $answer->question->questionType->type ?? 'Unknown Type';
                    $questionId = $answer->question_id;
    
                    // Initialize section and subsection if not present
                    if (!isset($sectionScores[$sectionName])) {
                        $sectionScores[$sectionName] = [
                            'name' => $sectionName,
                            'marks' => 0,
                            'sub_section' => []
                        ];
                    }
                    if (!isset($sectionScores[$sectionName]['sub_section'][$subSectionName])) {
                        $sectionScores[$sectionName]['sub_section'][$subSectionName] = [
                            'name' => $subSectionName,
                            'marks' => 0,
                            'question_type' => ['name' => $questionType, 'marks' => 0],
                            'question_ids' => []
                        ];
                    }
    
                    // Skip already processed questions
                    if (in_array($questionId, $sectionScores[$sectionName]['sub_section'][$subSectionName]['question_ids'])) {
                        continue;
                    }
    
                    $marks = $assoc ? $assoc->marks : 0;
                    $negativeMarks = $assoc ? $assoc->negative_marks : 0;
    
                    // Initialize scoreToAdd
                    $scoreToAdd = $answer->is_correct ? $marks : -$negativeMarks;
    

                    if ($questionType == 'Multiple Correct') {
                        $selectedOptionsForQuestion = $examAttempt->answers->where('question_id', $answer->question_id);
                        $correctOptionsCount = DB::table('question_options')
                                                ->where('question_id', $answer->question_id)
                                                ->where('is_correct', 1)
                                                ->count();
        
                        $selectedCorrectOptionsCount = $selectedOptionsForQuestion->where('is_correct', 1)->count();
                        $selectedIncorrectOptionsCount = $selectedOptionsForQuestion->where('is_correct', 0)->count();
        
                        $marksPerOption = $correctOptionsCount > 0 ? $marks / $correctOptionsCount : 0;
        
                        if ($selectedIncorrectOptionsCount > 0) {
                            $scoreToAdd = -$negativeMarks; // Deduct negative marks for incorrect selections
                        } else {
                            $scoreToAdd = floor($selectedCorrectOptionsCount * $marksPerOption); // Partial marks for partial correct selections
                        }
                    } else {
                        $scoreToAdd = $answer->is_correct ? floor($marks) : -floor($negativeMarks);
                    }
                
                     // Update scores and counters
                $sectionScores[$sectionName]['marks'] += $scoreToAdd;
                $sectionScores[$sectionName]['sub_section'][$subSectionName]['marks'] += $scoreToAdd;
                $sectionScores[$sectionName]['sub_section'][$subSectionName]['question_ids'][] = $answer->question_id;
                $sectionScores[$sectionName]['sub_section'][$subSectionName]['question_type']['name'] = $questionType;
                $sectionScores[$sectionName]['sub_section'][$subSectionName]['question_type']['marks'] += $scoreToAdd;
            }
        }

        // Convert sub_section to an array of objects for each section
        foreach ($sectionScores as &$sectionData) {
            $sectionData['sub_section'] = array_values($sectionData['sub_section']);
        }
            return [
                'exam_attempt_id' => $examAttempt->id,
                'is_mock' => $examAttempt->is_mock,
                'user_id' => $examAttempt->user_id,
                'user_name' => optional($examAttempt->user)->name,
                'score' => $examAttempt->score,
                'exam_id' => $examAttempt->exam_id,
                'exam_name' => optional($examAttempt->exam)->name,
                'total_marks' => $examAttempt->exam ? $examAttempt->exam->total_marks : null,
                'total_questions' => $examAttempt->exam->total_questions,
                'section_scores' => array_values($sectionScores),
                'created_at' => $examAttempt->created_at,
                'updated_at' => $examAttempt->updated_at
            ];
        });
    
        return response()->json($examAttempts, 200);
    }
    
    
    
    
    
    
    
    


    public function showUserAllExamAttempts($userId) {   
        // return null;  
        $examAttempts = ExamAttempt::with([
            'user', 'answers.question.section', 'answers.question.questionType',
            'answers.question.examAssociations', 'answers.question.options', 'exam'
        ])
        ->where('user_id', $userId)
        ->where('is_mock', 0)
       
        ->get(['id', 'user_id', 'score', 'exam_id', 'created_at', 'updated_at']);
    
        // Group by exam
        $groupedAttempts = $examAttempts->groupBy('exam_id');
    
        $results = [];
        foreach ($groupedAttempts as $examId => $attempts) {
            $firstAttempt = $attempts->first();
    
            $attemptedExams = [];
            foreach ($attempts as $attempt) {
                $sectionScores = [];
                $handledQuestions = [];
    
                foreach ($attempt->answers as $answer) {
                    $sectionName = $answer->question->section->name;
                    $subsectionName = $answer->question->examAssociations->first()->question_subSection;
                    $examQuestionData = ExamQuestion::where('id', $answer->question_id)
                    ->whereHas('examAssociations', function($query) use ($attempt) {
                        $query->where('exam_id', $attempt->exam_id);
                    })
                    ->first();
    
                    $questionTypeObject = $examQuestionData ? $examQuestionData->questionType : null;
                    $questionType = $questionTypeObject ? $questionTypeObject->type : 'Unknown Type';
                    $assoc = $answer->question->examAssociations->firstWhere('exam_id', $attempt->exam_id);
                    $marks = $assoc ? $assoc->marks : 0;
                    $negativeMarks = $assoc ? $assoc->negative_marks : 0;
    
                    if (in_array($answer->question_id, $handledQuestions)) {
                        continue;
                    }
    
                    $scoreToAdd = 0;
                    if ($answer->option_id === null) {
                        if ($answer->is_correct) {
                            $scoreToAdd = $marks;
                        } else {
                            $scoreToAdd = -$negativeMarks;
                        }
                    } else {
                        $selectedOptionsForQuestion = $attempt->answers->where('question_id', $answer->question_id);
                        $allSelectedAreCorrect = $selectedOptionsForQuestion->every(function ($answerOption) {
                            return $answerOption->is_correct;
                        });
                        $correctOptionsCount = DB::table('question_options')
                            ->where('question_id', $answer->question_id)
                            ->where('is_correct', 1)
                            ->count();
    
                        $marksPerOption = $correctOptionsCount > 0 ? $marks / $correctOptionsCount : 0;
                        if (isset($answer->question->question_type) && ($answer->question->question_type->type == 'MCQ' || $answer->question->question_type->type == 'Comprehension' )) {
                            if ($allSelectedAreCorrect) {
                                $scoreToAdd = $marks;
                            } else {
                                $scoreToAdd = -$negativeMarks;
                            }
                        } else {
                            if ($allSelectedAreCorrect) {
                                if ($selectedOptionsForQuestion->count() == $correctOptionsCount) {
                                    $scoreToAdd = $marks;
                                } else {
                                    $scoreToAdd = $selectedOptionsForQuestion->count() * $marksPerOption;
                                }
                            } else {
                                $scoreToAdd = -$negativeMarks;
                            }
                        }
                    }
    
                    $sectionScores[$sectionName] = $sectionScores[$sectionName] ?? 0;
                    $sectionScores[$sectionName] += $scoreToAdd;
    
                    $handledQuestions[] = $answer->question_id;
                }
                
                $attemptedExams[] = [
                    'attempt_id' => $attempt->id,
                    'section_scores' => $sectionScores,
                    'total_score' => $attempt->score
                ];
            }
    
            $results[] = [
                'exam_name' => optional($firstAttempt->exam)->name,
                'exam_id' => $examId,
                'total_attempts' => $attempts->count(),
                'attempted_exams' => $attemptedExams,
            ];
        }
    
        return response()->json($results, 200);
    }


    public function showUserLastFiveExamAttempts($userId, Request $request) {
        $isMock = $request->query('isMock', 0); // Default to 0 if not provided
        $limit = $request->query('limit', 5); // Default to 5 if not provided
    
        $examAttempts = ExamAttempt::with('exam', 'user') // Eager load the 'user' relationship
            ->where('user_id', $userId)
            ->where('is_mock', $isMock)
            ->latest('updated_at')
            ->get()
            ->groupBy('exam_id')
            ->map(function ($attempts) {
                return $attempts->first();
            })
            ->sortByDesc('updated_at')
            ->take($limit)
            ->values();
    
        $finalResults = [];
    
        foreach ($examAttempts as $attempt) {
            $userResult = [
                'exam_id' => $attempt->exam_id,
                'exam_name' => $attempt->exam->name,
                'user_score' => $attempt->score,
                'attempt_date' => $attempt->updated_at->toDateTimeString(),
            ];
    
            $topScores = ExamAttempt::with('user') // Eager load the 'user' relationship here as well
                ->where('exam_id', $attempt->exam_id)
                ->orderByDesc('score')
                ->get()
                ->map(function ($topAttempt, $key) use ($userId) {
                    // Check if the user relation is loaded and exists before accessing 'name'
                    $userName = $topAttempt->user ? $topAttempt->user->name : 'Unknown User';
                    $isCurrentUser = $topAttempt->user_id == $userId;
                    return [
                        'user_id' => $topAttempt->user_id,
                        'user_name' => $userName,
                        'score' => $topAttempt->score,
                        'rank' => $isCurrentUser ? null : $key + 1, // We will determine the current user's rank separately
                    ];
                });
    
            // Determine the current user's rank
            $userRank = $topScores->search(function ($topScore) use ($userId) {
                return $topScore['user_id'] == $userId;
            }) + 1; // Adding 1 to get the correct rank position
    
            // Insert the user's result in top scores if not in the top 3
            $topScoresCollection = collect($topScores);
            if (!$topScoresCollection->pluck('user_id')->contains($userId)) {
                $userScoreInTop = [
                    'user_id' => $userId,
                    'user_name' => $attempt->user->name ?? 'Unknown User',
                    'score' => $attempt->score,
                    'rank' => $userRank
                ];
                $topScoresCollection->push($userScoreInTop);
            }
    
            $finalResults[] = [
                'user_result' => $userResult,
                'top_scores' => $topScoresCollection->sortByDesc('score')->take(3)->values()->all(),
                'user_rank' => $userRank // Adding the user's rank here
            ];
        }
    
        return response()->json($finalResults, 200);
    }
    
    
    
    


    public function showCombined($examId1, $examId2) {
        $examAttempts1 = $this->getExamAttempts($examId1);
        $examAttempts2 = $this->getExamAttempts($examId2);
    
        // Assuming the same set of users attempted both exams
        $combinedAttempts = $examAttempts1->map(function ($examAttempt1) use ($examAttempts2) {
            $examAttempt2 = $examAttempts2->firstWhere('user_id', $examAttempt1['user_id']);
            
            $combinedSectionScores = [];
            foreach ([$examAttempt1['section_scores'], $examAttempt2['section_scores']] as $sectionScores) {
                foreach ($sectionScores as $section => $score) {
                    if (!isset($combinedSectionScores[$section])) {
                        $combinedSectionScores[$section] = 0;
                    }
                    $combinedSectionScores[$section] += $score;
                }
            }
            
            return [
                'user_id' => $examAttempt1['user_id'],
                'user_name' => $examAttempt1['user_name'],
                'exam1_score' => $examAttempt1['score'],
                'exam1_total_marks' => $examAttempt1['total_marks'],
                'exam1_section_scores' => $examAttempt1['section_scores'],
                'exam2_score' => $examAttempt2['score'],
                'exam2_total_marks' => $examAttempt2['total_marks'],
                'exam2_section_scores' => $examAttempt2['section_scores'],
                'combined_section_scores' => $combinedSectionScores,
                'combined_score' => $examAttempt1['score'] + $examAttempt2['score'],
                'combined_total_marks' => $examAttempt1['total_marks'] + $examAttempt2['total_marks'],
            ];
        });
    
        return response()->json($combinedAttempts, 200);
    }



    public function getAllCoursesWithExamsAndAttempts()
    {
        try {
            $courses = Course::whereHas('exams', function ($query) {
                $query->whereHas('attempts');
            })->with(['exams' => function ($query) {
                $query->withCount('attempts')->has('attempts');
            }])->get();
    
            $response = $courses->map(function ($course) {
                return [
                    'course_id' => $course->id,
                    'course_name' => $course->name,
                    'exams' => $course->exams->map(function ($exam) {
                        return [
                            'exam_id' => $exam->id,
                            'exam_name' => $exam->name,
                            'number_of_attempts' => $exam->attempts_count
                        ];
                    })
                ];
            });
    
            return response()->json($response, 200);
    
        } catch (\Exception $e) {
            // Handle exception
            return response()->json(['message' => 'Server error'], 500);
        }
    }



    public function getUserAttemptedCourses($userId)
    {
        try {
            $courses = Course::whereHas('exams', function ($query) use ($userId) {
                $query->whereHas('attempts', function ($innerQuery) use ($userId) {
                    $innerQuery->where('user_id', $userId);
                });
            })->get(['id', 'name']); // Only get id and name of the course

            return response()->json($courses, 200);
        } catch (\Exception $e) {
            return response()->json(['message' => 'Server error'], 500);
        }
    }



    public function getUserAttemptedExamsByCourse($userId, $courseId)
    {
        try {
            $course = Course::findOrFail($courseId); // Make sure course exists
    
            $exams = $course->exams()->whereHas('attempts', function ($query) use ($userId) {
                $query->where('user_id', $userId);
            })->get(['id', 'name']); // Only get id and name of the exam
    
            // Return the course name along with the exams
            return response()->json([
                'course_name' => $course->name,
                'exams' => $exams
            ], 200);
    
        } catch (\Exception $e) {
            return response()->json(['message' => 'Server error'], 500);
        }
    }
    


    
    
    

    public function reviewAttempt($id)
    {
        // Existing logic to review the attempt
        $attempt = ExamAttempt::with(['responses'])->find($id);

        if (!$attempt) {
            return response()->json(['message' => 'Attempt not found.'], 404);
        }

        return response()->json($attempt);
    }

}
