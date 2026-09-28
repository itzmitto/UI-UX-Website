import { Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import { ComponentLibraryProvider } from "./context/ComponentLibraryContext";
import { ThemeProvider } from "./context/ThemeContext";
import Components from "./pages/Components";
import Home from "./pages/Home";
import Installation from "./pages/Installation";
import Introduction from "./pages/Introduction";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <ThemeProvider>
      <ComponentLibraryProvider>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={<Home />} />

            <Route path="/docs/introduction" element={<Introduction />} />

            <Route path="/docs/installation" element={<Installation />} />

            <Route path="/components" element={<Components />} />

            <Route path="/components/:category" element={<Components />} />

            <Route path="*" element={<NotFound />} />
          </Route>
        </Routes>
      </ComponentLibraryProvider>
    </ThemeProvider>
  );
}

export default App;
