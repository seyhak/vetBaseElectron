import { Descendant } from "slate"

export const getEditorChildrenSerialized = (editorValues: Descendant[]) => {
  return JSON.stringify(editorValues)
  // return value.split('\n').map(line => {
  //     return {
  //       children: [{ text: line }],
  //     }
  //   })
}

export const getEditorChildrenDeserialized = (value: string) => {
  // Return a value array of children derived by splitting the string.
  return JSON.parse(value)
  // return value.split('\n').map(line => {
  //   return {
  //     children: [{ text: line }],
  //   }
  // })
}
