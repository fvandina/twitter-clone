import {format} from "date-fns";

import useCurrentUser from "@/hooks/useCurrentUser";
import useUser from "@/hooks/useUser";
import { useMemo } from "react";
import Button from "../Button";

interface UserHeroProps {
  userId: string;
}

const UserBio: React.FC<UserHeroProps> = ({userId}) => {

  const {data: currentUser} = useCurrentUser();
  const {data: fetchedUser} = useUser(userId);


  const createdAt = useMemo(()=>{
    if (!fetchedUser?.createdAt){
      return null;
    }

    return format(new Date(fetchedUser.createdAt), 'MMMM yyyy');
  },[fetchedUser?.createdAt]);

  return (
    <div className="border-b-[1px] border-neutral-800 pb-4">
      <div className="flex justify-end p-2">
        {currentUser?.id === userId ? (
          <Button
            secondary
            label="Edit"
            onClick={()=>{}}
          />
        ): (
          <Button
            secondary
            label="Follow"
            onClick={()=>{}}
          />
        )}
      </div>
      <div className="mt-4 px-4">
        <div className="flex flex-col">
          <p className="text-white text-2xl font-semibold">
            {fetchedUser?.name}
          </p>

        </div>

      </div>
    </div>
  );
}

interface UserHeroProps {
  userId: string;
}

export default UserBio;