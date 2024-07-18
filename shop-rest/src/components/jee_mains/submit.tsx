import { useRouter } from "next/router";

const SubmitJeeMains = ({
  toggle,
  resultToggle,
  finalSubmit,
  setToggle,
  queLength,
  notAnsweredlength,
  Answeredlength,
  markedforreviewlength,
  answeredmarkedforreviewlength,
  notVisitedlength,
}) => {
  const router = useRouter();

  return (
    <>
      <h1 className="font-black  text-2xl text-center mt-8">Exam Summary</h1>

      <div className="flex mx-2 border-b mt-6 mb-6 pb-6 flex-wrap justify-center gap-6">
        <div className="pl-5 text-lg text-center font-extrabold text-gray-600 pr-5 border-r">
          <h1>No of Questions</h1>
          <div>{queLength + 1}</div>
        </div>
        <div className=" text-lg text-center font-extrabold text-gray-600 pr-5 border-r">
          <h1>Answered</h1>
          <div>{Answeredlength}</div>
        </div>
        <div className=" text-lg text-center font-extrabold text-gray-600 pr-5 border-r">
          <h1>Not Answered</h1>
          <div>{notAnsweredlength}</div>
        </div>
        <div className=" text-lg text-center font-extrabold text-gray-600 pr-5 border-r">
          <h1>Marked for Review</h1>
          <div>{markedforreviewlength}</div>
        </div>
        <div className=" text-lg text-center font-extrabold text-gray-600 pr-5 border-r">
          <h1>
            Answered & Marked for Review (will be considered for evaluation)
          </h1>
          <div>{answeredmarkedforreviewlength}</div>
        </div>
        <div className=" text-lg text-center font-extrabold text-gray-600 pr-5 ">
          <h1>Not Visited</h1>
          <div>{notVisitedlength}</div>
        </div>
      </div>

      {!resultToggle ? (
        <div>
          <div>
            <h1 className="font-black  text-2xl text-center mt-8">
              Are you sure you want to submit for final marking?
            </h1>
            <h1 className="font-black  text-2xl text-center ">
              No changes will be allowed after submission.
            </h1>
          </div>

          <div className="flex justify-center text-base font-bold">
            <button className="border h-14 w-20 " onClick={finalSubmit}>
              YES
            </button>
            <button
              className="ml-2 border h-14 w-20"
              onClick={() => setToggle(!toggle)}
            >
              NO
            </button>
          </div>
        </div>
      ) : null}
    </>
  );
};

export default SubmitJeeMains;
