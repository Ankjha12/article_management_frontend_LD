import { BrowserRouter, Navigate, Route, Routes, useLocation, useNavigate } from "react-router-dom";
import "./App.css";
import { Provider } from "react-redux";
import { store } from "./redux/store";
import LoginPage from "./pages/Auth/Login";
import SignUpPage from "./pages/Auth/Signup";
import Home from "./pages/Home/HomePage";
import PrivateRoute from "./Routes/PrivateRoutes";
import Navbar from "./components/Navbar/Navbar";
import { Container } from "@material-ui/core";
import NotFound from "./components/NotFound";
import React from "react";
import { jwtDecode } from "jwt-decode";

function App() {
  const location = useLocation();
  const navigate = useNavigate()


  React.useEffect(() => {
    const token = localStorage.getItem("token")

    //jwt authentication will go here
    if (token) {
      const decodedToken: any =  jwtDecode(token);
      console.log('cecking decoded token', decodedToken, decodedToken?.exp)

      if (decodedToken?.exp * 1000 < new Date().getTime()) {
        logout();
      } 
    }
  }, []);

  const logout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  // check the path included or not
  const noNavPath = ["/login", '/signup', "/notFound", "/"];
  console.log("checking location pathname", location.pathname);
  return (
    <>
      <Container maxWidth='xl'>
      <Provider store={store}>
        {!noNavPath.includes(location.pathname) && <Navbar />}
        
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/" element={<LoginPage />}/>
          <Route element={<PrivateRoute  />} >
             <Route path="/home" element={<Home />}/>
          </Route>
          <Route path="/notFound" element={<NotFound />} />
          <Route path="*" element={<Navigate to="/notFound" />} />
        </Routes>
        </Provider>
        </Container>
    </>
  );
}

const AppWrapper = () => (
  <BrowserRouter>
    <App />
  </BrowserRouter>
);

export default AppWrapper;
