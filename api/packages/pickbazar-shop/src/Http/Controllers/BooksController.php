<?php 

namespace PickBazar\Http\Controllers;

use  PickBazar\Database\Models\Books;
use Illuminate\Http\Request;

class BooksController extends CoreController
{
    public function index() {
        $books = Books::with(['course', 'pdf', 'studentClass'])->get();
        return response()->json($books->map(function ($book) {
            return [
                'id' => $book->id,
                'name' => $book->name,
                'course_name' => $book->course ? $book->course->name : null, // Assuming Course model has a 'name' field
                'pdf_url' => $book->pdf ? $book->pdf->url : null, // Use 'url' column from Attachment model
                'student_class' => $book->studentClass ? $book->studentClass->name : null, // Assuming StudentClass model has a 'name' field
                'author_name' => $book->author_name,
                'description' => $book->description,
            ];
        }));
    }
    
    public function show($bookId) {
        $book = Books::with(['course', 'pdf', 'studentClass'])->find($bookId);
        
        if (!$book) {
            return response()->json(['error' => 'Book not found'], 404);
        }
        
        return response()->json([
            'id' => $book->id,
            'name' => $book->name,
            'course_id' => $book->course ? $book->course->id : null,
            'course_name' => $book->course ? $book->course->name : null,
            'pdf_id' => $book->pdf ? $book->pdf->id : null,
            'pdf_url' => $book->pdf ? $book->pdf->url : null,
            'student_class' => $book->studentClass ? $book->studentClass->name : null,
            'class_id' =>  $book->studentClass ? $book->studentClass->id : null,
            'author_name' => $book->author_name,
            'description' => $book->description,
        ]);
    }
    
    
    
    

    public function store(Request $request) {
        $book = Books::create($request->all());
        return response()->json($book, 201);
    }

     

    public function update(Request $request, Books $book) {
        $book->update($request->all());
        return response()->json($book);
    }

    public function destroy(Books $book) {
        $book->delete();
        return response()->json(null, 204);
    }

    // Add any other necessary methods or functionalities
}
