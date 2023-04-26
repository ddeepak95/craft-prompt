import { useEffect, useState } from "react";
import ReactDiffViewer, { DiffMethod } from "react-diff-viewer-continued";

export default function Compare() {
  const [content, setContent] = useState([]);
  const [dataIndex1, setDataIndex1] = useState(0);
  const [dataIndex2, setDataIndex2] = useState(0);
  useEffect(() => {
    setContent(
      JSON.parse(localStorage.getItem("craftResponses")) != undefined &&
        JSON.parse(localStorage.getItem("craftResponses"))
    );
  }, []);
  useEffect(() => {
    if (content.length > 1) {
      setDataIndex1(content.length - 2);
      setDataIndex2(content.length - 1);
    }
  }, [content]);
  return (
    <>
      <div className="container">
        <h2>Compare & Reflect</h2>
        {content.length > 1 && (
          <>
            <div className="row">
              <div className="col">
                <button
                  onClick={() => {
                    setDataIndex1(dataIndex1 - 1);
                  }}
                  disabled={dataIndex1 === 0 ? true : false}
                >
                  Prev
                </button>
                <button
                  onClick={() => {
                    setDataIndex1(dataIndex1 + 1);
                  }}
                  disabled={dataIndex1 === content.length - 1 ? true : false}
                >
                  Next
                </button>
                <h4>Iteration {dataIndex1 + 1}</h4>
              </div>
              <div className="col">
                <button
                  onClick={() => {
                    setDataIndex2(dataIndex2 - 1);
                  }}
                  disabled={dataIndex2 === 0 ? true : false}
                >
                  Prev
                </button>
                <button
                  onClick={() => {
                    setDataIndex2(dataIndex2 + 1);
                  }}
                  disabled={dataIndex2 === content.length - 1 ? true : false}
                >
                  Next
                </button>
                <h4>Iteration {dataIndex2 + 1}</h4>
              </div>
            </div>
            <div>
              <ReactDiffViewer
                oldValue={content[dataIndex1].prompt}
                newValue={content[dataIndex2].prompt}
                splitView={true}
                hideLineNumbers={true}
                compareMethod={DiffMethod.WORDS}
              />
            </div>
            <div className="row">
              <div className="col">
                <p className="gptResponseContent white-space-pre-wrap">
                  {content[dataIndex1].generatedContent.data}
                </p>
              </div>
              <div className="col">
                <p className="gptResponseContent white-space-pre-wrap">
                  {content[dataIndex2].generatedContent.data}
                </p>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
}
