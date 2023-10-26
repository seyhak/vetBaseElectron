import { Box, ButtonGroup, IconButton } from "@mui/material"
import { ConfirmDeleteButtonWithDialog } from "../ConfirmDeleteButtonWithDialog/ConfirmDeleteButtonWithDialog"

import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline"
import ModeEditIcon from "@mui/icons-material/ModeEdit"
import SaveIcon from "@mui/icons-material/Save"

export type ControllersProps = {
  isItemSelected: boolean
  isEditModeOn: boolean
  onAddClick: () => void
  onSaveClick: () => Promise<void>
  onEditClick: () => void
  onDeleteClick: () => Promise<void>
}
export const Controllers = ({
  isItemSelected,
  isEditModeOn,
  onAddClick,
  onSaveClick,
  onEditClick,
  onDeleteClick,
}: ControllersProps) => {
  return (
    <Box className="controllers-wrapper">
      <ButtonGroup
        variant="outlined"
        aria-label="outlined primary button group"
      >
        <IconButton aria-label="add" color="primary" onClick={onAddClick}>
          <AddCircleOutlineIcon />
        </IconButton>
        {isItemSelected && (
          <>
            {isEditModeOn && (
              <IconButton
                onClick={onSaveClick}
                aria-label="save"
                color="primary"
              >
                <SaveIcon />
              </IconButton>
            )}
            <IconButton onClick={onEditClick} aria-label="edit" color="primary">
              <ModeEditIcon />
            </IconButton>
            <ConfirmDeleteButtonWithDialog onDeleteClick={onDeleteClick} />
          </>
        )}
      </ButtonGroup>
    </Box>
  )
}
