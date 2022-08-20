import { useSession } from "next-auth/react";
import Router from "next/router";
import React, { FC, useEffect } from "react";
import AdminNav from "../AdminNav";
import AppHead from "../AppHead";
import SideNav from "../SideNav";

import {
  AiOutlineContainer,
  AiOutlineDashboard,
  AiOutlineFileAdd,
  AiOutlineFileText,
  AiOutlineLineChart,
  AiOutlineMail,
  AiOutlineTeam,
} from "react-icons/ai";
import Link from "next/link";

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
  const { status, data } = useSession();

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

          <div className="flex-1 py-4 px-2">{children}</div>

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
