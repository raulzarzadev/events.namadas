import useAuth from 'hooks/useAuth';
import { useState } from 'react';
import CompanySection from '../CompanySection';
import UserSection from '../UserSection';


const MobileDashboard = () => {
  const {user}=useAuth()
  const [selected, setSelected] = useState<MenuLinks>('user');
  const isCompany = user?.profileType?.isCompany
  return (
    <div>
      <MobileMenu
        setSelected={setSelected}
        selected={selected}
        isCompany={isCompany}
      />
      {selected === 'user' ? <UserSection user={user} /> : null}
      {selected === 'company' ? (
        <CompanySection companyInfo={user?.companyInfo} isCompany={isCompany} />
      ) : null}
      
    </div>
  );
};

type MenuLinks = 'user'| 'company'| 'events' | 'config'
const MobileMenu = ({ setSelected, selected , isCompany}:any) => {
  return (
    <div>
      <menu className=" mx-auto flex overflow-x-auto p-2 h-14 ">
        <ul className="flex text-center items-center text-lg">
          <li className="w-36 ">
            <MenuLink
              onClick={() => setSelected('user')}
              label="User"
              selected={selected === 'user'}
            />
          </li>
         
            <>
              <li className="w-36 ">
                <MenuLink
                  onClick={() => setSelected('company')}
                  label="Company"
                  selected={selected === 'company'}
                />
              </li>
             
            </>
         
          <li className="w-36 ">
            <MenuLink
              onClick={() => setSelected('events')}
              label="Events"
              selected={selected === 'events'}
            />
          </li>
          <li className="w-36 ">
            <MenuLink
              onClick={() => setSelected('config')}
              label="Configuration"
              selected={selected === 'config'}
            />
          </li>
        </ul>
      </menu>
    </div>
  );
};
const MenuLink = ({ label='link', selected=false , ...rest}) => {
  return (
    <>
      <a {...rest} >
        {label}
        {selected && <div className="border-b-4" />}
      </a>
    </>
  );
};
export default MobileDashboard;