import ReactDOM from "react-dom/client";
import App from "@app/client/app/App";
import "@app/client/types/declarations/index"
import { StrictMode } from "react";

const domNode = document.getElementById("root")!;
const root = ReactDOM.createRoot(domNode);

root.render(
	// <StrictMode>
		<App />
	// </StrictMode>,
);
