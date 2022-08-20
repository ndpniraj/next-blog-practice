import { NextPage } from "next";
import React, { useState } from "react";
import axios from "axios";

import AdminLayout from "../../components/admin/AdminLayout";
import Editor from "../../components/editor";
import { useRouter } from "next/router";
import { POST_IDENTIFIER } from "../../components/editor/EditorProvider";

interface Props {}

type responseType = { data: { post: any; ok: boolean } };

const Create: NextPage<Props> = (): JSX.Element => {
  const [busy, setBusy] = useState<boolean>(false);
  const router = useRouter();

  const handleSubmitForm = async (data: FormData) => {
    try {
      setBusy(true);
      const res: responseType = await axios.post("/api/post/create", data, {
        headers: {
          Accept: "multipart/form-data",
        },
      });
      setBusy(false);

      if (res.data.ok) {
        // removing post from local-storage
        localStorage.removeItem(POST_IDENTIFIER);
        router.replace("/admin/update?post_slug=" + res.data.post.slug);
      }
    } catch (error: any) {
      setBusy(false);
      console.log(error.response.data);
    }
  };

  return (
    <AdminLayout headTitle="Create New Post">
      <div className="md:w-[60rem] mx-auto h-full">
        <Editor onSubmit={handleSubmitForm} busy={busy} />
      </div>
    </AdminLayout>
  );
};

export default Create;
