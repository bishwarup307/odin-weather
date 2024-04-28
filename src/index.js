import "./style.css";
import dayjs from "dayjs";

import Container from "./components/WeatherApi";
import Render from "./components/Render";

// // Delete this code and write your own
document.querySelector("#root").appendChild(Render());

// const hourNow = dayjs().format("H");

// window.addEventListener("load", () => {
//     console.log("running");
//     if (document.querySelector("#hourly-forecast"))
//         document.querySelector("#hourly-forecast").scrollLeft += 80 * hourNow;
// });
