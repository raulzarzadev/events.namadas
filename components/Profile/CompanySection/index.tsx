import EventsRow from '@comps/events/eventsRow';
import CompanyForm from '@comps/forms/CompanyForm';
import Icon from '@comps/Icon';
import { Toggle } from '@comps/inputs';
import ImagesList from '@comps/inputs/inputFiles_V2/imagesList';
import Modal from '@comps/modal';
import Section from '@comps/Section';
import { updateUser } from '@firebase/Users/main';
import { CompanyInfo } from '@firebase/Users/user.model';
import useAuth from 'hooks/useAuth';
import useEvents from 'hooks/useEvents';
import { useState } from 'react';

const CompanySection = ({
  companyInfo,
  isCompany,
}: {
  isCompany?: boolean;
  companyInfo?: CompanyInfo;
}) => {
  if (!companyInfo) return <></>;
  const { email, phone, images = [], resume } = companyInfo;
  const {
    user: { id: userId },
  } = useAuth();
  const [_isCompany, _setIsCompany] = useState(isCompany);
  const [buttonVisible, setButtonVisible] = useState(false);
  const handleChange = (checked: boolean) => {
    _setIsCompany(checked);
    setButtonVisible(true);
  };
  const handleSubmit = () => {
    updateUser(userId, {
      profileType: { isCompany: _isCompany },
    })
      .then((res) => {
        console.log(res);
      })
      .finally(() => {
        setButtonVisible(false);
      });
  };
  const [openModal, setOpenModal] = useState(false)
  const handleOpenModal=()=>{
    setOpenModal(!openModal)
  }
  const { userEvents: companyEvents }=useEvents()
  return (
    <div>
      {isCompany ? (
        <div>
          <div className="w-full flex justify-end">
            <button
              className="btn btn-sm flex"
              onClick={(e) => {
                handleOpenModal();
              }}
            >
              <span>Edit</span>
              <Icon name="edit" />
            </button>
          </div>
          <div>
            <h4 className="font-bold text-center">Contact: </h4>
            <p className=" text-center">{email || 'sin'}</p>
            <p className=" text-center">{phone || 'sin'}</p>
          </div>
          <div className="grid">
            <h4 className='text-lg font-bold'>Company Images </h4>
            <div className="grid grid-flow-col overflow-auto gap-1 p-1 pb-2 justify-start">
              <ImagesList  images={images} childrenClassName="w-36 h-36" showDelete={false}/>
            </div>
          </div>
          <EventsRow events={companyEvents} title='Company events'/>
          <div>
            <h4 className="font-bold text-center">Resume:</h4>
            <p className=" text-center whitespace-pre-line">{resume}</p>
          </div>
          <Modal
            title="edit company "
            open={openModal}
            handleOpen={handleOpenModal}
          >
            <CompanyForm company={{ ...companyInfo, id: userId }} />
          </Modal>
        </div>
      ) : (
        <div>
          <h2 className="text-center">Set your profile as company</h2>
          <form
            onSubmit={(e) => {
              e.preventDefault();
              handleSubmit();
            }}
          >
            <Toggle
              label="Is a company profile"
              onChange={({ target: { checked } }: any) => handleChange(checked)}
              name={'isCompany'}
            />
            <button disabled={!buttonVisible} className="btn">
              Save
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default CompanySection;
