import { useState } from "react"
import { createEditor } from "slate"

// Import the Slate components and React plugin.
import { Slate, Editable, withReact } from "slate-react"
import { Box, Typography } from "@mui/material"
import { Modal, ModalProps } from "components/Modal/Modal"

//ts part
import { BaseEditor, Descendant } from "slate"
import { ReactEditor } from "slate-react"

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
  const [editor] = useState(() => withReact(createEditor()))
  return (
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
        <Slate editor={editor} initialValue={initialValue as any}>
          <Editable />
        </Slate>
      </Box>
    </Modal>
  )
}
