import ReactDOM from "react-dom/client";
import App from "./view/App.tsx";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import AlertProvider from "./view/contexts/AlertProvider.tsx";
import EasyWebtoonProvider from "./view/contexts/EasyWebtoonProvider.tsx";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <>
    {/* <React.StrictMode> */}
    <EasyWebtoonProvider>
      <AlertProvider>
        <BrowserRouter>
          <Routes>
            <Route path='/' element={<App />} />
          </Routes>
        </BrowserRouter>
      </AlertProvider>
    </EasyWebtoonProvider>
    {/* </React.StrictMode> */}
  </>
);
