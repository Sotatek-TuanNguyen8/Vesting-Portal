import { useCallback, useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { InInvestor } from "..";
import {
  getListStage,
  updateInvestorNew,
} from "../../../../../service/admin.service";
import {
  formatAmount,
  format_thousands_decimal,
} from "../../../../../utils/common/fn";
import InputTableEdit from "../../../../common/InputEdit";
import ModalSaleStage from "../../../../common/InputEdit/ModalSaleStage";
import ModalDelete from "../ModalDelete";
import FilterAdmin, { IData } from "./ModalFilterSaleStage";
import useStyles from "./style";

type Props = {
  dataListInvestor: InInvestor[];
  onFilter: (data: string[]) => void;
  fetchListInvestors: () => void;
  count: number;
  isOpenFilter: boolean;
  setOpenFilter: (value: boolean) => void;
  isFixed: boolean;
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
  fetchListInvestors,
  count,
  isOpenFilter,
  setOpenFilter,
  isFixed,
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
  const [msgTokenAmount, setMsgTokenAmount] = useState<string>("");
  const [idDelete, setIdDelete] = useState<number>();
  const [data, setData] = useState<IData[]>([]);

  const getList = async () => {
    const res = await getListStage();
    if (res?.data) {
      setData(res?.data);
    }
  };

  useEffect(() => {
    getList();
  }, []);

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
    <ModalDelete
      open={openModalDelete}
      onClose={handleCloseModalDelete}
      id={idDelete}
      fetchListInvestors={fetchListInvestors}
    />
  );

  const handleCloseModalDelete = () => {
    setOpenModalDelete(false);
  };

  const handleDelete = (e: any) => {
    setOpenModalDelete(true);
    setIdDelete(e.investor_id);
  };

  const handleEdit = async (e: any) => {
    setIsEdit(true);
    setDataItem(e);
  };

  const handleSave = useCallback(async () => {
    const dataUpdate = await updateInvestorNew(dataItem.investor_id, {
      wallet_address: dataItem?.wallet_address,
      allocation_token: Number(dataItem?.allocation_token),
      stage_id: dataItem?.stage_id,
      full_name: dataItem?.full_name,
      email: dataItem?.email,
    });

    if (dataUpdate?.status === 200) {
      setIsEdit(false);
      toast.success("Update Successfully");
    } else if (dataUpdate?.status === 400) {
      setDuplicateWallet(true);
    } else if (dataUpdate?.status === 409) {
      setDuplicateEmail(true);
    } else if (dataUpdate?.status === 406) {
      setTokenAmountInvalid(true);
      setMsgTokenAmount(dataUpdate?.data?.error.message);
    } else {
      setIsEdit(false);
    }
    fetchListInvestors();
  }, [dataItem, fetchListInvestors]);

  const handleCancel = (e: any) => {
    setIsEdit(false);
    setDuplicateWallet(false);
    setDuplicateEmail(false);
    setTokenAmountInvalid(false);
  };

  const handleChangeInputTable = (e: any, field: number) => {
    setDuplicateWallet(false);
    setDuplicateEmail(false);
    setTokenAmountInvalid(false);
    setDataItem({
      ...dataItem,
      [field]: e,
    });
  };

  const handleClickFilter = () => {
    setOpenFilter(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleSelect = (e: any) => {
    setDataItem({
      ...dataItem,
      stage_name: data?.filter((el) => el.id === e)[0]?.name,
      stage_id: e,
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
          <div className={styles.saleStage}>
            Sale stage
            <img
              onClick={(e) => {
                handleClickFilter();
                e.stopPropagation();
              }}
              src="/images/iconFilter.svg"
              alt=""
            />
            <div
              className="modalSaleStage"
              onClick={(e) => e.stopPropagation()}
            >
              <FilterAdmin
                open={isOpenFilter}
                onClose={handleCloseFilter}
                onFilter={handleFilter}
                data={data}
              />
            </div>
          </div>
          <p>Tokens vested</p>
          <p>Tokens claimed</p>
          <p style={{ width: "9%" }}></p>
        </div>
        <div className={styles.border}></div>
      </div>
      {count > 0 ? (
        dataListInvestor?.map((item: any) => (
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
                msgTokenAmount={msgTokenAmount}
                value={
                  isEdit && item.investor_id === dataItem.investor_id
                    ? dataItem.allocation_token
                    : item?.allocation_token
                }
                field="allocation_token"
                onChange={handleChangeInputTable}
                isFixed={isFixed}
              />

              <ModalSaleStage
                open={open}
                status={isEdit && item.investor_id === dataItem.investor_id}
                onClose={handleClose}
                value={
                  isEdit && item.investor_id === dataItem.investor_id
                    ? dataItem?.stage_id
                    : item?.stage_id
                }
                data={data}
                onClickSelect={handleSelect}
                isFixed={isFixed}
              />

              <div className="tokensVested">
                {item?.token_vested
                  ? format_thousands_decimal(item?.token_vested)
                  : ""}
              </div>
              <div className="tokensClaimed">
                {item?.claimed ? format_thousands_decimal(item?.claimed) : ""}
              </div>

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
                    {renderOpenModalDelete()}
                  </>
                )}
              </div>
            </div>
            <div className={styles.border}></div>
          </div>
        ))
      ) : (
        <div className={styles.noResult}>No Results</div>
      )}
    </div>
  );
}
