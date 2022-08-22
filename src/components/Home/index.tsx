import React from "react";
import InvestorLayout from "../layouts/InvestorLayout";
type Props = {};

export default function HomePage({}: Props) {
  return (
    <div>
      <InvestorLayout isNav={true} />
    </div>
  );
}
