import { ReactNode, useEffect } from "react";
import { useNavigate } from "react-router-dom";

type Props = {
  children?: ReactNode;
  isNav?: boolean;
};

export default function AdminLayout({ children, isNav = false }: Props) {
  const navigate = useNavigate();

  // useEffect(() => {
  //   const item = sessionStorage.getItem("access_token");
  //   if (!item || item === "undefined") {
  //     navigate("/admin-panel");
  //     return;
  //   }
  // }, [navigate]);

  return <div>{children}</div>;
}
