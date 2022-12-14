// import { dateFormat } from '@/utils/dates';
// import UserForm from '@comps/Forms/UserForm';
// import ButtonIcon from '@comps/Inputs/Button/ButtonIcon';
// import Modal from '@comps/Modal';
// import Section from '@comps/Section';
// import { useState } from 'react';
// import UserBlogEntries from './UserBlogEntries';

import UserForm from '@comps/forms/UserForm'
import Icon from '@comps/Icon'
import ImagesList from '@comps/inputs/inputFiles_V2/imagesList'
import Modal from '@comps/modal'
import Section from '@comps/Section'
import { User } from '@firebase/Users/user.model'
import { useState } from 'react'
import myFormatDate from 'utils/myFormatDate'

export default function UserSection({ user }: { user: User }) {
  const [openEditUser, setOpenEditUser] = useState(false)
  const handleOpenEditUser = () => {
    setOpenEditUser(!openEditUser)
  }

  const {
    name,
    displayName,
    alias,
    contact,
    phone,
    email,
    medicInformation,
    emergencyContact,
    photoURL: image,
    birth,
    profileType,
    images
  } = user

  interface Option {
    label: string
  }
  type ProfileTypes = 'isCompany' | 'isCoach' | 'isAthlete' | 'isTutor'

  const PROFILE_TYPE_OPTIONS: Record<ProfileTypes, Option> = {
    isCompany: {
      label: 'Events Agency'
    },
    isCoach: {
      label: 'Coach'
    },
    isAthlete: {
      label: 'Athlete'
    },
    isTutor: {
      label: 'Parent or tutor'
    }
  }

  return (
    <>
      {/* <Section title={'Personal Information '}> */}
      <div>
        <h3 className="font-bold text-lg">User information</h3>
      </div>

      {image && (
        <div className="flex justify-center my-2">
          <div className="avatar">
            <div className="w-12 rounded-full">
              <img src={image} />
            </div>
          </div>
        </div>
      )}
      <div className="flex justify-center">
        <button
          className="btn btn-ghost btn-xs btn-circle"
          onClick={() => handleOpenEditUser()}
        >
          <span>
            <Icon name="edit" size="xs" />
          </span>
        </button>
      </div>
      <div className="text-center">
        {profileType?.isCompany && (
          <div className="capitalize">
            <div>{PROFILE_TYPE_OPTIONS.isCompany.label}</div>
          </div>
        )}
        {profileType?.isAthlete && (
          <div className="capitalize">
            <div>{PROFILE_TYPE_OPTIONS.isAthlete.label}</div>
          </div>
        )}
        <div>
          <h4>{name ?? displayName}</h4>
        </div>
        <div>
          <span className="italic font-thin">
            <h4>{alias}</h4>
          </span>
        </div>
        <div>{myFormatDate(birth, 'dd MMM yy')}</div>
      </div>

      {openEditUser && (
        <Modal
          title="Edit user"
          open={openEditUser}
          handleOpen={handleOpenEditUser}
        >
          <UserForm user={user} />
        </Modal>
      )}

      <div className="text-center">
        <h4>Phone :</h4>
        <p className="font-bold text-center">{contact?.phone ?? phone}</p>
      </div>
      <div className="text-center">
        <h4>Email:</h4>
        <p className="font-bold text-center">{contact?.email ?? email}</p>
      </div>

      <div className="grid">
        <div className="grid grid-flow-col overflow-auto gap-1 p-1 pb-2 justify-start">
          <ImagesList
            showDelete={false}
            // label="Add more images "
            images={images}
            childrenClassName={'w-24 h-24 '}

            // setImages={handleSetImages}
            // disabled={disabled}
          />
        </div>
      </div>

      {profileType?.isAthlete && (
        <>
          <Section title={'Medic information'}>
            <div>
              <h4>Blood type:</h4>
              <p className="font-bold text-center">
                {medicInformation?.bloodType ?? 'sin'}
              </p>
            </div>
            <div>
              <h4>Considerations: *</h4>
              <p className="font-bold text-center">
                {medicInformation?.considerations ?? 'sin'}
              </p>
            </div>
          </Section>
          <Section title={'Emergency contact'}>
            <div>
              <h4>Relationship:</h4>
              <p className="font-bold text-center">
                {emergencyContact?.relationship ?? 'sin'}
              </p>
            </div>
            <div>
              <h4>Name:</h4>
              <p className="font-bold text-center">
                {emergencyContact?.name ?? 'sin'}
              </p>
            </div>
            <div>
              <h4>Phone:</h4>
              <p className="font-bold text-center">
                {emergencyContact?.phone ?? 'sin'}
              </p>
            </div>
          </Section>
        </>
      )}
      {/* </Section> */}
    </>
  )
}
