import { FC, useState } from "react";
import { useRouter } from "next/router";
import { AiFillGithub, AiOutlineGoogle } from "react-icons/ai";
import Form from "../Form";
import { signupSchema, validateWithSchema } from "../../utils/validator";
import axios from "axios";
import {
  catchError,
  getNonAuthPath,
  getSignInPath,
  runAsync,
} from "../../utils/helper";
import { sendSignupRequest } from "../../utils/auth";
import { signIn } from "next-auth/react";

interface Props {}

const SignUp: FC<Props> = (props): JSX.Element => {
  const [error, setError] = useState({ path: "", message: "" });
  const [busy, setBusy] = useState(false);
  const [userInfo, setUserInfo] = useState({
    name: "",
    email: "",
    password: "",
  });
  const router = useRouter();
  const { asPath } = router;

  const handleChange: React.ChangeEventHandler<HTMLInputElement> = ({
    target,
  }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = async (e) => {
    e.preventDefault();
    const valid = validateWithSchema(signupSchema, userInfo, setError);
    if (!valid) return;

    setBusy(true);
    const res = (await runAsync(sendSignupRequest(userInfo), catchError)) as {
      user: {};
      error: string;
    };
    if (res.error) return console.log(res.error);

    const signInRes = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });

    setBusy(false);

    if (!signInRes?.ok) return console.log(signInRes?.error);

    router.replace(getNonAuthPath(asPath));
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Form.Input
        value={userInfo.name}
        error={error}
        onChange={handleChange}
        name="name"
        placeholder="John Doe"
        label="Full name"
      />
      <Form.Input
        value={userInfo.email}
        error={error}
        onChange={handleChange}
        name="email"
        placeholder="john@email.com"
        label="Email"
      />
      <Form.Input
        value={userInfo.password}
        error={error}
        onChange={handleChange}
        name="password"
        placeholder="********"
        label="Password"
        type="password"
      />

      <Form.SubmitButton title="Sign up" busy={busy} />

      <div className="space-y-2">
        <p className="space-x-2 text-center">
          <span className="dark:text-low-contrast-dark text-low-contrast text-sm">
            Already have an account
          </span>
          <Form.LinkTag title="Sign in" href={getSignInPath(asPath)} />
        </p>

        <p className="dark:text-low-contrast-dark text-low-contrast text-center">
          or continue with
        </p>

        <div className="flex items-center justify-center space-x-3 text-blue-500">
          <button title="Sign up with google">
            <AiOutlineGoogle size={24} />
          </button>
          <button title="Sign up with github">
            <AiFillGithub size={24} />
          </button>
        </div>
      </div>
    </form>
  );
};

export default SignUp;
