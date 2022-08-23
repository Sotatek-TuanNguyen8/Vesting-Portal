import { useState } from "react";
import InputTableEdit from "../../../../common/InputEdit";
import useStyles from "./style";

type Props = {};

const data = [
  {
    id: 1,
    fullName: "tien",
    email: "sonkekekeke@gmail.com",
    walletAddress: "0XC6...72AA",
    tokenAmount: "135000000",
    saleStage: "Angel",
  },
];

const dataItemDefault = {
  id: "",
  fullName: "",
  email: "",
  walletAddress: "",
  tokenAmount: "",
  saleStage: "",
};
export default function ListAccountInvestor({}: Props) {
  const styles = useStyles();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [dataItem, setDataItem] = useState<any>(dataItemDefault);

  const handleDelete = () => {};

  const handleEdit = (e: any) => {
    setIsEdit(true);
    setDataItem(e);
    console.log({ dataItem });
  };

  const handleSave = () => {
    console.log({ dataItem });
    setIsEdit(false);
  };

  const handleCancel = (e: any) => {
    setIsEdit(false);
  };
  const handleChangeInputTable = (e: any, field: any) => {
    console.log({ e, field });
    setDataItem({
      ...dataItem,
      [field]: e,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <div>
          <p>Full Name</p>
          <p>Email</p>
          <p>Wallet address</p>
          <p>Token amount</p>
          <p>
            Sale stage <img src="/images/iconFilter.svg" alt="" />
          </p>
          <p></p>
        </div>
        <div></div>
      </div>
      {data.map((item) => (
        <div key={item.id} className={styles.tableBody}>
          <div>
            {/* <p>{item.fullName}</p>
            <p>{item.email}</p>
            <p>{item.walletAddress}</p>
            <p>{item.tokenAmount}</p>
            <p>{item.saleStage}</p> */}
            <InputTableEdit
              status={isEdit}
              value={dataItem.fullName || item.fullName}
              field="fullName"
              onChange={handleChangeInputTable}
            />
            <p>{item.email}</p>
            <p>{item.walletAddress}</p>
            <p>{item.tokenAmount}</p>
            <p>{item.saleStage}</p>
            <p>
              <img onClick={handleDelete} src="/images/iconDelete.svg" alt="" />
              {!isEdit ? (
                <img
                  onClick={() => handleEdit(item)}
                  src="/images/iconEdit.svg"
                  alt=""
                />
              ) : (
                <>
                  <img
                    onClick={handleSave}
                    src="/images/iconSuccess.svg"
                    alt=""
                  />
                  <img
                    onClick={() => handleCancel(item)}
                    src="/images/iconCancel.svg"
                    alt=""
                  />
                </>
              )}
            </p>
          </div>
          <div></div>
        </div>
      ))}
    </div>
  );
}
