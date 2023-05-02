import Head from "next/head";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import { FixedText } from "../components/FixedText";
import { VariableText } from "../components/VariableText";
import { GeneratedContent } from "../components/GeneratedContent";
import { Loader } from "../components/Loader";
import Swal from "sweetalert2";
import { Introduction } from "../components/Introduction";
import { Tooltip } from "react-tooltip";

export default function Home() {
  const [generatedText, setGeneratedText] = useState([]);
  const [loader, setLoader] = useState(false);

  async function callOpenAIGPT(prompt) {
    try {
      let openAIResponse = await fetch("/api/openAI", {
        method: "POST",
        body: prompt,
      });
      if (openAIResponse.status !== 200) {
        throw (
          data.error ||
          new Error(`Request failed with status ${response.status}`)
        );
      }
      let openAIResponseData = await openAIResponse.json();
      return openAIResponseData;
    } catch (error) {
      // Consider implementing your own error handling logic here
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.message,
      });
    }
  }

  useEffect(() => {
    JSON.parse(localStorage.getItem("craftResponses")) != null &&
      setGeneratedText(JSON.parse(localStorage.getItem("craftResponses")));
  }, []);

  useEffect(() => {
    if (generatedText.length > 0) {
      localStorage.setItem("craftResponses", JSON.stringify(generatedText));
    }
  }, [generatedText]);

  function getChildrenValue() {
    const myElement = document.getElementById("promptText");
    let prompt = "";
    for (const child of myElement.children) {
      console.log(child.nodeName);
      if (child.nodeName === "SPAN") {
        if (child.innerText != "") {
          prompt += child.innerText + " ";
        } else {
          return false;
        }
      }
    }
    console.log(prompt);
    return prompt;
  }

  function generateWithAI() {
    let prompt = getChildrenValue();
    if (prompt === false) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: "Looks like you have not filled all the blanks!",
      });
      return;
    }
    setLoader(true);
    let openAIResponseData = callOpenAIGPT(prompt);
    openAIResponseData.then((data) => {
      setGeneratedText((generatedText) => [
        ...generatedText,
        {
          prompt: prompt,
          generatedContent: data,
        },
      ]);
      setLoader(false);
    });
  }

  function clearContentFromMemory() {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, clear it!",
    }).then((result) => {
      if (result.isConfirmed) {
        setGeneratedText([]);
        localStorage.setItem("craftResponses", JSON.stringify([]));
        Swal.fire("Cleared!", "Data has been cleared successfully.", "success");
      }
    });
  }

  return (
    <>
      <Head>
        <title>Prompty by CRAFT | Stanford</title>
        <meta name="description" content="Learn Prompting With CRAFT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className="container-fluid min-vh-100">
          <div className="row">
            <div className="col p-0 vh-100 text-center ">
              <div className="p-5 vh-100 position-fixed w-50 bg-light">
                <h2>Prompty</h2>
                <h4 className="mt-3 mb-5 p-3">
                  Write a letter to the Mayor regarding the issue with poor
                  sanitation at your neighbourhood.
                </h4>
                <div
                  id="promptContainer"
                  className="d-flex flex-wrap prompt-container"
                >
                  <p id="promptText" className="wrap-anywhere">
                    <FixedText text="In"></FixedText>
                    <VariableText id={1} hint="less/more"></VariableText>
                    <FixedText text="than"></FixedText>
                    <VariableText id={2} hint="number"></VariableText>
                    <FixedText text="words, write a"></FixedText>
                    <VariableText id={3} hint="text"></VariableText>
                    <FixedText text="to"></FixedText>
                    <VariableText id={4} hint="who"></VariableText>
                    <FixedText text="about"></FixedText>
                    <VariableText id={5} hint="message"></VariableText>
                    <FixedText text="in the tone of"></FixedText>
                    <VariableText id={6} hint="who"></VariableText>
                  </p>
                </div>
                <button
                  className="mt-3 btn btn-lg btn-primary"
                  onClick={() => {
                    generateWithAI();
                  }}
                  disabled={loader ? true : false}
                >
                  Generate With AI
                </button>
                {loader && <Loader />}
              </div>
            </div>
            <div className="col p-0 float-end">
              {generatedText.length > 0 ? (
                <>
                  <div
                    style={{ backgroundColor: "#00548f" }}
                    className="sticky-top py-2 mb-3 w-100 text-center"
                  >
                    <button
                      onClick={() => {
                        window.open("compare", "_self");
                      }}
                      className="btn m-2 btn-light"
                      disabled={generatedText.length > 2 ? false : true}
                    >
                      Compare & Reflect
                    </button>
                    <button
                      onClick={() => {
                        clearContentFromMemory();
                      }}
                      className="btn btn-light"
                      disabled={generatedText.length > 0 ? false : true}
                    >
                      Clear Data
                    </button>
                  </div>
                  <div className="px-4">
                    <GeneratedContent
                      generatedText={generatedText}
                    ></GeneratedContent>
                  </div>
                </>
              ) : (
                <>
                  <Introduction />
                </>
              )}
            </div>

            <Tooltip
              style={{
                fontSize: "0.8em",
                position: "fixed",
              }}
              id={"tooltip"}
              clickable={true}
            />
          </div>
        </div>
      </main>
    </>
  );
}
