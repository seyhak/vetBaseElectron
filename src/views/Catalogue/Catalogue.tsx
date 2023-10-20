import { useState, useMemo, useCallback } from "react"
import { Box } from "@mui/system"
import "./Catalogue.sass"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import { Divider } from "@mui/material"
import { NoItemPicked } from "./components/NoItemPicked/NoItemPicked"
import { ItemDetails } from "./components/ItemDetails/ItemDetails"
import { Item } from "types/item.types"

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
  const testList = useMemo<Array<Item>>(() => testListGen(), [])
  const onItemClick = useCallback(
    (newSelectedItem: Item) => {
      console.log(newSelectedItem)
      setSelectedItem(newSelectedItem)
    },
    [setSelectedItem],
  )
  console.log(testList)

  return (
    <Box className="catalogue-wrapper">
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
        {selectedItem ? <ItemDetails item={selectedItem} /> : <NoItemPicked />}
      </Box>
    </Box>
  )
}
