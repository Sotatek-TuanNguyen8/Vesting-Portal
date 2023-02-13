import { Controller, useForm } from "react-hook-form";
import useStyles from "./style";

export interface VerifyForm {
  googleCode: string;
}

type Props = {
  handleVerify: (data: VerifyForm) => void;
};

export default function ModalVerify({ handleVerify }: Props) {
  const classes = useStyles();
  const { control, handleSubmit } = useForm<VerifyForm>({
    defaultValues: {
      googleCode: "",
    },
  });

  const onVerify = (data: VerifyForm) => {
    handleVerify(data);
  };

  const allowOnlyNumber = (e: any) => {
    const { value } = e.target;
    if (
      /^(\d+(\.\d{0,6})?|\.?\d{0,6})$/.test(value.toString()) &&
      /^[0-9]*$/.test(value)
    ) {
      return value.toString().substring(0, 6);
    }
  };

  return (
    <form
      onSubmit={handleSubmit((data) => onVerify(data))}
      className={classes.form}
    >
      <p className={classes.header}>Please verify to continue</p>
      <span className={classes.text}>Google Verification Code</span>
      <div className={classes.inputForm}>
        <Controller
          control={control}
          name="googleCode"
          rules={{
            required: "This field is required",
            maxLength: {
              value: 6,
              message: "Enter less than 6 characters",
            },
          }}
          render={({
            field: { value, onChange, ref },
            fieldState: { error },
          }) => {
            return (
              <>
                <input
                  value={value.trim()}
                  onChange={(e) => onChange(allowOnlyNumber(e))}
                  ref={ref}
                  placeholder="Enter the 6 digit verification code"
                />
                {error && error.message && (
                  <p className={classes.inputError}>{error.message}</p>
                )}
              </>
            );
          }}
        />
      </div>
      <button type="submit" className={classes.btnVerify}>
        Verify
      </button>
    </form>
  );
}
