import React, { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { APP_NAME } from "./DefaultLayout";
import { BsFillMoonFill, BsFillPersonFill } from "react-icons/bs";
import useDarkMode from "../hooks/useDarkMode";
import { signOut, useSession } from "next-auth/react";
import { AiOutlineLogout } from "react-icons/ai";
import { getSignInPath } from "../utils/helper";

interface Props {}

const Navbar: FC<Props> = (props): JSX.Element => {
  const { toggleTheme } = useDarkMode();
  const { status } = useSession();
  const authenticated = status === "authenticated";

  const handleLogout = () => {
    signOut();
  };

  return (
    <nav className="bg-primary-dark flex items-center p-3 z-50">
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

        <div className="flex items-center space-x-5 text-lg transition text-low-contrast-dark dark:text-primary">
          <button onClick={toggleTheme}>
            <BsFillMoonFill />
          </button>

          {!authenticated ? (
            <Link href={getSignInPath()}>
              <a className="flex space-x-2 items-center">
                <BsFillPersonFill />
                <span>Login</span>
              </a>
            </Link>
          ) : (
            <button
              onClick={handleLogout}
              className="flex space-x-2 items-center"
            >
              <AiOutlineLogout />
              <span>Logout</span>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
