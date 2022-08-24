import { useEffect, useState } from "react";
import { getListInvestor } from "../../../../../service";
import InputTableEdit from "../../../../common/InputEdit";
import ModalSaleStage from "../../../../common/InputEdit/ModalSaleStage";
import ModalDelete from "../ModalDelete";
import ModalFilterSaleStage from "./ModalFilterSaleStage";
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
    tokensVested: "50000",
    tokensClaimed: "50000",
  },
];

const dataItemDefault = {
  id: "",
  fullName: "",
  email: "",
  walletAddress: "",
  tokenAmount: "",
  saleStage: "",
  tokensVested: "",
  tokensClaimed: "",
};
export default function ListAccountInvestor({}: Props) {
  const styles = useStyles();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [dataItem, setDataItem] = useState<any>(dataItemDefault);
  const [open, setOpen] = useState<boolean>(false);

  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [dataListInvestor, setDataListInvestor] = useState<any>();

  const renderOpenModalDelete = () => (
    <ModalDelete open={openModalDelete} onClose={handleCloseModalDelete} />
  );

  useEffect(() => {
    (async () => {
      // const data = await getListInvestor()
      setDataListInvestor(data);
    })();
  }, []);
  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const handleDelete = (e: any) => {
    setOpenModalDelete(true);
  };

  const handleEdit = (e: any) => {
    setIsEdit(true);
    setDataItem(e);
  };

  const handleSave = () => {
    setIsEdit(false);
  };

  const handleCancel = (e: any) => {
    setIsEdit(false);
  };
  const handleChangeInputTable = (e: any, field: any) => {
    setDataItem({
      ...dataItem,
      [field]: e,
    });
  };

  const handleClickFilter = () => {
    setOpen((preState) => !preState);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSelect = (e: any) => {
    // console.log(e);
    setDataItem({
      ...dataItem,
      saleStage: e,
    });
    console.log(dataItem);
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <div className="header">
          <p>Full Name</p>
          <p>Email</p>
          <p>Wallet address</p>
          <p>Token amount</p>
          <p className={styles.saleStage}>
            Sale stage{" "}
            <img
              onClick={handleClickFilter}
              src="/images/iconFilter.svg"
              alt=""
            />
            <div className="modalSaleStage">
              <ModalFilterSaleStage open={open} onClose={handleClose} />
            </div>
          </p>
          <p>Tokens vested</p>
          <p>Tokens claimed</p>
          <p></p>
        </div>
        <div className={styles.border}></div>
      </div>
      {data.map((item) => (
        <div key={item.id} className={styles.tableBody}>
          <div className="content">
            <InputTableEdit
              status={isEdit}
              value={isEdit ? dataItem.fullName : item.fullName}
              field="fullName"
              onChange={handleChangeInputTable}
            />
            <InputTableEdit
              status={isEdit}
              value={isEdit ? dataItem.email : item.email}
              field="email"
              onChange={handleChangeInputTable}
            />
            <InputTableEdit
              status={isEdit}
              value={isEdit ? dataItem.walletAddress : item.walletAddress}
              field="walletAddress"
              onChange={handleChangeInputTable}
            />
            <InputTableEdit
              status={isEdit}
              value={isEdit ? dataItem.tokenAmount : item.tokenAmount}
              field="tokenAmount"
              onChange={handleChangeInputTable}
            />
            {/* <InputTableEdit
              status={isEdit}
              value={isEdit ? dataItem.saleStage : item.saleStage}
              field="saleStage"
              onChange={handleChangeInputTable}
            /> */}

            <ModalSaleStage
              open={open}
              status={isEdit}
              onClose={handleClose}
              value={isEdit ? dataItem.saleStage : item.saleStage}
              onClickSelect={handleSelect}
            />

            <div className="tokensVested">{item.tokensVested}</div>
            <div className="tokensClaimed">{item.tokensClaimed}</div>

            <div className="action">
              {!isEdit ? (
                <>
                  <img
                    onClick={() => handleDelete(item)}
                    src="/images/iconDelete.svg"
                    alt=""
                  />
                  <img
                    onClick={() => handleEdit(item)}
                    src="/images/iconEdit.svg"
                    alt=""
                  />
                  {renderOpenModalDelete()}
                </>
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
            </div>
          </div>
          <div className={styles.border}></div>
        </div>
      ))}
    </div>
  );
}
