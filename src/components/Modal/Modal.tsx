import {
  Modal as MuiModal,
  ModalProps as MuiModalProps,
  Box,
  Typography,
  TypographyOwnProps,
  Divider,
} from "@mui/material"
import "./Modal.sass"

export type ModalProps = {
  title?: string
  titleProps?: TypographyOwnProps
  modalProps: Omit<MuiModalProps, "children">
  children?: React.ReactNode
}

export const Modal = ({
  title,
  titleProps,
  modalProps,
  children,
}: ModalProps) => {
  return (
    <MuiModal {...modalProps} className="modal">
      <Box className="modal-wrapper">
        <Typography {...titleProps} variant="h6" component="h2">
          {title}
        </Typography>
        <Divider className="modal-content-divider" />
        <Box className="modal-content-wrapper">{children}</Box>
      </Box>
    </MuiModal>
  )
}
