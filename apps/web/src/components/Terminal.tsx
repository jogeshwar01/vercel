export function Terminal({ logs }: { logs: string[] }) {
  return (
    <div className="bg-black h-screen shadow-md p-4 overflow-auto">
      <div className="flex items-center justify-between">
        <div className="flex items-center">
          <div className="h-3 w-3 bg-red-500 rounded-full"></div>
          <div className="h-3 w-3 bg-yellow-500 rounded-full ml-2"></div>
          <div className="h-3 w-3 bg-green-500 rounded-full ml-2"></div>
        </div>
        <div className="text-white">Terminal</div>
      </div>
      <div className="mt-4">
        <div className="text-white">Deployment logs - </div>
        {logs.map((log, index) => {
          return (
            <div key={index} className="text-white">
              {log}
            </div>
          );
        })}
      </div>
    </div>
  );
}
