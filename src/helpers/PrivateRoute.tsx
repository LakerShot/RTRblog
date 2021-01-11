import React from 'react';
import { Route, Redirect } from 'react-router-dom';

export default ({ component: Component, ...rest }: any) => (
  <Route
    {...rest}
    render={(props) =>
      localStorage.getItem('login') ? (
        // this mean that if there is a key in localStorage we're gonna load component
        <Component {...props} />
      ) : (
        <Redirect
          to={{
            pathname: '/sign-in',
          }}
        />
      )
    }
  />
);
