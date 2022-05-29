import './App.css';
import { Navigate, Route, Routes } from 'react-router-dom';
import ProtectedRoute from './components/Shared/ProtectedRoute';
import HomePage from './pages/HomePage';
import DefaultLayout from './layouts/ClientLayout';
import EmptyLayout from './layouts/EmptyLayout';
import Login from './components/Auth/Login/Login';
import Register from './components/Auth/Register/Register';
import ErrorPage from './pages/ErrorPage';
import RedirectPage from './pages/RedirectPage';
import { RecoilRoot } from 'recoil';

let routes = (
  <RecoilRoot>
    <Routes>
      <Route
        path="auth/google/redirect/:token/:id/:email/:firstName/:lastName"
        element={<RedirectPage />}
      />
      <Route element={<DefaultLayout />}>
        <Route path="/" element={<Navigate to="/home" />} />
        <Route
          path="/home"
          element={<ProtectedRoute outlet={<HomePage />} type="private" />}
        ></Route>
        <Route path="/error" element={<ErrorPage />} />
        <Route path="/error/400" element={<ErrorPage />} />
        <Route path="/error/401" element={<ErrorPage />} />
        <Route path="/error/404" element={<ErrorPage />} />
        <Route path="/error/500" element={<ErrorPage />} />
      </Route>
      <Route element={<EmptyLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="sign-up" element={<Register />} />
      </Route>
    </Routes>
  </RecoilRoot>
);

function App() {
  return <div className="App">{routes}</div>;
}

export default App;
