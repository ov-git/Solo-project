import { createContext, useState, useEffect } from "react";
import { getMe } from "../lib/ApiService";
import { useRouter } from "next/router";
import { logoutUser } from "../lib/ApiService";
import { getSession, signOut, getProviders, signIn } from "next-auth/react";

const AuthContext = createContext({});

export const AuthProvider = ({ children }) => {
  // signIn(provider.id)

  const router = useRouter();
  const [session, setSession] = useState(null);
  const [loggedInWithGoogle, setLoggedInWIthGoogle] = useState(false);

  useEffect(() => {
    console.log("checking", session);
    const checkSession = async () => {
      try {
        const googleSession = await getSession();
        if (googleSession) {
          setSession(googleSession.user);
          setLoggedInWIthGoogle(true);
          return;
        }

        console.log("here");
        const session = await getMe();
        if (session.error) {
          console.log(session.error);
          setSession(null);
        } else {
          setSession(session);
        }
      } catch (err) {
        console.log(err);
      }
    };

    checkSession();
  }, [router.pathname]);

  async function logout() {
    if (loggedInWithGoogle) {
      signOut();
    } else {
      const res = await logoutUser();
      setSession(null);
    }
  }

  function googleLogin() {
    signIn("google");
    router.push("/");
  }

  return (
    <AuthContext.Provider
      value={{
        session,
        logout,
        googleLogin,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContext;
