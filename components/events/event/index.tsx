import Carousel from '@comps/carousel';
import { EventType } from '../eventsList/EventCard';

const Event = () => {
  const EVENT: EventType = {
    id: '1',
    resume: `Nostrud minim adipisicing ea ipsum aliquip occaecat voluptate occaecat eu enim pariatur laboris amet. Ex officia elit adipisicing veniam amet anim anim adipisicing irure enim. Esse commodo minim ex consectetur ex aute duis minim duis.
      Amet qui reprehenderit nulla et sit. Id do pariatur Lorem magna incididunt laborum aliqua. Sit et sint ut reprehenderit aliquip qui nostrud minim. Tempor in id minim id.`,
    title: 'Title of the event',
    image: '',
    images: [
      {
        src: 'https://placeimg.com/400/225/arch',
        alt: 'the image of the event',
      },
      {
        src: 'https://placeimg.com/400/225/arch',
        alt: 'the image of the event',
      },
    ],
  };

  const { title, resume } = EVENT;
  return (
    <div>
      <Carousel images={EVENT.images} />
      <div className="flex w-full justify-around my-4">
        <button className='btn btn-primary '>Participa</button>
      </div>
      <h1 className="text-center font-bold text-2xl">{title}</h1>
      <p className="max-w-md mx-auto">{resume}</p>
    </div>
  );
};

export default Event;
