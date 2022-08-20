import { NextPage } from "next";
import React from "react";
import AdminLayout from "../../components/admin/AdminLayout";
import { formattedPost, PostModel } from "../../utils/types";
import PostCard from "../../components/PostCard";
import SearchBar from "../../components/SearchBar";
import dbConnect from "../../lib/db";
import Post from "../../models/Post";
import { formatPosts } from "../../utils/helper";

interface Props {
  posts: formattedPost[];
}

const posts: NextPage<Props> = ({ posts }): JSX.Element => {
  return (
    <AdminLayout headTitle="Posts - Admin">
      <div className="w-[50rem] h-full overflow-y-auto mx-auto space-y-3 custom-scroll-bar">
        <SearchBar />
        {posts.map((post) => {
          return (
            <PostCard
              slug={post.slug}
              key={post.id}
              title={post.title}
              desc={post.meta}
              date={post.date}
              controls
            />
          );
        })}
      </div>
    </AdminLayout>
  );
};

export default posts;

export const getStaticProps = async () => {
  const props: { posts: formattedPost[] } = {
    posts: [],
  };

  try {
    await dbConnect();
    const posts: PostModel[] = (await Post.find({}).sort(
      "-createdAt"
    )) as PostModel[];
    const newPosts = formatPosts(posts);
    props.posts = newPosts;

    return {
      props,
      revalidate: 60,
    };
  } catch (error) {
    return { props };
  }
};
