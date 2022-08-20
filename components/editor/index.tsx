import { MDXRemoteSerializeResult } from "next-mdx-remote";
import { serialize } from "next-mdx-remote/serialize";
import React, {
  ChangeEvent,
  FC,
  MouseEventHandler,
  useEffect,
  useState,
} from "react";
import { BiLoader } from "react-icons/bi";
import {
  InputChangeHandler,
  postSchema,
  TextAreaChangeHandler,
  topics,
} from "../../utils/types";
import MetaDescriptionForm from "../admin/MetaDescriptionForm";
import SlugInput from "../admin/SlugInput";
import TopicSelector from "../admin/TopicSelector";

import PostDetail from "../PostDetail";
import EditorProvider, { POST_IDENTIFIER } from "./EditorProvider";
import PosterInput, { acceptedFileTypes } from "./PosterInput";
import TitleInput from "./TitleInput";
import ToolBar from "./Toolbar";

type finalPost = {
  title: string;
  slug: string;
  meta: string;
  content: string;
  thumbnail?: File;
  tags: string[];
  topic: string;
};

const defaultPost = {
  id: "",
  meta: "",
  slug: "",
  title: "",
  content: "",
  thumbnail: "",
  date: new Date(Date.now()).toString(),
  author: "Niraj Dhungana",
  topic: "",
  tags: "",
};

interface Props {
  btnTitle?: string;
  onSubmit?: (data: FormData) => void;
  postToUpdate?: postSchema | null;
  busy?: boolean;
}

const Editor: FC<Props> = ({
  btnTitle,
  postToUpdate = null,
  onSubmit,
  busy,
}): JSX.Element => {
  const [showEditor, setShowEditor] = useState<boolean>(true);
  /**
   * we are using this state to prevent our updateLocalStorage
   * to run before we load our app
   **/
  const [loaded, setLoaded] = useState<boolean>(false);
  const [post, setPost] = useState<postSchema>(defaultPost);

  const handleOnPreview = async () => {
    const { content, thumbnail, title } = post;
    if (!content) return;

    const source: MDXRemoteSerializeResult = await serialize(content);

    if (source) {
      setPost({
        ...post,
        title,
        source,
        thumbnail,
      });
      setShowEditor(false);
    }
  };

  const formatSlug = () => {
    const unfilteredSlugs = post.slug.trim().toLowerCase().split(" ");
    const slug = unfilteredSlugs.filter((s) => s.trim()).join("-");
    setPost({ ...post, slug });
  };

  const updateSlug: InputChangeHandler = ({ target }) => {
    setPost({
      ...post,
      slug: target.value,
    });
  };

  const updateTags: InputChangeHandler = ({ target }) => {
    setPost({
      ...post,
      tags: target.value,
    });
  };

  const updateMetaDescription: TextAreaChangeHandler = ({ target }) => {
    /**
     * because we don't want to accept meta description with more then 150 characters
     **/
    setPost({
      ...post,
      meta: target.value.substring(0, 150),
    });
  };

  const updateLocalStorage = () => {
    localStorage.setItem(
      POST_IDENTIFIER,
      JSON.stringify({
        title: post.title,
        content: post.content,
        slug: post.slug,
        topic: post.topic,
        tags: post.tags,
        meta: post.meta,
      })
    );
  };

  const handleChange = (newContent: string | undefined) => {
    if (typeof newContent === "string") {
      setPost({ ...post, content: newContent });
    }
  };

  const handleTitleChange = ({ target }: ChangeEvent<HTMLInputElement>) => {
    const { value } = target;
    setPost({ ...post, title: value });
  };

  const handleOnPosterInput = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;
    const file = files[0];
    if (!file) return;
    const notAcceptableFile = !acceptedFileTypes.includes(file.type);
    if (notAcceptableFile) return console.log("file not acceptable!");
    setPost({
      ...post,
      thumbnailFile: file,
      thumbnail: URL.createObjectURL(file),
    });
  };

  const handleTopicSelect = (topic: topics) => {
    setPost({ ...post, topic });
  };

  const convertTags = (tags: string) => {
    // if (!tags.trim()) return [""];
    return tags.split(",").map((t) => t.trim()) || [""];
  };

  /**
   * Submitting the post
   **/
  const submitPost = () => {
    const formData = new FormData();
    const { slug, title, tags, topic, content, meta, thumbnailFile } = post;
    if (!title.trim() || !content.trim()) return;
    if (!slug) return;

    const finalPost: finalPost = {
      title,
      content,
      slug,
      tags: convertTags(tags),
      meta,
      topic,
    };

    if (thumbnailFile) formData.append("thumbnail", thumbnailFile);

    formData.append("title", finalPost.title);
    formData.append("content", finalPost.content);
    formData.append("slug", finalPost.slug);
    formData.append("tags", JSON.stringify(finalPost.tags));
    formData.append("meta", finalPost.meta);
    formData.append("topic", finalPost.topic);
    formData.append("meta", finalPost.meta);

    onSubmit && onSubmit(formData);
  };

  // grabbing content from local-storage
  useEffect(() => {
    if (postToUpdate) setPost({ ...postToUpdate });
    else {
      const oldContent = localStorage.getItem(POST_IDENTIFIER);
      if (oldContent) setPost({ ...post, ...JSON.parse(oldContent) });
    }
    setLoaded(true);
  }, []);

  // storing content to local-storage
  // if we are updating the old content we don't want to update the LS
  useEffect(() => {
    if (postToUpdate) return;
    if (loaded) updateLocalStorage();
  }, [post]);

  /**
   * Here if we have the edit mode (showEditor == true) we will show editor and hide the post preview.
   * otherwise (showEditor == false) we will display post and edit button to toggle back
   **/
  /**
   * Add Your code Above these comments
   **/
  return (
    <div className="space-x-3 flex h-full">
      <div className="flex-1 h-full">
        <EditorProvider
          value={post.content}
          onChange={handleChange}
          showEditor={showEditor}
        >
          <ToggleFormPreview
            showEditor={showEditor}
            onEditClick={() => setShowEditor(true)}
          >
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <PosterInput
                  onChange={handleOnPosterInput}
                  label={post.thumbnailFile?.name || "Select Poster"}
                />
                <div className="flex items-center space-x-5">
                  <PreviewButton title="Preview" onClick={handleOnPreview} />
                  <PostButton
                    onClick={submitPost}
                    title={btnTitle || "Create"}
                    busy={busy}
                  />
                </div>
              </div>

              <TitleInput onChange={handleTitleChange} value={post.title} />
              <ToolBar />
              <SlugInput
                value={post.slug}
                onChange={updateSlug}
                onBlur={formatSlug}
              />
            </div>
          </ToggleFormPreview>

          {post && !showEditor ? (
            <PostDetail post={{ ...post, tags: convertTags(post.tags) }} />
          ) : null}
          {showEditor && (
            <MetaDescriptionForm
              value={post.meta}
              onChange={updateMetaDescription}
            />
          )}
        </EditorProvider>
      </div>
      {showEditor && (
        <div className="w-44 space-y-3">
          <TopicSelector onTopicSelect={handleTopicSelect} value={post.topic} />
          <input
            type="text"
            className="border-2 dark:border-low-contrast-dark border-low-contrast rounded bg-transparent outline-none p-1 text-low-contrast dark:text-low-contrast-dark"
            placeholder="Tags with coma ( , )"
            onChange={updateTags}
            value={post.tags}
          />
        </div>
      )}
    </div>
  );
};

const PreviewButton: FC<{
  onClick?: MouseEventHandler<HTMLButtonElement>;
  title: string;
}> = ({ onClick, title }) => {
  return (
    <button
      onClick={onClick}
      className="dark:bg-secondary-dark dark:text-high-contrast-dark bg-low-contrast text-primary rounded self-end transition flex items-center justify-center w-24 h-8"
    >
      {title}
    </button>
  );
};

const PostButton: FC<{
  onClick?: MouseEventHandler<HTMLButtonElement>;
  title: string;
  busy?: boolean;
}> = ({ onClick, busy, title }) => {
  return (
    <button
      onClick={!busy ? onClick : undefined}
      className="dark:bg-secondary-dark dark:text-high-contrast-dark bg-low-contrast text-primary rounded self-end transition flex items-center justify-center w-24 h-8"
    >
      {busy ? <BiLoader className="animate-spin" /> : title}
    </button>
  );
};

interface ToggleFormPreviewProps {
  onEditClick: () => void;
  showEditor: boolean;
  children: React.ReactNode;
}

const ToggleFormPreview: FC<ToggleFormPreviewProps> = ({
  showEditor,
  onEditClick,
  children,
}): JSX.Element => {
  return showEditor ? (
    <>{children}</>
  ) : (
    <div className="flex justify-end">
      <PreviewButton title="Edit" onClick={onEditClick} />
    </div>
  );
};

export default Editor;
