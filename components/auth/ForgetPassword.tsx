import { FC } from "react";
import Form from "../Form";
import { getSignInPath, getSignUpPath } from "../../utils/helper";

interface Props {}

const ForgetPassword: FC<Props> = (props): JSX.Element => {
  return (
    <div className="space-y-5">
      <Form.Input name="email" placeholder="john@email.com" label="Email" />

      <Form.SubmitButton title="Send link" />

      <p className="space-x-2 text-center">
        <span className="dark:text-low-contrast-dark text-low-contrast text-sm">
          I have my password
        </span>
        <Form.LinkTag title="Sign in" href={getSignInPath()} />
      </p>
      <p className="space-x-2 text-center">
        <span className="dark:text-low-contrast-dark text-low-contrast text-sm">
          I am new here
        </span>
        <Form.LinkTag title="Sign up" href={getSignUpPath()} />
      </p>
    </div>
  );
};

export default ForgetPassword;
