import { FC, useRef, useState } from "react";
import { IconType } from "react-icons";
import { RiMenuFoldFill, RiMenuUnfoldFill } from "react-icons/ri";
import Link from "next/link";
import { AiOutlineLogout } from "react-icons/ai";
import { signOut } from "next-auth/react";

export type navItem = {
  icon: IconType;
  label: string;
  href: string;
};

interface Props {
  navItems?: navItem[];
  logoLabel?: string;
}

const navTranslateXDefault = "w-60";
const navTranslateXClose = "w-12";

const AdminNav: FC<Props> = ({
  navItems = [],
  logoLabel = "Admin",
}): JSX.Element => {
  const [visible, setVisible] = useState(true);
  const nav = useRef<HTMLElement>(null);

  const toggleNav = () => {
    const currentNav = nav.current;
    if (!currentNav) return;

    const { classList } = currentNav;
    if (visible) {
      classList.remove(navTranslateXDefault);
      classList.add(navTranslateXClose);
    } else {
      classList.add(navTranslateXDefault);
      classList.remove(navTranslateXClose);
    }
    setVisible(!visible);
  };

  return (
    <nav
      ref={nav}
      className="h-screen flex flex-col justify-between w-60 sticky top-0 p-2 transition-width bg-white shadow-md"
    >
      <div className="">
        {/* <Link href="/">
          <div className="flex items-center mb-10 pt-2 space-x-2">
            <img
              className="w-6 h-6 aspect-square"
              src={"../../res/images/logo.svg"}
              alt=""
            />
            {visible ? (
              <span className="font-semibold animate-smooth-reveal leading-none dark:text-low-contrast-dark text-low-contrast">
                {logoLabel}
              </span>
            ) : null}
          </div>
        </Link> */}
        <ul className="space-y-6">
          {navItems.map((item, index) => {
            return (
              <Link key={item.label + index} className="block" href={item.href}>
                <li className="flex items-center text-xl cursor-pointer dark:text-high-contrast-dark text-high-contrast p-3 hover:scale-[0.98] transition">
                  <item.icon size={24} />
                  {visible ? (
                    <span className="leading-none animate-smooth-reveal ml-2">
                      {item.label}
                    </span>
                  ) : null}
                </li>
              </Link>
            );
          })}
        </ul>
      </div>

      <button
        onClick={toggleNav}
        className="self-end text-low-contrast dark:text-low-contrast-dark hover:scale-[0.98] transition"
      >
        {visible ? (
          <RiMenuFoldFill size={30} />
        ) : (
          <RiMenuUnfoldFill size={30} />
        )}
      </button>
    </nav>
  );
};

export default AdminNav;
