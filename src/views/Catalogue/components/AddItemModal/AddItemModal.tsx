import { useState, useMemo } from "react"
import { withHistory } from "slate-history"
import { createEditor } from "slate"

// Import the Slate components and React plugin.
import { withReact } from "slate-react"
import { Box, TextField } from "@mui/material"
import { Modal, ModalProps } from "components/Modal/Modal"

//ts part
import { BaseEditor } from "slate"
import { ReactEditor } from "slate-react"
import RichTextEditor from "components/RichTextEditor/RichTextEditor"

type CustomElement = { type: "paragraph"; children: CustomText[] }
type CustomText = { text: string }

export type AddItemModalProps = {
  isAddingModalOpened: ModalProps["modalProps"]["open"]
  handleModalClose: ModalProps["modalProps"]["onClose"]
}

declare module "slate" {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}
const initialValue = [
  {
    type: "paragraph",
    children: [{ text: "A line of text in a paragraph." }],
  },
]
export const AddItemModal = ({
  isAddingModalOpened,
  handleModalClose,
}: AddItemModalProps) => {
  // Create a Slate editor object that won't change across renders.
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])
  // const [editor] = useState(() => withReact(createEditor()))
  const onConfirmClick = () => {
    console.log("confirm click")
  }
  return (
    <Modal
      modalProps={{
        open: isAddingModalOpened,
        onClose: handleModalClose,
        "aria-labelledby": "modal-add-position-title",
        "aria-describedby": "modal-add-position-description",
      }}
      title="Add position to the catalogue"
      onConfirmClick={onConfirmClick}
    >
      <Box className="modal-add-position-wrapper">
        <TextField
          id="modal-add-position-description"
          label="Title"
          variant="outlined"
          fullWidth
        />
        <RichTextEditor editor={editor} />
      </Box>
    </Modal>
  )
}
