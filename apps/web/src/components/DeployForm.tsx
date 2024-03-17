import vercelLogo from "../assets/logotype/dark/vercel-logotype-dark.svg";
import { Dispatch, useState,SetStateAction, useCallback } from "react";
import axios from "axios";

interface DeployFormProps {
  setLogs: Dispatch<SetStateAction<string[]>>;
}

export function DeployForm({
  setLogs
}: DeployFormProps) {
  const [githubUrl, setGithubUrl] = useState<string>("");
  const [slug, setSlug] = useState<string>("");
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleOnClick = useCallback(async (event: { preventDefault: () => void }) => {
    setIsLoading(true);

    event.preventDefault();
    console.log(githubUrl, slug);

    await axios.post("http://localhost:9001/project", {
      gitURL: githubUrl,
      slug: slug,
    });

    setIsLoading(false);
  },[githubUrl,slug]);

  return (
    <>
      <div className="sm:mx-auto sm:w-full sm:max-w-sm pb-10">
        <img className="mx-auto h-10 w-auto" src={vercelLogo} alt="Vercel" />
      </div>

      <div className="mt-6 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleOnClick}>
          <div>
            <label className="block text-sm font-medium leading-6 text-gray-900">
              Github Repo URL
            </label>
            <div className="mt-2">
              <input
                id="text"
                name="text"
                type="text"
                required
                onChange={(e) => setGithubUrl(e.target.value)}
                className="p-2 block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between">
              <label className="block text-sm font-medium leading-6 text-gray-900">
                Slug
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
              />
            </div>
          </div>

          <div>
            {isLoading ? (
              <div className="mt-10 flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black">
                Deploying...
              </div>
            ) : (
              <button
                type="submit"
                className="mt-10 flex w-full justify-center rounded-md bg-black px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-gray-700 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-black"
              >
                Deploy
              </button>
            )}
          </div>
        </form>
      </div>
    </>
  );
}
