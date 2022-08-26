import { useState } from "react";
import InputTableEdit from "../../../../common/InputEdit";
import useStyles from "./style";

let data = [
  {
    id: 1,
    sales_stage: "Angel",
    token_amount: 1000000,
    tge_amount: 50000,
    cliff: 12,
    linear_vesting: 11,
  },
];

const dataItemDefault = {
  id: 1,
  sales_stage: "Angel",
  token_amount: 0,
  tge_amount: 0,
  cliff: 0,
  linear_vesting: 0,
};

export default function ListAccountTokenomics(props: any) {
  const { openAdd, setAdd } = props;
  const styles = useStyles();
  const [isEdit, setIsEdit] = useState<boolean>(false);
  const [dataItem, setDataItem] = useState<any>(dataItemDefault);
  const [fieldAddItem, setFieldAddItem] = useState<any>({
    sales_stage: "",
    token_amount: 0,
    tge_amount: 0,
    cliff: 0,
    linear_vesting: 0,
  });
  const handleDelete = (e: any) => {};

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
  const handleChangeInputAdd = (e: any, field: any) => {
    setFieldAddItem({
      ...fieldAddItem,
      [field]: e,
    });
  };

  const handleClose = () => {
    setAdd(false);
    setFieldAddItem({
      sales_stage: "",
      token_amount: 0,
      tge_amount: 0,
      cliff: 0,
      linear_vesting: 0,
    });
  };
  const confirmAdd = () => {
    if (openAdd) {
      console.log(data);
      data.unshift(fieldAddItem);
    }
  };

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
      {/* {openAdd && (
        <div className={styles.addWrap}>
          <div className={styles.content}>
            <InputTableEdit
              // type="text"
              status={true}
              value={fieldAddItem?.sales_stage ?? ""}
              field="sales_stage"
              onChange={handleChangeInputAdd}
            />
            <InputTableEdit
              // type="number"
              status={true}
              value={fieldAddItem?.token_amount ?? ""}
              field="token_amount"
              onChange={handleChangeInputAdd}
            />
            <InputTableEdit
              // type="number"
              status={true}
              value={fieldAddItem?.tge_amount ?? ""}
              field="tge_amount"
              onChange={handleChangeInputAdd}
            />
            <InputTableEdit
              type="number"
              status={true}
              value={fieldAddItem?.cliff ?? ""}
              field="cliff"
              onChange={handleChangeInputAdd}
            />
            <InputTableEdit
              type="number"
              status={true}
              value={fieldAddItem?.linear_vesting ?? ""}
              field="linear_vesting"
              onChange={handleChangeInputAdd}
            />
            <div className={styles.action}>
              <img onClick={confirmAdd} src="/images/iconSuccess.svg" alt="" />
              <img
                onClick={() => handleClose()}
                src="/images/iconCancel.svg"
                alt=""
              />
            </div>
          </div>
        </div>
      )}
      {data.map((item,index) => (
        <div key={index} className={styles.tableBody}>
          <div className="content">
            <InputTableEdit
              type="text"
              status={isEdit}
              value={dataItem.sales_stage || item.sales_stage}
              field="sales_stage"
              onChange={handleChangeInputTable}
            />
            <InputTableEdit
              type="number"
              status={isEdit}
              value={dataItem.token_amount || item.token_amount}
              field="token_amount"
              onChange={handleChangeInputTable}
            />
            <InputTableEdit
              type="number"
              status={isEdit}
              value={dataItem.tge_amount || item.tge_amount}
              field="tge_amount"
              onChange={handleChangeInputTable}
            />
            <InputTableEdit
              type="number"
              status={isEdit}
              value={dataItem.cliff || item.cliff}
              field="cliff"
              onChange={handleChangeInputTable}
            />
            <InputTableEdit
              type="number"
              status={isEdit}
              value={dataItem.linear_vesting || item.linear_vesting}
              field="linear_vesting"
              onChange={handleChangeInputTable}
            />
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
      ))} */}
    </div>
  );
}
