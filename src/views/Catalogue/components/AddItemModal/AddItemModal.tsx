import { useState } from "react"
import { Box, TextField } from "@mui/material"
import { Modal, ModalProps } from "components/Modal/Modal"

//ts part
import { BaseEditor } from "slate"
import { ReactEditor } from "slate-react"
import RichTextEditor from "components/RichTextEditor/RichTextEditor"
import { getEditorChildrenSerialized } from "components/RichTextEditor/RichTextEditor.functions"
import { useRichTextEditor } from "components/RichTextEditor/useRichTextEditor"

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
      handleModalClose?.()
    } catch (e) {
      console.error(e)
    }
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
          onChange={onTitleChange}
        />
        <RichTextEditor editor={editor} />
      </Box>
    </Modal>
  )
}
