import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import 'mdb-react-ui-kit/dist/css/mdb.min.css'
import { Provider } from "react-redux"
import store from "./redux/store"
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
    <GoogleOAuthProvider  
      clientId="986568919528-adomtg45gdcmkq4ha02htp89701humsl.apps.googleusercontent.com"    
      >
    <Provider store={store}>
      <App />
    </Provider>
    </GoogleOAuthProvider>
);
