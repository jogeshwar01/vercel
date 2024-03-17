import vercelLogo from "../assets/logotype/dark/vercel-logotype-dark.svg";
import {
  Dispatch,
  useState,
  SetStateAction,
  useCallback,
  useEffect,
} from "react";
import axios from "axios";
import { socket } from "../socket";

interface DeployFormProps {
  setLogs: Dispatch<SetStateAction<string[]>>;
}

export function DeployForm({ setLogs }: DeployFormProps) {
  const [githubUrl, setGithubUrl] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnClick = useCallback(
    async (event: { preventDefault: () => void }) => {
      setLogs([]);
      setIsLoading(true);

      event.preventDefault();

      setLogs((previous) => [...previous, "Deploying in progress..."]);
      socket.emit("subscribe", `logs:${slug}`);

      await axios.post("http://localhost:5001/project", {
        gitURL: githubUrl,
        slug: slug,
      });

      setIsLoading(false);
    },
    [githubUrl, slug, setLogs]
  );

  useEffect(() => {
    function onLogEvent(value: unknown) {
      if (typeof value === "string") {
        if (value.startsWith(`{"log":`)) {
          const { log } = JSON.parse(value);
          setLogs((previous) => [...previous, log]);
        } else {
          setLogs((previous) => [...previous, value]);
        }
      } else {
        const { log } = JSON.parse(value as string);
        setLogs((previous) => [...previous, log]);
      }
    }

    socket.on("message", onLogEvent);
    return () => {
      socket.off("message", onLogEvent);
    };
  }, [setLogs]);

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm pb-10">
        <img className="mx-auto h-10 w-auto" src={vercelLogo} alt="Vercel" />
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleOnClick}>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Github Repository
            </label>
            <div className="mt-2">
              <input
                id="text"
                name="text"
                type="text"
                required
                onChange={(e) => setGithubUrl(e.target.value)}
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                disabled={isLoading}
                placeholder="Enter the Github URL of your project"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Name
              </label>
            </div>
            <div className="mt-2">
              <input
                id="slug"
                name="slug"
                type="text"
                required
                onChange={(e) => setSlug(e.target.value)}
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                disabled={isLoading}
                placeholder="Enter the url slug for your project"
              />
            </div>
          </div>

          <div>
            <button
              type="submit"
              className="mt-10 flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              disabled={isLoading}
            >
              {isLoading ? "Deploying in Progress" : "Deploy"} &nbsp;
              {isLoading && (
                <div
                  className="inline-block h-5 w-5 animate-spin rounded-full border-4 border-solid border-current border-e-transparent align-[-0.125em] text-surface motion-reduce:animate-[spin_1.5s_linear_infinite] dark:text-white"
                  role="status"
                ></div>
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
