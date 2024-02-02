import { FiClipboard } from "react-icons/fi";
import JSONPretty from "react-json-pretty";

export default function Instructions() {
  function copyFetchReq() {
    window.navigator.clipboard.writeText(`
    const API_URL = 'https://robojson.vercel.app/api/data' 
    const resp = await fetch(API_URL, { headers : { "x-content-key" : "your-data-key-here"}})
    const data = await resp.json()
    `);

    alert("Copied the code.");
  }

  return (
    <div className="mt-2 py-2 text-sm">
      <div>
        <p className="text-sm border-b pb-2 font-bold">1. What is robojson ? </p>
        <p>
          Using robojson, you can add sample data and fetch it in the frontend to view the user interface. Basically you
          can create mock data for your frontend applications with ease by using robojson.
        </p>
      </div>

      <div className="mt-5">
        <p className="text-sm border-b pb-2 font-bold">1. How to use robojson ? </p>
        <p>If you are new, then click on generate token button, then add your new data.</p>

        <p>
          If you have used it before, then enter your token on the token input field and submit to see or update or
          data.
        </p>
        <p className="mt-2 italic text-red-500">token means identifier of the data object</p>
      </div>

      <div className="mt-5">
        <p className="text-sm border-b pb-2 font-bold gap-2 flex items-center">
          2. How to access data ?
          <button onClick={copyFetchReq}>
            <FiClipboard />
          </button>
        </p>

        <p className="mt-3 text-sm">
          <div className="bg-[#272822] text-white p-2 flex flex-col gap-3">
            <p> const API_URL = 'https://robojson.vercel.app/api/data' </p>

            <p>{`const resp = await fetch(API_URL, { headers : { "x-content-key" : "your-data-key-here"}})`}</p>

            <p>{`const data = await resp.json()`}</p>
          </div>

          <p className="mt-5 border-b mb-2">SAMPLE RESPONSE</p>
          <JSONPretty
            id="code"
            data={{
              data: {
                id: 1,
                title: "This is your data?",
              },
            }}
          />
        </p>
      </div>
    </div>
  );
}
