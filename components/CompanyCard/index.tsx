import RatingInput from '@comps/inputs/RatingInput';
import Modal from '@comps/modal';
import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
export interface CompanyCardType {
  alias:string
  companyInfo:{
    isVisible:boolean
    email:string
    phone:string
    resume:string
    name:string
  },
  createdAt:number
  displayName:string
  images:any[]
  profileType:{
    isCompany:boolean
    isAthlete:boolean
  }
  userId:string
  id:string
}

const CompanyCard = ({
  company,
}: {
  redirect?: boolean;
  size?: 'sm' | 'md' | 'lg';
  company: CompanyCardType;
  // onSubscribe?: (id: string) => {};
}) => {
  const {
   images,
   alias,
   companyInfo,
   createdAt,
   displayName,
   id,
   profileType,
   userId
  }: Partial<CompanyCardType> = company;
  const firsImage = images?.[0];
  const [openModal, setOpenModal] = useState(false);
  const handleOpenModal = () => {
    setOpenModal(!openModal);
  };
  return (
    <>
      <a
        className="hover:scale-105 hover:z-10 transition-all group  w-[200px]"
        onClick={() => handleOpenModal()}
      >
        <div>
          <h4 className="text-center">{companyInfo.name || 'Agency name'}</h4>
        </div>
        <figure className="relative  w-[200px] h-[115px] ">
          {firsImage && (
            <Image
              src={firsImage?.url || firsImage?.src}
              objectFit="cover"
              layout="fill"
            />
          )}
        </figure>
      </a>
      <Modal
        title={`${companyInfo.name || 'Agency name'}`}
        open={openModal}
        handleOpen={handleOpenModal}
      >
        <div className="w-full mx-auto">
          <figure className="relative  w-full h-[165px]  ">
            {firsImage && (
              <Image
                src={firsImage?.url || firsImage?.src}
                objectFit="cover"
                layout="fill"
              />
            )}
          </figure>
          <p className="text-center"></p>
          <EventModalInfo company={company} />
        </div>
      </Modal>
    </>
  );
};

const EventModalInfo = ({ company }: { company: CompanyCardType }) => {
  const { id, companyInfo:{name,email, resume, phone} , images } = company;

  return (
    <div className="">
      <div className="w-full text-sm truncate text-center h-20 flex items-center ">
        <div className="flex w-full justify-between ">
          <RatingInput />
          <Link href={`/companies/${id}`}>
            {/* TODO add companies page */}
            <button className="btn btn-outline btn-circle">Go</button>
          </Link>
        </div>
      </div>
     
      {resume && (
        <div>
          <h4 className='font-bold'>About us</h4>
          <p className='whitespace-pre-line'>{resume}</p>
        </div>
      )}
    </div>
  );
};



export default CompanyCard;
