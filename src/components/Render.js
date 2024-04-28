import dayjs from "dayjs";
import loadingAnimation from "../assets/loading.gif";
import getWeather from "./WeatherApi";
import iconPack from "./Icon";

const getIcon = ({ current }) => {
    let iconKey = current.condition.text.toLowerCase().replaceAll(" ", "-");
    iconKey = current.is_day ? (iconKey += "-d") : (iconKey += "-n");
    return iconPack[iconKey];
};

// const Card = function ({current})

const displayCurrentWeather = function displayCurrentWeaterInformation(data) {
    const container = document.createElement("div");
    container.className =
        "grid grid-cols-1 backdrop-brightness-[.85] px-2 pt-8 rounded-lg ";

    // Div for locaiton, date and time display
    const localeDiv = document.createElement("div");
    localeDiv.className = "flex justify-between";

    const locationDiv = document.createElement("div");
    locationDiv.className = "flex items-start gap-2";
    const locIcon = document.createElement("div");
    locIcon.className = "w-4 h-4 fill-slate-100";
    locIcon.innerHTML = iconPack.location;
    locationDiv.appendChild(locIcon);
    const locationText = document.createElement("p");
    locationText.textContent = `${data.location.name}, ${data.location.country}`;
    locationText.className = "text-slate-100 text-sm";
    locationDiv.appendChild(locationText);
    localeDiv.appendChild(locationDiv);

    const dateTimeDiv = document.createElement("div");
    dateTimeDiv.className = "flex flex-col";

    const dateDiv = document.createElement("div");
    dateDiv.className = "flex text-white text-xs ps-6";
    const dayOfWeek = dayjs().format("dddd");
    const date = dayjs().format("D MMM, YYYY");
    dateDiv.textContent = `${dayOfWeek} | ${date}`;
    dateTimeDiv.appendChild(dateDiv);

    const timeDiv = document.createElement("div");
    timeDiv.textContent = dayjs().format("h:m a");
    timeDiv.className = "text-white text-xs ps-6";
    dateTimeDiv.appendChild(timeDiv);
    localeDiv.appendChild(dateTimeDiv);
    container.appendChild(localeDiv);

    // Div containing primary weather information
    const primaryInformationDiv = document.createElement("div");
    primaryInformationDiv.className =
        "flex gap-1 justify-center items-center py-12";
    const iconDiv = document.createElement("div");
    const weatherIcon = getIcon(data);
    iconDiv.innerHTML = weatherIcon;
    iconDiv.className = "w-36 h-36 fill-white";
    primaryInformationDiv.appendChild(iconDiv);

    const textDiv = document.createElement("div");
    textDiv.className = "flex flex-col";

    const currentTemp = document.createElement("p");
    currentTemp.className = "text-white font-medium text-6xl";
    currentTemp.textContent = Math.round(data.current.temp_c);
    const tempUnitSpan = document.createElement("span");
    tempUnitSpan.innerHTML = "  &degC";
    tempUnitSpan.className = "text-white font-medium text-2xl";
    currentTemp.appendChild(tempUnitSpan);
    textDiv.appendChild(currentTemp);

    const weatherText = document.createElement("p");
    weatherText.textContent = data.current.condition.text;
    weatherText.className = "text-white font-light text-2xl";
    textDiv.appendChild(weatherText);
    primaryInformationDiv.appendChild(textDiv);

    container.appendChild(primaryInformationDiv);
    return container;
};

export default function Render() {
    const bgContainer = document.createElement("div");
    bgContainer.className = "relative h-lvh bg-[#1F322D] bg-cover";

    const loading = document.createElement("img");
    loading.className =
        "absolute top-[50%] -translate-y-1/2 left-[50%] -translate-x-1/2 w-[300px]";
    loading.src = loadingAnimation;

    getWeather().then((data) => {
        console.log(data);
        bgContainer.className = "relative h-lvh";

        bgContainer.style.background =
            "linear-gradient(to bottom, rgba(0,0,0,0.5) 0%,rgba(0,0,0,0.1) 100%), url('https://ik.imagekit.io/bishwarup307/odin-weather/day/sunny-sm.jpeg?tr=w-401') no-repeat center center";
        bgContainer.style.backgroundSize = "cover";
        loading.style.display = "none";

        const container = document.createElement("div");
        container.className = "container";
        container.appendChild(displayCurrentWeather(data));
        bgContainer.appendChild(container);
    });

    bgContainer.appendChild(loading);
    return bgContainer;
}
