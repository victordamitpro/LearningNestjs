import { useEffect, useState } from 'react';

const checkLocalStorageToken = () => {
  return localStorage.getItem('AccessToken');
};

const useAuth = () => {
  let [isAuth, handleAuthorized] = useState(false);

  useEffect(() => {
    if (checkLocalStorageToken()) {
      handleAuthorized(true);
    } else {
      handleAuthorized(false);
    }
  }, [checkLocalStorageToken()]);

  return [isAuth];
};

export default useAuth;
