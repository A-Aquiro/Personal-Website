import { useState } from "react";
import "./App.css";

function App() {
  const [openWindow, setOpenWindow] = useState<string | null>(null);

  return (
    <main className="desktop">

      <div className="desktop-icons">

        <button
          className="desktop-icon"
          onClick={() => setOpenWindow("projects")}
        >
          <div className="icon">💻</div>
          <div className="icon-label">Projects</div>
        </button>

        <button
          className="desktop-icon"
          onClick={() => setOpenWindow("about")}
        >
          <div className="icon">🌸</div>
          <div className="icon-label">About Me</div>
        </button>

        <button
          className="desktop-icon"
          onClick={() => setOpenWindow("achievements")}
        >
          <div className="icon">🏆</div>
          <div className="icon-label">Achievements</div>
        </button>

      </div>
      
          {openWindow === "projects" && (
        <div className="window">

          <div className="window-header">
            <span>Projects</span>

            <button
              className="close-button"
              onClick={() => setOpenWindow(null)}
            >
              ×
            </button>
          </div>

          <div className="window-content">
            <h1>My Projects</h1>
            <p>Things I've built.</p>
          </div>

        </div>
      )}

    </main>
  );
}

export default App;