import { useEffect, useState } from "react";
import "./App.css";
import { useDispatch } from "react-redux";
import { Outlet } from "react-router-dom";
import { login, logout } from "./store/authslice";
import Footer from "./components/Footer/Footer";
import authService from "./services/authService";
import Header from "./components/Header/Header";
function App() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    authService
      .getCurrentUser()
      .then((userData) => {
        if (userData) {
          dispatch(login({ userData }));
        } else {
          dispatch(logout());
        }
      })
      .finally(() => setLoading(false));
  }, []);

  if (loading) return null;

  return (
    <div className="min-h-screen flex flex-col bg-amber-200">
      <Header />
      <main className="flex-1 p-4">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}

export default App;
