import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';;
import * as style from "@/shared/css/components/Search.module.scss"

function SearchBase({onChange, value}: {onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void, value: string}) {
  // const [debounce, setDebounce] = useDebounce()
  // const [value, setValue] = useState('')

  // const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
  //   const val = e.target.value
  //   setDebounce(val);
  //   setValue(val)
  //   setValue(e.target.value)
  // }

  // console.log(debounce)

  return (
    <div className={style['search-container']}>
      <div className={style['search-icon-wrapper']}>
        <SearchIcon />
      </div>
      <InputBase
        placeholder="Search…"
        classes={{ root: style['styled-input'] }}
        inputProps={{ 'aria-label': 'search' }}
        value={value}
        onChange={onChange}
      />
    </div>
  )
}

export default SearchBase