import { FC, ReactNode, useCallback } from "react";
import Link from "next/link";
import { ImSpinner3 } from "react-icons/im";
import { Error } from "../utils/types";

interface InputProps {
  name?: string;
  value?: string;
  placeholder?: string;
  label?: string;
  error?: Error;
  type?: React.HTMLInputTypeAttribute;
  onChange?: React.ChangeEventHandler<HTMLElement>;
  onBlur?: React.ChangeEventHandler<HTMLElement>;
}

const Input: FC<InputProps> = ({
  name,
  label,
  value,
  placeholder,
  type,
  error,
  onChange,
  onBlur,
}): JSX.Element => {
  const commonStyle =
    "w-full rounded bg-transparent focus:ring-0 border-2 dark:border-low-contrast-dark border-low-contrast dark:focus:border-high-contrast-dark focus:border-high-contrast dark:text-low-contrast-dark text-low-contrast dark:focus:text-high-contrast-dark focus:text-high-contrast text-lg transition peer";

  const getStyle = useCallback(
    () =>
      error?.path === name ? "border-red-500 " + commonStyle : commonStyle,
    [error]
  );

  const getError = useCallback(() => {
    if (error) return error?.path === name ? error.message : "";
  }, [error]);

  return (
    <div className="flex flex-col-reverse">
      <input
        value={value}
        onChange={onChange}
        onBlur={onBlur}
        name={name}
        id={name}
        type={type || "text"}
        className={getStyle()}
        placeholder={placeholder}
      />
      <div className="flex justify-between items-center dark:peer-focus:text-high-contrast-dark peer-focus:text-high-contrast dark:text-low-contrast-dark text-low-contrast mb-1">
        <label className="text-sm" htmlFor={name}>
          {label}
        </label>
        {error ? <p className="text-red-500 text-sm">{getError()}</p> : null}
      </div>
    </div>
  );
};

const Container: FC<{
  children: ReactNode;
}> = ({ children }): JSX.Element => {
  return (
    <div className="w-[300px] dark:bg-secondary-dark bg-secondary p-3 rounded space-y-5">
      {children}
    </div>
  );
};

const SubmitButton: FC<{ title: string; busy?: boolean }> = ({
  title,
  busy,
}): JSX.Element => {
  return (
    <button
      className="w-full py-2 rounded bg-blue-500 text-high-contrast-dark flex items-center justify-center"
      type="submit"
    >
      {!busy ? title : <ImSpinner3 className="animate-spin text-2xl" />}
    </button>
  );
};

const Divider: FC = (): JSX.Element => {
  return (
    <div className="flex justify-center items-center space-x-2">
      <div className="h-[1px] w-12 bg-gray-400" />
      <span className="text-center text-gray-400 leading-none">or</span>
      <div className="h-[1px] w-12 bg-gray-400" />
    </div>
  );
};

const Head: FC<{
  title: string;
  subtitle?: string;
  linkText?: string;
  href?: string;
}> = ({ title, subtitle, linkText, href }): JSX.Element => {
  return (
    <div className="">
      <h1 className="text-center font-semibold text-xl">{title}</h1>
      <p className="text-center">
        {subtitle}
        {linkText && href ? (
          <Link
            className="text-indigo-500 underline font-semibold ml-1"
            href={href}
          >
            {linkText}
          </Link>
        ) : null}
      </p>
    </div>
  );
};

const LinkTag: FC<{ href: string; title: string }> = ({
  title,
  href,
}): JSX.Element => {
  return (
    <Link href={href}>
      <a className="text-high-contrast dark:text-high-contrast-dark underline transition">
        {title}
      </a>
    </Link>
  );
};

const Form = {
  Input,
  Container,
  SubmitButton,
  Divider,
  Head,
  LinkTag,
};

export default Form;
