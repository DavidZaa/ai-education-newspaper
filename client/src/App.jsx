// import { useEffect, useState } from "react";

// function App() {
//   const [articles, setArticles] = useState([]);
//   const [status, setStatus] = useState("Loading articles...");

//   useEffect(() => {
//     fetch("http://localhost:8787/api/articles")
//       .then((res) => res.json())
//       .then((data) => {
//         setArticles(data);
//         setStatus("");
//       })
//       .catch(() => {
//         setStatus("Could not connect to backend");
//       });
//   }, []);

//   return (
//     <div className="page">
//       <header className="newspaper-header">
//         <h1>AI Education Newspaper</h1>
//         <p>Education news with source transparency and credibility labels.</p>
//       </header>

//       {status && <p>{status}</p>}

//       <main className="article-grid">
//         {articles.map((article) => (
//           <article className="article-card" key={article.id}>
//             <p className="meta">
//               {article.source} | {article.date}
//             </p>

//             <h2>{article.title}</h2>

//             <p className="summary">{article.summary}</p>

//             <p className="labels">
//               <strong>Category:</strong> {article.category} |{" "}
//               <strong>Type:</strong> {article.articleType} |{" "}
//               <strong>Confidence:</strong> {article.confidence}
//             </p>

//             {article.link && (
//               <a href={article.link} target="_blank" rel="noreferrer">
//                 Read original source
//               </a>
//             )}
//           </article>
//         ))}
//       </main>
//     </div>
//   );
// }

// export default App;

import { useEffect, useState } from "react";

function App() {
  const [newspaper, setNewspaper] = useState(null);
  const [status, setStatus] = useState("Loading AI newspaper...");

  useEffect(() => {
    fetch("http://localhost:8787/api/newspaper")
      .then((res) => res.json())
      .then((data) => {
        setNewspaper(data);
        setStatus("");
      })
      .catch(() => {
        setStatus("Could not connect to backend");
      });
  }, []);

  return (
    <div className="page">
      <header className="newspaper-header">
        <h1>{newspaper?.title || "AI Education Newspaper"}</h1>
        <p>
          AI-generated education newspaper with source transparency and
          credibility review.
        </p>
        {newspaper?.date && <p className="meta">{newspaper.date}</p>}
      </header>

      {status && <p>{status}</p>}

      {newspaper && (
        <>
          <section className="lead-story">
            <p className="meta">Top Headline</p>
            <h2>{newspaper.headline}</h2>
            <p>{newspaper.editorNote}</p>
          </section>

          {newspaper.generatedLeadArticle && (
  <section className="generated-article">
    <p className="meta">{newspaper.generatedLeadArticle.author}</p>
    <h2>{newspaper.generatedLeadArticle.title}</h2>
    <p>{newspaper.generatedLeadArticle.body}</p>

    <h3>Key Themes</h3>
    <ul>
      {newspaper.generatedLeadArticle.keyThemes.map((theme) => (
        <li key={theme}>{theme}</li>
      ))}
    </ul>
  </section>
)}

          {newspaper.sections.map((section) => (
            <section className="newspaper-section" key={section.name}>
              <h2>{section.name}</h2>

              <div className="article-grid">
                {section.stories.map((story) => (
                  <article className="article-card" key={story.id}>
                    <p className="meta">
                      {story.source} | {story.date}
                    </p>

                    <h3>{story.title}</h3>

                    <p className="summary">{story.summary}</p>

                    {story.link && (
                      <a href={story.link} target="_blank" rel="noreferrer">
                        Read original source
                      </a>
                    )}
                  </article>
                ))}
              </div>
            </section>
          ))}

          <section className="sources-box">
            <h2>Sources Used</h2>
            <ul>
              {newspaper.sourcesUsed.map((source) => (
                <li key={source.link || source.title}>
                  <a href={source.link} target="_blank" rel="noreferrer">
                    {source.title}
                  </a>{" "}
                  — {source.source}
                </li>
              ))}
            </ul>
          </section>
        </>
      )}
    </div>
  );
}

export default App;