import { ReactNode, useEffect } from "react";
import { useNavigate, Navigate } from "react-router-dom";

type Props = {
  children?: ReactNode;
  isNav?: boolean;
};

export default function AdminLayout({ children, isNav = false }: Props) {
  const navigate = useNavigate();

  useEffect(() => {
    const item = sessionStorage.getItem("access_token");

    if (!item) {
      navigate("/admin-panel");
      return;
    }
  }, [navigate]);

  return <div>{children}</div>;
}
