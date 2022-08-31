import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import _, { toNumber } from "lodash";
import InputTableEditDefault from "../../../../common/InputEditDefault";
import useStyles from "./style";

import ModalDelete from "../ModalDelete";
import {
  addTokenomics,
  editTableTokenimics,
  getListVestingType,
} from "../../../../../service/admin.service";
import { IData } from "../../Investor/ListAccountInvestor/ModalFilterSaleStage";
import ModalSaleStageDefault from "../../../../common/InputEditDefault/ModalSaleStageDefault";

export default function ListAccountTokenomics(props: any) {
  const { openAdd, setAdd, dataTable, renderTable } = props;
  const styles = useStyles();
  const [isEdit, setIsEdit] = useState<boolean | null>(null);
  const [openDeleteStatus, setOpenDeleteStatus] = useState<boolean>(false);
  const [editDataItem, setEditDataItem] = useState<any | undefined | never>({
    name: "",
    token_amount: "",
    tge_amount: "",
    cliff: "",
    linear_vesting: "",
    vesting_type_id: "",
  });
  const [itemDelete, setItemDelete] = useState<any | undefined | never>({});
  const [fieldAddItem, setFieldAddItem] = useState<any | never | undefined>({
    name: "",
    vesting_type_id: 1,
    token_amount: "",
    tge_amount: "",
    cliff: "",
    linear_vesting: "",
  });
  const [vestingData, setVestingData] = useState<IData[]>([]);
  const [openVestingOption, setOpenVestingOption] = useState<boolean>(false);
  const [showErrorMsgEdit, setShowErrorMsgEdit] = useState<boolean>(false);
  const [showErrorMsgAdd, setShowErrorMsgAdd] = useState<boolean>(false);
  const getListVesting = async () => {
    const res = await getListVestingType();
    if (res?.data) {
      setVestingData(res?.data);
    }
  };
  const handleEdit = (e: any, id: any) => {
    setIsEdit(id);
    setEditDataItem({
      name: e.name,
      token_amount: e.token_amount,
      tge_amount: e.tge_amount,
      cliff: e.cliff,
      linear_vesting: e.linear_vesting,
      vesting_type_id: e.vesting_type_id,
    });
  };
  //edit confirm
  const handleSaveEdit = async (data: any) => {
    if (
      checkValidate(editDataItem.name, "text", "name") ||
      checkValidate(editDataItem.token_amount, "number", "token_amount") ||
      checkValidate(editDataItem.tge_amount, "number", "tge_amount") ||
      checkValidate(editDataItem.cliff, "number", "cliff") ||
      checkValidate(editDataItem.linear_vesting, "number", "linear_vesting") ||
      checkValidate(editDataItem.vesting_type_id, "number", "vesting_type")
    ) {
      setShowErrorMsgEdit(true);
      return;
    }
    setShowErrorMsgEdit(false);

    // return;
    const res = await editTableTokenimics(data.id, {
      name: editDataItem.name,
      token_amount: toNumber(editDataItem.token_amount),
      tge_amount: toNumber(editDataItem.tge_amount),
      cliff: toNumber(editDataItem.cliff),
      linear_vesting: toNumber(editDataItem.linear_vesting),
      vesting_type_id: toNumber(editDataItem.vesting_type_id),
    });
    if (!res) return;
    if (res?.error && res?.error?.message) {
      toast.error(res?.error?.message);
      return;
    } else {
      toast.success("Update Successfully");
      setIsEdit(null);
      await renderTable();
    }
  };

  const handleCancel = () => {
    setShowErrorMsgEdit(false);
    setEditDataItem({});
    setIsEdit(null);
    setOpenVestingOption(false);
  };

  const handleChangeInputTable = (e: any, field: any) => {
    const check = /^(\d+(\.\d{0,4})?|\.?\d{0,4})$/;
    if (field === "cliff" || field === "linear_vesting") {
      if (check.test(e)) {
        setEditDataItem({
          ...editDataItem,
          [field]: e,
        });
      }
    } else {
      setEditDataItem({
        ...editDataItem,
        [field]: e,
      });
    }
  };
  const handleChangeInputAdd = (e: any, field: any) => {
    const check = /^(\d+(\.\d{0,4})?|\.?\d{0,4})$/;
    if (field === "cliff" || field === "linear_vesting") {
      if (check.test(e)) {
        setFieldAddItem({
          ...fieldAddItem,
          [field]: e,
        });
      }
    } else {
      setFieldAddItem({
        ...fieldAddItem,
        [field]: field === "name" ? e : toNumber(e),
      });
    }
  };

  const handleCloseAdd = () => {
    setAdd(false);
    setFieldAddItem({});
  };
  const confirmAdd = async () => {
    if (
      checkValidate(fieldAddItem.name, "text", "name") ||
      checkValidate(fieldAddItem.token_amount, "number", "token_amount") ||
      checkValidate(fieldAddItem.tge_amount, "number", "tge_amount") ||
      checkValidate(fieldAddItem.cliff, "number", "cliff") ||
      checkValidate(fieldAddItem.linear_vesting, "number", "linear_vesting")
    ) {
      setShowErrorMsgAdd(true);
      return;
    }

    setShowErrorMsgAdd(false);
    if (openAdd) {
      const res = await addTokenomics({
        cliff: fieldAddItem.cliff,
        linear_vesting: fieldAddItem.linear_vesting,
        name: fieldAddItem.name,
        tge_amount: fieldAddItem.tge_amount,
        token_amount: fieldAddItem.token_amount,
        vesting_type_id: fieldAddItem.vesting_type_id,
      });
      if (!res) return;
      if (res?.error && res?.error?.message) {
        toast.error(res?.error?.message);
        return;
      } else {
        await renderTable();
        toast.success("Add successfully");
        handleCloseAdd();
      }
    }
  };
  const handleClosePopup = async () => {
    setShowErrorMsgAdd(false);
    setOpenDeleteStatus(false);
    await renderTable();
  };
  useEffect(() => {
    if (openAdd) {
      handleCancel();
    }
  }, [openAdd]);
  useEffect(() => {
    getListVesting();
  }, []);

  const checkValidate = (value: any, type: string, field: string) => {
    const specialChars = /[`!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if ((specialChars.test(value) && type !== "number") || !value) {
      return true;
    } else if (
      (type === "number" && toNumber(value) > 1000000) ||
      (type === "number" && toNumber(value) === 0)
    ) {
      return true;
    } else if (field === "tge_amount" && toNumber(value) > 100) {
      return true;
    } else if (field === "vesting_type" && value === null) {
      return true;
    } else {
      return false;
    }
  };
  const handleDelete = (id: number, count: number) => {
    setItemDelete({
      id: id,
      count: count,
    });
    setOpenDeleteStatus(true);
  };
  const handleCloseVesting = () => {
    setOpenVestingOption(false);
  };
  const handleSelectVesting = (e: any) => {
    setEditDataItem({
      ...editDataItem,
      vesting_type_name: vestingData?.filter((el: any) => el.id === e)[0]?.name,
      vesting_type_id: e,
    });
  };

  const handleSelectVestingAdd = (e: any) => {
    setFieldAddItem({
      ...fieldAddItem,
      vesting_type_name: vestingData?.filter((el: any) => el.id === e)[0]?.name,
      vesting_type_id: e,
    });
  };

  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <div className="header">
          <p>Sales stage</p>
          <p>Vesting type </p>
          <p>Token amount</p>
          <p>TGE amount</p>
          <p>Cliff (days)</p>
          <p>Linear vesting (days)</p>
          <p></p>
        </div>
        <div className={styles.border}></div>
      </div>
      {openAdd && (
        <div className={styles.addWrap}>
          <div className={styles.content}>
            <InputTableEditDefault
              width="80%"
              type="text"
              status={true}
              value={fieldAddItem?.name ?? ""}
              defaultValue=""
              field="name"
              active={showErrorMsgAdd}
              onChange={handleChangeInputAdd}
            />

            <ModalSaleStageDefault
              open={true}
              status={true}
              onClose={handleCloseVesting}
              value={
                fieldAddItem?.vesting_type_id
                  ? fieldAddItem?.vesting_type_id
                  : vestingData[0].id
              }
              field={"vesting_type"}
              type={"select"}
              data={vestingData}
              defaultValue=""
              active={showErrorMsgAdd}
              onClickSelect={handleSelectVestingAdd}
            />
            <InputTableEditDefault
              width="80%"
              type="number"
              status={true}
              value={fieldAddItem?.token_amount ?? ""}
              defaultValue=""
              field="token_amount"
              active={showErrorMsgAdd}
              onChange={handleChangeInputAdd}
            />
            <InputTableEditDefault
              width="80%"
              type="number"
              status={true}
              value={fieldAddItem?.tge_amount ?? ""}
              defaultValue=""
              field="tge_amount"
              active={showErrorMsgAdd}
              onChange={handleChangeInputAdd}
            />
            <InputTableEditDefault
              width="80%"
              type="number"
              status={true}
              value={fieldAddItem?.cliff ?? ""}
              defaultValue=""
              field="cliff"
              active={showErrorMsgAdd}
              onChange={handleChangeInputAdd}
            />
            <InputTableEditDefault
              width="80%"
              type="number"
              status={true}
              value={fieldAddItem?.linear_vesting ?? ""}
              defaultValue=""
              field="linear_vesting"
              active={showErrorMsgAdd}
              onChange={handleChangeInputAdd}
            />
            <div className={styles.action}>
              <img onClick={confirmAdd} src="/images/iconSuccess.svg" alt="" />
              <img
                onClick={() => handleCloseAdd()}
                src="/images/iconCancel.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      )}
      {dataTable.length > 0 &&
        dataTable.map((item: any, index: any) => (
          <div key={index} className={styles.tableBody}>
            <div className="content">
              <InputTableEditDefault
                width="80%"
                type="text"
                status={isEdit === item.id}
                defaultValue={item.name}
                value={
                  isEdit === item.id && !_.isEmpty(editDataItem)
                    ? editDataItem.name
                    : item.name
                }
                field="name"
                onChange={handleChangeInputTable}
                active={showErrorMsgEdit}
              />
              <ModalSaleStageDefault
                open={openVestingOption}
                status={isEdit === item.id}
                onClose={handleCloseVesting}
                value={
                  isEdit === item.id
                    ? editDataItem?.vesting_type_id
                    : item?.vesting_type_id
                }
                data={vestingData}
                onClickSelect={handleSelectVesting}
                field={"vesting_type"}
                type={"select"}
                defaultValue={
                  isEdit === item.id
                    ? editDataItem?.vesting_type_id
                    : item?.vesting_type_id
                }
                active={showErrorMsgEdit}
              />
              <InputTableEditDefault
                width="80%"
                type="number"
                status={isEdit === item.id}
                defaultValue={item.token_amount}
                value={
                  isEdit === item.id && !_.isEmpty(editDataItem)
                    ? editDataItem.token_amount
                    : item.token_amount
                }
                field="token_amount"
                onChange={handleChangeInputTable}
                active={showErrorMsgEdit}
              />
              <InputTableEditDefault
                width="80%"
                type="number"
                status={isEdit === item.id}
                defaultValue={item.tge_amount}
                value={
                  isEdit === item.id && !_.isEmpty(editDataItem)
                    ? editDataItem.tge_amount
                    : item.tge_amount
                }
                field="tge_amount"
                onChange={handleChangeInputTable}
                active={showErrorMsgEdit}
              />
              <InputTableEditDefault
                width="80%"
                type="number"
                status={isEdit === item.id}
                defaultValue={item.cliff}
                value={
                  isEdit === item.id && !_.isEmpty(editDataItem)
                    ? editDataItem.cliff
                    : item.cliff
                }
                field="cliff"
                onChange={handleChangeInputTable}
                active={showErrorMsgEdit}
              />
              <InputTableEditDefault
                width="80%"
                type="number"
                step="1"
                status={isEdit === item.id}
                defaultValue={item.linear_vesting}
                value={
                  isEdit === item.id && !_.isEmpty(editDataItem)
                    ? editDataItem.linear_vesting
                    : item.linear_vesting
                }
                field="linear_vesting"
                onChange={handleChangeInputTable}
                active={showErrorMsgEdit}
              />
              <div className="action">
                {isEdit !== item.id ? (
                  <>
                    <img
                      onClick={() => {
                        handleDelete(item.id, item.investor_count);
                      }}
                      src="/images/iconDelete.svg"
                      alt=""
                    />
                    <img
                      onClick={() => handleEdit(item, item?.id)}
                      src="/images/iconEdit.svg"
                      alt=""
                    />
                  </>
                ) : (
                  <>
                    <img
                      onClick={() => {
                        handleSaveEdit(item);
                      }}
                      src="/images/iconSuccess.svg"
                      alt=""
                    />
                    <img
                      onClick={() => handleCancel()}
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
      <ModalDelete
        open={openDeleteStatus}
        onClose={handleClosePopup}
        id={itemDelete?.id}
        count={itemDelete?.count}
      />
    </div>
  );
}
