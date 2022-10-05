import Link from 'next/link';

export interface EventType {
  title: string;
  resume: string;
  id: string;
  image?: string;
  images?: EventImageType[]
}

export interface EventImageType {
  src:string
  alt?:string
  text?:string
}

const EventCard = ({
  event,
  redirect = false,
  size = 'lg',
}: {
  redirect?: boolean;
  size?: 'sm' | 'md' | 'lg';
  event: EventType;
  onSuscribe?: (id: string) => {};
}) => {
  const { title, resume, id } = event;
  const sizing = {
    sm: 'max-w-[200px]',
    md: 'max-w-[250px]',
    lg: 'max-w-xs',
  };
  return (
    <div>
      <div
        className={`card w-full ${sizing[size]} border-2 border-transparent hover:border-primary cursor-pointer active:border-gray-600`}
      >
        <figure>
          <img src="https://placeimg.com/400/225/arch" alt="car!" />
        </figure>
        <div className="card-body glass">
          <h2 className="card-title">{title}</h2>
          <p>{resume}</p>
          <div className="card-actions justify-end">
            <Link href={`/events/${id}`}>
              <button className="btn btn-primary">Saber más!</button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EventCard;
