import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import InvestorLayout from "../layouts/InvestorLayout";
type Props = {};

export default function HomePage({}: Props) {
  const userData = useSelector((s: any) => s.authAction.data);

  useEffect(() => {}, []);
  return (
    <div>
      <InvestorLayout isNav={true} />
    </div>
  );
}
