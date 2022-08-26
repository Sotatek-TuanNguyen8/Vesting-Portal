import { useCallback, useState } from "react";
import { useSelector } from "react-redux";
import { InInvestor } from "..";
import { updateInvestorNew } from "../../../../../service/admin.service";
import InputTableEdit from "../../../../common/InputEdit";
import ModalSaleStage from "../../../../common/InputEdit/ModalSaleStage";
import ModalDelete from "../ModalDelete";
import FilterAdmin from "./ModalFilterSaleStage";
import useStyles from "./style";

type Props = {
  dataListInvestor: InInvestor[];
  onFilter: (data: string[]) => void;
};

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
export default function ListAccountInvestor({
  dataListInvestor,
  onFilter,
}: Props) {
  const styles = useStyles();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [dataItem, setDataItem] = useState<any>(dataItemDefault);
  const [open, setOpen] = useState<boolean>(false);

  const statusEditFullName = useSelector(
    (state: any) => state.statusFullNameEditAction.statusFullName
  );

  const statusEditEmail = useSelector(
    (state: any) => state.statusEmailEditAction.statusEmail
  );

  const statusEditWallet = useSelector(
    (state: any) => state.statusWalletEditAction.statusWallet
  );

  const statusEditTokenAmount = useSelector(
    (state: any) => state.statusTokenAmountEditAction.statusTokenAmount
  );

  const [openModalDelete, setOpenModalDelete] = useState<boolean>(false);
  const [duplicateEmail, setDuplicateEmail] = useState<boolean>(false);
  const [duplicateWallet, setDuplicateWallet] = useState<boolean>(false);
  const [tokenAmountInvalid, setTokenAmountInvalid] = useState<boolean>(false);

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

  const renderOpenModalDelete = (id: any) => (
    <ModalDelete
      open={openModalDelete}
      onClose={handleCloseModalDelete}
      id={id}
    />
  );

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

  const handleSave = useCallback(async () => {
    const dataUpdate = await updateInvestorNew(dataItem.investor_id, dataItem);
    if (dataUpdate?.status === 200) {
      setIsEdit(false);
    } else if (dataUpdate?.status === 400) {
      setDuplicateWallet(true);
    } else if (dataUpdate?.status === 409) {
      setDuplicateEmail(true);
    } else if (dataUpdate?.status === 406) {
      setTokenAmountInvalid(true);
    } else {
      setIsEdit(false);
    }
  }, [dataItem]);

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

  const handleFilter = (data: string[]) => {
    onFilter(data);
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
              <FilterAdmin
                open={open}
                onClose={handleClose}
                onFilter={handleFilter}
              />
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
              isDuplicateEmail={duplicateEmail}
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
              isDuplicateWallet={duplicateWallet}
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
              tokenAmountInvalid={tokenAmountInvalid}
              value={
                isEdit && item.investor_id === dataItem.investor_id
                  ? dataItem.allocation_token
                  : item?.allocation_token
              }
              field="allocation_token"
              onChange={handleChangeInputTable}
            />

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
              {isEdit && item.investor_id === dataItem.investor_id ? (
                <>
                  {statusEditFullName ||
                  statusEditEmail ||
                  statusEditWallet ||
                  statusEditTokenAmount ? (
                    <img
                      // onClick={handleSave}
                      src="/images/iconSuccess.svg"
                      alt=""
                      style={{ opacity: 0.5, cursor: "default" }}
                    />
                  ) : (
                    <img
                      onClick={handleSave}
                      src="/images/iconSuccess.svg"
                      alt=""
                    />
                  )}
                  <img
                    onClick={() => handleCancel(item)}
                    src="/images/iconCancel.svg"
                    alt=""
                  />
                </>
              ) : (
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
                  {renderOpenModalDelete(item.investor_id)}
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
