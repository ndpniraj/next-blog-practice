import { FC, useState } from "react";
import { useRouter } from "next/router";
import { AiFillGithub, AiOutlineGoogle } from "react-icons/ai";
import { signIn, useSession } from "next-auth/react";
import Form from "../Form";
import { loginSchema, validateWithSchema } from "../../utils/validator";
import { getForgetPasswordPath, getSignUpPath } from "../../utils/helper";

interface Props {}

const SignIn: FC<Props> = (props): JSX.Element => {
  const [error, setError] = useState({ path: "", message: "" });
  const [busy, setBusy] = useState(false);

  const [userInfo, setUserInfo] = useState({
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
    const valid = validateWithSchema(loginSchema, userInfo, setError);
    if (!valid) return;

    setBusy(true);
    const res = await signIn("credentials", {
      email: userInfo.email,
      password: userInfo.password,
      redirect: false,
    });
    setBusy(false);

    if (res?.error) return console.log(res.error);
    router.replace(asPath.split("?auth=")[0]);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <Form.Input
        value={userInfo.email}
        onChange={handleChange}
        error={error}
        name="email"
        placeholder="john@email.com"
        label="Email"
      />
      <Form.Input
        value={userInfo.password}
        onChange={handleChange}
        error={error}
        name="password"
        placeholder="********"
        label="Password"
        type="password"
      />

      <Form.SubmitButton busy={busy} title="Login" />

      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <Form.LinkTag
            title="Forget Password"
            href={getForgetPasswordPath()}
          />
          <p className="space-x-2">
            <span className="dark:text-low-contrast-dark text-low-contrast">
              I am new here
            </span>
            <Form.LinkTag title="Sign up" href={getSignUpPath()} />
          </p>
        </div>

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

export default SignIn;
