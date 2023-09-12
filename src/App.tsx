import {
  BrowserRouter,
  Routes,
  Route,
  redirectDocument,
} from "react-router-dom";
import Dashboard from "./views/Dashboard";
import PrivateRoute from "./components/PrivateRoute";
import Login from "./views/Login";
import "./App.css";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" loader={() => redirectDocument("/dashboard")} />
        <Route path="/login" element={<Login />} />
        <Route
          index
          path="/dashboard"
          element={
            <PrivateRoute>
              <Dashboard />
            </PrivateRoute>
          }
        />
        <Route path="*" element={<div>404 Not Found</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
