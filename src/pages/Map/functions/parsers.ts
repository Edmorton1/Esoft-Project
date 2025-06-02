import ReactDOM from "react-dom/client";

const createRoots = (): [HTMLDivElement, ReactDOM.Root] => {
	const el = document.createElement("div");
	const root = ReactDOM.createRoot(el);
	return [el, root];
}

export default createRoots
