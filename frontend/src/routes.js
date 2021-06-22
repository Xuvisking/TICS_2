import Alarm from "views/Alarm.js";
import AddVecino from "views/AddVecino.js";
import ListVecino from "views/ListVecino.js";
import Escolta from "views/Escolta.js";
import HistAlarm from "views/HistAlarm.js";
import HistEscolta from "views/HistEscolta.js";

var routes = [
  {
    path: "/Alarm",
    name: "Alarmas",
    icon: "tim-icons icon-bell-55",
    component: Alarm,
    layout: "/admin",
  },
  {
    path: "/Escolta",
    name: "Escolta",
    icon: "tim-icons icon-delivery-fast",
    component: Escolta,
    layout: "/admin",
  },
  {
    path: "/HistAlarm",
    name: "Historial Alarmas",
    icon: "tim-icons icon-calendar-60",
    component: HistAlarm,
    layout: "/admin",
  },
  {
    path: "/HistEscolta",
    name: "Historial Escoltas",
    icon: "tim-icons icon-calendar-60",
    component: HistEscolta,
    layout: "/admin",
  },
  {
    path: "/AddVecino",
    name: "Añadir Vecino",
    icon: "tim-icons icon-badge",
    component: AddVecino,
    layout: "/admin",
  },
  {
    path: "/ListVecino",
    name: "Lista Vecinos",
    icon: "tim-icons icon-align-left-2",
    component: ListVecino,
    layout: "/admin",
  },
];
export default routes;
