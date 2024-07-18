const Profile = ({name}) => {

    console.log("student name ", name)
    return ( <div className="border h-[132px] flex items-center">
        <div className="flex w-full ml-2">
         <div className="h-[110px] w-2/5 border"></div>
         <div className="text-xl font-semibold ml-4">{name?.me?.name}</div>
         </div>
    </div> );
}
 
export default Profile;