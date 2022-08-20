import { NextPage } from "next";
import Head from "next/head";
import Link from "next/link";

import DefaultLayout from "../components/DefaultLayout";
import { formattedPost, PostModel } from "../utils/types";
import PostCard from "../components/PostCard";
import useDarkMode from "../hooks/useDarkMode";
import dbConnect from "../lib/db";
import Post from "../models/Post";
import { formatPosts } from "../utils/helper";

interface Props {
  posts: formattedPost[];
}

const Home: NextPage<Props> = ({ posts }) => {
  useDarkMode();

  return (
    <>
      <Head>
        <title>{"{ ndp_niraj }"}</title>
        <meta
          name="description"
          content="Read all the latest blog posts related to javascript, react, react native, next js, web development and other programming related technology and topics."
        />
      </Head>
      <DefaultLayout>
        {/* <SearchBar label="Search For Blogs / Tutorials" /> */}

        <div className="py-5 space-y-5">
          {posts.map((post) => {
            return (
              <Link key={post.id} href={"/blogs/" + post.slug}>
                <div className="cursor-pointer hover:scale-[0.99] transition">
                  <PostCard
                    title={post.title}
                    desc={post.meta}
                    date={post.date}
                    slug={post.slug}
                  />
                </div>
              </Link>
            );
          })}
        </div>
      </DefaultLayout>
    </>
  );
};

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

export default Home;
