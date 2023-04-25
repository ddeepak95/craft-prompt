import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import { useEffect, useState } from "react";
import parse from "html-react-parser";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer-continued";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [generatedText, setGeneratedText] = useState([]);

  async function callOpenAIGPT4(prompt) {
    let openAIResponse = await fetch("/api/openAIGPT4", {
      method: "POST",
      body: prompt,
    });
    let openAIResponseData = await openAIResponse.json();
    console.log(openAIResponseData.data.content);
  }

  async function callOpenAIGPT(prompt) {
    let openAIResponse = await fetch("/api/openAI", {
      method: "POST",
      body: prompt,
    });
    let openAIResponseData = await openAIResponse.json();
    setGeneratedText([
      ...generatedText,
      {
        prompt: prompt,
        generatedContent: openAIResponseData,
      },
    ]);
  }

  useEffect(() => {
    setGeneratedText(
      JSON.parse(localStorage.getItem("craftResponses")) != undefined &&
        JSON.parse(localStorage.getItem("craftResponses"))
    );
  }, []);

  useEffect(() => {
    console.log(generatedText);
    if (generatedText.length > 0) {
      localStorage.setItem("craftResponses", JSON.stringify(generatedText));
    }
  }, [generatedText]);

  function getChildrenValue() {
    const myElement = document.getElementById("promptText");
    let prompt = "";
    for (const child of myElement.children) {
      if (child.innerText != "") {
        prompt += child.innerText + " ";
      } else {
        alert("Not all boxes are filled");
        return;
      }
    }
    console.log(prompt);
    callOpenAIGPT(prompt);
  }

  return (
    <>
      <Head>
        <title>CRAFT Prompt</title>
        <meta name="description" content="Learn Prompting With CRAFT" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className={styles.main}>
        <div className="container-fluid">
          <div className="row mt-4">
            <div className="col text-center bg-light">
              <h2>Craft Prompt</h2>
              <div
                id="promptContainer"
                className="d-flex flex-wrap prompt-container"
              >
                <p id="promptText" className="wrap-anywhere">
                  <FixedText text="In"></FixedText>
                  <VariableText hint="quantifier"></VariableText>
                  <FixedText text="than"></FixedText>
                  <VariableText hint="number"></VariableText>
                  <FixedText text="words, write a"></FixedText>
                  <VariableText hint="text"></VariableText>
                  <FixedText text="to"></FixedText>
                  <VariableText hint="who"></VariableText>
                  <FixedText text="about"></FixedText>
                  <VariableText hint="issue"></VariableText>
                  <FixedText text="in the voice of"></FixedText>
                  <VariableText hint="who"></VariableText>
                </p>
              </div>
              <button
                className="btn btn-primary"
                onClick={() => {
                  getChildrenValue();
                }}
              >
                Generate
              </button>
            </div>
            <div className="col">
              <a className="btn btn-primary" href="compare">
                Compare & Reflect
              </a>
              <GeneratedContent
                generatedText={generatedText}
              ></GeneratedContent>
            </div>
          </div>
        </div>
      </main>
    </>
  );
}

const FixedText = (props) => {
  return (
    <>
      <span>{props.text}</span>
    </>
  );
};

const VariableText = (props) => {
  return (
    <>
      <span
        id="textBox"
        className="inputBox"
        type="textbox"
        style={{ minWidth: "100px", display: "inline-block" }}
        contentEditable
        onInput={(e) => {
          let minWidth = e.target.style.minWidth.slice(0, -2) * 1;
          let offsetWidth = e.target.offsetWidth;
          if (offsetWidth > minWidth) {
            e.target.style.display = null;
            e.target.style.lineHeight = "2em";
          } else if (offsetWidth < minWidth) {
            e.target.style.display = "inline-block";
            e.target.style.lineHeight = null;
          }
        }}
      ></span>
    </>
  );
};

const GeneratedContent = (props) => {
  console.log(props.generatedText);
  return (
    <div>
      {props.generatedText
        .slice(0)
        .reverse()
        .map((item, i) => {
          return (
            <div>
              <h4>Iteration {props.generatedText.length - i}</h4>
              <strong>{item.prompt}</strong>
              <p className="white-space-pre-wrap">
                {item.generatedContent.data}
              </p>
              <hr />
            </div>
          );
        })}
    </div>
  );
};
