import { useState } from "react";
import {
  Area,
  AreaChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { format_thousands_decimal } from "../../../utils/common/fn";
import useStyles from "./style";

const CustomTooltip = ({ active, payload, label }: any) => {
  const style = useStyles();
  if (active && payload && payload.length) {
    return (
      <div className={style.customTooltip}>
        <p className={style.valueTooltip}>
          {format_thousands_decimal(payload[0].value)}
        </p>
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
    setPositionTooltip({
      ...positionTooltip,
      show: false,
    });
  };

  return (
    <ResponsiveContainer width="100%" height={400}>
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
        <CartesianGrid vertical={false} stroke="rgba(130, 130, 142, 0.3)" />
        <XAxis
          dataKey="name"
          tickLine={false}
          axisLine={false}
          padding={{ left: 20, right: 10 }}
          tick={{
            fontFamily: "gibson",
            fontWeight: 300,
            fontSize: 12,
            color: "#82828E",
          }}
          dy={12}
        />
        <YAxis
          tickLine={false}
          axisLine={false}
          tick={{
            fontFamily: "gibson",
            fontWeight: 300,
            fontSize: 12,
            color: "#82828E",
          }}
          tickSize={2}
          dx={-12}
        />
        <defs>
          <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#36BBEB" stopOpacity={1} />
            <stop offset="100%" stopColor="#36BBEB" stopOpacity={0} />
          </linearGradient>
        </defs>
        <Tooltip
          content={<CustomTooltip />}
          offset={10}
          filterNull={true}
          cursor={false}
          position={{
            x: positionTooltip.x - 70,
            y: positionTooltip.y - 100,
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
          strokeWidth={5}
          fill="url(#colorUv)"
          fillOpacity={1}
          layout="horizontal"
          activeDot={{
            fill: "#FFFFFF",
            stroke: "#75BBE7",
            strokeWidth: 7,
            r: 12,
            className: "boxShadow",
            onMouseEnter: (data, position: any) => {
              setPositionTooltip({
                x: position?.cx + 8,
                y: position?.cy,
                width: 100,
                height: 100,
                show: true,
              });
            },
            onMouseOut: () => {
              setPositionTooltip({
                ...positionTooltip,
                show: false,
              });
            },
          }}
          dot={{
            fill: "#FFFFFF",
            stroke: "#75BBE7",
            strokeWidth: 3,
            r: 5,
            className: "boxShadow",
          }}
          onMouseMove={onMouseMov}
          onMouseOut={handleLeaveTooltip}
          isAnimationActive={true}
        />
      </AreaChart>
    </ResponsiveContainer>
  );
};
export default LineChart;
