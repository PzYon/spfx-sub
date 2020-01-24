import * as React from "react";
import * as ReactDOM from "react-dom";
import { HelloFromSub } from "./components/HelloFromSub";

const bootstrapper = (spfxContext: any, element: HTMLDivElement) => {
  ReactDOM.render(<HelloFromSub />, element);
};

export default bootstrapper;
