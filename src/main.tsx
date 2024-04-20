import ReactDOM from "react-dom/client";
import App from "./view/App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AlertProvider from "./view/contexts/AlertProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    {/* <React.StrictMode> */}
    <AlertProvider>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<App />} />
        </Routes>
      </BrowserRouter>
    </AlertProvider>
    {/* </React.StrictMode> */}
  </>
);
