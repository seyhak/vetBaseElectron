import { useState, ChangeEvent, useCallback } from "react"
import { GetListCatalogueReturnGrouped } from "types/item"
import {
  handleCsvImport,
  processItemsAndDownloadAsCsv,
} from "./useSyncSection.utils"
import { AlertColor } from "@mui/material"

type SnackbarDetails = {
  isOpened: boolean
  message: string
  type: AlertColor
}

export const useSyncSection = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [snackbarState, setSnackbarState] = useState<SnackbarDetails>({
    isOpened: false,
    message: "",
    type: "success",
  })

  const onExportToCSVClick = async () => {
    setIsLoading(true)
    const isGrouped = true
    const items: GetListCatalogueReturnGrouped = await (
      window as any
    ).electronAPI.getListCatalogue(null, isGrouped)
    await processItemsAndDownloadAsCsv(items)
    setSnackbarState((prevState) => ({
      ...prevState,
      isOpened: true,
      message: "Export successful!",
    }))
    setIsLoading(false)
  }

  const onImportFromCSVChange = async (
    event: ChangeEvent<HTMLInputElement>,
  ) => {
    setIsLoading(true)
    try {
      await handleCsvImport(event.target.files?.[0] ?? null)
      setSnackbarState({
        isOpened: true,
        message: "Import Succeeded",
        type: "success",
      })
    } catch (err) {
      console.error(err)
      setSnackbarState({
        isOpened: true,
        message: "Import failed",
        type: "error",
      })
    }

    setIsLoading(false)
  }
  const onSnackbarClose = useCallback(() => {
    setSnackbarState((prevState) => ({
      ...prevState,
      isOpened: false,
    }))
  }, [])

  return {
    isLoading,
    onExportToCSVClick,
    onImportFromCSVChange,
    snackbarState,
    onSnackbarClose,
  }
}
