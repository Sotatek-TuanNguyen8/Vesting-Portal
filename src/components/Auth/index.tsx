import { Typography } from "@material-ui/core";
import clsx from "clsx";
import Link from "next/link";
import { useRouter } from "next/router";
import { ReactNode } from "react";
import styles from "./styles.module.scss";
import { Logo } from "@/svgs";
type Props = {
  isTab?: boolean;
  children?: ReactNode;
};

export default function AuthLayout({ isTab = true, children }: Props) {
  const router = useRouter();
  const { pathname } = router;

  return (
    <div className={styles.container}>
      <div className={styles.boxContainer}>
        <div className={styles.logo}>
          <Logo />
          <Typography variant="body1">
            LIQUIDITY AGGREGATION, TRANSFORMED
          </Typography>
        </div>
        <div className={styles.content}>
          {isTab && (
            <div className={styles.box}>
              <div className={styles.tab}>
                <Link href="/sign-up">
                  <div
                    className={clsx(
                      styles.btnTab,
                      pathname === "/sign-up" && styles.activeTab
                    )}
                  >
                    SIGN UP
                  </div>
                </Link>

                <Link href="/login">
                  <div
                    className={clsx(
                      styles.btnTab,
                      pathname === "/login" && styles.activeTab
                    )}
                  >
                    LOGIN
                  </div>
                </Link>
              </div>
            </div>
          )}
          {children}
        </div>
      </div>
    </div>
  );
}
