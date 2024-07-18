<?php 
namespace PickBazar\Http\Controllers;

use Illuminate\Http\Request;
use PickBazar\Database\Models\Exam;  
use PickBazar\Database\Models\ExamSection;  
use PickBazar\Database\Models\Course;  
use PickBazar\Database\Models\ExamQuestionAssoc;
use Illuminate\Support\Facades\DB;
use PickBazar\Database\Models\Section;
use PickBazar\Database\Models\SubSection;
use Illuminate\Support\Facades\Log;


class ExamController extends CoreController
{
    public function index()
    {
        $exams = Exam::with([
            'course',
            'sections',
            'sections.subsections',
            'classes',
            // Removed the eager loading of questionAssociations and related question data
        ])->get();
    
        $exams = $exams->map(function ($exam) {
            // Here, we are only focusing on the sub-sections and course name
            // $subSections = [];
            // if (isset($exam->sections) && count($exam->sections) > 0) {
            //     foreach ($exam->sections as $section) {
            //         foreach ($section->subsections as $subSection) {
            //             $subSections[] = $subSection;
            //         }
            //     }
            // }
    
            // $exam->sub_sections = $subSections;  // Attach unique sub_sections to the exam
            $exam->course_name = $exam->course->name;  // Attach course_name to the exam
    
            unset($exam->course);  // If you only want the course name and not the entire course object
            unset($exam->sections);  // Optionally, remove the sections if they are not needed
    
            return $exam;
        });
    
        return response()->json($exams);
    }
    
    
    
    // Retrieve a single exam by ID
    public function show($examId)
    {

        // return '';
        // Eager loading the relationships
        $exam = Exam::with([
            'questionAssociations' => function($query) {
                $query->select('id', 'exam_id', 'question_id', 'sub_section', 'question_subSection', 'marks', 'negative_marks');  // Added 'question_subSection' here
            },
            'questionAssociations.question.section',
            'questionAssociations.question.questionType',
            'course',
            'sections',
            'questionAssociations.question',
            'sections.subsections',
            'questionAssociations.question.subsection',
            'questionAssociations.section.subsections',
            'questionAssociations.question.options'
        ])->find($examId);

        if (!$exam) {
            return response()->json(['message' => 'Exam not found'], 404);
        }

        // Transforming the data to include questions and their associated data
        $exam->questions = $exam->questionAssociations->map(function ($questionAssociation) {
            $question = $questionAssociation->question;

            // $marks = $question->pivot->marks;
            // $negative_marks = $question->pivot->negative_marks;

            $question->section_name = $question->section ? $question->section->name : null;
            $question->question_type_name = $question->questionType ? $question->questionType->name : null;
            $question->sub_section = $questionAssociation->sub_section;

            $question->negative_marks = $questionAssociation->negative_marks;
            $question->marks = $questionAssociation->marks;
            $question->question_subSection = $questionAssociation->question_subSection;
            return $question;
        });

        unset($exam->questionAssociations);  // Remove the intermediate association data if not needed
        $exam->course_name = $exam->course->name;  // Assuming the course model has a name attribute
        unset($exam->course);  // If you only want the course name and not the entire course object

        return response()->json($exam);
    }



    // Create a new exam
    public function store(Request $request)
    {

        // return $request;
        $request->validate([
            'name' => 'required|string',
            'total_marks' => 'required|numeric',
            'total_questions' => 'required|numeric',
            'time.hours' => 'required|numeric',
            'time.minutes' => 'required|numeric',
            'course.id' => 'required|exists:courses,id',  // Updated validation rule
            'finalQuestion' => 'required|array',
            'sections' => 'required|array',
            'start_time' => 'required|string',
            'end_time' => 'required|string',
            // 'class_id' => 'required|exists:class_id',
            // ... (other validation rules)
        ]);


        DB::beginTransaction();

        try {
            $time = $request->input('time');
            $total_minutes = $time['hours'] * 60 + $time['minutes'];
            $exam = new Exam;
            $exam->name = $request->input('name');
            $exam->total_marks = $request->input('total_marks');
            $exam->total_questions = $request->input('total_questions');
            $exam->time = $total_minutes;  // Store time as total minutes // Converted array to JSON string
            $exam->course_id = $request->input('course.id'); 
            $exam->class_id = $request->input('class_id'); 
            $exam->start_time = $request->input('start_time');
            $exam->end_time = $request->input('end_time');
            // $exam->question_subSection = $request->input('question');
              

            $exam->save();

            $exam->finalQuestion = json_encode($request->input('finalQuestion')); // Converted array to JSON string
            $exam->sections = json_encode($request->input('sections')); // Converted array to JSON string


            $sectionMap = [];
            $sectionsInput = $request->input('sections');

            foreach ($sectionsInput as $sectionData) {
                $section = Section::where('name', $sectionData['sectionName'])->first();

                // If the section doesn't exist, you might want to handle it differently 
                // e.g., throw an error, skip, or create it.
                if (!$section) {
                    continue; // skip this iteration and move to the next section
                }
            
                // 2. Associate the found section with the exam
                DB::table('exam_section')->insert([
                    'exam_id' => $exam->id,
                    'section_id' => $sectionData['id']
                ]);

                if ($sectionData['hasSubsections']) {
                    foreach ($sectionData['subSections'] as $subsectionData) {
                        $subsection = SubSection::create([
                            'name' => $subsectionData['name'],
                            'section_id' => $section->id,
                        ]);

                        $sectionMap[$sectionData['sectionName']][$subsectionData['name']] = $subsection->id;
                    }
                } else {
                    $subsection = SubSection::create([
                        'name' => $sectionData['sectionName'] . ' - Default',
                        'section_id' => $section->id,
                    ]);

                    $sectionMap[$sectionData['sectionName']]['Default'] = $subsection->id;
                }
            }

            $sectionSubsectionDetails = json_encode($request->input('sections'));  // JSON encode the section details

            foreach ($request->input('finalQuestion') as $questionData) {
                // We are no longer using section_name and subsection_name here

                ExamQuestionAssoc::create([
                    'exam_id' => $exam->id,
                    'question_id' => $questionData['question_id'],
                    'marks' => $questionData['marking_Scheme']['marks'],
                    'negative_marks' => $questionData['marking_Scheme']['negative'],
                    'section_id' => null, // Set to null for now, as we are not determining this value here
                    'sub_section' => $sectionSubsectionDetails, // Use the JSON encoded section details
                    'question_subSection' => isset($questionData['question_subSection']) ? $questionData['question_subSection'] : null,
                ]);
            }
            
            DB::commit();
            return response()->json(['message' => 'Exam saved successfully.'], 201);
        } catch (\Exception $e) {
            DB::rollback();
            return response()->json(['message' => 'Error saving exam: ' . $e->getMessage()], 500);
        }
    }
    
    
    public function getCourseExams($courseId)
    {
        // return '';
        $course = Course::with('exams')->find($courseId);

        if (!$course) {
            return response()->json(['error' => 'Course not found'], 404);
        }
        return response()->json($course->exams);
    }
    
    // Update an existing exam
    public function update(Request $request, $examId)
    {
        $exam = Exam::find($examId);
        if (!$exam) {
            return response()->json(['message' => 'Exam not found'], 404);
        }
        $exam->update($request->all());
        return response()->json($exam);
    }

    // Delete an exam
    public function destroy($examId)
    {
        $exam = Exam::find($examId);
        if (!$exam) {
            return response()->json(['message' => 'Exam not found'], 404);
        }
        $exam->delete();
        return response()->json(['message' => 'Exam deleted successfully'], 200);
    }
}
