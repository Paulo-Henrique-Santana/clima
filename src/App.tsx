import { FormEvent, useState } from "react";
import Search from "./components/Search/Search";
import Weather from "./components/Weather/Weather";
import styles from "./App.module.scss";
import Loading from "./components/Loading/Loading";

const App = () => {
  const [data, setData] = useState<null | Data>(null);
  const [search, setSearch] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const searchWeather = async (event: FormEvent) => {
    event.preventDefault();

    try {
      setSearch("");
      setLoading(true);

      const id = "055d59851906713defd94a70b5fe1b05";
      const cleanSearch = search.trim();
      const response = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cleanSearch}&units=metric&appid=${id}&lang=pt_br`
      );

      if (response.status === 404) {
        throw new Error(`Cidade \"${cleanSearch}\" não encontrada`);
      }

      setError("");
      const json = await response.json();
      const {
        weather: [{ description, icon }],
        main: { temp, humidity },
        sys: { country },
        wind: { speed },
        timezone,
        name,
      } = json;
      setData({
        description,
        icon,
        temp,
        humidity,
        country,
        speed,
        timezone,
        name,
      });
    } catch (error) {
      if (error instanceof Error) setError(error.message);
    } finally {
      setLoading(false);
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

      <div className={styles.containerSearch}>
        {loading && <Loading />}
        {!loading && error && <div className={styles.error}>{error}</div>}
        {!loading && !error && <Weather data={data} />}
      </div>
    </section>
  );
};

export default App;
