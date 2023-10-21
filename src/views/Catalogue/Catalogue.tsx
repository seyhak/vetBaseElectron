import { Box } from "@mui/system"
import "./Catalogue.sass"
import List from "@mui/material/List"
import ListItem from "@mui/material/ListItem"
import ListItemButton from "@mui/material/ListItemButton"
import ListItemText from "@mui/material/ListItemText"
import { Divider } from "@mui/material"

import { NoItemPicked } from "./components/NoItemPicked/NoItemPicked"
import { ItemDetails } from "./components/ItemDetails/ItemDetails"
import { AddItemModal } from "./components/AddItemModal/AddItemModal"
import { Controllers } from "./components/Controllers/Controllers"
import { useCatalogue } from "./useCatalogue"

export const Catalogue = () => {
  const {
    onDeleteClick,
    onAddClick,
    onEditClick,
    onSaveClick,
    selectedItem,
    itemsList,
    onItemClick,
    itemDetailed,
    onTitleChange,
    isEditModeOn,
    editor,
    isAddingModalOpened,
    handleAddModalClose,
  } = useCatalogue()

  return (
    <Box className="catalogue-wrapper">
      <Controllers
        onDeleteClick={onDeleteClick}
        onAddClick={onAddClick}
        onEditClick={onEditClick}
        onSaveClick={onSaveClick}
        isItemSelected={!!selectedItem}
        isEditModeOn={isEditModeOn}
      />
      <Box className="list-wrapper">
        <List className="list">
          {itemsList?.map((listItem) => {
            return (
              <ListItem key={listItem?.id} dense>
                <ListItemButton
                  onClick={() => onItemClick(listItem)}
                  selected={selectedItem?.id === listItem?.id}
                >
                  <ListItemText primary={listItem?.title} />
                </ListItemButton>
              </ListItem>
            )
          })}
        </List>
        <Divider orientation="vertical" className="line" />
        <Box className="detail-wrapper">
          {selectedItem ? (
            <ItemDetails
              itemDetailed={itemDetailed}
              onTitleChange={onTitleChange}
              isEditModeOn={isEditModeOn}
              editor={editor}
            />
          ) : (
            <NoItemPicked />
          )}
        </Box>
      </Box>
      <AddItemModal
        isAddingModalOpened={isAddingModalOpened}
        handleModalClose={handleAddModalClose}
      />
    </Box>
  )
}
