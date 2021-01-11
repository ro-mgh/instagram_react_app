const textField = {
  border: "1px solid rgba(var(--ca6,219,219,219),1)",
  "border-radius": "3px",
  background: "rgba(var(--b3f,250,250,250),1)",
  color: "rgba(var(--i1d,38,38,38),1)",
  font: "400 13.3333px Arial",
  "flex-direction": "row",
  "font-size": "14px",
  position: "relative",
  width: "100%",
};

const inputLabel = {
  // padding: "14px 0 2px 8px",
  width: "100%",
  display: "flex",
  height: "36px",
  flex: "1 0 0",
  // color: "rgba(var(--f52,142,142,142),1)",
  "font-size": "12px",
  left: "8px",
  "line-height": "36px",
  overflow: "hidden",
  "pointer-events": "none",
  position: "absolute",
  right: "0",
  "text-overflow": "ellipsis",
  "user-select": "none",
  "white-space": "nowrap",
};

const buttonSubmit = {
  "background-color": "rgba(var(--d69,0,149,246),.3)",
  opacity: "1",
  border: "1px solid transparent",
  "border-radius": "4px",
  color: "rgba(var(--eca,255,255,255),1)",
  position: "relative",
  cursor: "pointer",
  display: "block",
  "font-weight": "600",
  padding: "5px 9px",
  "text-align": "center",
  "text-transform": "inherit",
  "text-overflow": "ellipsis",
  "font-family":
    "-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif",
  "font-size": "14px",
  "line-height": "18px",
  width: "100%",
};

export { textField, buttonSubmit, inputLabel };
