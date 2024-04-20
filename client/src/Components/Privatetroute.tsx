import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

export const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const isAuth = useSelector((store: any) => store.AuthReducer.isAuth);

  if (!isAuth) return <Navigate to="/login" />;
  return <>{children}</>;
};
