import {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from "react";
import { executeJwtAuthenticateService } from "../api/AuthenticationApi";
import { executeUserFetchData } from "../api/UserApiService";

import apiClient from "../api/ApiClient";

export const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export default function AuthProvider({ children }) {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [username, setUsername] = useState(null);
  const [token, setToken] = useState(null);
  const [roles, setRoles] = useState([]);
  const [email, setEmail] = useState(null);
  const [userId, setUserId] = useState(0);

  const logout = useCallback(() => {
    setIsAuthenticated(false);
    setToken(null);
    setUsername(null);
    setEmail(null);
    setRoles([]);
    setUserId(0);
  }, []);

  const fetchData = useCallback(async (username) => {
    await executeUserFetchData(username)
      .then((response) => {
        setEmail(response.data.email);
        setUserId(response.data.id);
        return response;
      })
      .catch((error) => {
        return error;
      });
  }, []);

  const login = useCallback(
    async (username, password) => {
      try {
        const response = await executeJwtAuthenticateService(
          username,
          password
        );

        if (response.status === 200) {
          const jwtToken = "Bearer " + response.data.token;
          setIsAuthenticated(true);
          setUsername(username);
          setToken(jwtToken);
          setRoles(response.data.roles);

          apiClient.interceptors.request.use((config) => {
            config.headers["Authorization"] = jwtToken;
            return config;
          });
          fetchData(username);
          return true;
        } else {
          logout();
          return false;
        }
      } catch (error) {
        logout();
        return false;
      }
    },
    [logout, fetchData]
  );

  const isAdmin = useCallback(() => {
    return roles.includes("ROLE_ADMIN");
  }, [roles]);

  const isUser = useCallback(() => {
    return roles.includes("ROLE_USER");
  }, [roles]);

  const provider = useMemo(
    () => ({
      isAuthenticated,
      login,
      logout,
      username,
      email,
      fetchData,
      isAdmin,
      isUser,
      token,
      roles,
      userId,
    }),
    [
      isAuthenticated,
      login,
      logout,
      username,
      email,
      fetchData,
      isAdmin,
      isUser,
      token,
      roles,
      userId,
    ]
  );

  return (
    <AuthContext.Provider value={provider}>{children}</AuthContext.Provider>
  );
}
