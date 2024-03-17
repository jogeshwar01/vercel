import { useState } from "react";
import "./App.css";
import { Terminal } from "./components/Terminal";
import { DeployForm } from "./components/DeployForm";

function App() {
  const [logs,setLogs] = useState<string[]>([]);

  return (
    <>
      <div className="flex flex-row">
        <div className="flex w-1/2 min-h-full flex-col justify-center px-6 py-12 lg:px-8">
          <DeployForm setLogs={setLogs} />
        </div>

        <div className="w-1/2">
          <Terminal logs={logs} />
        </div>
      </div>
    </>
  );
}

export default App;
