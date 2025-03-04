import type { ComponentType, JSX } from "react";

import { IndexPage } from "@/pages/IndexPage/IndexPage";
import { InitDataPage } from "@/pages/InitDataPage.tsx";
import { LaunchParamsPage } from "@/pages/LaunchParamsPage.tsx";
import { ThemeParamsPage } from "@/pages/ThemeParamsPage.tsx";
import CasinoPage from "@/pages/CasinoPage";

interface Route {
  path: string;
  Component: ComponentType;
  title?: string;
  icon?: JSX.Element;
}

export const routes: Route[] = [
  { path: "/", Component: IndexPage },
  { path: "/casino", Component: CasinoPage, title: "Lucky Roulette" },
  { path: "/init-data", Component: InitDataPage, title: "Init Data" },
  { path: "/theme-params", Component: ThemeParamsPage, title: "Theme Params" },
  {
    path: "/launch-params",
    Component: LaunchParamsPage,
    title: "Launch Params",
  },
];
