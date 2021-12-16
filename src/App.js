import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";

import DocumentationView from "./views/DocumentationView";
import TimersView from "./views/TimersView";
import WorkoutView from "./views/WorkoutView";
import TimerProvider from "./context/TimerProvider";
import WorkoutProvider from "./context/WorkoutProvider";

const Container = styled.div`
  background: #f0f6fb;
  height: 100vh;
  overflow: auto;
`;

function App() {
  return (
    <Container>
      <Router>
        <nav>
          <ul>
            <li>
              <Link to="/">Home</Link>
            </li>
            <li>
              <Link to="/docs">Documentation</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/docs">
            <WorkoutProvider>
              <TimerProvider>
                <DocumentationView />
              </TimerProvider>
            </WorkoutProvider>
          </Route>
          <Route path="/add">
            <WorkoutProvider>
              <TimerProvider>
                <TimersView />
              </TimerProvider>
            </WorkoutProvider>
          </Route>
          <Route path="/">
            <WorkoutProvider>
              <TimerProvider>
                <WorkoutView />
              </TimerProvider>
            </WorkoutProvider>
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
