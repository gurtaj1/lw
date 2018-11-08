import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';

import configureStore, { epicMiddleware } from 'store';
import AppContainer from 'features/app/app-container';

const store = configureStore({
  ...window.__initialData__
});
epicMiddleware.run();

render(
  <Provider store={store}>
    <BrowserRouter>
      <AppContainer />
    </BrowserRouter>
  </Provider>,
  document.getElementById('root')
);
