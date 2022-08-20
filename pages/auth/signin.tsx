import { ChangeEventHandler, FC, FormEventHandler, useState } from "react";
import { NextPage } from "next";
import { getCsrfToken, signIn, SignInResponse } from "next-auth/react";
import { useRouter } from "next/router";
import DefaultLayout from "../../components/DefaultLayout";
import Notification, { Notifications } from "../../components/Notification";

interface Props {
  name?: string;
  value?: string;
  label?: string;
  placeholder?: string;
  type?: string;
  onChange?: ChangeEventHandler<HTMLInputElement>;
}

const FormInput: NextPage<Props> = ({
  name,
  value,
  onChange,
  label,
  type = "text",
  placeholder,
}) => {
  return (
    <div className="flex flex-col-reverse ">
      <input
        id={name}
        name={name}
        className="bg-transparent rounded border-2 dark:border-low-contrast-dark border-low-contrast w-full text-lg outline-none p-1 peer transition dark:text-low-contrast-dark text-low-contrast"
        placeholder={placeholder}
        type={type}
        onChange={onChange}
        value={value}
      />
      <label
        className="font-semibold dark:peer-focus:text-high-contrast-dark peer-focus:text-high-contrast transition self-start dark:text-low-contrast-dark text-low-contrast"
        htmlFor={name}
      >
        {label}
      </label>
    </div>
  );
};

interface User {
  username: string;
  password: string;
}

const Account: NextPage = () => {
  const [userInfo, setUserInfo] = useState<User>({
    username: "",
    password: "",
  });

  const [notification, setNotification] = useState<{
    message: string;
    type: Notifications;
  }>({ message: "", type: "error" });

  const router = useRouter();

  const handleSubmit: FormEventHandler = async (e) => {
    e.preventDefault();
    const { username, password } = userInfo;
    if (!username.trim() || !password.trim()) return;

    try {
      const res = await signIn("credentials", {
        username,
        password,
        // callbackUrl: "/",
        redirect: false,
      });

      if (!res?.ok)
        return setNotification({ type: "error", message: res?.error || "" });

      setNotification({ type: "success", message: "You are logged in." });
      router.push("/admin");
    } catch (error) {
      console.log("error", error);
    }
  };

  const handleChange: ChangeEventHandler<HTMLInputElement> = ({ target }) => {
    const { name, value } = target;
    setUserInfo({ ...userInfo, [name]: value });
  };

  return (
    <DefaultLayout title="Sign in">
      <Notification message={notification.message} type={notification.type} />
      <div className="fixed inset-0 dark:bg-primary-dark bg-primary flex justify-center items-center">
        <div className="max-w-screen-xl mx-auto">
          <form
            onSubmit={handleSubmit}
            className="bg-secondary dark:bg-secondary-dark drop-shadow-lg rounded p-6 space-y-6 w-72"
          >
            <h1 className="text-xl dark:text-high-contrast-dark text-high-contrast font-semibold text-center">
              Sign in
            </h1>
            <FormInput
              label="Email"
              placeholder="john@email.com"
              name="username"
              onChange={handleChange}
              value={userInfo.username}
            />
            <FormInput
              label="Password"
              placeholder="********"
              name="password"
              type="password"
              onChange={handleChange}
              value={userInfo.password}
            />
            <button className="dark:bg-high-contrast-dark bg-high-contrast text-secondary dark:text-secondary-dark w-full rounded hover:bg-opacity-90 transition font-semibold text-lg cursor-pointer h-10 flex items-center justify-center">
              Login
            </button>
          </form>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Account;

// export async function getServerSideProps(context: any) {
//   return {
//     props: {
//       csrfToken: await getCsrfToken(context),
//     },
//   };
// }
