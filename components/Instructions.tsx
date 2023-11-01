import JSONPretty from "react-json-pretty";

export default function Instructions() {
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
        <p className="text-sm border-b pb-2 font-bold">2. How to access data ? </p>

        <p className="mt-3 text-sm">
          <p>const API_URL = 'https://robojson.vercel.app/api/data'</p>
          <p className="mt-5 border-b">USING FETCH API</p>
          {`await fetch(API_URL, {
headers : {
"x-content-key" : "your-data-key-here"
}
})`}

          <p className="mt-5 border-b">USING AXIOS</p>

          <p>{`await axios.get(API_URL, {
headers : {
"x-content-key" : "your-data-key-here"
}
})`}</p>

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
