import React from "react";
import { ReactComponent as ArrowDown } from "../../../../assets/svgs/arrow_down.svg";
import useStyles from "./style";

export interface IMenuList {
  label: string;
  icon?: React.ReactElement;
}

export default function NavbarRoute() {
  const classes = useStyles();
  const menuList: IMenuList[] = [
    {
      label: "INSTITUTIONAL",
      icon: <ArrowDown />,
    },
    {
      label: "RETAIL",
      icon: <ArrowDown />,
    },
    {
      label: "LIQUIDITY +",
    },
    {
      label: "REWARDS",
    },
    {
      label: "ACADEMY",
      icon: <ArrowDown />,
    },
    {
      label: "COMPANY",
      icon: <ArrowDown />,
    },
    {
      label: "INSIGHTS",
    },
    {
      label: "MEDIA",
      icon: <ArrowDown />,
    },
  ];
  return (
    <div className={classes.menu}>
      {menuList.map((menu, index) => (
        <div className={classes.menuItem} key={index}>
          <div>{menu.label}</div>
          {menu.icon && menu.icon}
        </div>
      ))}
    </div>
  );
}
