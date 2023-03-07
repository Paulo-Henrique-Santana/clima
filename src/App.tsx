import { FormEvent, useState } from "react";
import Search from "./components/Search/Search";
import Weather from "./components/Weather/Weather";
import styles from "./App.module.scss";

const App = () => {
  const [data, setData] = useState<null | Data>(null);
  const [search, setSearch] = useState("");

  const searchWeather = async (event: FormEvent) => {
    event.preventDefault();
    try {
      const id = "055d59851906713defd94a70b5fe1b05";
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=${id}&lang=pt_br`
      );

      if (response.status === 404) throw new Error("Cidade não encontrada");

      const json = await response.json();

      const {
        weather: [{ description }],
        main: { temp, humidity },
        sys: { country },
        wind: { speed },
        timezone,
        name,
      } = json;

      setData({ description, temp, humidity, country, speed, timezone, name });
    } catch (error) {
      if (error instanceof Error) console.error(error.message);
    }
  };

  return (
    <section className={styles.container}>
      <h1>Clima</h1>
      <Search
        search={search}
        setSearch={setSearch}
        searchWeather={searchWeather}
      />
      <Weather data={data} />
    </section>
  );
};

export default App;
