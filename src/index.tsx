import ReactDOM from "react-dom/client";
import App from "@/app/App";
import { StrictMode } from "react";

const domNode = document.getElementById("root")!;
const root = ReactDOM.createRoot(domNode);

root.render(
	// <StrictMode>
		<App />
	// </StrictMode>,
);
