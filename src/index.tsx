import {StrictMode} from "react";
import ReactDOM from "react-dom/client";
import App from "@/app/App";
import { queryClient } from "@/shared/stores/ReactQuery";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { QueryClientProvider } from "@tanstack/react-query";

const domNode = document.getElementById("root")!;
const root = ReactDOM.createRoot(domNode);

root.render(
	// <StrictMode>
    <QueryClientProvider client={queryClient}>
	    <App />
      <ReactQueryDevtools initialIsOpen={false} />
    </QueryClientProvider>
	// </StrictMode>
);
