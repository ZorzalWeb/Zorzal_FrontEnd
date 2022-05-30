import React, { Component } from 'react';
import { Container } from 'semantic-ui-react';
import {BrowserRouter, Route, Switch} from "react-router-dom";
import 'semantic-ui-css/semantic.min.css';
import Header from './Header';
import FirstPresale from './FirstPresale';
/* import './App.css' */

import ParticleBackground from './particles-conf/ParticleBackground'

class App extends Component {

  render () {
    return(
      <BrowserRouter>
        <Container>
          <ParticleBackground/>
          {/* <Header />  */}
            <main>
              <Switch>
              <FirstPresale />
                {/* <Route exact path="/" component={}/> */}
                {/* <Route exact path="/" component={}/> */}
                {/* <Route exact path="/" component={}/> */}
              </Switch>
            </main>
        </Container>
      </BrowserRouter>
    );
  }

}

export default App;
