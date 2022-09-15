import { lazy, Suspense } from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import PageLoader from "../components/PageLoader";
import Notification from "../components/Notification";

import history from "../history";
import Layout from "../components/Layout";

const RouteListPage = lazy(() => import("./RouteListPage"));
const RoutePage = lazy(() => import("./RoutePage"));

const Containers = () => {
  return (
    <Router history={history}>
      <Suspense fallback={<PageLoader />}>
        <Notification />
        <Routes>
          <Route element={<Layout />}>
            <Route path="/route-list" element={<RouteListPage />} />

            <Route path="/route/:routeId" element={<RoutePage />} />
            <Route path="/route/new" element={<RoutePage />} />
            <Route path="*" element={<Navigate to="/route-list" replace />} />
          </Route>
        </Routes>
      </Suspense>
    </Router>
  );
};

export default Containers;
