import useAuth from 'hooks/useAuth';
import useEvents from 'hooks/useEvents';
import EventsColumn from './EventsColumn';
import UserCard from './UserCard';

const DesktopDashboard = () => {
  const { user } = useAuth();
  const { userEvents } = useEvents();
  return (
    <div className="">
      <div className="grid grid-cols-4 gap-4 py-4 ">
        <div className="col-span-full border h-16">
          <div>Menu</div>
        </div>
        <div className=" sticky   top-0  ">
          <div className="flex justify-center">
            <UserCard user={user} />
          </div>
          <div className="flex justify-center">
            <UserCard user={user} />
          </div>
        </div>
        <div className="  col-span-2">
          <EventsColumn events={userEvents} />
        </div>
        <div className=" sticky   top-0  ">
          <UserCard user={user} />
        </div>
      </div>
    </div>
  );
};

export default DesktopDashboard;
