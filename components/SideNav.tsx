import React, { FC } from "react";
import { IconType } from "react-icons";
import Link from "next/link";
import {
  AiOutlineContainer,
  AiOutlineDashboard,
  AiOutlineFileAdd,
  AiOutlineFileText,
  AiOutlineLineChart,
  AiOutlineMail,
  AiOutlineTeam,
} from "react-icons/ai";
import useDarkMode from "../hooks/useDarkMode";

interface NavItemProps {
  href: string;
  label: string;
  Icon: IconType;
}

const NavItem: FC<NavItemProps> = ({ href, label, Icon }) => {
  return (
    <Link href={href}>
      <li className="cursor-pointer text-lg dark:text-low-contrast-dark text-low-contrast p-2 flex items-center space-x-1 transition">
        <Icon />
        <span>{label}</span>
      </li>
    </Link>
  );
};

const SideNav: FC = (): JSX.Element => {
  const { toggleTheme } = useDarkMode();
  return (
    <div className="w-40 h-screen sticky top-0 py-4 px-3 dark:bg-secondary-dark bg-secondary flex flex-col justify-between transition">
      <ul className="space-y-2">
        <NavItem href="/admin" Icon={AiOutlineDashboard} label="Dashboard" />
        <NavItem href="/admin/posts" Icon={AiOutlineContainer} label="Posts" />
        <NavItem href="/admin" Icon={AiOutlineFileText} label="Pages" />
        <NavItem href="/admin" Icon={AiOutlineMail} label="Messages" />
        <NavItem href="/admin" Icon={AiOutlineTeam} label="Users" />
        <NavItem href="/admin" Icon={AiOutlineLineChart} label="Analytics" />
      </ul>

      <button
        onClick={toggleTheme}
        className="cursor-pointer text-lg dark:text-low-contrast-dark text-low-contrast p-2 transition"
      >
        Toggle Theme
      </button>

      <Link href="/admin/create">
        <a className="dark:text-primary-dark text-primary dark:bg-low-contrast-dark bg-low-contrast shadow-md hover:scale-90 transition text-xl p-3 rounded-full self-center">
          <AiOutlineFileAdd />
        </a>
      </Link>
    </div>
  );
};

export default SideNav;
