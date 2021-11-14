import Alarm from "views/Alarm.js";
import AddVecino from "views/AddVecino.js";
import ListVecino from "views/ListVecino.js";
import Escolta from "views/Escolta.js";
import HistAlarm from "views/HistAlarm.js";
import HistEscolta from "views/HistEscolta.js";
import AddGuardia from "views/AddGuardia";
import ListGuardia from "views/ListGuardia";
import Reporteria from "views/Reporteria";

var routes = [
  {
    path: "/Alarm",
    name: "Alarmas y Escoltas",
    icon: "tim-icons icon-bell-55",
    component: Alarm,
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
  {
    path: "/AddGuardia",
    name: "Agregar Guardias",
    icon: "tim-icons icon-badge",
    component: AddGuardia,
    layout: "/admin",
  },
  {
    path: "/ListGuardia",
    name: "Lista Guardias",
    icon: "tim-icons icon-align-left-2",
    component: ListGuardia,
    layout: "/admin",
  },
  {
    path: "/Reporteria",
    name: "Reportes",
    icon: "tim-icons icon-attach-87",
    component: Reporteria,
    layout: "/admin",
  },
];
export default routes;
