import { renderHook, waitFor } from "@testing-library/react"
import { useCatalogue } from "./useCatalogue"
import { getListCatalogueResolvedValue } from "tests/mocks"

const mockUseLocation = jest.fn()
jest.mock("react-router-dom", () => ({
  useLocation: () => mockUseLocation(),
}))
const mockGetListCatalogue = jest.fn()
const anyWindow = window as any

describe("useCatalogue", () => {
  let location

  beforeEach(() => {
    jest.clearAllMocks()
    anyWindow.electronAPI = {
      getListCatalogue: mockGetListCatalogue,
    }
    location = {
      search: "search=cc",
    }
    mockUseLocation.mockReturnValue(location)
    mockGetListCatalogue.mockResolvedValue(getListCatalogueResolvedValue)
  })
  describe("loadDb", () => {
    test("success", async () => {
      const { result } = await renderHook(() => useCatalogue())
      await waitFor(() => expect(mockGetListCatalogue).toHaveBeenCalledTimes(1))
      await waitFor(() => expect(result.current.itemsList).not.toBeNull())
      expect(result.current.itemsList).toEqual([
        {
          description: [
            {
              children: [
                {
                  text: "sdasdsadad new",
                },
              ],
              type: "heading-one",
            },
          ],
          id: "26138da3-ae2b-49d0-b26b-08a1c4d3515b",
          title: "aaaaA",
        },
        {
          description: [
            {
              children: [
                {
                  text: "sdasdsadad new",
                },
              ],
              type: "heading-one",
            },
          ],
          id: "26138da3-ae2b-49d0-b26b-ae2b",
          title: "aaaaB",
        },
        {
          description: [
            {
              children: [
                {
                  text: "sdasdsadad new",
                },
              ],
              type: "heading-one",
            },
          ],
          id: "26138da3-ae2b-49d0-b26b-b26b",
          title: "aaaaC",
        },
      ])
    })
  })
})
