import { useMemo, useReducer } from "react"
// Import the Slate components and React plugin.
import { withHistory } from "slate-history"
import { createEditor } from "slate"
import { withReact } from "slate-react"

export const useRichTextEditor = () => {
  // Create a Slate editor object that won't change across renders.
  // const editor = withHistory(withReact(createEditor()))
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  return editor
}
