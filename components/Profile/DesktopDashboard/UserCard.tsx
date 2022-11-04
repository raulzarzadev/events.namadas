import SkeletonUserDashboardCard from "@comps/Skeleton/SkeletonUserDashboardCard";
import { User } from "@firebase/Users/user.model"
import Image from "next/image"



const UserCard = ({ user }: {user?:User|null}) => {

  if(!user)return <SkeletonUserDashboardCard/>

  return (
    <div className="bg-base-200 max-w-xs  min-h-96 flex flex-col items-center p-2 w-full">
      <label className="avatar mx-auto  w-full justify-center">
        <div className="relative w-28 rounded-full ">
          <Image
            src={user?.image || user?.photoURL}
            layout="fill"
            objectFit="contain"
          />
        </div>
      </label>
      <div className="text-2xl font-bold mx-auto text-center">
        {user.alias || user.name}
      </div>
      <div className="text-xl mx-auto text-center">
        {user.profileType?.isCompany ? 'Events Agency' : null}
      </div>
        <div className="divider my-0" />
      <div className="w-full">
        <h4 className="text-start">Next event</h4>
        <div className="h-[60px]  "></div>
      </div>
        <div className="divider my-0" />
      <div className="w-full">
        <h4 className="text-start">Last event</h4>
        <div className="h-[60px]  "></div>
      </div>
    </div>
  );
};

export default UserCard;