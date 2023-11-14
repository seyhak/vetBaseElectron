import {
  Box,
  Typography,
  Divider,
  ImageList,
  ImageListItem,
  TextField,
} from "@mui/material"
import "./ItemDetails.sass"
import { ItemDetailed } from "types/item.types"

import CircularProgress from "@mui/material/CircularProgress"
import RichTextEditor from "components/RichTextEditor/RichTextEditor"
import { HistoryEditor } from "slate-history"
import { ReactEditor } from "slate-react"
import { BaseEditor } from "slate"
import { CategoriesMultiSelect } from "components/CategoriesMultiSelect/CategoriesMultiSelect"

type ItemDetailsProps = {
  itemDetailed: ItemDetailed
  isEditModeOn: boolean
  onTitleChange: (event: React.ChangeEvent<HTMLInputElement>) => void
  editor: BaseEditor & ReactEditor & HistoryEditor
}

export const ItemDetails = ({
  itemDetailed,
  isEditModeOn,
  onTitleChange,
  editor,
}: ItemDetailsProps) => {
  const description = itemDetailed?.description
  const initialDescription =
    description && Array.isArray(description) && itemDetailed.description.length
      ? itemDetailed.description
      : undefined

  return (
    <Box className="item-details-wrapper">
      {itemDetailed ? (
        <>
          <Box className="item-details-header">
            {!isEditModeOn ? (
              <Typography variant="h4">{itemDetailed?.title}</Typography>
            ) : (
              <TextField
                label="title"
                defaultValue={itemDetailed?.title}
                variant="standard"
                fullWidth
                onChange={onTitleChange}
              />
            )}
          </Box>
          <Divider className="divider" />
          <CategoriesMultiSelect disabled={!isEditModeOn} />
          <Divider className="divider" />
          <Box className="item-details-content">
            <>
              <div className="description-wrapper">
                <RichTextEditor
                  editor={editor}
                  initialValue={initialDescription}
                  editableProps={{ readOnly: !isEditModeOn }}
                />
              </div>
              <Divider className="divider" />
              <Box className="photos-wrapper">
                {/* <ImageList cols={4} rowHeight={200}>
                  {itemDetailed.photos.map((pic) => (
                    <ImageListItem key={pic}>
                      <img
                        srcSet={pic}
                        src={`${pic}?w=164&h=164&fit=crop&auto=format`}
                        loading="lazy"
                        alt={pic}
                      />
                    </ImageListItem>
                  ))}
                </ImageList> */}
              </Box>
              {/* <SpeedDialTooltipOpen /> */}
              {/* <Box className="notes-wrapper">
                <Typography variant="h6">Notes</Typography>
                <Typography variant="body2">{itemDetailed.notes}</Typography>
              </Box> */}
            </>
          </Box>
        </>
      ) : (
        <Box className="loader" sx={{ display: "flex" }}>
          <CircularProgress />
        </Box>
      )}
    </Box>
  )
}
