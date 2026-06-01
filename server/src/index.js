import express from "express";
import cors from "cors";
import "dotenv/config";
import Parser from "rss-parser";
import { feeds } from "./data/feeds.js";

const app = express();
const parser = new Parser();

app.use(cors({ origin: true }));
app.use(express.json({ limit: "1mb" }));

app.get("/api/health", (req, res) => {
  res.json({ ok: true, time: new Date().toISOString() });
});

app.get("/api/articles", async (req, res) => {
  try {
    const allArticles = [];

    for (const feed of feeds) {
      const parsedFeed = await parser.parseURL(feed.feedUrl);

      const articles = parsedFeed.items.slice(0, 5).map((item, index) => ({
        id: `${feed.sourceName}-${index}`,
        title: item.title || "Untitled",
        source: feed.sourceName,
        date: item.pubDate || item.isoDate || "No date",
        link: item.link || "",
        summary:
          item.contentSnippet ||
          item.content ||
          item.summary ||
          "No summary available",
        category: "Education",
        articleType: "News",
        confidence: "Medium"
      }));

      allArticles.push(...articles);
    }

    res.json(allArticles);
  } catch (error) {
    console.error("RSS fetch error:", error);
    res.status(500).json({ error: "Failed to fetch RSS articles" });
  }
});

app.get("/api/newspaper", async (req, res) => {
  try {
    const allArticles = [];

    for (const feed of feeds) {
      const parsedFeed = await parser.parseURL(feed.feedUrl);

      const articles = parsedFeed.items.slice(0, 3).map((item, index) => ({
        id: `${feed.sourceName}-${index}`,
        title: item.title || "Untitled",
        source: feed.sourceName,
        date: item.pubDate || item.isoDate || "No date",
        link: item.link || "",
        summary:
          item.contentSnippet ||
          item.content ||
          item.summary ||
          "No summary available",
      }));

      allArticles.push(...articles);
    }



    const topArticles = allArticles.slice(0, 6);

    const newspaper = {
      title: "AI Education Daily",
      date: new Date().toLocaleDateString(),
      headline: topArticles[0]?.title || "Today's Education News",
      generatedLeadArticle: {
    title: "Today’s Education Briefing",
    author: "AI Education Desk",
    body: `
PLACEHOLDER PLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDERPLACEHOLDER
    `,
    keyThemes: [
      "Education policy and school system change",
      "Technology and AI in learning",
      "Higher education adaptation",
      "Student outcomes and equity"
    ]
  },
      editorNote:
        "This AI-generated education newspaper summarizes major education stories from selected public sources. It is a prototype and should be checked against original sources.",
      sections: [
        {
          name: "Top Education Stories",
          stories: topArticles.slice(0, 3),
        },
        {
          name: "Policy and School Systems",
          stories: topArticles.slice(3, 6),
        },
      ],
      
      sourcesUsed: topArticles.map((article) => ({
        title: article.title,
        source: article.source,
        link: article.link,
      })),
    };

    

    res.json(newspaper);
  } catch (error) {
    console.error("Newspaper generation error:", error);
    res.status(500).json({
      error: "Failed to generate newspaper",
      details: error.message,
    });
  }
});

const port = process.env.PORT || 8787;

app.listen(port, () => {
  console.log(`API listening on ${port}`);
});