import {
  Box,
  IconButton,
  Tooltip,
  Button,
  Snackbar,
  Alert,
  AlertTitle,
  Typography,
} from "@mui/material"

import FileDownloadIcon from "@mui/icons-material/FileDownload"
import UploadIcon from "@mui/icons-material/Upload"
import { useSyncSection } from "./useSyncSection"
import "./SyncSection.sass"

export const SyncSection = () => {
  const {
    onExportToCSVClick,
    onImportFromCSVChange,
    snackbarState,
    onSnackbarClose,
  } = useSyncSection()
  return (
    <Box className="sync-section">
      <Tooltip title="Export data to CSV">
        <IconButton
          size="large"
          aria-label="export-to-csv"
          color="primary"
          onClick={onExportToCSVClick}
        >
          <UploadIcon />
        </IconButton>
      </Tooltip>
      <Tooltip title="Import data from CSV">
        <Button
          className="import-button"
          size="large"
          component="label"
          aria-label="import-from-csv"
          color="primary"
        >
          <input
            type="file"
            onChange={onImportFromCSVChange}
            className="file-input"
            accept=".csv"
          />

          <FileDownloadIcon />
        </Button>
      </Tooltip>
      <Snackbar
        open={snackbarState.isOpened}
        autoHideDuration={6000}
        onClose={onSnackbarClose}
        className="snackbar"
      >
        <Alert
          variant="filled"
          severity={snackbarState.type}
          className="snackbar-alert"
        >
          <AlertTitle>{snackbarState.type.toUpperCase()}</AlertTitle>
          <Typography className="message">
            {snackbarState.message || "Success!"}
          </Typography>
        </Alert>
      </Snackbar>
    </Box>
  )
}
