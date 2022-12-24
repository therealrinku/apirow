import React, { useState } from "react";
import Head from "next/head";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import axios from "axios";
import { FiClipboard, FiInfo, FiLayers, FiPlus, FiSun, FiTerminal, FiX } from "react-icons/fi";

const TokenGenerator = () => {
  const [token, setToken] = useState("");
  const [tokenValidated, setTokenValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const [message, setMessage] = useState("");

  const [data, setData] = useState("");

  const generateToken = () => {
    setLoading(true);
    axios
      .post("/api/generateToken")
      .then((res) => {
        setToken(res.data.token);
        setTokenValidated(true);
        setLoading(false);
        setData("");
      })
      .catch((err) => {
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
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.data.message === "Invalid Token") {
          setToken("");
          setMessage("Invalid Token");
          setTokenValidated(false);
        }
        setLoading(false);
      });
  };

  const addData = () => {
    setLoading(true);
    axios
      .post("/api/addData", { key: token, data: data })
      .then((res) => {
        setMessage("Data/edited added successfully. You can access it via REST API.");
        setLoading(false);
      })
      .catch((err) => {
        setMessage(err.message);
        setLoading(false);
      });
  };

  return (
    <>
      <Head>
        <title>Nerd Dev</title>
        <meta name="description" content="Developed by Nerd, for nerds" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans&display=swap" rel="stylesheet" />
        <link rel="shortcut icon" href="https://img.icons8.com/fluency/2x/nerd.png" />
      </Head>

      <div className="w-full max-w-md my-10 mx-auto">
        <div className="flex items-center gap-10 justify-between shadow  p-2">
          <p className="font-bold text-blue-500 text-lg">Nerd Dev</p>
          <button className="tooltip bg-white py-1 px-2  border rounded shadow hover:shadow-md">
            <FiInfo />
            <span className="tooltiptext bg-blue-500 shadow">
              <p className="text-sm">
                How to access data ? <br />
                Simply submit GET or POST request to{" "}
                <b className="underline text-red-200 d-flex">
                  https://nerdev-plum.vercel.app/api/data{" "}
                  <button
                    onClick={() => {
                      window.navigator.clipboard.writeText("https://nerdev-plum.vercel.app/api/data");
                      setMessage("Endpoint URL Copied");
                    }}
                    className="bg-blue-500 py-1 px-2 top-8 border rounded shadow right-2 hover:shadow-md"
                  >
                    <FiClipboard />
                  </button>
                </b>{" "}
                route and pass
                <p className="font-bold underline">authorization : BASIC {"<token>"}</p> in your header <br /> and boom,
                you'll get your data.
                <br />
                <span className="text-red-200 underline">
                  And Remember If you forgot your token , your data is gone forever.
                </span>
              </p>
            </span>
          </button>
        </div>
        {message && (
          <div
            className="relative flex my-5 items-center bg-blue-500 text-white text-sm font-bold px-4 py-3"
            role="alert"
          >
            <svg className="fill-current w-4 h-4 mr-2" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
              <path d="M12.432 0c1.34 0 2.01.912 2.01 1.957 0 1.305-1.164 2.512-2.679 2.512-1.269 0-2.009-.75-1.974-1.99C9.789 1.436 10.67 0 12.432 0zM8.309 20c-1.058 0-1.833-.652-1.093-3.524l1.214-5.092c.211-.814.246-1.141 0-1.141-.317 0-1.689.562-2.502 1.117l-.528-.88c2.572-2.186 5.531-3.467 6.801-3.467 1.057 0 1.233 1.273.705 3.23l-1.391 5.352c-.246.945-.141 1.271.106 1.271.317 0 1.357-.392 2.379-1.207l.6.814C12.098 19.02 9.365 20 8.309 20z" />
            </svg>
            <p>{message}</p>
            <button onClick={() => setMessage("")} className="text-md absolute right-2 top-4">
              <FiX />
            </button>
          </div>
        )}
        <div className="bg-white shadow-md rounded px-8 pt-6 pb-8 my-5">
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
                className="absolute bg-white py-1 px-2 top-8 border rounded shadow right-2 hover:shadow-md"
              >
                <FiClipboard />
              </button>
            )}
          </div>

          <div className="flex flex-col gap-3 mt-5 items-center justify-between">
            <button
              disabled={loading || tokenValidated || token.trim().length < 1}
              className="disabled:bg-blue-400 bg-blue-500 text-white rounded p-2 text-sm w-full"
              onClick={validateTokenAndGetData}
            >
              Submit
            </button>
            <button
              disabled={loading}
              className="disabled:bg-blue-400 bg-blue-500 text-white rounded p-2 text-sm w-full flex items-center gap-2 justify-center"
              onClick={generateToken}
            >
              <FiTerminal /> Generate New Token
            </button>
          </div>

          {tokenValidated && (
            <textarea
              className="h-48 mt-5 shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
              value={data}
              placeholder="JSON or string"
              onChange={(e) => setData(e.target.value)}
            />
          )}

          {data.trim().length > 0 && (
            <div className="mt-10">
              <h5 className="block text-gray-700 text-sm font-bold mb-2">Data Visualization</h5>
              <JSONPretty id="json-pretty" data={data} />
            </div>
          )}

          {tokenValidated && (
            <button
              disabled={!data.trim().length || loading}
              onClick={addData}
              className="disabled:bg-blue-400  mt-5 bg-blue-500 text-white rounded p-2 text-sm w-full flex items-center gap-2 justify-center"
            >
              <FiLayers /> Add/Update Data
            </button>
          )}
        </div>

        <p className="text-center text-gray-500 text-xs">
          &copy;2022 NERD DEV . Developed by just another nerd developer.
        </p>
      </div>
    </>
  );
};

export default TokenGenerator;
