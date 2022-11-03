import Icon from '@comps/Icon';
import useAuth from 'hooks/useAuth';
import Image from 'next/image';
import Link from 'next/link';
import React from 'react';
import GeolocationInput from './Geolocation';

const Nav = () => {
  const { user, handleLogin, handleLogout } = useAuth();

  return (
    <nav className="w-full ">
      <div className="navbar bg-base-100 shadow-md">
        <div className="navbar-start">
          <Link href={'/'}>
            <a className="btn btn-ghost normal-case text-xl">Eventos </a>
          </Link>
        </div>
        <div className="navbar-end">
          <button className="btn btn-ghost btn-circle">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
              />
            </svg>
          </button>
          {!user && (
            <div>
              <button
                data-test-id="navbar-button-login"
                className="btn btn-primary"
                onClick={() => {
                  handleLogin();
                }}
              >
                Login
              </button>
            </div>
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
                    <Link href={'/publish-event'}>
                      <a
                        className="justify-between"
                        data-test-id="publish-event-link"
                      >
                        Publish event
                        <span className="badge">New</span>
                      </a>
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
                    <button className="border" onClick={() => handleLogout()}>
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
  );
};

// bell icons
// <button className="btn btn-ghost btn-circle">
//   <div className="indicator">
//     <svg
//       xmlns="http://www.w3.org/2000/svg"
//       className="h-5 w-5"
//       fill="none"
//       viewBox="0 0 24 24"
//       stroke="currentColor"
//     >
//       <path
//         strokeLinecap="round"
//         strokeLinejoin="round"
//         strokeWidth="2"
//         d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"
//       />
//     </svg>
//     {/* <span className="badge badge-xs badge-primary indicator-item"></span> */}
//   </div>
// </button>;

export default Nav;
