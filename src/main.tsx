import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import AuthProvider from './provider/AuthProvider.tsx';
import { RouterProvider } from 'react-router';
import { router } from './router/Router.tsx';
import { Provider } from 'react-redux';
import { store } from './app/store.ts';

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Provider store={store}>
    <AuthProvider>
      <RouterProvider router={router}></RouterProvider>
      </AuthProvider>
      </Provider>
  </StrictMode>
);
