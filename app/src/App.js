import "./App.css";
import RecipeForm from "./pages/RecipeForm";
import Register from "./pages/Register";
import Login from "./pages/Login";
import Home from "./pages/Home";

import Footer from "../src/components/Footer";
import recipeApi from "./utils/recipeApi";

import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { deleteUserToken } from './utils/auth';
import {
  RecoilRoot,
  atom,
  selector,
  useRecoilState,
  useRecoilValue,
} from 'recoil';
import {userState} from './globalState'
 
export default function App(props) {
  const [user, setUser] = useRecoilState(userState);

  useEffect(() => {
    recipeApi.get("/me").then((res) => {
      console.log("data", res);
      setUser(res.data.user);
    });
  }, []);

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
              <Link to="/register">Register</Link>
            </li>
            <li>
              {user ? (
                <Link onClick={e => {
                  deleteUserToken()
                  setUser(undefined)
                }}>Logout</Link>
              ) : (
                <Link to="/login">Login</Link>
              )}
            </li>

          </ul>
        </nav>
        
        {user && <p>Hallo, {user.firstname}</p>}

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
