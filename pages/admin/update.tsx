import { NextPage } from "next";
import React, { useEffect, useState } from "react";
import axios from "axios";

import AdminLayout from "../../components/admin/AdminLayout";
import Editor from "../../components/editor";
import { postSchema } from "../../utils/types";
import { useRouter } from "next/router";
import Notification, { Notifications } from "../../components/Notification";

interface Props {
  onSubmit?: (data: FormData) => void;
}

const Create: NextPage<Props> = (): JSX.Element => {
  const [ready, setReady] = useState<boolean>(false);
  const [post, setPost] = useState<postSchema | null>(null);
  const [busy, setBusy] = useState<boolean>(false);
  const [notification, setNotification] = useState<{
    message: string;
    type: Notifications;
  }>({ message: "", type: "error" });

  const router = useRouter();
  const postSlug = router.query.post_slug as string;

  const fetchPost = async (slug: string) => {
    try {
      const res = await fetch("/api/post/" + postSlug, {
        method: "GET",
      }).then((data) => data.json());

      setPost({ ...res.post, tags: res.post.tags.join(", ") });
      setReady(true);
    } catch (error: any) {
      console.log("error: " + error.message);
      setReady(true);
    }
  };

  const handleSubmit = async (data: FormData) => {
    try {
      setBusy(true);
      const res = await axios.patch("/api/post/update", data, {
        headers: {
          Accept: "multipart/form-data",
        },
      });
      if (res.data.ok)
        setNotification({ type: "success", message: "You are logged in." });
      setBusy(false);
    } catch (error: any) {
      console.log(error.response.data);
      setBusy(false);
    }
  };

  useEffect(() => {
    if (postSlug) fetchPost(postSlug);
  }, []);

  if (!ready)
    return (
      <AdminLayout headTitle="Fetching Post">
        <p>loading</p>
      </AdminLayout>
    );

  return (
    <AdminLayout headTitle={`Update - ${post?.title}`}>
      <Notification message={notification.message} type={notification.type} />
      <div className="md:w-[60rem] mx-auto h-full">
        <Editor
          busy={busy}
          btnTitle="Update"
          postToUpdate={post}
          onSubmit={handleSubmit}
        />
      </div>
    </AdminLayout>
  );
};

export default Create;
