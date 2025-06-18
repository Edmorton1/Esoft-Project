import useDebounce from '@/shared/hooks/useDebounce';
import { SearchContainer, SearchIconWrapper, StyledInputBase } from '@/shared/ui/kit/search/SearchStyled';
import SearchIcon from '@mui/icons-material/Search';
import Tooltip from '@mui/material/Tooltip';
import { useState } from 'react';

function Search() {
  const [debounce, setDebounce] = useDebounce()
  const [value, setValue] = useState('')

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const val = e.target.value
    setDebounce(val);
    setValue(val)
    setValue(e.target.value)
  }

  console.log(debounce)

  return (
    <SearchContainer>
      <SearchIconWrapper>
        <SearchIcon />
      </SearchIconWrapper>
      <Tooltip title="Поиск пользователя" disableHoverListener disableTouchListener>
        <StyledInputBase
          placeholder="Поиск…"
          inputProps={{ "aria-label": "search" }}
          onChange={handleChange}
          value={value}
        />
      </Tooltip>
    </SearchContainer>
  );
}

export default Search;
