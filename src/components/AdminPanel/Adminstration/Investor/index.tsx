import { Button } from "@mui/material";
import _ from "lodash";
import { useCallback, useEffect, useRef, useState } from "react";
import Administration from "..";
import AdminPanel from "../..";
import { UploadRootIcon } from "../../../../assets/svgs";
import { getListInvestor } from "../../../../service/admin.service";
import { IListInvestor } from "../../../../utils";
import { scrollIntoView } from "../../../../utils/common/fn";
import AdminLayout from "../../../admin-auth/layoutAdmin/index";
import PaginationCustom from "../Pagination";
import UpdateRoot from "../UpdateRoot";
import ListAccountInvestor from "./ListAccountInvestor";
import ModalAddNew from "./ModalAddNew";
import useStyles from "./style";

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

export default function Investors() {
  const styles = useStyles();
  const [open, setOpen] = useState<boolean>(false);
  const [dataListInvestor, setDataListInvestor] = useState<InInvestor[]>([]);
  const [openFilter, setOpenFilter] = useState<boolean>(false);
  const [valueInput, setValueInput] = useState<string>();
  const timeoutRef = useRef<any>(null);
  const scrollIntoViewRef = useRef<any>(null);

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
      sessionStorage.getItem("access_token") as string,
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
    <ModalAddNew
      open={open}
      onClose={handleClose}
      fetchListInvestors={fetchListInvestors}
    />
  );

  const handleAddNew = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSearch = (e: any) => {
    setValueInput(e.target.value);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      setQuery({ ...query, search: e.target.value, page_number: 0 });
    }, 1000);
  };

  const handleFilter = (data: string[]) => {
    setQuery({ ...query, stages_id: data, page_number: 0 });
  };

  const handleClearValueInput = () => {
    setValueInput("");
    setQuery({ ...query, search: "", page_number: 0 });
  };

  return (
    <div>
      <AdminLayout>
        <AdminPanel />
        <div className={styles.container} onClick={() => setOpenFilter(false)}>
          <Administration active={"investor"} />
          <div className="listInvestor">
            <div className={styles.navTop}>
              <div className="new">
                <img onClick={handleAddNew} src="/images/iconAdd.svg" alt="" />
                <p onClick={handleAddNew}>New</p>
              </div>
              <UpdateRoot
                variant="contained"
                sx={{
                  background: "#BBBBBB",
                  marginRight: "45px",
                  fontSize: "400",
                  fontWeight: "18px",
                  color: "#E9E9F0",
                  textTransform: "initial",
                }}
              />
            </div>

            <div className={styles.body} ref={scrollIntoViewRef}>
              <div className="search">
                <img src="/images/iconSearch.svg" alt="" />
                <input
                  type="text"
                  value={valueInput}
                  onChange={(e) => handleSearch(e)}
                />
                {valueInput && (
                  <img
                    src="/images/iconClose.svg"
                    alt=""
                    style={{ cursor: "pointer" }}
                    onClick={handleClearValueInput}
                  />
                )}
              </div>
              <ListAccountInvestor
                dataListInvestor={dataListInvestor}
                onFilter={handleFilter}
                fetchListInvestors={fetchListInvestors}
                count={count}
                isOpenFilter={openFilter}
                setOpenFilter={(value) => setOpenFilter(value)}
              />
              {count > 10 && (
                <PaginationCustom
                  count={Math.ceil(count / query?.page_size)}
                  onChange={(page) => {
                    setQuery({ ...query, page_number: page - 1 });
                    scrollIntoView(scrollIntoViewRef);
                  }}
                  page={query?.page_number + 1}
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
