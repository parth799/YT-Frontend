import App from './App.jsx'
import './index.css'
import {Provider} from "react-redux"
import store from './store/store.js'
import { BrowserRouter } from 'react-router-dom'
import ReactDOM from "react-dom/client";
import { GoogleOAuthProvider } from '@react-oauth/google'

ReactDOM.createRoot(document.getElementById('root')).render(
  <Provider store={store}>
    <GoogleOAuthProvider clientId = {import.meta.env.VITE_GOOGLE_CLIENT_ID}>
    <BrowserRouter>
      <App />
    </BrowserRouter>
    </GoogleOAuthProvider>
  </Provider>
)
