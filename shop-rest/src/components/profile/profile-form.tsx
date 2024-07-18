import Button from "@components/ui/button";
import Card from "@components/ui/card";
import FileInput from "@components/ui/file-input";
import Input from "@components/ui/input";
import { useUpdateCustomerMutation } from "@data/customer/use-update-customer.mutation";
import { maskPhoneNumber } from "@utils/mask-phone-number";
import { Controller, useForm } from "react-hook-form";
import TextArea from "@components/ui/text-area";
import { toast } from "react-toastify";
import { useTranslation } from "next-i18next";
import { User } from "@ts-types/generated";
import pick from "lodash/pick";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useEffect, useMemo, useState } from "react";
import Radio from "@components/ui/radio/radio";
import { Label } from "@headlessui/react/dist/components/label/label";
import {useUpdateUserMutation} from "@data/customer/use-update-user.mutation";
import { useCustomerQuery } from "@data/customer/use-customer.query";
import { API_ENDPOINTS } from "@utils/api/endpoints";
import http from "@utils/api/http";
import url from "@utils/api/server_url";
import { useMutation } from "react-query";
import GooglePlacesAutocomplete from "@components/form/google-places-autocomplete";
import { getLocation } from "@contexts/location/location.utils";
import { useLocation } from "@contexts/location/location.context";
import { useUserProfileUpdateMutation } from "@data/user/user-profile-update.mutation";
import { useAllUsersProfileDetailQuery } from "@data/user/use-all-users-profile-detail-query";
import { useUserProfileDetailsQuery } from "@data/user/use-user-profile-details.query";
import { profile } from "console";
import { useUserProfileMutation } from "@data/user/user-profile-create.mutation";
import router from "next/router";


// const interests = [
//   'Anime',
//   'Pop Culture',
//   'Movies',
//   'Shows',
//   'K pop',
//   'K Drama',
//   'Cricket',
//   'Bollywood',
//   'Technology',
//   'Food',
//   'Travel',
//   'Politics',
//   'Health',
//   'Spirituality',
//   'Gaming',
//   'Art',
//   'Music',
//   'Fashion',
//   'Education',
//   'Startups',
//   'Environment',
//   'Fitness',
// ];

const interests = [
  'Beers & booze',
  'Coffee',
  'Beauty',
  'Home',
  'Eat Out',
  'Shopping',
  'Hangout',
  'Movies',
  'Pizza Dates',
  'Gym Lovers',
]



interface Props { 
  user: User;
}

type UserFormValues = {
  name?: User["name"];
  profile?: User["profile"];
};

const ProfileForm = ({ user }: Props) => {

  const [birthDate, setBirthDate] = useState(null);

  const[occupation, setOccupation] = useState(null);
  const {data} = useCustomerQuery();

  

  const { t } = useTranslation("common");


  const {data:profileData} = useUserProfileDetailsQuery(data?.me?.id)

  const [selectedInterests, setSelectedInterests] = useState(profileData?.interests || []);


  const toggleInterest = (interest) => {
    if (selectedInterests.includes(interest)) {
      setSelectedInterests(selectedInterests.filter((item) => item !== interest));
    } else {
      setSelectedInterests([...selectedInterests, interest]);
    }
  };
  
  

  useEffect(() => {
    if(profileData?.interests) {
      setSelectedInterests(profileData?.interests);
    }
  }, [profileData?.interests]);
  

  
  
 
  const [userLocation, setUserLocation] = useState('');
  
  // const memoizedLocation = useMemo(async () => {
  //   const { data: response } = await http.get(
  //     `${url}/${API_ENDPOINTS.IP_LOCATION}`
  //   );
  //   return response;
  // }, []);

  

  console.log('formdata profil',profileData?.interests, selectedInterests );
  

  useEffect(()=>{
    const getIpLocation = async () => {
      // const response = await memoizedLocation;
      // setUserLocation(response?.city+","+response?.region_name);
      // console.log(' ip ip', response);
    }
    getIpLocation();
  },[data?.me?.id]);
  


  console.log('ip ip', typeof userLocation, userLocation)


  const { register, handleSubmit, setValue, control } = useForm<UserFormValues>(
    
    {
      defaultValues: {
        ...(user &&
          pick(user, [
            "name",
            // 'email',
            'date_of_birth',
            'occupation',
            'gender',
            'current_location',
            'date_of_birth',
            'profile.gender',
            'profile.occupation',
            "profile.bio",
            "profile.contact",
            'profile.home_location',
            "profile.avatar",
          ])),
      },
    }
  );

  const {getLocation} =useLocation();

  const {data:userProfile} = useUserProfileDetailsQuery(user?.id)

  console.log('details', userProfile)

   const { mutate: updateProfile, isLoading: loading } =
    useUpdateCustomerMutation();

    const { mutate: updateUserProfile, isLoading: updating } =
    useUserProfileUpdateMutation();

    // const { mutate: updateUser, isLoading: loadingUser } =
    // useUpdateUserMutation();

    const {mutate: createUserProfile } = useUserProfileMutation();

    useEffect(() => {}, [selectedInterests]);


  function onSubmit(values: any) {

    console.log('profile form',getLocation);

    updateProfile(
      {
        id: user?.id,
        name: values?.name,
        date_of_birth: values?.profile?.date_of_birth,
        gender: values?.profile?.gender,
        occupation: values?.profile?.occupation,
        current_location: getLocation ,
        // email: values?.email,
         profile: {
          id: user?.profile?.id,
          ...values?.profile,
          home_location: values?.profile.home_location,
          date_of_birth: values?.profile?.data_of_birth,
          gender: values?.profile?.gender,
          occupation: values?.profile?.occupation,
          avatar: values?.profile.avatar,
        },
      },
      {
        onSuccess: () => { 
         toast.success(t("Profile Updated Successfully"));
        },
      }
    );  

  { userProfile ? updateUserProfile(
      {
        id: user?.id,
        // date_of_birth: values?.date_of_birth,
        gender: values?.profile.gender,
        bio: values?.profile.bio,
        interests: selectedInterests,
        

        // email: values?.email,
       
      },
      {
        onSuccess: () => {
          toast.success(t("User Updated"));
        },
      }
    )

   : createUserProfile(
      { 
        id: user?.id,
        // date_of_birth: values?.date_of_birth,
        gender: values?.profile.gender,
        bio: values?.profile.bio,
        interests: selectedInterests,
       },
      {
        onSuccess: () => {
          toast.success(("Profile Updated Successfully"));
          router.push('/home')
          // onNext();
        },
        onError: (error) => {
          console.log("Error submitting user profile:", error);
          alert("There was an error submitting your user profile. Please try again.");
        },
      }
    );
  }
  }


   const profilePercentage = (user && user.profile)
    ? (Object.keys(user.profile).length / 7) * 100
    : 0;
    
  return (

    <form noValidate onSubmit={handleSubmit(onSubmit)}>
      <div className="flex mb-8">
        <Card className="w-full">
          <div className="mb-8"> 
            <FileInput control={control} name="profile.avatar" multiple={true} />
          </div>
          <div className="flex flex-col space-y-4 lg:space-y-0 sm:flex-row sm:items-center sm:space-s-4 mb-6">
            <Input
              className="flex-1"
              label={t("Name")}
              {...register("name")}
              variant="outline"
            />

            <Input
              className="flex-1"
              label={t("Email")}
              value={data?.me?.email}
              // {...register("email")}
              variant="outline"
            />
            {/* <Input
              {...register("profile.contact")}
              label={t("Contact Number")}
              className="flex-1 mt-3 lg:mt-0"
              
              variant="outline"
            /> */}
          </div>

          <div className="space-y-4  col-span-1 sm:col-span-2">

            {/* <div className="col-span-1 sm:col-span-1">
        
        <div className="flex  text-body-dark h-3  font-semibold text-xs leading-none mb-3">
            <span className="text-gray-700 text-sm font-semibold ">Date of Birth</span>
              </div>
          <Controller
                  control={control}
                  name="date_of_birth"
                  render={({ field: { onChange, onBlur, value } }) => (
                    //@ts-ignore
             <DatePicker
                        selected={birthDate}
                        onChange={(date) => {
                          setBirthDate((date));
                          setValue("date_of_birth", date);
                        }}
                        dateFormat="dd-MM-yyyy"
                        className="text-sm h-12 w-full px-4 border border-border-base rounded focus:border-accent"
                        showYearDropdown
                        showMonthDropdown
                        dropdownMode="select"
                        peekNextMonth
                        showWeekNumbers
                        minDate={new Date(1970,1,1)}
                        maxDate={new Date(2005,12,31)}
                        placeholderText={t(" DOB (min 18 years of age)")}
                        required
                        // className="w-full"
                  />          
                  )}
            />
        </div> */}

              <div className="flex flex-col space-y-2"> 

                {/* <span className="text-xs text-gray-600 font-semibold">Date of birth</span> */}
                <Input
                  className="flex-1"
                  label={t("Home Town")}
                  {...register("profile.home_location")}
                  variant="outline"
                />
                {/* <label>Home Town</label>
                <GooglePlacesAutocomplete/> */}
                                
              </div>
        

          <div className="flex flex-col">
              <div className="flex  text-body-dark h-3  font-semibold text-xs leading-none mb-3">
                Gender
              </div>
              <div className="flex items-center space-x-4 lg:space-x-8 ">
                <Radio
                  id="male"
                  type="radio"
                  {...register("profile.gender")}
                  value="male"
                  label={t("Male")}
                  className=""
                />

                <Radio
                  id="female"
                  type="radio"
                  {...register("profile.gender")}
                  value="female"
                  label={t("Female")}
                  className=""
                />
              </div>
          </div>

          </div>

          <div className="flex flex-col  items-start my-4 ">
            <span className="text-xs text-gray-600 my-2 font-semibold">Occupation</span>
              <select
                    className="  text-gray-600 p-4 text-sm items-center mr-4 bg-white border rounded flex "
                    onChange={(e) => setOccupation(e.target.value)}
                    // value={occupation}
                    defaultValue="Search by"
                    // setValue={setValue}
                    {...register("profile.occupation")}
                  >
                    <option value='' disabled selected >Select your option</option>
                    <option value="Student">{t("Student")}</option>
                    {/* <option value="email">{t("form:input-label-email")}</option> */}
                    <option value="Employed">{t("Employed")}</option>
                    <option value='Self employed'>Self employed</option>
                    <option value='Home Maker'>Home Maker</option>
              </select> 
          </div>

          <TextArea
            label={t("Bio")}
            //@ts-ignore
            {...register("profile.bio")}
            variant="outline"
            className="mb-6 mt-4"
          />

          <div className="text-gray-600  font-semibold my-2">
            Interests
          </div>

      <div className="grid grid-cols-3 lg:grid-cols-5 gap-4">
            {interests.map((interest) => (
              <span
                key={interest}
                onClick={() => toggleInterest(interest)}
                className={`px- py-2 rounded-lg shadow-md focus:outline-none ${
                  selectedInterests.includes(interest)
                    ? 'bg-yellow-500 text-white font-bold text-xs lg:text-sm text-center'
                    : 'bg-white text-gray-700 border border-gray-300 text-xs lg:text-sm text-center'
                }`}
              >
                {interest}
              </span>
            ))}

      </div>



          <div className="flex">
            <Button className="ms-auto" loading={loading} disabled={loading}>
              {("Save")}
            </Button>
          </div>
        </Card>
      </div>
    </form>
  );
};

export default ProfileForm;
