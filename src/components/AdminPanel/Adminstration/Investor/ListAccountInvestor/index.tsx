import { useEffect, useState } from "react";
import {
  getListInvestor,
  updateInvestorNew,
} from "../../../../../service/admin.service";
import InputTableEdit from "../../../../common/InputEdit";
import ModalSaleStage from "../../../../common/InputEdit/ModalSaleStage";
import ModalDelete from "../ModalDelete";
import FilterAdmin from "./ModalFilterSaleStage";
import useStyles from "./style";

type Props = {};

const data = [
  {
    id: 1,
    full_name: "tien",
    email: "sonkekekeke@gmail.com",
    wallet_address: "0x1c99B89a25D5565083b7682C03DCFc830293fB5A",
    allocation_token: "135000000",
    stage_name: "Angel",
    tokensVested: "50000",
    claimed: "50000",
    stage_id: 1,
  },
];

const dataItemDefault = {
  investor_id: "",
  full_name: "",
  email: "",
  wallet_address: "",
  allocation_token: 0,
  stage_name: "",
  tokensVested: "",
  claimed: "",
  stage_id: 0,
};
export default function ListAccountInvestor({}: Props) {
  const styles = useStyles();
  const [isEdit, setIsEdit] = useState<boolean>(false);

  const [dataItem, setDataItem] = useState<any>(dataItemDefault);
  const [open, setOpen] = useState<boolean>(false);

  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [dataListInvestor, setDataListInvestor] = useState<any>();

  const shortenAddress = (
    string?: string,
    start?: number,
    end?: number
  ): string => {
    if (typeof string !== "string") return "";
    return (
      string.slice(0, start || 7) +
      "..." +
      string.slice(-(end || 6))
    ).toLowerCase();
  };

  const renderOpenModalDelete = () => (
    <ModalDelete open={openModalDelete} onClose={handleCloseModalDelete} />
  );

  useEffect(() => {
    (async () => {
      const data = await getListInvestor(
        localStorage.getItem("access_token") as string,
        0
      );
      setDataListInvestor(data?.data);
    })();
  }, []);

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const handleDelete = (e: any) => {
    setOpenModalDelete(true);
  };

  const handleEdit = async (e: any) => {
    setIsEdit(true);
    setDataItem(e);
  };

  const handleSave = async () => {
    const dataUpdate = await updateInvestorNew(dataItem.investor_id, dataItem);
    if (dataUpdate?.status === 200) {
      setIsEdit(false);
    } else if (dataUpdate?.status === 402) {
    }
  };

  const handleCancel = (e: any) => {
    setIsEdit(false);
  };
  const handleChangeInputTable = (e: any, field: number) => {
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
    setDataItem({
      ...dataItem,
      stage_name: e,
    });
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
              <FilterAdmin open={open} onClose={handleClose} />
            </div>
          </p>
          <p>Tokens vested</p>
          <p>Tokens claimed</p>
          <p></p>
        </div>
        <div className={styles.border}></div>
      </div>
      {dataListInvestor?.map((item: any) => (
        <div key={item?.investor_id} className={styles.tableBody}>
          <div className="content">
            <InputTableEdit
              status={isEdit && item.investor_id === dataItem.investor_id}
              defaultValue={item.full_name}
              value={
                isEdit && item.investor_id === dataItem.investor_id
                  ? dataItem.full_name
                  : item?.full_name
              }
              field="full_name"
              onChange={handleChangeInputTable}
            />
            <InputTableEdit
              status={isEdit && item.investor_id === dataItem.investor_id}
              defaultValue={item.email}
              value={
                isEdit && item.investor_id === dataItem.investor_id
                  ? dataItem.email
                  : item?.email
              }
              field="email"
              onChange={handleChangeInputTable}
            />
            <InputTableEdit
              status={isEdit && item.investor_id === dataItem.investor_id}
              defaultValue={item.wallet_address}
              value={
                isEdit && item.investor_id === dataItem.investor_id
                  ? dataItem.wallet_address
                  : shortenAddress(item?.wallet_address, 4, 4)
              }
              field="wallet_address"
              onChange={handleChangeInputTable}
            />
            <InputTableEdit
              status={isEdit && item.investor_id === dataItem.investor_id}
              defaultValue={item.allocation_token}
              value={
                isEdit && item.investor_id === dataItem.investor_id
                  ? dataItem.allocation_token
                  : item?.allocation_token
              }
              field="allocation_token"
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
              status={isEdit && item.investor_id === dataItem.investor_id}
              onClose={handleClose}
              value={
                isEdit && item.investor_id === dataItem.investor_id
                  ? dataItem?.stage_name
                  : item?.stage_name
              }
              onClickSelect={handleSelect}
            />

            <div className="tokensVested">{item?.tokensVested}</div>
            <div className="tokensClaimed">{item?.claimed}</div>

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
