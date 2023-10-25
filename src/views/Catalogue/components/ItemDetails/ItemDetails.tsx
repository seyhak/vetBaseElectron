import {
  Box,
  Typography,
  Divider,
  ImageList,
  ImageListItem,
} from "@mui/material"
import "./ItemDetails.sass"
import { Item, ItemDetailed } from "types/item.types"

type ItemDetailsProps = {
  item: Item
}
const photoSrc =
  "data:image/jpeg;base64,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"

export const ItemDetails = ({ item }: ItemDetailsProps) => {
  console.log(item)
  const detailedItem = {
    ...item,
    description:
      item ||
      "Bakteria występuje w wielu serotypach, z których dwa wywołują cholerę u ludzi: O1 i O139. Serotyp O1 ma dwa biotypy: klasyczny i El Tor.",
    photos: [
      photoSrc,
      photoSrc,
      photoSrc,
      photoSrc,
      photoSrc,
      photoSrc,
      photoSrc,
      photoSrc,
    ],
    notes: "wikipedia",
  } as ItemDetailed
  console.log("detailedItem", detailedItem)

  return (
    <Box className="item-details-wrapper">
      <Box className="item-details-header">
        <Typography variant="h4">{item?.title}</Typography>
      </Box>
      <Divider className="divider" />
      <Box className="item-details-content">
        <div className="description-wrapper">
          <Typography variant="h6">Description</Typography>
          <Typography variant="body1">{detailedItem.description}</Typography>
        </div>
        <Divider className="divider" />
        <Box className="photos-wrapper">
          <ImageList cols={4} rowHeight={200}>
            {detailedItem.photos.map((pic) => (
              <ImageListItem key={pic}>
                <img
                  srcSet={pic}
                  src={`${pic}?w=164&h=164&fit=crop&auto=format`}
                  loading="lazy"
                  alt={pic}
                />
              </ImageListItem>
            ))}
          </ImageList>
        </Box>
        <Box className="notes-wrapper">
          <Typography variant="h6">Notes</Typography>
          <Typography variant="body2">{detailedItem.notes}</Typography>
        </Box>
      </Box>
    </Box>
  )
}
