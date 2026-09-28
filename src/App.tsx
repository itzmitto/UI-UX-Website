import { Navigate, Route, Routes } from "react-router-dom";
import Layout from "./components/layout/Layout";
import Components from "./pages/Components";

function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path="/" element={<Navigate to="/components" replace />} />

        <Route path="/components" element={<Components />} />

        <Route path="/components/:category" element={<Components />} />
      </Route>
    </Routes>
  );
}

export default App;
