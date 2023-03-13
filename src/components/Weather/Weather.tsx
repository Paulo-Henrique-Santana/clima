import styles from "./Weather.module.scss";

interface Props {
  data: Data | null;
}

const Weather = ({ data }: Props) => {
  if (data) {
    const {
      description,
      icon,
      temp,
      humidity,
      country,
      speed,
      timezone,
      name,
    } = data;
    const daysWeek = [
      "domingo",
      "segunda-feira",
      "terça-feira",
      "quarta-feira",
      "quinta-feira",
      "sexta-feira",
      "sábado",
    ];
    const months = [
      "janeiro",
      "fevereiro",
      "Março",
      "abril",
      "maio",
      "junho",
      "julho",
      "agosto",
      "setembro",
      "outubro",
      "novembro",
      "dezembro",
    ];

    const date = new Date();
    date.setTime(date.getTime() + timezone * 1000);

    const formatTime = (time: number) => {
      return time < 10 ? `0${time}` : time;
    };

    const hours = formatTime(date.getUTCHours());
    const minutes = formatTime(date.getUTCMinutes());
    const dayWeek = daysWeek[date.getDay()];
    const dayMonth = date.getDate();
    const month = months[date.getMonth()];

    return (
      <div className={styles.container}>
        <p className={styles.local}>
          {name}
          {country && `, ${country}`}
        </p>
        <p className={styles.hour}>{`${hours}:${minutes}`}</p>
        <p className={styles.date}>{`${dayWeek}, ${dayMonth} ${month}`}</p>

        <div className={styles.containerTemp}>
          <div
            className={styles.img}
            style={{
              backgroundImage: `url(https://openweathermap.org/img/wn/${icon}@4x.png)`,
            }}
          ></div>
          <p className={styles.temperature}>
            {Math.round(temp)}º<span className={styles.celsius}>C</span>
          </p>
        </div>

        <p className={styles.description}>{description}</p>
        <p className={styles.humidity}>Umidade: {humidity}%</p>
        <p className={styles.windSpeed}>
          Vento: {Math.round(speed * 3.6)} km/h
        </p>
      </div>
    );
  } else return <></>;
};

export default Weather;
