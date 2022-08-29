import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import _, { isNumber, toNumber } from "lodash";
import InputTableEditDefault from "../../../../common/InputEditDefault";
import useStyles from "./style";

import ModalDelete from "../ModalDelete";
import {
  addTokenomics,
  editTableTokenimics,
} from "../../../../../service/admin.service";

export default function ListAccountTokenomics(props: any) {
  const { openAdd, setAdd, dataTable, renderTable } = props;
  const styles = useStyles();
  const [isEdit, setIsEdit] = useState<boolean | null>(null);
  const [openDeleteStatus, setOpenDeleteStatus] = useState<boolean>(false);
  const [editDataItem, setEditDataItem] = useState<any | undefined | never>({});
  const [itemDelete, setItemDelete] = useState<any | undefined | never>({});
  const [fieldAddItem, setFieldAddItem] = useState<any | never | undefined>({
    name: "",
    vesting_type_id: "",
    token_amount: "",
    tge_amount: "",
    cliff: "",
    linear_vesting: "",
  });
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
      checkValidate(editDataItem.name) ||
      checkValidate(editDataItem.token_amount) ||
      checkValidate(editDataItem.tge_amount) ||
      checkValidate(editDataItem.cliff) ||
      checkValidate(editDataItem.linear_vesting)
    )
      return;
    const res = await editTableTokenimics(data.id, {
      name: editDataItem.name,
      token_amount: toNumber(editDataItem.token_amount),
      tge_amount: toNumber(editDataItem.tge_amount),
      cliff: toNumber(editDataItem.cliff),
      linear_vesting: toNumber(editDataItem.linear_vesting),
      vesting_type_id: editDataItem.vesting_type_id
        ? toNumber(editDataItem.vesting_type_id)
        : editDataItem.vesting_type_id,
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
    setEditDataItem({});
    setIsEdit(null);
  };
  const handleChangeInputTable = (e: any, field: any) => {
    setEditDataItem({
      ...editDataItem,
      [field]: e,
    });
  };
  const handleChangeInputAdd = (e: any, field: any) => {
    setFieldAddItem({
      ...fieldAddItem,
      [field]: e,
    });
  };

  const handleCloseAdd = () => {
    setAdd(false);
    setFieldAddItem({});
  };
  const confirmAdd = async () => {
    if (
      checkValidate(fieldAddItem.name) ||
      checkValidate(fieldAddItem.token_amount) ||
      checkValidate(fieldAddItem.tge_amount) ||
      checkValidate(fieldAddItem.cliff) ||
      checkValidate(fieldAddItem.linear_vesting)
    )
      return;
    if (openAdd) {
      const res = await addTokenomics(fieldAddItem);
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
    setOpenDeleteStatus(false);
    await renderTable();
  };
  useEffect(() => {
    if (openAdd) {
      handleCancel();
    }
  }, [openAdd]);

  const checkValidate = (value: any) => {
    const specialChars = /[ `!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?~]/;
    if (specialChars.test(value) || !value) {
      return true;
    } else if (isNumber(value) && value > 1000000) {
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
              width="228px"
              type="text"
              status={true}
              value={fieldAddItem?.name ?? ""}
              defaultValue=""
              field="name"
              onChange={handleChangeInputAdd}
            />
            <InputTableEditDefault
              width="228px"
              type="text"
              status={true}
              value={fieldAddItem?.vesting_type_id ?? ""}
              defaultValue=""
              field="vesting_type_id"
              onChange={handleChangeInputAdd}
            />
            <InputTableEditDefault
              width="204px"
              type="number"
              status={true}
              value={fieldAddItem?.token_amount ?? ""}
              defaultValue=""
              field="token_amount"
              onChange={handleChangeInputAdd}
            />
            <InputTableEditDefault
              width="190px"
              type="number"
              status={true}
              value={fieldAddItem?.tge_amount ?? ""}
              defaultValue=""
              field="tge_amount"
              onChange={handleChangeInputAdd}
            />
            <InputTableEditDefault
              width="117px"
              type="number"
              status={true}
              value={fieldAddItem?.cliff ?? ""}
              defaultValue=""
              field="cliff"
              onChange={handleChangeInputAdd}
            />
            <InputTableEditDefault
              width="117px"
              type="number"
              status={true}
              value={fieldAddItem?.linear_vesting ?? ""}
              defaultValue=""
              field="linear_vesting"
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
                width="228px"
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
              />
              <InputTableEditDefault
                width="117px"
                type="text"
                status={isEdit === item.id}
                defaultValue={item.vesting_type_id}
                value={
                  isEdit === item.id && !_.isEmpty(editDataItem)
                    ? editDataItem.vesting_type_id
                    : item.vesting_type_id
                }
                field="vesting_type_id"
                onChange={handleChangeInputTable}
              />
              <InputTableEditDefault
                width="204px"
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
              />
              <InputTableEditDefault
                width="190px"
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
              />
              <InputTableEditDefault
                width="117px"
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
              />
              <InputTableEditDefault
                width="117px"
                type="number"
                status={isEdit === item.id}
                defaultValue={item.linear_vesting}
                value={
                  isEdit === item.id && !_.isEmpty(editDataItem)
                    ? editDataItem.linear_vesting
                    : item.linear_vesting
                }
                field="linear_vesting"
                onChange={handleChangeInputTable}
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
