import SearchIcon from '@mui/icons-material/Search';
import InputBase from '@mui/material/InputBase';;
import * as style from "@app/client/shared/css/components/Search.module.scss"
import Box from '@mui/material/Box';
// import { BG_THIRD } from '@app/shared/COLORS';

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
    // <Box sx={{bgcolor: localStorage.getItem("theme") === "light" ? "#ffffff" : "#797979"}} className={style['search-container']}>
    <Box sx={{bgcolor: (theme) => theme.palette.bright.main}} className={style['search-container']}>
      <div className={style['search-icon-wrapper']}>
        <SearchIcon color={"disabled"} />
      </div>
      <InputBase
        placeholder="Найти по имени..."
        classes={{ root: style['styled-input'] }}
        inputProps={{ 'aria-label': 'search' }}
        value={value}
        onChange={onChange}
      />
    </Box>
  )
}

export default SearchBase