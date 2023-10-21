import { useMemo, useCallback } from "react"
// Import the Slate components and React plugin.
import { withHistory } from "slate-history"
import { Descendant, createEditor } from "slate"
import { withReact } from "slate-react"

export const useRichTextEditor = () => {
  // Create a Slate editor object that won't change across renders.
  // const editor = withHistory(withReact(createEditor()))
  const editor = useMemo(() => withHistory(withReact(createEditor())), [])

  const updateEditorContent = useCallback(
    (newContent: Descendant[]) => {
      // const isnewContentAnArray = Array.isArray(newContent) && newContent.length
      // const newContentAdjusted =
      //   newContent && isnewContentAnArray ? newContent : undefined
      editor.children = newContent
      editor.onChange()
    },
    [editor],
  )

  return { editor, updateEditorContent }
}
