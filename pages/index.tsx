import { Fragment, useState } from "react";
import JSONPretty from "react-json-pretty";
import "react-json-pretty/themes/monikai.css";
import axios from "axios";
import { FiArrowUpRight, FiClipboard, FiCode, FiHardDrive } from "react-icons/fi";
import Instructions from "../components/Instructions";
import HTMLHead from "../components/Head";
import MessagePopup from "../components/MessagePopup";

export default function Main() {
  const [token, setToken] = useState("");
  const [tokenValidated, setTokenValidated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hideCheckbox, setHideCheckbox] = useState(true);
  const [message, setMessage] = useState("");
  const [data, setData] = useState("");
  const [editable, setEditable] = useState(true);
  const [isEditable, setIsEditable] = useState(true);
  const [currTab, setCurrTab] = useState("instructions");

  async function generateToken() {
    try {
      setLoading(true);
      const res: any = axios.post("/api/generateToken");
      setToken(res.data.token);
      setTokenValidated(true);
      setLoading(false);
      setCurrTab("data-edit");
      setMessage("Successfully generated a token.");
      setHideCheckbox(false);
      setData("");
    } catch (err: any) {
      setMessage(`Error. ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  async function validateTokenAndGetData() {
    try {
      setLoading(true);
      const res = await axios.post("/api/getTokenData", { token });
      setTokenValidated(true);
      setData(res.data.data);
      setHideCheckbox(true);
      setCurrTab("data-edit");
      setIsEditable(res.data.editable);
      setLoading(false);
    } catch (err: any) {
      if (err.response.data.message === "Invalid Token") {
        setToken("");
        setMessage("Error. Invalid Token");
        setTokenValidated(false);
      }
    } finally {
      setLoading(false);
    }
  }

  async function addData() {
    try {
      setLoading(true);
      await axios.post("/api/addData", { key: token, data: data, editable });
      setMessage("Data updated successfully. You can access it via API.");
      setLoading(false);
    } catch (err: any) {
      setMessage(`Error. ${err.message}`);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <HTMLHead />

      <div className="shadow-0 lg:shadow-md bg-white my-5 border-0 md:border rounded-0 lg:rounded-md lg:min-h-[94vh] w-[85%] md:w-[75%] lg:w-[85%] mx-auto flex flex-col lg:flex-row justify-center gap-12 lg:gap-0">
        {/* left side */}
        <section className="w-full lg:w-[40%] px-0 md:px-5 lg:px-8 border-0 lg:border-r">
          <div className="pt-6 pb-8 my-5">
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
                className="rounded-md text-sm shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
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
                  className="rounded-md w-4 h-4 bg-gray-100 rounded border-gray-300"
                />
                <label htmlFor="checked-checkbox" className="ml-2 text-sm font-medium ">
                  Editable next time
                </label>
              </div>
            )}

            <div className="flex flex-col gap-3 mt-10 items-center justify-between">
              <button
                disabled={loading || tokenValidated || token.trim().length < 1}
                className="rounded-md disabled:bg-blue-400 bg-blue-500 text-white p-2 text-sm w-full flex items-center gap-2 justify-center"
                onClick={validateTokenAndGetData}
              >
                <FiArrowUpRight /> Submit
              </button>
              <button
                disabled={loading}
                className="rounded-md disabled:bg-blue-400 bg-blue-500 text-white p-2 text-sm w-full flex items-center gap-2 justify-center"
                onClick={generateToken}
              >
                <FiCode /> Generate new token
              </button>
            </div>
          </div>

          <p className="text-gray-500 text-xs">&copy;2024 Robojson. All rights not reserved.</p>
        </section>

        {/* right side */}
        <section className={`w-full lg:w-[60%] px-0 md:px-5 lg:px-8`}>
          <div className="py-2 flex items-center gap-4">
            {tokenValidated && (
              <button
                disabled={currTab === "data-edit"}
                onClick={() => setCurrTab("data-edit")}
                className={`rounded-md text-sm font-bold opacity-50 ${currTab === "data-edit" && "opacity-100"}`}
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
              className={`rounded-md text-sm font-bold opacity-50 ${currTab === "instructions" && "opacity-100"}`}
            >
              Instructions
            </button>
          </div>

          {tokenValidated && isEditable && currTab === "data-edit" && (
            <Fragment>
              <textarea
                className="h-[300px] mt-3 text-sm border appearance-none  w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                value={data}
                placeholder="JSON or string"
                onChange={(e) => setData(e.target.value)}
              />

              <button
                disabled={!data.trim().length || loading}
                onClick={addData}
                className="rounded-md disabled:bg-blue-400 w-full mt-10 bg-blue-500 text-white  p-2 text-sm flex items-center gap-2 justify-center"
              >
                <FiHardDrive /> Update data
              </button>
            </Fragment>
          )}

          {currTab === "data-preview" && data.trim().length > 0 && <JSONPretty id="json-pretty" data={data} />}

          {currTab === "instructions" && <Instructions />}
        </section>
      </div>

      {message && <MessagePopup message={message} setMessage={setMessage} />}
    </>
  );
}
