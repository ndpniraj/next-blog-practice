import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { FC } from "react";
import { authFormType } from "../utils/types";
import AppHead from "./AppHead";
import AuthForm from "./modal/AuthForm";
import Navbar from "./Navbar";

type ThemeModes = "only-dark";
interface Props {
  children: React.ReactNode;
  title?: string;
  meta?: string;
  modes?: ThemeModes;
}

export const APP_NAME = "{ fs_niraj }";
const DefaultLayout: FC<Props> = ({
  modes,
  children,
  title,
  meta,
}): JSX.Element => {
  const { query } = useRouter();
  const { status } = useSession();
  const authenticated = status === "authenticated";
  const formType = query.auth as authFormType;
  const showAuthModal = formType?.startsWith(formType);

  const getClasses = (modes?: ThemeModes) => {
    if (modes === "only-dark")
      return "min-h-screen bg-primary-dark flex flex-col";

    return "min-h-screen bg-primary dark:bg-primary-dark flex flex-col transition";
  };

  return (
    <>
      <AppHead title={title} meta={meta} />
      <div className={getClasses(modes)}>
        <Navbar />

        <div className="flex-1 max-w-3xl md:mx-auto p-3 ">{children}</div>
      </div>
      {!authenticated && (
        <AuthForm visible={showAuthModal} formType={formType} />
      )}
    </>
  );
};

export default DefaultLayout;
