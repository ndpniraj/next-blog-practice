import { FC, ReactNode, useEffect } from "react";
import ModalContainer from "./ModalContainer";
import SignIn from "../auth/SignIn";
import SignUp from "../auth/SignUp";
import { authFormType } from "../../utils/types";
import { useRouter } from "next/router";
import ForgetPassword from "../auth/ForgetPassword";
import { useSession } from "next-auth/react";

interface Props {
  visible: boolean;
  formType: authFormType;
}

const AuthForm: FC<Props> = ({ visible, formType }): JSX.Element | null => {
  const router = useRouter();

  const handleFormClose = () => {
    router.replace(router.asPath.split("?auth=")[0]);
  };

  if (formType === "signin")
    return (
      <Container
        title="Welcome back to"
        onClose={handleFormClose}
        visible={visible}
      >
        <SignIn />
      </Container>
    );

  if (formType === "signup")
    return (
      <Container title="Welcome to" onClose={handleFormClose} visible={visible}>
        <SignUp />
      </Container>
    );

  if (formType === "forget-password")
    return (
      <Container
        title="Forget password"
        onClose={handleFormClose}
        visible={visible}
      >
        <ForgetPassword />
      </Container>
    );

  return null;
};

const Container: FC<{
  visible: boolean;
  children: ReactNode;
  title: string;
  onClose?(): void;
}> = ({ visible, children, title, onClose }) => {
  return (
    <ModalContainer onClose={onClose} visible={visible}>
      <div className="w-[300px] dark:bg-secondary-dark bg-secondary p-3 rounded space-y-5">
        <div>
          <h1 className="text-center font-semibold text-high-contrast dark:text-high-contrast-dark text-lb">
            {title}
          </h1>
          <p className="text-center font-semibold text-high-contrast dark:text-high-contrast-dark text-2xl font-ibm_plex-500">
            Dev Blogs
          </p>
        </div>
        {children}
      </div>
    </ModalContainer>
  );
};

export default AuthForm;
