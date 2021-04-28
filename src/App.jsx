import React, { Suspense } from 'react';
import { BrowserRouter } from 'react-router-dom';

import 'app/theme';

import AppRoutes from 'app/routes/AppRoutes';

const App = () => (
  <Suspense>
    <BrowserRouter basename={process.env.PUBLIC_URL}>
      <AppRoutes />
    </BrowserRouter>
  </Suspense>
);

export default App;
