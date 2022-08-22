import React, { useEffect, useState } from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";
import { Tooltip as ToolTipMui } from "@mui/material";
import useStyles from "./style";
const data = [
  {
    name: "S",
    value: 10,
  },
  {
    name: "M",
    value: 20,
  },
  {
    name: "T",
    value: 23,
  },
  {
    name: "W",
    value: 40,
  },
  {
    name: "TH",
    value: 50,
  },
  {
    name: "F",
    value: 60,
  },
  {
    name: "SA",
    value: 100,
  },
];
const CustomTooltip = ({ active, payload, label }: any) => {
  const style = useStyles();
  if (active && payload && payload.length) {
    return (
      <div className={style.customTooltip}>
        <p className={style.valueTooltip}>{payload[0].value}</p>
        <p className={style.labelTooltip}>{payload[0].name}</p>
      </div>
    );
  }
  return null;
};
const Chart = () => {
  const [positionTooltip, setPositionTooltip] = useState({
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    show: false,
  });
  const [activeTooltip, setActiveTooltip] = useState(0);
  const onMouseMov = (hoveredData: any) => {
    // console.log(hoveredData);

    setPositionTooltip({
      x: hoveredData?.points[activeTooltip]?.x,
      y: hoveredData?.points[activeTooltip]?.y,
      width: hoveredData?.width,
      height: hoveredData?.height,
      show: true,
    });
  };
  const handleActiveTooltip = (data: any) => {
    setActiveTooltip(data.activeTooltipIndex);
  };
  const handleLeaveTooltip = (data: any) => {
    console.log(data);

    setPositionTooltip({
      ...positionTooltip,
      show: false,
    });
  };

  useEffect(() => {
    const tooltip = document.querySelector<HTMLElement>(
      ".recharts-tooltip-wrapper",
    );
    if (!tooltip) return;
    // Init tooltip values
    const tooltipHeight = tooltip.getBoundingClientRect().height;
    const tooltipWidth = tooltip.getBoundingClientRect().width;
    const spaceForLittleTriangle = 20;

    // Rewrite tooltip styles
    tooltip.setAttribute(
      "style",
      `
    transform: translate(${positionTooltip?.x}px, ${positionTooltip?.y}px);
    pointer-events: none;  position: absolute;
    top: -${tooltipHeight + spaceForLittleTriangle}px;
    left: -${tooltipWidth / 2}px;
    opacity: ${positionTooltip?.show ? "1" : 0};
    transition: all 400ms ease 0s;
  `,
    );
  }, [positionTooltip]);
  return (
    <>
      <AreaChart
        width={500}
        height={400}
        data={data}
        margin={{
          top: 10,
          right: 30,
          left: 0,
          bottom: 0,
        }}
        onMouseMove={handleActiveTooltip}
      >
        <CartesianGrid vertical={false} stroke="#DDD" />
        <XAxis dataKey="name" />
        <YAxis />
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#36BBEB" stopOpacity={0.8} />
            <stop offset="95%" stopColor="#36BBEB" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip
          content={<CustomTooltip />}
          offset={10}
          filterNull={true}
          cursor={false}
          position={{
            x: positionTooltip.x,
            y: positionTooltip.y,
          }}
        />

        <Area
          type="monotone"
          dataKey="value"
          stroke="#27FFFF"
          strokeWidth={4}
          fill="url(#colorUv)"
          fillOpacity={1}
          layout="horizontal"
          activeDot={{
            fill: "#FFFFFF",
            stroke: "#75BBE7",
            strokeWidth: 3,
            r: 7,
            className: "boxShadow",
          }}
          dot={{
            fill: "#FFFFFF",
            stroke: "#75BBE7",
            strokeWidth: 1,
            r: 2,
            className: "boxShadow",
          }}
          onMouseMove={onMouseMov}
          onMouseLeave={handleLeaveTooltip}
        />
      </AreaChart>
    </>
  );
};
export default Chart;
