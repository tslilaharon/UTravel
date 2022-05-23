import React, { createContext, useContext, useState, useEffect } from 'react';
import { _retrieveData, } from "./storge"

const LogInContext = createContext();

const LoginProvider = ({ children }) => {

  const [isLogInUser, setIsLogInUser] = useState(false);
  const [isLogInBusiness, setIsLogInBusiness] = useState(false);

  const fetchlogin = async () => {
    try {
      const u = await _retrieveData("IsLogInUser")
      const b = await _retrieveData("IsLogInBusiness")
      setIsLogInUser(u)
      setIsLogInBusiness(b)
    }
    catch (e) {
      console.log(e)
    }
  };

  useEffect(() => {
    fetchlogin();
  }, [isLogInUser, isLogInBusiness]);


  return (
    <LogInContext.Provider
      value={{ isLogInUser, setIsLogInUser, isLogInBusiness, setIsLogInBusiness }}>
      {children}
    </LogInContext.Provider>
  );
};

export const useLogIn = () => useContext(LogInContext);

export default LoginProvider;