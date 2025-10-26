import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Select, { useStateManager } from "react-select";
import { BsStars } from "react-icons/bs";
import { LuCodeXml } from "react-icons/lu";
import Editor from "@monaco-editor/react";
import { BiSolidCopy } from "react-icons/bi";
import { PiExportDuotone } from "react-icons/pi";
import { ImNewTab } from "react-icons/im";
import { LuRefreshCw } from "react-icons/lu";
import { GoogleGenAI } from "@google/genai";
import { ClipLoader } from "react-spinners";
import { toast } from "react-toastify";
import { IoClose } from "react-icons/io5";

const Home = () => {
  const options = [
    { value: "html-css", label: "HTML + CSS" },
    { value: "html-tailwind", label: "HTML + Tailwind CSS" },
    { value: "html-bootstrap", label: "HTML + Bootstrap" },
    { value: "html-css-js", label: "HTML + CSS + JS" },
    { value: "html-tailwind-bootstrap", label: "HTML + Tailwind + Bootstrap" },
  ];

  const [outputScreen, setOutputScreen] = useState(false);
  const [tab, setTab] = useState(1);
  const [prompt, setPrompt] = useState("");
  const [framework, setFramework] = useState(options[0]);
  const [code, setCode] = useState("");
  const [loading, setLoading] = useState(false);
  const [isNewTabOpen, setisNewTabOpen] = useState(false);

  function extractCode(response) {
    const match = response.match(/```(?:\w+)?\n?([\s\s]*?)```/);
    return match ? match[1].trim() : response.trim();
  }

  // The client gets the API key from the environment variable `GEMINI_API_KEY`.
  const ai = new GoogleGenAI({
    apiKey: "AIzaSyDObcaHvMB4CoxH3fl0rPJG2vXu1yjCahQ",
  });
  async function getResponse() {
    setLoading(true);
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: `
      ✨Gemini-Prompt: "
 You are an experienced programmer with expertise in web development and UI/UX design. You create modern, animated, and fully responsive UI components. You are highly skilled in HTML, CSS, Tailwind CSS, Bootstrap, JavaScript, React, Next.js, Vue.js, Angular, and more.

Now, generate a UI component for: ${prompt}  
Framework to use: ${framework.value}  

Requirements:  
The code must be clean, well-structured, and easy to understand.  
Optimize for SEO where applicable.  
Focus on creating a modern, animated, and responsive UI design.  
Include high-quality hover effects, shadows, animations, colors, and typography.  
Return ONLY the code, formatted properly in **Markdown fenced code blocks**.  
Do NOT include explanations, text, comments, or anything else besides the code.  
And give the whole code in a single HTML file.
      
      `,
    });
    console.log(response.text);
    setCode(extractCode(response.text));
    setOutputScreen(true);
    setLoading(false);
  }

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(code);
      toast.success("Code copied successfully");
    } catch (err) {
      console.error("Failed to copy: ", err);
      toast.error("Failed to copy");
    }
  };

  const downloadFile = () => {
    const fileName = "GenUI-Code.html";
    const blob = new Blob([code], { type: "text/plain" });
    let url = new URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = fileName;
    link.click();
    URL.revokeObjectURL(url);
    toast.success("File downloaded successfully");
  };

  return (
    <>
      <Navbar />

      <div className="flex items-center px-[100px] justify-between gap-[30px]">
        <div className="left w-[50%] h-[auto] py-[30px] rounded-xl bg-[#141319] mt-5 p-[20px]">
          <h3 className="text-[30px] font-semibold sp-text bg-purple-500">
            AI Component Generator
          </h3>
          <p className="text-[gray] mt-2 text-[16px]">
            Describe what you want to create and let AI code it for you.
          </p>

          <p className="text-[15px] font-[700] mt-4">Select the Framework</p>

          <Select
            className="mt-2"
            options={options}
            styles={{
              control: (base, state) => ({
                ...base,
                backgroundColor: "rgba(30, 30, 30, 0.6)", // transparent dark
                backdropFilter: "blur(8px)", // glass effect
                borderColor: state.isFocused ? "#7c3aed" : "#333", // purple focus border
                color: "#fff",
                boxShadow: state.isFocused ? "0 0 0 1px #7c3aed" : "none",
                "&:hover": { borderColor: "#7c3aed" },
                borderRadius: "8px",
                minHeight: "40px",
              }),
              menu: (base) => ({
                ...base,
                backgroundColor: "rgba(20, 20, 20, 0.9)",
                backdropFilter: "blur(8px)",
                borderRadius: "8px",
                overflow: "hidden",
                marginTop: "4px",
              }),
              option: (base, state) => ({
                ...base,
                backgroundColor: state.isSelected
                  ? "rgba(124, 58, 237, 0.6)" // purple when selected
                  : state.isFocused
                  ? "rgba(60, 60, 60, 0.7)"
                  : "transparent",
                color: "#fff",
                cursor: "pointer",
                transition: "all 0.2s ease",
                "&:active": { backgroundColor: "rgba(124, 58, 237, 0.8)" },
              }),
              singleValue: (base) => ({
                ...base,
                color: "#fff",
              }),
              placeholder: (base) => ({
                ...base,
                color: "#aaa",
              }),
              input: (base) => ({
                ...base,
                color: "#fff",
              }),
              dropdownIndicator: (base) => ({
                ...base,
                color: "#aaa",
                "&:hover": { color: "#fff" },
              }),
              indicatorSeparator: () => ({
                display: "none",
              }),
              clearIndicator: (base) => ({
                ...base,
                color: "#aaa",
                "&:hover": { color: "#fff" },
              }),
            }}
            onChange={(e) => {
              setFramework(e.value);
            }}
          />
          <p className="text-[15px] font-[700] mt-5">Describe your Component</p>
          <textarea
            onChange={(e) => {
              setPrompt(e.target.value);
            }}
            value={prompt}
            className="w-full min-h-[200px] rounded-xl bg-[#09090B] mt-3 p-[10px]"
            placeholder="Write your prompt here..."
          ></textarea>
          <div className="flex items-center justify-between">
            <p className="text-[gray]">
              Click on generate button to generate your code.
            </p>
            <button
              // disabled={}
              onClick={getResponse}
              className="generate flex items-center p-[15px] rounded-lg border-0 bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600 mt-3 gap-[10px] px-[20px] transition-all hover:opacity-[.8]"
            >
              {loading === false ? (
                <>
                  <i>
                    <BsStars />
                  </i>
                </>
          
              ) : (
                ""
              )}
              {loading === true ? (
                <>
                  <ClipLoader className="ml-2" color="#ffffff" size={20} />
                </>
              ) : (
                ""
              )}
              Generate
            </button>
          </div>
        </div>
        <div className="right mt-2 relative w-[50%] h-[80vh] bg-[#141319] rounded-xl">
          {outputScreen === false ? (
            <>
              <div className="skeleton w-full h-full flex items-center flex-col justify-center">
                <div className="circle p-[20px] w-[70px] h-[70px] rounded-[50%] flex items-center justify-center text-[30px] bg-gradient-to-r from-purple-600 via-purple-500 to-pink-600">
                  <LuCodeXml />
                </div>
                <p className="text-[20px] text-[gray] mt-3">
                  Your Component and Code will appear here.
                </p>
              </div>
            </>
          ) : (
            <>
              <div className="top w-full h-[60px] bg-[#17171C] flex items-center gap-[15px] px-[20px]">
                <button
                  onClick={() => {
                    setTab(1);
                  }}
                  className={`btn w-[50%] p-[10px] rounded-xl cursor-pointer transition-all ${
                    tab === 1 ? "bg-purple-500" : ""
                  }`}
                >
                  Code
                </button>
                <button
                  onClick={() => {
                    setTab(2);
                  }}
                  className={`btn w-[50%] p-[10px] rounded-xl cursor-pointer transition-all ${
                    tab === 2 ? "bg-purple-500" : ""
                  }`}
                >
                  Preview
                </button>
              </div>
              <div className="top-2  w-full h-[60px] bg-[#17171C] flex items-center justify-between gap-[15px] px-[20px]">
                <div className="left">
                  <p className="font-bold">Code Editor</p>
                </div>
                <div className="right flex items-center gap-[10px]">
                  {tab === 1 ? (
                    <>
                      <button
                        className="copy w-10 h-10 rounded-xl border-[1px] border-zinc-800 flex items-center justify-center transition-all hover:bg-purple-500"
                        onClick={copyCode}
                      >
                        <BiSolidCopy />
                      </button>
                      
                    </>
                  ) : (
                    <>
                      <button
                        className="copy   w-10 h-10 rounded-xl border-[1px] border-zinc-800 flex items-center justify-center transition-all hover:bg-purple-500"
                        onClick={() => {
                          setisNewTabOpen(true);
                        }}
                      >
                        <ImNewTab />
                      </button>
                      
                    </>
                  )}
                </div>
              </div>
              <div className="editor h-full">
                {tab === 1 ? (
                  <>
                    <Editor
                      value={code}
                      className="rounded-xl"
                      height="100%"
                      theme="vs-dark"
                      Language="html"
                    />
                  </>
                ) : (
                  <>
                    <iframe
                      srcDoc={code}
                      className="preview w-full h-full bg-white text-black flex items-center justify-center"
                    ></iframe>
                  </>
                )}
              </div>
            </>
          )}
        </div>
      </div>
      {isNewTabOpen === true ? (
        <>
        <div className="container absolute left-0 top-0 right-0 bottom-0 bg-white w-screen min-h-screen overflow-auto">
          <div className="top-2  w-full h-[60px] bg-[#17171C] flex items-center justify-end gap-[15px] px-[20px]">
            <div className="left">
              <p className="font-bold">Preview</p>
               </div>
               <div className="right flex items-center gap-[10px]">
                  <button className="copy   w-10 h-10 rounded-xl border-[1px] border-zinc-800 flex items-center justify-center transition-all hover:bg-purple-500"onClick={()=> {setisNewTabOpen(false)}}><IoClose /></button>
               </div>
               </div>
        <iframe
            srcDoc={code}
            className="w-full h-full" 
          ></iframe>
        </div>
          
        </>
      ) : (
        ""
      )}
    </>
  );
};

export default Home;
