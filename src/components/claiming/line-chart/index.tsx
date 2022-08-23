import { useEffect, useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import useStyles from "./style";

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

const LineChart = ({ data, width, height }: any) => {
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
    console.log(data);
    setActiveTooltip(data.activeTooltipIndex);
  };
  const handleLeaveTooltip = (data: any) => {
    setPositionTooltip({
      ...positionTooltip,
      show: false,
    });
  };

  // useEffect(() => {
  //   const tooltip = document.querySelector<HTMLElement>(
  //     ".recharts-tooltip-wrapper",
  //   );
  //   if (!tooltip) return;
  //   // Init tooltip values
  //   const tooltipHeight = tooltip.getBoundingClientRect().height;
  //   const tooltipWidth = tooltip.getBoundingClientRect().width;
  //   const spaceForLittleTriangle = 20;

  //   // Rewrite tooltip styles
  //   tooltip.setAttribute(
  //     "style",
  //     `
  //    transform: translate(${positionTooltip?.x}px, ${positionTooltip?.y}px);
  //   pointer-events: none;  position: absolute;
  //   top: -${tooltipHeight + spaceForLittleTriangle}px;
  //   left: -${tooltipWidth / 2}px;
  //   opacity: ${positionTooltip?.show ? "1" : 0};
  //   transition: all 400ms ease 0s;
  // `,
  //   );
  // }, [positionTooltip]);
  return (
    // <ResponsiveContainer width={700} height={500}>
    <AreaChart
      data={data}
      width={width}
      height={height}
      margin={{
        top: 10,
        right: 30,
        left: 0,
        bottom: 0,
      }}
      onMouseMove={handleActiveTooltip}
    >
      <CartesianGrid vertical={false} stroke="#82828E"   />
      <XAxis dataKey="name" tickLine={false} axisLine={false} />
      <YAxis tickLine={false} axisLine={false} />
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
          x: positionTooltip.x - 20,
          y: positionTooltip.y - 80,
        }}
        wrapperStyle={{
          opacity: positionTooltip?.show ? "1" : 0,
          transition: " all 400ms ease 0s",
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
        onMouseOut={handleLeaveTooltip}
        isAnimationActive={true}
      />
    </AreaChart>
    // </ResponsiveContainer>
  );
};
export default LineChart;
