<?php

namespace PickBazar\Http\Controllers;

use PickBazar\Database\Models\Section;
use Illuminate\Http\Request;

class SectionController extends CoreController
{
    public function index()
    {
        $sections = Section::with('subsections')->get();
        return response()->json($sections);
    }
    

    public function create()
    {
        // Normally this might return a view for a form, but in an API you might just need validation or additional data
    }

    public function store(Request $request)
    {
        $section = Section::create($request->all());
        return response()->json($section, 201);
    }

    public function show($id)
    {
        $section = Section::with('subsections')->find($id);
        if (!$section) {
            return response()->json(['message' => 'Section not found'], 404);
        }
    
        return response()->json($section, 200);
    }

    public function edit($id)
    {
        // Normally this might return a view for a form, but in an API you might just return the existing data
        $section = Section::find($id);
        return response()->json($section);
    }

    public function update(Request $request, $id)
    {
        $section = Section::find($id);
        $section->update($request->all());
        return response()->json($section, 200);
    }

    public function destroy($id)
    {
        $section = Section::find($id);

        if ($section) {
            $section->delete();
            return response()->json(null, 204); // 204 No Content, indicates successful processing of the request
        } else {
            return response()->json(['error' => 'Section not found'], 404); // 404 Not Found
        }
    }
}

