import { useState } from "react";

// Reusable Project Card component
function ProjectCard({ name, url }: { name: string; url: string }) {
  const [copied, setCopied] = useState(false);

  const copyUrlToClipboard = () => {
    navigator.clipboard
      .writeText(url)
      .then(() => {
        setCopied(true);
        setTimeout(() => setCopied(false), 2000); // Reset icon after 2 seconds
      })
      .catch((err) => console.error("Error copying URL: ", err));
  };

  return (
    <div className="flex w-1/2 j flex-row items-center mt-4 bg-black text-white p-4 rounded-lg m-auto">
      <div className="flex-1">
        <div className="flex flex-row justify-between items-center">
          <h2 className="text-xl font-bold">{name}</h2>
          <button className="ml-2" onClick={copyUrlToClipboard}>
            {copied ? (
              <span id="success-icon" className="inline-flex items-center">
                <svg
                  className="w-3.5 h-3.5"
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 16 12"
                >
                  <path d="M1 5.917 5.724 10.5 15 1.5" />
                </svg>
              </span>
            ) : (
              <span id="default-icon">
                <svg
                  className="w-3.5 h-3.5"
                  aria-hidden="true"
                  fill="currentColor"
                  viewBox="0 0 18 20"
                >
                  <path d="M16 1h-3.278A1.992 1.992 0 0 0 11 0H7a1.993 1.993 0 0 0-1.722 1H2a2 2 0 0 0-2 2v15a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V3a2 2 0 0 0-2-2Zm-3 14H5a1 1 0 0 1 0-2h8a1 1 0 0 1 0 2Zm0-4H5a1 1 0 0 1 0-2h8a1 1 0 1 1 0 2Zm0-5H5a1 1 0 0 1 0-2h2V2h4v2h2a1 1 0 1 1 0 2Z" />
                </svg>
              </span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export function Projects({ projects }: { projects: string[] }) {
  return (
    <div className="text-center">
      <h1 className="text-3xl font-bold text-black">Projects</h1>
      <div className="mt-6">
        {projects.length > 0 ? (
          projects.map((project, index) => (
            <ProjectCard
              key={index}
              name={project}
              url={`${project}.localhost:5000`}
            />
          ))
        ) : (
          <p className="text-lg text-gray-500">
            Your deployed projects will appear here.
          </p>
        )}
      </div>
    </div>
  );
}
