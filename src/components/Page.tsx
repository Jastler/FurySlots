import { useNavigate } from "react-router-dom";
import { backButton } from "@telegram-apps/sdk-react";
import { PropsWithChildren, useEffect } from "react";

export function Page({
  children,
  back = true,
}: PropsWithChildren<{
  /**
   * True, якщо дозволено повертатися з цієї сторінки.
   */
  back?: boolean;
}>) {
  const navigate = useNavigate();

  useEffect(() => {
    if (back) {
      backButton.show();
      return backButton.onClick(() => {
        navigate(-1);
      });
    }
    backButton.hide();
  }, [back]);

  return <>{children}</>;
}
