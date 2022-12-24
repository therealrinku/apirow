import React, { useState } from "react";
import Head from "next/head";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import axios from "axios";

const TokenGenerator = () => {
  const [token, setToken] = useState("");
  const [tokenValidated, setTokenValidated] = useState(false);
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState("");

  const generateToken = () => {
    setLoading(true);
    axios
      .post("/api/generateToken")
      .then((res) => {
        setToken(res.data.token);
        setTokenValidated(true);
        setLoading(false);
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
        setData(JSON.parse(res.data.data));
        setLoading(false);
      })
      .catch((err) => {
        if (err.response.data.message === "Invalid Token") {
          setToken("");
          alert("Invalid TOken");
          setTokenValidated(false);
        }
        setLoading(false);
      });
  };

  const addData = () => {
    setLoading(true);
    axios
      .post("/api/addData", { key: token, data: JSON.stringify(data) })
      .then((res) => {
        alert("DAtA added . you can access it using your token. ");
        setLoading(false);
      })
      .catch((err) => {
        alert(err.message);
        setLoading(false);
      });
  };

  const isJson = (str: string) => {
    try {
      JSON.parse(str);
    } catch (e) {
      return false;
    }
    return true;
  };

  return (
    <>
      <Head>
        <title>Nerd Dev</title>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        <link href="https://fonts.googleapis.com/css2?family=PT+Sans&display=swap" rel="stylesheet" />
      </Head>

      <div className="container bg-slate-700 h-screen w-screen text-white mx-auto px-4 py-8">
        <h5 className="text-center my-10 text-2xl">Nerd Dev</h5>

        <div className="w-11/12 mt-10 mx-auto flex flex-col gap-10">
          <input
            type="text"
            value={token}
            onChange={(e) => {
              setToken(e.target.value);
              setTokenValidated(false);
            }}
            className="rounded-lg outline-none bg-inherit p-2 border-2 border-blue-500"
            placeholder="Submit your token here"
          />
          <div className="flex justify-between gap-10 items-center">
            <button
              disabled={loading || tokenValidated || token.trim().length < 1}
              className="bg-blue-500 rounded-lg p-2 w-2/4"
              onClick={validateTokenAndGetData}
            >
              Submit
            </button>
            <p className="w-1/4">Or</p>
            <button disabled={loading} className="bg-blue-500 rounded-lg p-2 w-1/4" onClick={generateToken}>
              Generate New Token
            </button>
          </div>
          {loading && <p>Processing.....</p>}
          {tokenValidated && (
            <textarea
              className="rounded-lg outline-none bg-inherit p-2 border-2 border-blue-500"
              value={data}
              placeholder="JSON or string"
              onChange={(e) => setData(e.target.value)}
            />
          )}
          <button
            disabled={!data.trim().length || loading}
            className="bg-blue-500 rounded-lg p-2 w-1/4"
            onClick={addData}
          >
            Add/Update Data
          </button>
          <JSONPretty id="json-pretty" data={data} />
          <p className="text-red-500">
            How to access data ? <br />
            Simply use /data route and pass authorization : BASIC ##your-token in your header <br /> and boom, you'll
            get your data
          </p>
        </div>
      </div>
    </>
  );
};

export default TokenGenerator;
