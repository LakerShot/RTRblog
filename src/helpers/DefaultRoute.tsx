import React from 'react';
import { Route, Redirect, useHistory } from 'react-router-dom';

export default ({ component: Component, ...rest }: any) => {
  const history = useHistory();
  return (
    <Route
      {...rest}
      render={(props) =>
        history.location.pathname === '/' && (
          <Redirect
            to={{
              pathname: '/articles',
            }}
          />
        )
      }
    />
  );
};
