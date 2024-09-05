import App from './App.jsx'
import './index.css'
import {Provider} from "react-redux"
import store from './store/store.js'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId = '755061861316-4amo6hbcmqrtvc8dia44k3uc6bru8o4q.apps.googleusercontent.com'>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </GoogleOAuthProvider>
  </Provider>
)
