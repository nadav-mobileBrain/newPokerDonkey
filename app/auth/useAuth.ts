import { useContext } from "react";
import AuthContext from "./context";
import authStorage from "./storage";
import { jwtDecode } from "jwt-decode";
import { GoogleSignin } from "@react-native-google-signin/google-signin";

// Define the type for the user context
interface User {
  id: string;
  email: string;
  image?: string;
  userId?: string | any;
  nickName: string;
  // Add any other properties your user object might have
}

// Define the type for the auth token
interface AuthToken {
  token: string;
}

const useAuth = () => {
  const { user, setUser } = useContext(AuthContext) as {
    user: User | null;
    setUser: (user: User | null) => void;
  };

  const logIn = (authToken: AuthToken) => {
    const user = jwtDecode<User>(authToken.token);
    setUser(user);
    authStorage.storeToken(authToken.token);
  };

  const logOut = async () => {
    setUser(null);
    authStorage.removeToken();
    await GoogleSignin.revokeAccess();
    await GoogleSignin.signOut();
  };

  return { user, logIn, logOut };
};

export default useAuth;
