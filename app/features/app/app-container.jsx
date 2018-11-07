import React from 'react';
import { Switch } from 'react-router-dom';
import { renderRoutes } from 'react-router-config';

import routes from 'routes/index';

/**
 * AppContainer
 * @return {element} JSX
 */
export default function AppContainer () {
  return (
    <Switch>
      { renderRoutes(routes) }
    </Switch>
  );
}
