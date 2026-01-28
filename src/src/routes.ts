import { createBrowserRouter } from "react-router";
import { ConsultationForm } from "./components/ConsultationForm";
import { ProcessingScreen } from "./components/ProcessingScreen";
import { ResultScreen } from "./components/ResultScreen";
import { DetailedProfile } from "./components/DetailedProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: ConsultationForm,
  },
  {
    path: "/processing",
    Component: ProcessingScreen,
  },
  {
    path: "/result/:inscription",
    Component: ResultScreen,
  },
  {
    path: "/profile/:inscription",
    Component: DetailedProfile,
  },
]);
