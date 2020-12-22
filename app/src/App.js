import "./App.css";
import RecipeForm from "./pages/RecipeForm";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";
import Profile from "./pages/Profile";
import Footer from "../src/components/Footer";

import recipeApi from "./utils/recipeApi";

import React, { useEffect } from "react";
import { userState } from "./globalState";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
  Redirect,
} from "react-router-dom";
import { deleteUserToken } from "./utils/auth";
import { useRecoilState } from "recoil";

export default function App(props) {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    recipeApi.get("/me").then((res) => {
      console.log("data", res);
      setUser(res.data.user);
    });
  }, [setUser]);

  return (
    <Router>
      <div>
        <nav className="nav">
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/recipe">Recipe</Link>
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
                  onClick={(e) => {
                    deleteUserToken();
                    setUser(undefined);
                  }}
                >
                  Logout{" "}
                </Link>
              ) : (
                <Link to="/login">
                  Login <Redirect to="/" />
                </Link>
              )}
            </li>
          </ul>
        </nav>

        {/* A <Switch> looks through its children <Route>s and
            renders the first one that matches the current URL. */}
        <Switch>
          <Route path="/recipe">
            <RecipeForm />
            <Footer />
          </Route>
          <Route path="/register">
            <Register />
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
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
