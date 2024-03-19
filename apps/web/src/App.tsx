import { useState } from "react";
import "./App.css";
import { Terminal } from "./components/Terminal";
import { DeployForm } from "./components/DeployForm";
import { Projects } from "./components/Projects";

function App() {
  const [logs, setLogs] = useState<string[]>([]);
  const [projects, setProjects] = useState<string[]>([]);
  const [showProjects, setShowProjects] = useState<boolean>(false);

  return (
    <>
      <div className="absolute top-0 left-0 p-4">
        <button
          onClick={() => setShowProjects((showProjects) => !showProjects)}
          className="bg-black hover:bg-gray text-white font-bold py-2 px-4 rounded"
        >
          {!showProjects ? "View Projects" : "Deploy New Project"}
        </button>
      </div>
      <div className="flex flex-row">
        <div className="flex w-1/2 min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          {showProjects ? (
            <Projects projects={projects} />
          ) : (
            <DeployForm setLogs={setLogs} setProjects={setProjects} />
          )}
        </div>

        <div className="w-1/2">
          <Terminal logs={logs} />
        </div>
      </div>
    </>
  );
}

export default App;
