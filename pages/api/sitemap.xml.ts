import { NextApiRequest, NextApiResponse } from "next";
import dbConnect from "../../lib/db";
import Post from "../../models/Post";

type slug = { slug: string };
const MAIN_URL = "https://fsniraj.dev/blogs";

function generateSiteMap(slugs: slug[]) {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
   <url>
        <loc>https://fsniraj.dev</loc>
   </url>
   <url>
        <loc>https://fsniraj.dev/blogs</loc>
   </url>
     ${slugs
       .map(({ slug }) => {
         return `
       <url>
           <loc>${`${MAIN_URL}/${slug}`}</loc>
       </url>
     `;
       })
       .join("")}
   </urlset>
 `;
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "GET")
    return res.status(404).json({ error: "route not found!" });

  try {
    // fetching all the post-slug from the db
    await dbConnect();
    const slugs: slug[] = await Post.find({}).select("slug");

    // We generate the XML sitemap with the posts data
    const sitemap = generateSiteMap(slugs);

    res.setHeader("Content-Type", "text/xml");
    // we send the XML to the browser
    res.write(sitemap);
    res.end();
  } catch (error) {
    res.send(JSON.stringify(error));
  }
}
