import { j as jsxRuntimeExports } from "./vendor.bin";
import { useState } from "react";
import { View, Text, Image } from "@tarojs/components";
const comp = { "text": "comp-module__text___4x06V" };
const style = { "index": "index-module__index___En5-J" };
function Index() {
  const [tips, setTips] = useState("hello world");
  const handleClick = () => {
    setTips("hhhhhhhhhh");
  };
  return /* @__PURE__ */ jsxRuntimeExports.jsxs(View, { className: style["index"], onClick: handleClick, children: [
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: comp["text"], children: tips }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Text, { className: comp["text"], children: "text" }),
    /* @__PURE__ */ jsxRuntimeExports.jsx(Image, { style: { width: "100px", height: "100px" }, className: style["img"], src: "https://img11.360buyimg.com/n1/jfs/t1/190488/32/45628/700409/6645a5faFe1cdefec/8fa9d8a97c7ad850.png" })
  ] });
}
var demo_default = Index;
export {
  Index,
  demo_default as default
};
//# sourceMappingURL=index.js.map
