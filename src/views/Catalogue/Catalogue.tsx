import { useState, useMemo, useCallback, useEffect } from "react"
import { Box } from "@mui/system"
import "./Catalogue.sass"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import { ButtonGroup, Divider, IconButton, Typography } from "@mui/material"
import { NoItemPicked } from "./components/NoItemPicked/NoItemPicked"
import { ItemDetails } from "./components/ItemDetails/ItemDetails"
import { Item } from "types/item.types"
import { useLocation } from "react-router-dom"
import DeleteIcon from "@mui/icons-material/Delete"
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import Modal from "components/Modal/Modal"

const testListGen = () =>
  Array(100)
    .fill(1)
    .map((_, i) => i + 1)
    .map((x) => {
      const randName = Math.random().toString(15).slice(2)
      return { id: x, name: randName } as Item
    }) as Item[]

export const Catalogue = () => {
  const [selectedItem, setSelectedItem] = useState<Item>(null)
  const [isAddingModalOpened, setIsAddingModalOpened] = useState(false)
  const testList = useMemo<Array<Item>>(() => testListGen(), [])
  const location = useLocation()

  const onItemClick = useCallback(
    (newSelectedItem: Item) => {
      console.log(newSelectedItem)
      setSelectedItem(newSelectedItem)
    },
    [setSelectedItem],
  )
  console.log(testList)
  console.log(
    "location",
    location,
    Object.fromEntries(new URLSearchParams(location.search)),
  )
  const loadDb = async () => {
    console.log("loadDb location", location)
    const filePath = await (window as any).electronAPI.openCatalogue()
    console.log("filePath", filePath)
  }

  useEffect(() => {
    loadDb()
  }, [location])

  useEffect(() => {
    console.log("once")
  }, [location])

  const onAddClick = () => {
    setIsAddingModalOpened((previousValue) => !previousValue)
    console.log("onAddClick")
  }
  const handleModalClose = () => {
    setIsAddingModalOpened((previousValue) => !previousValue)
  }
  return (
    <Box className="catalogue-wrapper">
      <Box className="controllers-wrapper">
        <ButtonGroup
          variant="outlined"
          aria-label="outlined primary button group"
        >
          <IconButton aria-label="add" color="primary" onClick={onAddClick}>
            <AddCircleOutlineIcon />
          </IconButton>
          <IconButton aria-label="delete" disabled color="primary">
            <DeleteIcon />
          </IconButton>
          {/* <Button>Two</Button>
        <Button>Three</Button> */}
        </ButtonGroup>
      </Box>
      <Box className="list-wrapper">
        <List className="list">
          {testList.map((listItem) => {
            return (
              <ListItem key={listItem?.id} dense>
                <ListItemButton
                  onClick={() => onItemClick(listItem)}
                  selected={selectedItem?.id === listItem?.id}
                >
                  <ListItemText primary={listItem?.name} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
        <Divider orientation="vertical" className="line" />
        <Box className="detail-wrapper">
          {selectedItem ? (
            <ItemDetails item={selectedItem} />
          ) : (
            <NoItemPicked />
          )}
        </Box>
      </Box>
      <Modal
        modalProps={{
          open: isAddingModalOpened,
          onClose: handleModalClose,
          "aria-labelledby": "modal-add-position-title",
          "aria-describedby": "modal-add-position-description",
        }}
        title="Add position to the catalogue"
      >
        <Box className="modal-add-position-wrapper">
          <Typography id="modal-add-position-description">
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </Box>
  )
}
