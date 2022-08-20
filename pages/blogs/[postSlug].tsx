import { FC } from "react";
import { serialize } from "next-mdx-remote/serialize";
import { GetStaticPaths, GetStaticProps } from "next";
import dbConnect from "../../lib/db";
import Post from "../../models/Post";
import { formattedPost } from "../../utils/types";
import PostDetail from "../../components/PostDetail";
import DefaultLayout from "../../components/DefaultLayout";

interface Props {
  post: formattedPost;
}

const SinglePost: FC<Props> = ({ post }) => {
  if (!post) return null;

  return (
    <DefaultLayout title={post.title} meta={post.meta}>
      <PostDetail post={post} />
    </DefaultLayout>
  );
};

export default SinglePost;

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    await dbConnect();
    const posts: { slug: string }[] = await Post.find({}, { createdAt: -1 })
      .limit(8)
      .select("slug");

    const paths = posts.map((post) => {
      return { params: { postSlug: post.slug } };
    });

    return {
      paths: paths,
      fallback: "blocking",
    };
  } catch (error) {
    console.log("error", error);
    return {
      paths: [{ params: { postSlug: "/" } }],
      fallback: false,
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    await dbConnect();
    const post = await Post.findOne({ slug: params?.postSlug });

    if (!post)
      return {
        notFound: true,
      };

    const mdxSource = await serialize(post.content);

    // fetching related posts according to tags
    const posts = await Post.find({
      tags: { $in: [...post.tags] },
      _id: { $ne: post._id },
    })
      .sort("-createdAt")
      .limit(5)
      .select("slug title");

    const relatedPosts = posts.map((post) => {
      return { id: post._id.toString(), title: post.title, slug: post.slug };
    });

    return {
      props: {
        post: {
          id: post._id.toString(),
          author: post.author || "",
          thumbnail: post.thumbnail?.url || "",
          title: post.title,
          source: mdxSource,
          date: post.createdAt.toString(),
          tags: post.tags,
          slug: post.slug,
          likes: post.likes?.length || 0,
        },
        relatedPosts,
      },
      revalidate: 600,
    };
  } catch (error: any) {
    return {
      props: {
        error: error?.message,
      },
    };
  }
};
