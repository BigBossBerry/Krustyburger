import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import NotFoundPage from "./pages/NotFoundPage.jsx";
import Carta from "./pages/Carta.jsx";
import Pedidos from "./pages/Pedidos.jsx";
import LoginClientes from "./pages/LoginClientes.jsx";
import Logout from "./pages/Logout.jsx";
import "./index.css";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <NotFoundPage />,
  },
  {
    path: "/carta",
    element: <Carta />,
  },
  {
    path: "/pedidos",
    element: <Pedidos />,
  },
  {
    path: "/clientes/login",
    element: <LoginClientes />,
  },
  {
    path: "/clientes/logout",
    element: <Logout />,
  },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);