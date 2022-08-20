// google analytics

// log the pageview with their URL
export const pageview = (url: string) => {
  window.gtag("config", process.env.PUBLIC_GOOGLE_ANALYTICS as string, {
    page_path: url,
  });
};
