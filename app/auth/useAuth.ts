import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "./storage";
import { jwtDecode } from "jwt-decode";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

// Define the type for the user context
interface User {
  data: {
    idToken: string;
    email: string;
    id: string;
    givenName: string;
    familyName: string;
    photo: string | null;
    google_id: string;
  };

  // Add any other properties your user object might have
}

// Define the type for the auth token
interface AuthToken {
  token: string;
}

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext) as {
    user: any | null;
    setUser: (user: User | null) => void;
  };

  const logIn = (authToken: any) => {
    const user = jwtDecode<any>(authToken.token);
    setUser(user);
    authStorage.storeToken(authToken.token);
  };

  const logOut = async () => {
    setUser(null);
    authStorage.removeToken();
    GoogleSignin.revokeAccess();
    GoogleSignin.signOut();
  };

  return { user, logIn, logOut };
};

export default useAuth;
