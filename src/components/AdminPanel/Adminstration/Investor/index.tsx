import { useCallback, useEffect, useState } from "react";
import Administration from "..";
import AdminPanel from "../..";
import ListAccountInvestor from "./ListAccountInvestor";
import ModalAddNew from "./ModalAddNew";
import useStyles from "./style";
import AdminLayout from "../../../admin-auth/layoutAdmin/index";
import _ from "lodash";
import { IListInvestor } from "../../../../utils";
import { getListInvestor } from "../../../../service/admin.service";
import PaginationCustom from "../Pagination";

type Props = {};
export interface InInvestor {
  email: string;
  full_name: string;
  investor_id: number;
  claimed: string;
  allocation_token: string;
  stage_name: string;
  wallet_address: string;
  tokensVested: string;
}

export default function Investors({}: Props) {
  const styles = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [dataListInvestor, setDataListInvestor] = useState<InInvestor[]>([]);
  const [count, setCount] = useState<number>(1);
  const [query, setQuery] = useState<IListInvestor>({
    search: "",
    stages_id: [],
    page_number: 0,
    page_size: 10,
  });

  const fetchListInvestors = useCallback(async () => {
    const res = await getListInvestor(
      query,
      sessionStorage.getItem("access_token") as string
    );
    if (res?.data) {
      setDataListInvestor(res?.data);
      setCount(res?.meta?.count);
    }
  }, [query]);

  useEffect(() => {
    fetchListInvestors();
  }, [fetchListInvestors]);

  const renderOpenModalAddNew = () => (
    <ModalAddNew open={open} onClose={handleClose} body={query} />
  );

  const handleAddNew = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const debounceSearch = _.debounce((e) => {
    setQuery({ ...query, search: e.target.value });
  }, 1000);

  const handleSearch = (e: any) => {
    debounceSearch(e);
  };

  const handleFilter = (data: string[]) => {
    setQuery({ ...query, stages_id: data });
  };

  return (
    <div>
      <AdminLayout>
        <AdminPanel />
        <div className={styles.container}>
          <Administration active={"investor"} />
          <div className="listInvestor">
            <div className="new">
              <img onClick={handleAddNew} src="/images/iconAdd.svg" alt="" />
              <p>New</p>
            </div>
            <div className={styles.body}>
              <div className="search">
                <img src="/images/iconSearch.svg" alt="" />
                <input type="text" onChange={(e) => handleSearch(e)} />
              </div>
              <ListAccountInvestor
                dataListInvestor={dataListInvestor}
                onFilter={handleFilter}
              />
              {dataListInvestor?.length > 0 && (
                <PaginationCustom
                  count={Math.ceil(count / query?.page_size)}
                  onChange={(page) =>
                    setQuery({ ...query, page_number: page - 1 })
                  }
                />
              )}
            </div>
            {renderOpenModalAddNew()}
          </div>
        </div>
      </AdminLayout>
    </div>
  );
}
