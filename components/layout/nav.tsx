import useAuth from 'hooks/useAuth'
import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import GeolocationInput from '../inputs/GeolocationInput'

const Nav = () => {
  const { user, handleLogin, handleLogout } = useAuth()

  return (
    <nav className="w-full ">
      <div className="navbar bg-base-100 shadow-md">
        <div className="navbar-start">
          <Link href={'/'}>
            <a className="btn btn-ghost normal-case text-xl">Events </a>
          </Link>
        </div>
        <div className="navbar-end">
          {/* <Link href={'/cart'}>
            <a className="btn btn-ghost btn-circle btn-sm mx-2 indicator">
              <Icon name="cart" />
              {products.length ? (
                <span className="badge badge-xs badge-info indicator-item">
                  {products.length}
                </span>
              ) : null}
            </a>
          </Link> */}
          <div className="mx-4">
            <Link href={'/FAQs'}>
              <a className="link">FAQs</a>
            </Link>
          </div>
          {!user && (
            <>
              <div className="relative">
                <button
                  data-test-id="navbar-button-login"
                  className="btn btn-primary"
                  onClick={() => {
                    handleLogin()
                  }}
                  id="navbar-button-login"
                >
                  Login
                </button>
              </div>
            </>
          )}
          {user && (
            <>
              <GeolocationInput />
              <div className="dropdown dropdown-end">
                <label
                  tabIndex={0}
                  className="btn btn-ghost btn-circle avatar"
                  data-test-id="user-logged-avatar"
                >
                  <div className="relative w-10 rounded-full">
                    <Image
                      src={user?.image || user?.photoURL}
                      layout="fill"
                      objectFit="contain"
                    />
                  </div>
                </label>
                <ul
                  tabIndex={0}
                  className="menu  dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52"
                >
                  <li>
                    <Link href={'/profile'}>
                      <a className="justify-between">Profile</a>
                    </Link>
                  </li>

                  <li>
                    <Link href={'/new-event'}>
                      <a
                        className="justify-between"
                        data-test-id="new-event-link"
                      >
                        Create event
                        <span className="badge">New</span>
                      </a>
                    </Link>
                  </li>
                  <li>
                    <Link href={'https://nadamas.app'}>
                      <a
                        className="justify-between"
                        data-test-id="new-event-link"
                      >
                        nadamas App
                      </a>
                    </Link>
                  </li>
                  <li>
                    <button
                      className="border border-error btn-sm"
                      onClick={() => handleLogout()}
                    >
                      Logout
                    </button>
                  </li>
                </ul>
              </div>
            </>
          )}
        </div>
      </div>
    </nav>
  )
}

export default Nav
