import { useCustomerQuery } from "@data/customer/use-customer.query";
import { useUpdateUserOnlineStatus } from "@data/user/use-user-online.query";
import { useEffect } from "react";
 
const OnlineStatusHandler = () => {
  const { data: userData } = useCustomerQuery();
  
  const userId = userData?.me?.id;

 
  const updateUserOnlineStatusMutation = useUpdateUserOnlineStatus();

  const handleUserOnlineStatusChange = (userId: number, isOnline: boolean) => {
    updateUserOnlineStatusMutation.mutate({ userId, isOnline });
  };

  useEffect(() => {
    if (userId) {
      // Set the user's online status to true when the app starts
      handleUserOnlineStatusChange(userId, true);

      // Attach the beforeunload event listener
      const handleBeforeUnload = () => {
        handleUserOnlineStatusChange(userId, false);
      };

      window.addEventListener("beforeunload", handleBeforeUnload);

      // Cleanup the event listener when the component is unmounted
      return () => {
        window.removeEventListener("beforeunload", handleBeforeUnload);
      };
    }
  }, [userId]);

  return null;
};

export default OnlineStatusHandler;
