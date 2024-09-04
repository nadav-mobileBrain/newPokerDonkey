import React from "react";
interface GoogleUser {
  data: {
    idToken: string | null;
    accessToken: string | null;
    user: {
      email: string;
      id: string;
      givenName: string;
      familyName: string;
      photo: string | null;
      googleId: string;
    };
  };
}
const AuthContext = React.createContext<null | {
  user: any | null;
  setUser: React.Dispatch<React.SetStateAction<any | null>>;
}>(null);

export default AuthContext;
