import useAuth from 'hooks/useAuth'
import { useState } from 'react'
import CompanySection from '../CompanySection'
import UserEvents from '../UserEvents'
import UserSection from '../UserSection'

const MobileDashboard = () => {
  const { user } = useAuth()
  const [selected, setSelected] = useState<MenuLinks>('user')
  const isCompany = user?.profileType?.isCompany
  return (
    <div className="relative max-w-xl mx-auto">
      <div className="sticky top-0 z-20 bg-base-100 ">
        <MobileMenu
          setSelected={setSelected}
          selected={selected}
          isCompany={isCompany}
        />
      </div>
      {selected === 'user' && user ? <UserSection user={user} /> : null}
      {selected === 'company' ? (
        <CompanySection companyInfo={user?.companyInfo} isCompany={isCompany} />
      ) : null}
      {selected === 'events' ? <UserEvents /> : null}
    </div>
  )
}

type MenuLinks = 'user' | 'company' | 'events' | 'config'
const MobileMenu = ({ setSelected, selected }: any) => {
  return (
    <div>
      <menu className=" mx-auto flex overflow-x-auto p-2 h-14 ">
        <ul className="flex text-center items-center text-lg">
          <li className="w-36 ">
            <MenuLink
              onClick={() => {
                setSelected('user')
              }}
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
  )
}
const MenuLink = ({
  label,
  selected,
  onClick,
  ...rest
}: {
  label: string
  selected: boolean
  onClick: () => void
}) => {
  return (
    <>
      <a
        {...rest}
        onClick={() => {
          onClick()
        }}
      >
        {label}
        {selected && <div className="border-b-4" />}
      </a>
    </>
  )
}
export default MobileDashboard
