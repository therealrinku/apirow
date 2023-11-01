import { Fragment, useState } from "react";
import Head from "next/head";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import axios from "axios";
import { FiAlertCircle, FiArrowUpRight, FiClipboard, FiCode, FiHardDrive, FiX } from "react-icons/fi";

const TokenGenerator = () => {
  const [token, setToken] = useState("");
  const [tokenValidated, setTokenValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const [hideCheckbox, setHideCheckbox] = useState(true);

  const [message, setMessage] = useState("");

  const [data, setData] = useState("");
  const [editable, setEditable] = useState(true);

  const [isEditable, setIsEditable] = useState(true);

  const [currTab, setCurrTab] = useState("instructions");

  const generateToken = () => {
    setLoading(true);
    axios
      .post("/api/generateToken")
      .then((res) => {
        setToken(res.data.token);
        setTokenValidated(true);
        setLoading(false);
        setCurrTab("data-edit");
        setMessage("Successfully generated a token.");
        setHideCheckbox(false);
        setData("");
      })
      .catch((err) => {
        setMessage(`Error. ${err.message}`);
        setLoading(false);
      });
  };

  const validateTokenAndGetData = () => {
    setLoading(true);
    axios
      .post("/api/getTokenData", { token })
      .then((res) => {
        setTokenValidated(true);
        setData(res.data.data);
        setHideCheckbox(true);
        setCurrTab("data-edit");
        setIsEditable(res.data.editable);
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.data.message === "Invalid Token") {
          setToken("");
          setMessage("Error. Invalid Token");
          setTokenValidated(false);
        }
        setLoading(false);
      });
  };

  const addData = () => {
    setLoading(true);
    axios
      .post("/api/addData", { key: token, data: data, editable })
      .then(() => {
        setMessage("Data updated successfully. You can access it via API.");
        setLoading(false);
      })
      .catch((err) => {
        setMessage(`Error. ${err.message}`);
        setLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>robojson</title>
        <meta name="description" content="robojson, play with json" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=Manrope&display=swap" rel="stylesheet" />
        <link rel="shortcut icon" href="https://cdn-icons-png.flaticon.com/128/1828/1828231.png" />
      </Head>

      <div className="w-[85%] md:w-[75%] lg:w-[85%] mt-5 mx-auto flex flex-col lg:flex-row justify-center gap-24">
        <section className="w-full lg:w-[40%]">
          <div className="bg-white shadow-md border px-8 pt-6 pb-8 my-5">
            <div className="mb-4 relative">
              <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="username">
                Token
              </label>
              <input
                value={token}
                onChange={(e) => {
                  setToken(e.target.value);
                  setTokenValidated(false);
                  setData("");
                }}
                className="text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                id="username"
                type="text"
              />
              {tokenValidated && (
                <button
                  onClick={() => {
                    window.navigator.clipboard.writeText(token);
                    setMessage("Token Copied");
                  }}
                  className="absolute bg-white py-1 px-2 top-8 border shadow right-2 hover:shadow-md"
                >
                  <FiClipboard />
                </button>
              )}
            </div>

            {!hideCheckbox && (
              <div className="flex items-center">
                <input
                  onChange={() => setEditable((prev) => !prev)}
                  id="checked-checkbox"
                  type="checkbox"
                  defaultChecked
                  className="w-4 h-4 bg-gray-100 rounded border-gray-300"
                />
                <label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium ">
                  Editable next time
                </label>
              </div>
            )}

            <div className="flex flex-col gap-3 mt-10 items-center justify-between">
              <button
                disabled={loading || tokenValidated || token.trim().length < 1}
                className="disabled:bg-blue-400 bg-blue-500 text-white p-2 text-sm w-full flex items-center gap-2 justify-center"
                onClick={validateTokenAndGetData}
              >
                <FiArrowUpRight /> Submit
              </button>
              <button
                disabled={loading}
                className="disabled:bg-blue-400 bg-blue-500 text-white p-2 text-sm w-full flex items-center gap-2 justify-center"
                onClick={generateToken}
              >
                <FiCode /> Generate new token
              </button>
            </div>
          </div>

          <p className="text-gray-500 text-xs">&copy;2023 robojson. All rights not reserved.</p>
        </section>

        <section className={`w-full lg:w-[60%]`}>
          <div className="py-2 flex items-center gap-4">
            {tokenValidated && (
              <button
                disabled={currTab === "data-edit"}
                onClick={() => setCurrTab("data-edit")}
                className={`text-sm font-bold opacity-50 ${currTab === "data-edit" && "opacity-100"}`}
              >
                Edit
              </button>
            )}

            {data.trim()?.length > 0 && (
              <button
                disabled={currTab === "data-preview"}
                onClick={() => setCurrTab("data-preview")}
                className={`text-sm font-bold opacity-50 ${currTab === "data-preview" && "opacity-100"}`}
              >
                Preview
              </button>
            )}

            <button
              disabled={currTab === "instructions"}
              onClick={() => setCurrTab("instructions")}
              className={`text-sm font-bold opacity-50 ${currTab === "instructions" && "opacity-100"}`}
            >
              Instructions
            </button>
          </div>

          {tokenValidated && isEditable && currTab === "data-edit" && (
            <Fragment>
              <textarea
                className="h-[300px] shadow-md text-sm border border-t-0 appearance-none  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={data}
                placeholder="JSON or string"
                onChange={(e) => setData(e.target.value)}
              />

              <button
                disabled={!data.trim().length || loading}
                onClick={addData}
                className="disabled:bg-blue-400 w-full mt-10 bg-blue-500 text-white  p-2 text-sm flex items-center gap-2 justify-center"
              >
                <FiHardDrive /> Update data
              </button>
            </Fragment>
          )}

          {currTab === "data-preview" && data.trim().length > 0 && <JSONPretty id="json-pretty" data={data} />}

          {currTab === "instructions" && (
            <div className="mt-2 shadow bg-white px-4 py-2">
              <p className="text-sm border-b pb-2 font-bold">How to access data ? </p>

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
          )}
        </section>
      </div>

      {message && (
        <div
          className={`${
            message.includes("Error") ? "bg-red-500" : "bg-blue-500"
          }  fixed bottom-5 left-5 flex items-center  text-white text-sm font-bold px-4 py-3`}
          role="alert"
        >
          <FiAlertCircle size={18} />
          <p className="ml-2">{message}</p>
          <button onClick={() => setMessage("")} className="text-md ml-5">
            <FiX size={18} />
          </button>
        </div>
      )}
    </>
  );
};

export default TokenGenerator;
