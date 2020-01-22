import React, { useEffect } from 'react';
import Login from './login/login';
import Register from './register/register';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import Main from './main/main';
import socket from './socket/Socket';

const App = (props) => {
  const { token } = props;

  useEffect(() => {
    if (token !== null) {
      socket.start();
    }
  }, [token]);

  return (
    <div style={{ position: 'relative', backgroundColor: 'rgb(59, 72, 114)', height: '100vh' }}>
      <Router>
        <Switch>
          <Route exact path='/'>
            {token !== null ? <Main /> : <Login />}
          </Route>
          <Route exact path='/login'>
            {token !== null ? <Main /> : <Login />}
          </Route>
          <Route exact path='/register'>
            {token !== null ? <Main /> : <Register />}
          </Route>
          <Route exact path='/test'>
            <div>TEST</div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
};

const mapStoreStateToProps = ({ user }) => {
  return {
    ...user
  };
};

export default connect(
  mapStoreStateToProps,
  null
)(App);
