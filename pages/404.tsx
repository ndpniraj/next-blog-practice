import Link from "next/link";
import React, { FC } from "react";
import DefaultLayout from "../components/DefaultLayout";

interface Props {}

const NotFound: FC<Props> = (props): JSX.Element => {
  return (
    <DefaultLayout modes="only-dark">
      <div className="absolute inset-0 flex items-center justify-center p-5">
        <div className="flex sm:flex-row flex-col items-center space-x-5">
          <div className="bg-secondary-dark p-10 rounded-full md:border-[10px] border-[7px] border-white">
            <img src="/images/notfound.png" alt="404 Not Found" />
          </div>
          <div className="text-center space-y-5">
            <h1 className="text-primary md:text-9xl text-7xl font-ibm_plex-500 font-semibold">
              404
            </h1>
            <p className="md:text-2xl text-lg font-ibm_plex-500 text-high-contrast-dark">
              OOPS! We are unable to find the thing you are looking for.
            </p>
            <Link href="/">
              <a className="bg-primary p-3 inline-block rounded font-ibm_plex-500 text-secondary-dark">
                Go Back To Home
              </a>
            </Link>
          </div>
        </div>
      </div>
    </DefaultLayout>
  );
};

export default NotFound;
