import React from "react";
interface GoogleUser {
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
}
const AuthContext = React.createContext<null | {
  user: GoogleUser | null;
  setUser: React.Dispatch<React.SetStateAction<GoogleUser | null | any>>;
}>(null);

export default AuthContext;
