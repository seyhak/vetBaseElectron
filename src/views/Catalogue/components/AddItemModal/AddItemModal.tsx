import { useState } from "react"
import { Box, TextField, Divider } from "@mui/material"
import { default as Dialog, DialogProps } from "@mui/material/Dialog"
import DialogActions from "@mui/material/DialogActions"
import DialogContent from "@mui/material/DialogContent"
import DialogTitle from "@mui/material/DialogTitle"
import Button from "@mui/material/Button"
//ts part
import { BaseEditor } from "slate"
import { ReactEditor } from "slate-react"
import RichTextEditor from "components/RichTextEditor/RichTextEditor"
import { getEditorChildrenSerialized } from "components/RichTextEditor/RichTextEditor.functions"
import { useRichTextEditor } from "components/RichTextEditor/useRichTextEditor"

type CustomElement = { type: "paragraph"; children: CustomText[] }
type CustomText = { text: string }

export type AddItemModalProps = {
  isAddingModalOpened: DialogProps["open"]
  handleModalClose: DialogProps["onClose"]
}

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}

export const AddItemModal = ({
  isAddingModalOpened,
  handleModalClose,
}: AddItemModalProps) => {
  const [title, setTitle] = useState("")
  const { editor } = useRichTextEditor()

  const onTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value)
  }
  const onConfirmClick = async () => {
    const serializedValue = getEditorChildrenSerialized(editor.children)
    try {
      await (window as any).electronAPI.createItem(title, serializedValue)
      handleModalClose?.({} as Event, "backdropClick")
    } catch (e) {
      console.error(e)
    }
  }
  return (
    <Dialog open={isAddingModalOpened} onClose={handleModalClose}>
      <DialogTitle>Add position to the catalogue</DialogTitle>
      <DialogContent>
        <Box className="modal-add-position-wrapper" sx={{ mt: 1 }}>
          <TextField
            id="modal-add-position-description"
            label="Title"
            variant="outlined"
            fullWidth
            required
            inputProps={{
              maxLength: 60,
            }}
            onChange={onTitleChange}
          />
          <RichTextEditor editor={editor} />
        </Box>
      </DialogContent>
      <Divider />
      <DialogActions>
        <Button onClick={onConfirmClick}>Confirm</Button>
      </DialogActions>
    </Dialog>
  )
}
