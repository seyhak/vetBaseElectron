import { AppSnackbarContext } from "contexts/AppSnackbarContext"
import { useState, useCallback, useContext } from "react"

export const useGoogleDriveSync = () => {
  const [isLoading, setIsLoading] = useState(false)
  const { setSnackbarState } = useContext(AppSnackbarContext)

  const onImportFromCloud = useCallback(async () => {
    setIsLoading(true)
    const items = await (window as any).electronAPI.importDataFromGoogleDrive()
    console.log("data imported from Google Drive!", { items })

    setSnackbarState((prevState) => ({
      ...prevState,
      isOpened: true,
      message: "Sync successful!",
    }))
    setIsLoading(false)
  }, [setSnackbarState, setIsLoading])

  const onExportToCloud = useCallback(async () => {
    setIsLoading(true)

    const items = await (
      window as any
    ).electronAPI.exportDataAsCsvToGoogleDrive()
    console.log({ items })

    setSnackbarState((prevState) => ({
      ...prevState,
      isOpened: true,
      message: "Sync successful!",
    }))
    setIsLoading(false)
  }, [setSnackbarState])
  return { onImportFromCloud, isLoading, onExportToCloud }
}
