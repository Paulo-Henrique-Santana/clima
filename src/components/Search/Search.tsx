import { Dispatch, FormEvent, SetStateAction } from "react";
import { BsSearch } from "react-icons/bs";
import styles from "./Search.module.scss";

interface Props {
  search: string;
  setSearch: Dispatch<SetStateAction<string>>;
  searchWeather: (event: FormEvent) => Promise<void>;
}

const Search = ({ search, setSearch, searchWeather }: Props) => {
  return (
    <form className={styles.container} onSubmit={searchWeather}>
      <input
        value={search}
        onChange={({ target }) => setSearch(target.value)}
        type="text"
        placeholder="Busque por uma cidade"
        required
      />
      <button>
        <BsSearch />
      </button>
    </form>
  );
};

export default Search;
