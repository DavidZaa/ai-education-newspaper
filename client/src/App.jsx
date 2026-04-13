// function App() {
//   return (
//     <div style={{ padding: "20px", fontFamily: "Arial" }}>
//       <h1>AI Education Newspaper</h1>
//       <p>Welcome to your AI-powered education news platform.</p>
//     </div>
//   );
// }

// export default App;



import { useEffect, useState } from "react";

function App() {
  const [health, setHealth] = useState("Loading...");

  useEffect(() => {
    fetch("http://localhost:8787/api/health")
      .then((res) => res.json())
      .then((data) => {
        setHealth(`Backend is working at ${data.time}`);
      })
      .catch(() => {
        setHealth("Could not connect to backend");
      });
  }, []);

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h1>Shut up Ina </h1>
      <p>{health}</p>
    </div>
  );
}

export default App;