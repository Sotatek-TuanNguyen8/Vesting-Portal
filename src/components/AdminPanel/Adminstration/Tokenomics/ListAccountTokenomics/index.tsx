import { useEffect, useState } from "react";
import InputTableEditDefault from "../../../../common/InputEditDefault";
import useStyles from "./style";
import { editTableTokenimics, getDataTokenomics } from "../../../../../service";
import _ from "lodash";
import { toast } from "react-toastify";
// let data = [
//   {
//     id: 1,
//     sales_stage: "Angel",
//     token_amount: 1000000,
//     tge_amount: 50000,
//     cliff: 12,
//     linear_vesting: 11,
//   },
// ];

export default function ListAccountTokenomics(props: any) {
  const { openAdd, setAdd } = props;
  const styles = useStyles();
  const [isEdit, setIsEdit] = useState<boolean | null>(null);
  const [editDataItem, setEditDataItem] = useState<any | undefined | never>({});
  const [dataTable, setDataTable] = useState<Array<any>>([]);
  const [fieldAddItem, setFieldAddItem] = useState<any | never | undefined>({
    sales_stage: "",
    token_amount: "",
    tge_amount: "",
    cliff: "",
    linear_vesting: "",
  });
  const handleDelete = (e: any) => {};
  // console.log(dataItem);

  const handleEdit = (e: any, id: any) => {
    setIsEdit(id);
    setEditDataItem(e);
  };
  //edit confirm
  const handleSaveEdit = async (data: any) => {
    const res = await editTableTokenimics(data.id, {
      name: data.name,
      token_amount: data.token_amount,
      tge_amount: data.tge_amount,
      cliff: data.cliff,
      linear_vesting: data.linear_vesting,
    });
    if (!res) return;
    if (res?.error?.statusCode === 404 || res?.error?.statusCode === 406) {
      toast.error(res?.error?.message);
      return;
    } else {
      toast.success("Update Successfully");
      setIsEdit(null);
    }
  };

  const handleCancel = () => {
    setEditDataItem({});
    setIsEdit(null);
  };
  const handleChangeInputTable = (e: any, field: any) => {
    console.log(e, field, editDataItem);
    setEditDataItem({
      ...editDataItem,
      [field]: e,
    });
  };
  const handleChangeInputAdd = (e: any, field: any) => {
    console.log(e);

    setFieldAddItem({
      ...fieldAddItem,
      [field]: e,
    });
  };

  const handleCloseAdd = () => {
    setAdd(false);
    setFieldAddItem({});
  };
  const confirmAdd = () => {
    // if (openAdd) {
    //   dataTable?.unshift(fieldAddItem ?? {});
    // }
  };
  const getDataTable = async () => {
    const renderData = await getDataTokenomics();
    if (!renderData) return;
    setDataTable(renderData?.data);
  };
  useEffect(() => {
    getDataTable();
  }, []);
  return (
    <div className={styles.container}>
      <div className={styles.tableHeader}>
        <div className="header">
          <p>Sales stage</p>
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
              type="text"
              status={true}
              value={fieldAddItem?.sales_stage ?? ""}
              field="sales_stage"
              onChange={handleChangeInputAdd}
            />
            <InputTableEditDefault
              type="number"
              status={true}
              value={fieldAddItem?.token_amount ?? ""}
              field="token_amount"
              onChange={handleChangeInputAdd}
            />
            <InputTableEditDefault
              type="number"
              status={true}
              value={fieldAddItem?.tge_amount ?? ""}
              field="tge_amount"
              onChange={handleChangeInputAdd}
            />
            <InputTableEditDefault
              type="number"
              status={true}
              value={fieldAddItem?.cliff ?? ""}
              field="cliff"
              onChange={handleChangeInputAdd}
            />
            <InputTableEditDefault
              type="number"
              status={true}
              value={fieldAddItem?.linear_vesting ?? ""}
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
                type="text"
                status={isEdit === item.id}
                value={
                  isEdit === item.id && !_.isEmpty(editDataItem)
                    ? editDataItem.name
                    : item.name
                }
                field="name"
                onChange={handleChangeInputTable}
              />
              <InputTableEditDefault
                type="number"
                status={isEdit === item.id}
                value={
                  isEdit === item.id && !_.isEmpty(editDataItem)
                    ? editDataItem.token_amount
                    : item.token_amount
                }
                field="token_amount"
                onChange={handleChangeInputTable}
              />
              <InputTableEditDefault
                type="number"
                status={isEdit === item.id}
                value={
                  isEdit === item.id && !_.isEmpty(editDataItem)
                    ? editDataItem.tge_amount
                    : item.tge_amount
                }
                field="tge_amount"
                onChange={handleChangeInputTable}
              />
              <InputTableEditDefault
                type="number"
                status={isEdit === item.id}
                value={
                  isEdit === item.id && !_.isEmpty(editDataItem)
                    ? editDataItem.cliff
                    : item.cliff
                }
                field="cliff"
                onChange={handleChangeInputTable}
              />
              <InputTableEditDefault
                type="number"
                status={isEdit === item.id}
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
                      onClick={() => handleDelete(item)}
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
    </div>
  );
}
