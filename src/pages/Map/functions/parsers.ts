import { ReactNode } from "react";
import ReactDOM from "react-dom/client";

export const createRoots = (children: ReactNode): HTMLDivElement => {
	const el = document.createElement("div");
	const root = ReactDOM.createRoot(el);
	root.render(children)
	return el;
}

export const createRootsDynamic = (): [HTMLDivElement, ReactDOM.Root] => {
	const el = document.createElement("div");
	const root = ReactDOM.createRoot(el);
	return [el, root];
}

