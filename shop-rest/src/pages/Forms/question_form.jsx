import React, { useState } from 'react';
import Form_DashBoard from './form_dashboard';

const Question_Form = () => {
  const [question, setQuestion] = useState('');
  const [questionType, setQuestionType] = useState('');
  const [options, setOptions] = useState([]);
  const [numericalAnswer, setNumericalAnswer] = useState('');
  const [marks, setMarks] = useState('');
  const [difficultyLevel, setDifficultyLevel] = useState('');
  const [subject, setSubject] = useState('');
  const [explanation, setExplanation] = useState('');
  const [reference, setReference] = useState('');
  const [tags, setTags] = useState('');
  const [questionImage, setQuestionImage] = useState(null);
  const [optionImages, setOptionImages] = useState([]);

  const handleOptionChange = (index, value) => {
    const updatedOptions = [...options];
    updatedOptions[index] = value;
    setOptions(updatedOptions);
  };

  const handleAddOption = () => {
    setOptions([...options, '']);
    setOptionImages([...optionImages, null]);
  };

  const handleRemoveOption = (index) => {
    const updatedOptions = options.filter((_, i) => i !== index);
    const updatedOptionImages = optionImages.filter((_, i) => i !== index);
    setOptions(updatedOptions);
    setOptionImages(updatedOptionImages);
  };

  const handleQuestionImageChange = (e) => {
    const file = e.target.files[0];
    setQuestionImage(file);
  };

  const handleOptionImageChange = (index, e) => {
    const file = e.target.files[0];
    const updatedOptionImages = [...optionImages];
    updatedOptionImages[index] = file;
    setOptionImages(updatedOptionImages);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Perform necessary actions with the form data
    // ...

    // Reset form fields
    setQuestion('');
    setQuestionType('');
    setOptions([]);
    setNumericalAnswer('');
    setMarks('');
    setDifficultyLevel('');
    setSubject('');
    setExplanation('');
    setReference('');
    setTags('');
    setQuestionImage(null);
    setOptionImages([]);
  };

  return (
    <div className="grid grid-cols-4 gap-4 ">
    <Form_DashBoard />
    <div className="col-span-3">
    <div className="max-w-2xl mx-auto">
      <form onSubmit={handleSubmit} className="bg-white shadow-md rounded-md p-6">
        <h2 className="text-2xl font-semibold mb-4">Create a Question</h2>

        <div className="mb-4">
          <label htmlFor="question" className="block mb-2 font-medium">
            Question
          </label>
          <textarea
            id="question"
            className="w-full px-3 py-2 border rounded-md"
            rows="4"
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            required
          />
          <input
            type="file"
            accept="image/*"
            onChange={handleQuestionImageChange}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="questionType" className="block mb-2 font-medium">
            Question Type
          </label>
          <select
            id="questionType"
            className="w-full px-3 py-2 border rounded-md"
            value={questionType}
            onChange={(e) => setQuestionType(e.target.value)}
            required
          >
            <option value="">Select Question Type</option>
            <option value="multipleChoice">Multiple-Choice</option>
            <option value="numericalValue">Numerical Value</option>
            <option value="matchingLists">Matching Lists</option>
            <option value="assertionReasoning">Assertion-Reasoning</option>
            <option value="paragraphBased">Paragraph-Based</option>
          </select>
        </div>

        {questionType === 'multipleChoice' && (
          <div className="mb-4">
            <label className="block mb-2 font-medium">Options</label>
            {options.map((option, index) => (
              <div key={index} className="flex items-center mb-2">
                <input
                  type="text"
                  className="w-full px-3 py-2 border rounded-md mr-2"
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                  required
                />
                <input
                  type="file"
                  accept="image/*"
                  onChange={(e) => handleOptionImageChange(index, e)}
                />
                <button
                  type="button"
                  className="p-2 rounded-full bg-red-500 text-white hover:bg-red-600"
                  onClick={() => handleRemoveOption(index)}
                >
                  X
                </button>
              </div>
            ))}
            <button
              type="button"
              className="px-3 py-2 text-sm text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
              onClick={handleAddOption}
            >
              Add Option
            </button>
          </div>
        )}

        {questionType === 'numericalValue' && (
          <div className="mb-4">
            <label htmlFor="numericalAnswer" className="block mb-2 font-medium">
              Numerical Answer
            </label>
            <input
              id="numericalAnswer"
              type="text"
              className="w-full px-3 py-2 border rounded-md"
              value={numericalAnswer}
              onChange={(e) => setNumericalAnswer(e.target.value)}
              required
            />
          </div>
        )}

        <div className="mb-4">
          <label htmlFor="marks" className="block mb-2 font-medium">
            Marks
          </label>
          <input
            id="marks"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={marks}
            onChange={(e) => setMarks(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="difficultyLevel" className="block mb-2 font-medium">
            Difficulty Level
          </label>
          <select
            id="difficultyLevel"
            className="w-full px-3 py-2 border rounded-md"
            value={difficultyLevel}
            onChange={(e) => setDifficultyLevel(e.target.value)}
            required
          >
            <option value="">Select Difficulty Level</option>
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>

        <div className="mb-4">
          <label htmlFor="subject" className="block mb-2 font-medium">
            Subject/Topic
          </label>
          <input
            id="subject"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={subject}
            onChange={(e) => setSubject(e.target.value)}
            required
          />
        </div>

        <div className="mb-4">
          <label htmlFor="explanation" className="block mb-2 font-medium">
            Explanation/Justification
          </label>
          <textarea
            id="explanation"
            className="w-full px-3 py-2 border rounded-md"
            rows="4"
            value={explanation}
            onChange={(e) => setExplanation(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="reference" className="block mb-2 font-medium">
            Reference/Source
          </label>
          <input
            id="reference"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={reference}
            onChange={(e) => setReference(e.target.value)}
          />
        </div>

        <div className="mb-4">
          <label htmlFor="tags" className="block mb-2 font-medium">
            Tags/Keywords
          </label>
          <input
            id="tags"
            type="text"
            className="w-full px-3 py-2 border rounded-md"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>

        <button
          type="submit"
          className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 rounded-md hover:bg-indigo-700"
        >
          Submit
        </button>
      </form>
    </div>
    </div>
    </div>
  );
};

export default Question_Form;
