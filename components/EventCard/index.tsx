import Image from 'next/image';
import Link from 'next/link';

export interface EventType {
  title: string;
  resume: string;
  id: string;
  image?: string;
  images?: EventImageType[]
  userId: string
}

export interface EventImageType {
  url: string
  src?: string
  alt?: string
  text?: string
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
  const { title, resume, id, image, images = [] } = event;
  const sizing = {
    sm: 'max-w-[180px]',
    md: 'max-w-[200px]',
    lg: 'max-w-[250px]',
  };

  const firsImage = images?.[0]
  console.log(firsImage);

  // FIX group-hover is not working
  const cutTestAt = (length: number, text: string = '') => {
    return text.slice(0, length).concat('...')
  }
  return (
    <div>
      <Link href={`/events/${id}`}>
        <a>
          <div
            className={`card w-full ${sizing[size]} border-2 border-transparent  hover:border-primary cursor-pointer active:border-gray-600`}
          >
            <figure className="relative w-[400px] h-[225px] ">
              {firsImage && (
                <Image src={firsImage?.url} objectFit="cover" layout="fill" />
              )}
            </figure>
            <div className="card-body glass">
              <h2 className="card-title">{title}</h2>
              <p className="whitespace-pre-line">{cutTestAt(120, resume)}</p>
              <div className="card-actions justify-end">
                <button className="btn btn-outline ">Saber más!</button>
              </div>
            </div>
          </div>
        </a>
      </Link>
    </div>
  );
};

export default EventCard;
