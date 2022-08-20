import {
  DetailedHTMLProps,
  FC,
  HTMLAttributes,
  ImgHTMLAttributes,
  useCallback,
} from "react";
import SyntaxHighlighter from "react-syntax-highlighter";
import Image from "next/image";

const commonHeadingStyle =
  "font-semibold py-2 text-high-contrast dark:text-high-contrast-dark font-ibm_plex-400";
const commonParagraphStyle =
  "text-lg text-low-contrast dark:text-low-contrast-dark font-ibm_plex-500";

type PropsHeading = DetailedHTMLProps<
  HTMLAttributes<HTMLHeadingElement>,
  HTMLHeadingElement
>;

type PropsList = DetailedHTMLProps<
  HTMLAttributes<HTMLLIElement>,
  HTMLLIElement
>;

type PropsParagraph = DetailedHTMLProps<
  HTMLAttributes<HTMLParagraphElement>,
  HTMLParagraphElement
>;

type PropsLink = DetailedHTMLProps<
  HTMLAttributes<HTMLAnchorElement>,
  HTMLAnchorElement
>;

type PropsPre = DetailedHTMLProps<
  HTMLAttributes<HTMLPreElement>,
  HTMLPreElement
>;

type PropsCode = DetailedHTMLProps<HTMLAttributes<HTMLElement>, HTMLElement>;

type PropsBlockquote = DetailedHTMLProps<
  HTMLAttributes<HTMLQuoteElement>,
  HTMLQuoteElement
>;

type PropsImage = DetailedHTMLProps<
  ImgHTMLAttributes<HTMLImageElement>,
  HTMLImageElement
>;

const H1: FC<PropsHeading> = ({ children }): JSX.Element => {
  return <h1 className={commonHeadingStyle + " text-4xl"}>{children}</h1>;
};

const H2: FC<PropsHeading> = ({ children }): JSX.Element => {
  return (
    <h2 className={commonHeadingStyle + " text-3xl"}>
      <a id={children as string} href={"#" + children}>
        {children}
      </a>
    </h2>
  );
};

const H3: FC<PropsHeading> = ({ children }) => {
  return <h3 className={commonHeadingStyle + " text-2xl"}>{children}</h3>;
};

const Paragraph: FC<PropsParagraph> = ({ children }): JSX.Element => {
  return (
    <p
      className={
        commonParagraphStyle + " py-4 text-xl leading-8 bg-transparent"
      }
    >
      {children}
    </p>
  );
};

const CustomImage: FC<PropsImage> = ({ alt, src }) => {
  if (!src) return null;
  return (
    <div className="relative aspect-video">
      <Image src={src} alt={alt} layout="fill" objectFit="cover" />
    </div>
  );
};

const Link: FC<PropsLink> = (props): JSX.Element => {
  const { children, href } = props as { children: string; href: string };

  const rest = href.includes("fsniraj.dev")
    ? props
    : { target: "_blank", rel: "noreferrer noopener", href };

  return (
    <a className="cursor-pointer underline font-semibold" {...rest}>
      {children}
    </a>
  );
};

const UL: FC<PropsList> = (props): JSX.Element => {
  const { children } = props;

  return (
    <li className="text-low-contrast dark:text-low-contrast-dark pl-3 my-3 flex items-center space-x-3 text-lg font-ibm_plex-400">
      <span className="w-2 h-2 rounded-full bg-low-contrast dark:bg-low-contrast-dark" />
      <span>{children}</span>
    </li>
  );
};

const Block: FC<PropsPre> = (props): JSX.Element => {
  const { children } = props;

  const getData = useCallback(() => {
    const { props } = children as any;
    const data = (props && props?.children) || "";
    return data;
  }, []);

  return (
    <SyntaxHighlighter showLineNumbers language="javascript">
      {getData()}
    </SyntaxHighlighter>
  );
};

const Inline: FC<PropsCode> = (props): JSX.Element => {
  const { children } = props;

  return (
    <code className="dark:bg-low-contrast-dark dark:bg-opacity-20 bg-low-contrast bg-opacity-20 rounded-sm font-SourceCodePro px-1 tracking-wide font-thin">
      {children}
    </code>
  );
};

const Quote: FC<PropsBlockquote> = ({ children }): JSX.Element => {
  const commonClasses = "dark:bg-low-contrast-dark bg-low-contrast";
  return (
    <blockquote className="relative my-3">
      <div className="absolute top-0 left-0">
        <div className={"w-14 h-1 " + commonClasses} />
        <div className={"h-14 w-1 " + commonClasses} />
      </div>
      <div className="px-5 italic font-semibold font-ibm_plex-400">
        {children}
      </div>
      <div className="absolute bottom-0 right-0 flex flex-col">
        <div className={"h-14 w-1 self-end " + commonClasses} />
        <div className={"w-14 h-1 " + commonClasses} />
      </div>
    </blockquote>
  );
};

const YouTube: FC<{ id: string }> = ({ id }) => {
  return (
    <div className="py-5 flex justify-center items-center">
      <iframe
        width="100%"
        height="450"
        src={"https://www.youtube.com/embed/" + id}
        title="YouTube video player"
        frameBorder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      ></iframe>
    </div>
  );
};

const Code = { Block, Inline };
const Heading = { H1, H2, H3 };
const List = { UL };

const Elements = {
  Heading,
  Paragraph,
  Link,
  List,
  Code,
  Quote,
  YouTube,
  CustomImage,
};

export default Elements;
