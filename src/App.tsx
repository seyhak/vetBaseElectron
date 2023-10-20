import { useCallback } from "react"
import "./App.sass"
import { Tab, Tabs } from "@mui/material"
import { useLocation, useNavigate } from "react-router-dom"
import { Box } from "@mui/system"
import Search from "./views/Search/Search"
import { Routes, Route } from "react-router-dom"
import { Catalogue } from "./views/Catalogue/Catalogue"
import { ViewsPaths } from "types/routes.types"

const App = () => {
  const location = useLocation()
  const navigate = useNavigate()
  const onTabClick = useCallback(
    (event: React.SyntheticEvent, newValue: string) => {
      navigate(newValue)
    },
    [navigate],
  )

  return (
    <Box className="App">
      <Box className="navbar-container">
        <Tabs
          value={location.pathname}
          onChange={onTabClick}
          aria-label="basic tabs example"
        >
          <Tab label="Search" value={ViewsPaths.Search} />
          <Tab label="Catalogue" value={ViewsPaths.Catalogue} />
        </Tabs>
      </Box>
      <Box className="content-container">
        <Routes>
          <Route path={ViewsPaths.Search} element={<Search />} />
          <Route path={ViewsPaths.Catalogue} element={<Catalogue />} />
        </Routes>
      </Box>
    </Box>
  )
}

export default App
