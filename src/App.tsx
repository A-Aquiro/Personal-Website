import { useState, useRef } from "react";
import "./App.css";

type WindowType =
  | "projects"
  | "about"
  | "achievements"
  | "cook"
  | "silentMage"
  | "careerCosmos"
  | "handshape";

type Position = {
  x: number;
  y: number;
};

const projects = [
  {
    id: "cook" as WindowType,
    name: "Cook or Cooked",
    type: "GAME",
    description: "A fast-paced cooking arcade game.",
    tech: "Godot · GDScript",
    icon: "game",
  },
  {
    id: "silentMage" as WindowType,
    name: "The Silent Mage",
    type: "GAME",
    description: "A Java game created for FBLA.",
    tech: "Java",
    icon: "game",
  },
  {
    id: "careerCosmos" as WindowType,
    name: "Career Cosmos",
    type: "GAME",
    description: "A space-themed educational game.",
    tech: "Godot · GDScript",
    icon: "game",
  },
  {
    id: "handshape" as WindowType,
    name: "Handshape Filters",
    type: "WEB",
    description: "Real-time hand tracking in the browser.",
    tech: "JavaScript · MediaPipe",
    icon: "code",
  },
];

function FolderIcon() {
  return (
    <svg viewBox="0 0 64 64" className="svg-icon">
      <path
        d="M7 17.5C7 14.46 9.46 12 12.5 12H26l6 7h19.5C54.54 19 57 21.46 57 24.5v25C57 52.54 54.54 55 51.5 55h-39C9.46 55 7 52.54 7 49.5v-32Z"
        fill="currentColor"
      />
      <path
        d="M8 24h48v25.5c0 3.04-2.46 5.5-5.5 5.5h-39C8.46 55 6 52.54 6 49.5V25c0-.55.45-1 1-1h1Z"
        fill="white"
        opacity=".18"
      />
    </svg>
  );
}

function FlowerIcon() {
  return (
    <svg viewBox="0 0 64 64" className="svg-icon">
      <circle cx="32" cy="32" r="8" fill="currentColor" />
      <circle cx="32" cy="14" r="11" fill="currentColor" opacity=".85" />
      <circle cx="50" cy="32" r="11" fill="currentColor" opacity=".85" />
      <circle cx="32" cy="50" r="11" fill="currentColor" opacity=".85" />
      <circle cx="14" cy="32" r="11" fill="currentColor" opacity=".85" />
    </svg>
  );
}

function TrophyIcon() {
  return (
    <svg viewBox="0 0 64 64" className="svg-icon">
      <path
        d="M20 11h24v17c0 9-5 15-12 15s-12-6-12-15V11Z"
        fill="currentColor"
      />
      <path
        d="M20 16H10v5c0 9 6 14 14 14M44 16h10v5c0 9-6 14-14 14"
        fill="none"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
      <path
        d="M32 43v9M22 55h20"
        stroke="currentColor"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}

function GameIcon() {
  return (
    <svg viewBox="0 0 64 64" className="file-svg">
      <rect x="8" y="17" width="48" height="32" rx="11" fill="currentColor" />
      <circle cx="21" cy="32" r="3" fill="white" />
      <circle cx="21" cy="32" r="8" fill="none" stroke="white" strokeWidth="2" />
      <path
        d="M17 32h8M21 28v8"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="43" cy="28" r="3" fill="white" />
      <circle cx="48" cy="35" r="3" fill="white" />
    </svg>
  );
}

function CodeIcon() {
  return (
    <svg viewBox="0 0 64 64" className="file-svg">
      <rect x="9" y="8" width="46" height="48" rx="8" fill="currentColor" />
      <path
        d="m25 23-9 9 9 9M39 23l9 9-9 9M35 18l-6 28"
        fill="none"
        stroke="white"
        strokeWidth="4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function App() {
  const [openWindows, setOpenWindows] = useState<WindowType[]>([]);
  const [activeWindow, setActiveWindow] = useState<WindowType | null>(null);

  const [positions, setPositions] = useState<Record<WindowType, Position>>({
    projects: { x: 300, y: 100 },
    about: { x: 340, y: 120 },
    achievements: { x: 380, y: 140 },
    cook: { x: 320, y: 110 },
    silentMage: { x: 350, y: 130 },
    careerCosmos: { x: 380, y: 150 },
    handshape: { x: 410, y: 170 },
  });

  const draggingWindow = useRef<WindowType | null>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  const openWindow = (windowName: WindowType) => {
    if (!openWindows.includes(windowName)) {
      setOpenWindows((current) => [...current, windowName]);
    }

    setActiveWindow(windowName);
  };

  const closeWindow = (windowName: WindowType) => {
    setOpenWindows((current) =>
      current.filter((window) => window !== windowName)
    );

    if (activeWindow === windowName) {
      setActiveWindow(null);
    }
  };

  const startDragging = (
    event: React.MouseEvent<HTMLDivElement>,
    windowName: WindowType
  ) => {
    event.preventDefault();

    draggingWindow.current = windowName;

    const position = positions[windowName];

    dragOffset.current = {
      x: event.clientX - position.x,
      y: event.clientY - position.y,
    };

    setActiveWindow(windowName);

    document.addEventListener("mousemove", handleDragging);
    document.addEventListener("mouseup", stopDragging);
  };

  const handleDragging = (event: MouseEvent) => {
    const windowName = draggingWindow.current;

    if (!windowName) return;

    setPositions((current) => ({
      ...current,
      [windowName]: {
        x: event.clientX - dragOffset.current.x,
        y: event.clientY - dragOffset.current.y,
      },
    }));
  };

  const stopDragging = () => {
    draggingWindow.current = null;

    document.removeEventListener("mousemove", handleDragging);
    document.removeEventListener("mouseup", stopDragging);
  };

  const renderProject = (
    project: (typeof projects)[number]
  ) => (
    <button
      className="project-file"
      onClick={() => openWindow(project.id)}
    >
      <div className="project-file-icon">
        {project.icon === "game" ? <GameIcon /> : <CodeIcon />}
      </div>

      <div className="project-file-name">{project.name}</div>
      <div className="project-file-type">{project.type}</div>
    </button>
  );

  const renderWindow = (windowName: WindowType) => {
    const position = positions[windowName];

    return (
      <div
        key={windowName}
        className="window"
        style={{
          left: position.x,
          top: position.y,
          zIndex: activeWindow === windowName ? 100 : 10,
        }}
        onMouseDown={() => setActiveWindow(windowName)}
      >
        <div
          className="window-header"
          onMouseDown={(event) => startDragging(event, windowName)}
        >
          <div className="window-title">
            <span className="window-dot" />
            <span>
              {windowName === "projects" && "my projects"}
              {windowName === "about" && "about me"}
              {windowName === "achievements" && "achievements"}
              {windowName === "cook" && "Cook or Cooked"}
              {windowName === "silentMage" && "The Silent Mage"}
              {windowName === "careerCosmos" && "Career Cosmos"}
              {windowName === "handshape" && "Handshape Filters"}
            </span>
          </div>

          <button
            className="close-button"
            onMouseDown={(event) => event.stopPropagation()}
            onClick={() => closeWindow(windowName)}
          >
            ×
          </button>
        </div>

        <div className="window-content">
          {windowName === "projects" && (
            <>
              <div className="explorer-heading">
                <div>
                  <p className="eyebrow">PORTFOLIO</p>
                  <h1>my projects</h1>
                </div>

                <span className="item-count">
                  {projects.length} items
                </span>
              </div>

              <div className="project-grid">
                {projects.map(renderProject)}
              </div>
            </>
          )}

          {windowName === "about" && (
            <div className="about-page">
              <div className="about-flower">
                <FlowerIcon />
              </div>

              <p className="eyebrow">HELLO THERE</p>

              <h1>I'm Angelika 🌷</h1>

              <p className="large-text">
                I'm a student, programmer, and builder who loves turning ideas
                into things people can actually use.
              </p>

              <p>
                I especially enjoy game development, creative programming,
                hardware, and experimenting with technologies I haven't used
                before.
              </p>

              <p>
                This little corner of the internet is where I keep some of the
                things I've made.
              </p>
            </div>
          )}

          {windowName === "achievements" && (
            <>
              <p className="eyebrow">A FEW HIGHLIGHTS</p>
              <h1>things I've done</h1>

              <div className="achievement-list">
                <div className="achievement">
                  <div className="achievement-icon">01</div>
                  <div>
                    <strong>Hack for RVA</strong>
                    <span>1st Place — Thriving Environment</span>
                  </div>
                </div>

                <div className="achievement">
                  <div className="achievement-icon">02</div>
                  <div>
                    <strong>Hack Club Shiba Arcade</strong>
                    <span>1st / 30 participants globally</span>
                  </div>
                </div>

                <div className="achievement">
                  <div className="achievement-icon">03</div>
                  <div>
                    <strong>FBLA</strong>
                    <span>
                      Multiple regional and state game development awards
                    </span>
                  </div>
                </div>

                <div className="achievement">
                  <div className="achievement-icon">04</div>
                  <div>
                    <strong>NCWIT</strong>
                    <span>
                      Regional Rising Star & Affiliate Winner
                    </span>
                  </div>
                </div>
              </div>
            </>
          )}

          {windowName === "cook" && (
            <ProjectPage
              title="Cook or Cooked"
              category="GAME DEVELOPMENT"
              description="A fast-paced cooking arcade game where quick decisions and even quicker keyboard skills keep the kitchen alive."
              tech="Godot · GDScript"
            />
          )}

          {windowName === "silentMage" && (
            <ProjectPage
              title="The Silent Mage"
              category="GAME DEVELOPMENT"
              description="A Java game developed for FBLA's Game & Simulation Programming event."
              tech="Java · Eclipse · Aseprite · Piskel"
            />
          )}

          {windowName === "careerCosmos" && (
            <ProjectPage
              title="Career Cosmos"
              category="GAME DEVELOPMENT"
              description="A space-themed educational game created to make exploring careers feel like an adventure."
              tech="Godot · GDScript"
            />
          )}

          {windowName === "handshape" && (
            <ProjectPage
              title="Handshape Filters"
              category="WEB DEVELOPMENT"
              description="A browser-based experiment using real-time hand tracking to create interactive visual filters."
              tech="JavaScript · MediaPipe"
            />
          )}
        </div>
      </div>
    );
  };

  return (
    <main className="desktop">
      <div className="floating-decoration decoration-one">✦</div>
      <div className="floating-decoration decoration-two">♡</div>

      <div className="desktop-icons">
        <button
          className="desktop-icon"
          onClick={() => openWindow("projects")}
        >
          <div className="desktop-icon-image folder-color">
            <FolderIcon />
          </div>
          <span>projects</span>
        </button>

        <button
          className="desktop-icon"
          onClick={() => openWindow("about")}
        >
          <div className="desktop-icon-image flower-color">
            <FlowerIcon />
          </div>
          <span>about me</span>
        </button>

        <button
          className="desktop-icon"
          onClick={() => openWindow("achievements")}
        >
          <div className="desktop-icon-image trophy-color">
            <TrophyIcon />
          </div>
          <span>achievements</span>
        </button>
      </div>

      <div className="signature">
        angelika <span>♡</span>
      </div>

      {openWindows.map((windowName) => renderWindow(windowName))}
    </main>
  );
}

function ProjectPage({
  title,
  category,
  description,
  tech,
}: {
  title: string;
  category: string;
  description: string;
  tech: string;
}) {
  return (
    <div className="project-page">
      <p className="eyebrow">{category}</p>

      <h1>{title}</h1>

      <p className="large-text">{description}</p>

      <div className="tech-pill">{tech}</div>

      <div className="project-placeholder">
        <span>project preview</span>
      </div>
    </div>
  );
}

export default App;