import EventsList from "@comps/events/eventsList";
import EventCard from "@comps/events/eventsList/EventCard";
import Link from "next/link";

function Profile() {
  const handleClick=(id:string)=>{
    console.log(id)
    return ''
  }
  return (
    <div>
      <div className="flex justify-center w-full m-2">
        <Link href={'/'}>
          <a className="btn btn-outline">Find events</a>
        </Link>
      </div>
      <div>
       
        <h3 className="text-2xl font-bold my-2">Your events</h3>
        <EventsList/>
        <div className=" flex gap-2 p-2 overflow-auto">
          <EventCard
            size="sm"
            event={{
              title: 'Copa nacional',
              id: '1',
              resume: 'Evento de natacion',
            }}
            onSuscribe={handleClick}
          />
          <EventCard
            size="sm"
            event={{
              title: 'Copa nacional',
              id: '1',
              resume: 'Evento de natacion',
            }}
            onSuscribe={handleClick}
          />
        </div>
        {/* <h3 className="text-2xl font-bold my-2">Events that you create</h3>
        <div className=" flex gap-2 p-2 overflow-auto">
          <EventCard
            size="sm"
            event={{
              title: 'Copa nacional',
              id: '1',
              resume: 'Evento de natacion',
            }}
            onSuscribe={handleClick}
          />
          <EventCard
            size="sm"
            event={{
              title: 'Copa nacional',
              id: '1',
              resume: 'Evento de natacion',
            }}
            onSuscribe={handleClick}
          />
        </div> */}
      </div>
    </div>
  );
}

export default Profile;