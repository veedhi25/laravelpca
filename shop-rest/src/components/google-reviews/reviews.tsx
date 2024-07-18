import React from 'react';


// const reviews = [
//     {
//         author_name : 'vinender',
//         profile_photo_url: 'https://lh3.googleusercontent.com/a-/AD5-WClapVqR_STaVg2Jip8UKy6iqEWPgSdqpwf_ugcsFj8=s128-c0x00000000-cc-rp-mo-ba3',
//         relative_time_description : '1 month ago',
//         rating : 4,
//         text : 'good product and services'
//     },
//     {
//         author_name : 'amy',
//         profile_photo_url: 'https://lh3.googleusercontent.com/a-/AD5-WClapVqR_STaVg2Jip8UKy6iqEWPgSdqpwf_ugcsFj8=s128-c0x00000000-cc-rp-mo-ba3',
//         relative_time_description : '1 month ago',
//         rating : 4,
//         text : 'good product '
//     }
// ] 

const Review = (  {review} ) => {

    
  return (
    <div className="bg-white p-4  border-b rounded-lg shadow-lg space-y-2 w-auto lg:w-100 h-auto">
      <div className="flex items-center mb-2">
        <img src='/boy.png' alt={review?.author_name} className="w-8 h-8 border rounded-full mr-4" />
        <div>
          <h4 className="text-lg  ml-4 font-medium">{review?.author_name}</h4>
          <p className="text-gray-500 ml-4">{review?.relative_time_description}</p>
        </div>
      </div>
      <div className="mb-2">
      <span className='mr-2 text-gray-600'> {review?.rating}</span> 
        {Array(review?.rating)
          .fill()
          .map((_, i) => (
            <span key={i} className="text-green-500">
              ⭐ 
            </span>
          ))}
         
      </div>
      <p>{review.text}</p>
    </div>
  );
};

 

const GoogleReviews = (data:any) => {
    console.log('google review',data?.data?.review)
    const sortedReviews = data?.data?.review?.sort((a, b) => b.time - a.time);
  return (
    <div className="bg-white p-4 rounded-lg">
      {sortedReviews?.map((review, i) => (
        <Review key={i} review={review} />
      ))}
    </div>
  );
};

export default GoogleReviews;
