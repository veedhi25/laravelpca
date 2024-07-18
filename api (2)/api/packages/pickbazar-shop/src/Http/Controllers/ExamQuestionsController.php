<?php 
namespace PickBazar\Http\Controllers;

use Illuminate\Http\Request;
use PickBazar\Database\Models\ExamQuestion;  
use PickBazar\Database\Models\ExamSection;  
use PickBazar\Database\Models\Course;  
use Illuminate\Support\Facades\DB;
use PickBazar\Database\Models\QuestionOption;
use PickBazar\Database\Models\Image;  
use PickBazar\Database\Models\Attachment;  
use PickBazar\Database\Models\QuestionTag;
use PickBazar\Exceptions\PickbazarException;
use Illuminate\Support\Facades\Validator;

class ExamQuestionsController extends CoreController
 {
    
    public function store(Request $request) {
        DB::beginTransaction();
    
        try {
            $imageId = $request->input('question_img_id') ?? null;
            $image = Attachment::find($imageId) ?? null;
    
            $data = $request->all();
            $data['question_img_id'] = $imageId ?? null;
            $data['correct_answer'] = json_encode($request->correct_answer);
    
            unset($data['question_tag_id']);
            unset($data['options']);
    
            $examQuestion = ExamQuestion::create($data);
    
            foreach ($request->question_tag_id as $tagId) {
                QuestionTag::create([
                    'question_id' => $examQuestion->id,
                    'tag_id' => $tagId
                ]);
            }
    
            // Determine if correct_option_id is an array or a single value
            $correctOptionValues = $request->input('correct_option_id');
            if (!is_array($correctOptionValues)) {
                $correctOptionValues = [$correctOptionValues]; // Convert to array if not already
            }
    
            foreach ($request->options as $index => $option) {
                $isCorrect = false;
                if (is_string($correctOptionValues[0])) {
                    // Extract the index from the label (e.g., "Option 3" -> 3)
                    preg_match('/\d+$/', $correctOptionValues[0], $matches);
                    $correctOptionIndex = isset($matches[0]) ? intval($matches[0]) - 1 : null;
                    $isCorrect = $index === $correctOptionIndex;
                } else {
                    // Handle as an array of indices
                    $isCorrect = in_array($index, $correctOptionValues);
                }
    
                $optionImageId = null;
                if (isset($option['image_id'])) {
                    $optionImage = Attachment::find($option['image_id']);
                    if ($optionImage) {
                        $optionImageId = $optionImage->id;
                    }
                }
    
                QuestionOption::create([
                    'question_id' => $examQuestion->id,
                    'value' => $option['option_value'] ?? null,
                    'image_id' => $optionImageId,
                    'is_correct' => $isCorrect,
                ]);
            }
    
            DB::commit();
    
            return response()->json([
                'examQuestion' => $examQuestion,
                'message' => 'Question created successfully.'
            ], 201);
    
        } catch (Exception $e) {
            DB::rollBack();
            return response()->json(['error' => 'Failed to save question and options: ' . $e->getMessage()], 500);
        }
    }
    
    
    
    // Get all exam questions
    public function index(Request $request)
    {
        $perPage = 10;
        $page = $request->input('currentPage', 1);
    
        $query = ExamQuestion::with([
            'options.attachment', 
            'correctOption', 
            'questionType', 
            'attachment', 
            'course', 
            'section', 
            'tags', 
            'options'
        ]);
    
        // Filter by section_id if provided
        if ($request->has('section_id')) {
            $query->where('section_id', $request->input('section_id'));
        }
    
        // Filter by question_type_id if provided and not empty
        if ($request->has('question_type_id') && $request->input('question_type_id') !== '') {
            $query->where('question_type_id', $request->input('question_type_id'));
        }
    
        // Filter by tag_id(s) if provided and not empty
        if ($request->has('tag_id') && !empty($request->input('tag_id'))) {
            $tagIds = $request->input('tag_id');
            $query->whereHas('tags', function ($q) use ($tagIds) {
                $q->whereIn('tag_id', $tagIds);
            });
        }
    
        \DB::enableQueryLog(); // Enable query log
    
        $examQuestions = $query->paginate($perPage, ['*'], 'page', $page);
    
        $log = \DB::getQueryLog(); // Retrieve query log
        \Log::info('SQL Query:', $log);
    
        return response()->json($examQuestions, 200);
    }
    

    
    
    
    

    public function paginatedExamQuestions(Request $request)
    {
        $perPage = 10; // You can change this to any number you prefer
    
        // Get the current page from the request, default is 1
        $page = $request->input('page', 1);
    
        $examQuestions = ExamQuestion::with(['options.attachment', 'correctOption', 'questionType', 'attachment', 'course', 'section', 'tags', 'options'])
                                     ->paginate($perPage, ['*'], 'page', $page);
    
        $transformedCollection = $examQuestions->getCollection()->transform(function($question) {
            $question->section_name = $question->section->name;
            unset($question->section);
            return $question;
        });
    
        $examQuestions->setCollection($transformedCollection);
    
        return response()->json($examQuestions, 200);
    }
    
    


    // Get a single exam question by ID
    public function show($id)
    {
        $examQuestion = ExamQuestion::with(['options.attachment','correctOption', 'questionType','attachment','course', 'section', 'tags', 'options'])->find($id);
        
        if ($examQuestion) {
            $examQuestion->section_name = $examQuestion->section->name; // Assuming 'name' is the column in the section table that holds the name
            unset($examQuestion->section); // Remove the entire section object
        }
        
        return response()->json($examQuestion, 200);
    }

    
    public function filterQuestions(Request $request)
    {
        $query = ExamQuestion::query();
    
        if ($request->has('section_id')) {
            $query->where('section_id', $request->input('section_id'));
        }
    
        if ($request->has('tag_id')) {
            $query->whereHas('tags', function ($q) use ($request) {
                $q->where('question_tags.tag_id', $request->input('tag_id'));
            });
        }
    
        if ($request->has('question_type_id')) {
            $query->where('question_type_id', $request->input('question_type_id'));
        }
    
        // Order by 'updated_at' in descending order and paginate the results
        $questions = $query->with(['tags', 'section'])
                           ->orderBy('updated_at', 'desc')
                           ->paginate(10); // 10 records per page
    
        return response()->json($questions);
    }
    
    
    

    // Update an exam question by ID
    public function update(Request $request, $id)
    {
        DB::beginTransaction();
        try {
            $examQuestion = ExamQuestion::find($id);
            if (!$examQuestion) {
                return response()->json(['message' => 'Exam question not found'], 404);
            }
    
            $dataToUpdate = $request->except(['question_tag_id', 'options', 'correct_option_id']);
            $examQuestion->update($dataToUpdate);
    
            if ($request->has('question_tag_id')) {
                $tagIds = $request->get('question_tag_id');
                $examQuestion->tags()->sync($tagIds);
            }
    
            // Reset is_correct for all options of this question
            QuestionOption::where('question_id', $id)->update(['is_correct' => 0]);
    
            if ($request->has('correct_option_id')) {
                $correctOptionIds = $request->get('correct_option_id');
    
                if (is_array($correctOptionIds)) {
                    foreach ($correctOptionIds as $correctOptionId) {
                        QuestionOption::where('id', $correctOptionId)
                                      ->where('question_id', $id)
                                      ->update(['is_correct' => 1]);
                    }
                } else {
                    QuestionOption::where('id', $correctOptionIds)
                                  ->where('question_id', $id)
                                  ->update(['is_correct' => 1]);
                }
            }
    
            if ($request->has('options')) {
                foreach ($request->options as $optionData) {
                    if (isset($optionData['id'])) {
                        $option = QuestionOption::find($optionData['id']);
                        if ($option) {
                            $option->update([
                                'value' => $optionData['option_value'] ?? $option->value, // Update the value if provided
                                'image_id' => $optionData['image_id'] ?? null,
                            ]);
                        }
                    }
                }
            }
    
            DB::commit();
    
            $updatedExamQuestion = ExamQuestion::with(['tags', 'options'])->find($id);
            
            return response()->json($updatedExamQuestion, 200);
        } catch (\Exception $e) {
            DB::rollBack();
            \Log::error('Error updating exam question: ' . $e->getMessage());
            return response()->json(['message' => 'Failed to update exam question', 'error_detail' => $e->getMessage()], 500);
        }
    }
    

    
    
    

    


    // Delete an exam question by ID
    public function destroy($id)
    {
        ExamQuestion::destroy($id);
        return response()->json(null, 204);
    }
}
