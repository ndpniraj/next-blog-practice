import React, { FC } from "react";
import Head from "next/head";
import { APP_NAME } from "./DefaultLayout";

interface Props {
  title?: string;
  meta?: string;
}

const AppHead: FC<Props> = ({ title, meta }): JSX.Element => {
  return (
    <Head>
      <title>{!title ? APP_NAME : title + " | " + APP_NAME}</title>
      {meta ? <meta name="description" content={meta} /> : null}
    </Head>
  );
};

export default AppHead;
