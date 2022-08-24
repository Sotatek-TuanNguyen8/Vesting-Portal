import { useCallback } from "react";
import useStyles from "./style";

type Props = {
  value: any;
  field: string;
};
export default function TooltipValidate(props: Props) {
  const { value, field } = props;
  const styles = useStyles();

  const renderMsgValidateFullName = () => {
    if (!value) return;
    if (/^[a-zA-Z]+[ ](([a-zA-Z ])+[a-zA-Z]*)*$/g.test(value)) {
      return <p>Special characters are not allowed</p>;
    } else if (value.length > 255) {
      return <p>Enter less than 255 characters</p>;
    } else {
      return;
    }
  };

  const renderTooltipValidate = () => {
    if (field === "name" && value) {
      return renderMsgValidateFullName();
    }
  };

  return <div className={styles.wrapper}></div>;
}
