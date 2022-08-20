import { signOut, useSession } from "next-auth/react";
import Router, { useRouter } from "next/router";
import React, { FC, useEffect } from "react";
import AdminNav from "../AdminNav";
import AppHead from "../AppHead";

import {
  AiFillCaretDown,
  AiOutlineContainer,
  AiOutlineDashboard,
  AiOutlineFileAdd,
  AiOutlineLineChart,
  AiOutlineMail,
  AiOutlineTeam,
} from "react-icons/ai";
import Link from "next/link";
import ProfileIcon from "../ProfileIcon";
import useDarkMode from "../../hooks/useDarkMode";
import DropdownOptions from "../DropdownOptions";

interface Props {
  children: React.ReactNode;
  headTitle?: string;
}

const navItems = [
  { href: "/admin", icon: AiOutlineDashboard, label: "Dashboard" },
  { href: "/admin/posts", icon: AiOutlineContainer, label: "Posts" },
  { href: "/admin/users", icon: AiOutlineTeam, label: "Users" },
  { href: "/admin/comments", icon: AiOutlineMail, label: "Comments" },
  { href: "/admin", icon: AiOutlineLineChart, label: "Analytics" },
];

const AdminLayout: FC<Props> = ({
  children,
  headTitle,
}): JSX.Element | null => {
  const router = useRouter();
  const { status, data } = useSession();
  const user = data?.user;

  const { toggleTheme } = useDarkMode();

  const handleLogout = () => {
    signOut();
  };

  const navigateToCreatePost = () => {
    router.push("/admin/create");
  };

  const renderHead = () => (
    <>
      <ProfileIcon name={user?.name || ""} size={8} />
      <AiFillCaretDown className="dark:text-high-contrast-dark" />
    </>
  );

  const dropDownOptions = [
    { label: "Add New Post", onClick: navigateToCreatePost },
    { label: "Change Theme", onClick: toggleTheme },
    { label: "Logout", onClick: handleLogout },
  ];

  useEffect(() => {
    if (status === "unauthenticated") Router.replace("/404");
  }, [status]);

  if (status === "authenticated")
    return (
      <>
        <AppHead title={headTitle} />
        <div className="min-h-screen bg-primary dark:bg-primary-dark flex transition">
          {/* <SideNav /> */}
          <AdminNav navItems={navItems} />

          <div className="flex-1 py-4 px-2">
            {/* Top NavBar */}
            <nav className="w-full flex items-center justify-between mb-5 px-10">
              <input
                type="text"
                className="border-2 dark:border-low-contrast-dark border-low-contrast rounded bg-transparent outline-none"
                placeholder="Search..."
              />

              <DropdownOptions head={renderHead()} options={dropDownOptions} />
            </nav>
            {children}
          </div>

          <Link href="/admin/create">
            <a className="dark:text-primary-dark text-primary dark:bg-low-contrast-dark bg-low-contrast shadow-md hover:scale-90 transition text-xl p-3 rounded-full self-center fixed z-50 right-10 bottom-10">
              <AiOutlineFileAdd />
            </a>
          </Link>
        </div>
      </>
    );

  return (
    <>
      <AppHead title="Loading" />
      <div className="h-screen bg-primary dark:bg-primary-dark">loading</div>
    </>
  );
};

export default AdminLayout;
