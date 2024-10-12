import { BrowserRouter, Routes, Route } from "react-router-dom";
import Dashboard from "./Dashboard/Pages/Dashboard";
import Jammah from "./Jamaah/Pages/Jamaah";
import MainNavigation from "./Shared/Navigation/MainNavigation";
import TopBars from "./Shared/Navigation/TopBar";
import { AuthContext } from "./Shared/Context/auth-context";
import { useState, useCallback } from "react";
import Login from "./Login/Pages/Login";

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const login = useCallback(() => {
    setIsLoggedIn(true);
  }, []);

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  let route;
  if (isLoggedIn) {
    route = (
      <div className='container-scroller'>
        <div className='container-fluid page-body-wrapper'>
          <MainNavigation />
          <div className='main-panel'>
            <div className='content-wrapper'>
              <Routes>
                <Route path='/' element={<Jammah />} />
                <Route path='/*' element={<Jammah />} />
              </Routes>
            </div>
          </div>
        </div>
      </div>
    );
  } else {
    route = (
      <>
        <Routes>
          <Route path='/' element={<Login />} />
          <Route path='/*' element={<Login />} />
        </Routes>
      </>
    );
  }
  return (
    <AuthContext.Provider value={{ isLoggedIn: isLoggedIn, login: login, logout: logout }}>
      <div className='container-scroller'>
        <TopBars />
        <BrowserRouter>{route}</BrowserRouter>
      </div>
    </AuthContext.Provider>
  );
}

export default App;
