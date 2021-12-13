import React from "react";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import styled from "styled-components";

import DocumentationView from "./views/DocumentationView";
import TimersView from "./views/TimersView";
import TimerProvider from "./context/TimerProvider";

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
              <Link to="/">Timers</Link>
            </li>
            <li>
              <Link to="/docs">Documentation</Link>
            </li>
          </ul>
        </nav>
        <Switch>
          <Route path="/docs">
            <TimerProvider>
              <DocumentationView />
            </TimerProvider>
          </Route>
          <Route path="/">
            <TimerProvider>
              <TimersView />
            </TimerProvider>
          </Route>
        </Switch>
      </Router>
    </Container>
  );
}

export default App;
