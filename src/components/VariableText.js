import { useState } from "react";
import { Tooltip } from "react-tooltip";
export const VariableText = (props) => {
  const [openTooltip, setOpenTooltip] = useState(null);
  const [tooltipFocus, setTooltipFocus] = useState(false);
  return (
    <>
      <span
        id="textBox"
        className="inputBox"
        data-tooltip-id={props.id + "-tooltip"}
        data-tooltip-content={props.hint}
        tooltip-focussed="no"
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
        onFocus={(e) => {
          setOpenTooltip(true);
          setTooltipFocus(true);
          e.target.setAttribute("tooltip-focussed", "yes");
        }}
        onMouseEnter={(e) => {
          let focusCheck = e.target.getAttribute("tooltip-focussed");
          if (focusCheck === "no") {
            setOpenTooltip(true);
          }
        }}
        onMouseLeave={(e) => {
          let focusCheck = e.target.getAttribute("tooltip-focussed");
          if (focusCheck === "no") {
            setOpenTooltip(null);
          }
        }}
        onBlur={(e) => {
          setOpenTooltip(null);
          setTooltipFocus(false);
          e.target.setAttribute("tooltip-focussed", "no");
        }}
      ></span>
      <small>
        <Tooltip
          isOpen={openTooltip}
          style={{
            fontSize: "0.8em",
            backgroundColor: tooltipFocus ? "black" : "grey",
          }}
          id={props.id + "-tooltip"}
          clickable={true}
        />
      </small>
    </>
  );
};
