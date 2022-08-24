import useStyles from "./style";

type ModalProps = {
  open: boolean;
  onClose: () => void;
};

export default function ModalSaleStage(props: ModalProps) {
  const { open, onClose } = props;
  const styles = useStyles();

  const data = [
    {
      id: 1,
      name: "Angel",
    },
    {
      id: 2,
      name: "Pre-seed",
    },
    {
      id: 3,
      name: "Private 1",
    },
    {
      id: 4,
      name: "Private 2",
    },
    {
      id: 5,
      name: "Public",
    },
    {
      id: 6,
      name: "Rewards",
    },
  ];

  const handleClickSaleStage = () => {
    onClose();
  };

  return (
    <>
      {open && (
        <div className={styles.wrapper}>
          {data.map((item) => (
            <div key={item.id} onClick={handleClickSaleStage}>
              {item.name}
            </div>
          ))}
        </div>
      )}
    </>
  );
}
