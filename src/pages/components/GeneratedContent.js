export const GeneratedContent = (props) => {
  console.log(props.generatedText);
  return (
    <div>
      {props.generatedText
        .slice(0)
        .reverse()
        .map((item, i) => {
          return (
            <div key={i}>
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
