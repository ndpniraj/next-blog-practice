import { FC } from "react";
import {
  FacebookShareButton,
  FacebookIcon,
  TwitterShareButton,
  TwitterIcon,
  WhatsappShareButton,
  WhatsappIcon,
  LinkedinShareButton,
  LinkedinIcon,
  RedditShareButton,
  RedditIcon,
} from "next-share";

interface Props {
  title: string;
  meta: string;
  slug: string;
}

const Share: FC<Props> = ({ title, meta, slug }): JSX.Element => {
  return (
    <div className="flex items-center space-x-3 sticky top-0 z-50 bg-primary dark:bg-primary-dark py-3">
      <p className="text-high-contrast dark:text-high-contrast-dark font-semibold">
        Share:
      </p>
      <FacebookShareButton
        url={"https://fsniraj.com/blogs/" + slug}
        quote={title}
      >
        <FacebookIcon size={32} round />
      </FacebookShareButton>

      <TwitterShareButton
        url={"https://fsniraj.com/blogs/" + slug}
        title={title}
      >
        <TwitterIcon size={32} round />
      </TwitterShareButton>

      <LinkedinShareButton
        title={title}
        source={meta}
        url={"https://fsniraj.com/blogs/" + slug}
      >
        <LinkedinIcon size={32} round />
      </LinkedinShareButton>

      <WhatsappShareButton
        url={"https://fsniraj.com/blogs/" + slug}
        title={title}
        separator=":: "
      >
        <WhatsappIcon size={32} round />
      </WhatsappShareButton>

      <RedditShareButton
        url={"https://fsniraj.com/blogs/" + slug}
        title={title}
      >
        <RedditIcon size={32} round />
      </RedditShareButton>
    </div>
  );
};

export default Share;
