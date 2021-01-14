import "./App.css";
import RecipeForm from "./pages/RecipeForm";
import RecipeList from "./pages/RecipeList";
import RecipeEdit from "./pages/RecipeEdit";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Footer from "../src/components/Footer";

import { Menu, MenuButton, MenuList, MenuItem, Button } from "@chakra-ui/react";
import { HamburgerIcon, CloseIcon } from "@chakra-ui/icons";

import recipeApi from "./utils/recipeApi";
import useResponsive from "./helper/useResponsive";

import React, { useEffect } from "react";
import { userState } from "./globalState";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { deleteUserToken } from "./utils/auth";
import { useRecoilState } from "recoil";

export default function App(props) {
  const [user, setUser] = useRecoilState(userState);
  const { isDesktop } = useResponsive();

  useEffect(() => {
    recipeApi.get("/me").then((res) => {
      console.log("data", res);
      setUser(res.data.user);
    });
  }, [setUser]);

  return (
    <Router>
      <div>
        {isDesktop && (
          <nav className="nav">
            <ul>
              <li>
                <Link to="/">Home</Link>
              </li>
              <li>
                <Link to="/recipe">Recipe Editor</Link>
              </li>
              <li>
                <Link to="/recipes">Recipes</Link>
              </li>
              <li>
                {user ? (
                  <Link to="/profile">Profile</Link>
                ) : (
                  <Link to="/register">Register</Link>
                )}
              </li>
              <li>
                {user ? (
                  <Link
                    onClick={() => {
                      deleteUserToken();
                      setUser(undefined);
                      window.location.reload();
                    }}
                    to="/"
                  >
                    Logout{" "}
                  </Link>
                ) : (
                  <Link to="/login">Login</Link>
                )}
              </li>
            </ul>
          </nav>
        )}
        {!isDesktop && (
          <nav className="menu">
            <Menu>
              {({ isOpen }) => (
                <>
                  <MenuButton
                    style={{ color: "white", backgroundColor: "brown" }}
                    isActive={isOpen}
                    as={Button}
                  >
                    {isOpen ? <CloseIcon /> : <HamburgerIcon />}
                  </MenuButton>
                  <div style={{position: "relative", zIndex: "10"}}>
                  <MenuList >
                    <Link to="/">
                      <MenuItem>Home</MenuItem>
                    </Link>
                    <Link to="/recipe">
                      <MenuItem>Recipe Editor</MenuItem>
                    </Link>
                    <Link to="/recipes">
                      <MenuItem>Recipes</MenuItem>
                    </Link>

                    {user ? (
                      <Link to="/profile">
                        <MenuItem>Profile</MenuItem>
                      </Link>
                    ) : (
                      <Link to="/register">
                        <MenuItem>Register</MenuItem>
                      </Link>
                    )}
                    {user ? (
                      <Link
                        onClick={() => {
                          deleteUserToken();
                          setUser(undefined);
                          window.location.reload();
                        }}
                        to="/"
                      >
                        <MenuItem>Logout</MenuItem>
                      </Link>
                    ) : (
                      <Link to="/login">
                        <MenuItem>Login</MenuItem>
                      </Link>
                    )}
                  </MenuList>
                  </div>
                </>
              )}
            </Menu>
          </nav>
        )}
        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/recipe">
            <RecipeForm />
            <Footer />
          </Route>

          <Route path="/recipes/:id/edit">
            <RecipeEdit />
          </Route>

          <Route path="/recipes">
            <RecipeList />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/profile">{user && <Profile user={user} />}</Route>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/">
            <Home />
            <Footer />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
