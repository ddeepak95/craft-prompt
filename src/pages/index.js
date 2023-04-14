import Head from "next/head";
import { Inter } from "next/font/google";
import styles from "@/styles/Home.module.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { Col, Container, Row } from "react-bootstrap";
import { useState } from "react";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const [generatedText, setGeneratedText] = useState("Testing");

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
    setGeneratedText(openAIResponseData.data);
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
        <Container>
          <Row className="text-center mt-4">
            <Col>
              <h2>Craft Prompt</h2>
              <button
                onClick={() => {
                  callOpenAIGPT("Tell me about IPL");
                }}
              >
                Testing 2
              </button>
            </Col>
            <Col>
              <p>{generatedText}</p>
            </Col>
          </Row>
        </Container>
      </main>
    </>
  );
}
