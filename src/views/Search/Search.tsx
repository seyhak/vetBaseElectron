import PetsIcon from "@mui/icons-material/Pets"
import "./Search.sass"
import { Button, TextField } from "@mui/material"
import { Box } from "@mui/system"
import { useCallback, useState } from "react"
import { useNavigate } from "react-router"
import { ViewsPaths } from "types/routes.types"

const Search = () => {
  const navigate = useNavigate()
  const [textFieldValue, setTextFieldValue] = useState("")

  const onSearch = useCallback(() => {
    navigate({ pathname: ViewsPaths.Catalogue, search: textFieldValue })
  }, [textFieldValue, navigate])

  const onSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setTextFieldValue(e.target.value)
    },
    [setTextFieldValue],
  )

  const onSearchKeyDown = useCallback(
    (event: React.KeyboardEvent<HTMLImageElement>) => {
      if (event.key === "Enter") {
        onSearch()
      }
    },
    [onSearch],
  )

  return (
    <Box className="search-container">
      <Box className="circle">
        <Box className="header">
          <div className="logo-wrapper">
            <PetsIcon className="logo" />
          </div>
        </Box>
        <Box className="input-wrapper">
          <TextField
            label="search"
            variant="standard"
            className="search-input"
            onKeyDown={onSearchKeyDown}
            onChange={onSearchChange}
            value={textFieldValue}
            fullWidth
          />

          <Button
            variant="outlined"
            aria-label="search"
            className="search-btn"
            onClick={onSearch}
          >
            Search
          </Button>
        </Box>
      </Box>
    </Box>
  )
}

export default Search