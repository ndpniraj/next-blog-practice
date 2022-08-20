import React, { FC, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "./DefaultLayout";
import { BsFillMoonFill, BsFillPersonFill } from "react-icons/bs";
import useDarkMode from "../hooks/useDarkMode";
import { signOut, useSession } from "next-auth/react";
import { AiFillCaretDown, AiOutlineLogout } from "react-icons/ai";
import { getNameInitial, getSignInPath } from "../utils/helper";
import { useRouter } from "next/router";
import ProfileIcon from "./ProfileIcon";
import DropdownOptions from "./DropdownOptions";

interface Props {}

type userWithRole = { role: "admin" | "user" };

const Navbar: FC<Props> = (props): JSX.Element => {
  const [showOptions, setShowOptions] = useState(false);
  const { toggleTheme } = useDarkMode();
  const { data } = useSession();
  const user = data?.user;
  const isAdmin = (user && (user as userWithRole).role === "admin") || false;
  const router = useRouter();
  const { asPath } = router;

  const handleLogout = () => {
    signOut();
  };

  const renderHead = () => (
    <>
      <ProfileIcon name={user?.name || ""} size={8} darkOnly />
      <AiFillCaretDown />
    </>
  );

  const getOptions = () => {
    let defaultOptions = [
      { label: "Change Theme", onClick: toggleTheme },
      { label: "Logout", onClick: handleLogout },
    ];

    if (isAdmin)
      defaultOptions.unshift({
        label: "Dashboard",
        onClick: () => router.push("/admin"),
      });
    return defaultOptions;
  };

  return (
    <div className="relative z-50">
      <nav className="bg-primary-dark flex items-center p-3">
        <div className="flex-1 flex items-center justify-between">
          <Link href="/">
            <a className="flex items-center space-x-2">
              <Image
                className="cursor-pointer"
                src="/images/logo.png"
                width={30}
                height={30}
                alt="logo"
              />
              <span className="text-high-contrast-dark font-semibold text-xl">
                {APP_NAME}
              </span>
            </a>
          </Link>

          <div className="flex items-center space-x-5 text-lg text-primary">
            <button
              className=" transition text-low-contrast-dark dark:text-primary"
              onClick={toggleTheme}
            >
              <BsFillMoonFill />
            </button>

            {!user ? (
              <Link href={getSignInPath(asPath)}>
                <a className="flex space-x-2 items-center">
                  <BsFillPersonFill />
                  <span>Login</span>
                </a>
              </Link>
            ) : (
              <DropdownOptions head={renderHead()} options={getOptions()} />
            )}
          </div>
        </div>
      </nav>

      {showOptions && (
        <div className="dark:text-high-contrast-dark text-low-contrast w-40 border-2 dark:border-low-contrast-dark border-low-contrast rounded absolute mt-2 right-2 bg-primary dark:bg-primary-dark">
          <ul className="p-3 space-y-3">
            {isAdmin && (
              <li>
                <button onMouseDown={() => router.push("/admin")}>
                  Dashboard
                </button>
              </li>
            )}
            <li>
              <button onMouseDown={handleLogout}>Logout</button>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Navbar;
