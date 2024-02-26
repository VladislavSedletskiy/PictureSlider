import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { commonApi } from "../../../../shared/api/commonApi/commonApi"
import { ICatsPhoto } from "../../../../shared/model/catPhotosShema"
import { RootState } from "../../../../app/store"

interface IPoolState {
  lastElement: string | null
  photos: ICatsPhoto[]
}

const initialState: IPoolState = {
  lastElement: null,
  photos: [],
}

export const catsPhotoSlice = createSlice({
  name: "catPhoto",
  initialState,
  reducers: create => ({
    setLastElement: create.reducer((state, action: PayloadAction<string>) => {
      state.lastElement = action.payload
    }),
  }),
  selectors: {
    lastElement: counter => counter.lastElement,
  },
  extraReducers: builder => {
    builder.addMatcher(
      commonApi.endpoints?.getCatsPosts.matchFulfilled,
      (state, { payload: { data } }: PayloadAction<any>) => {
        const preparedData: ICatsPhoto[] = data.children
          // @ts-ignore
          .map(({ data }) => ({
            id: data.id,
            title: data.title,
            imageUrl: data.url,
            name: data.name,
          }))
          .filter((item: ICatsPhoto) => item.imageUrl.endsWith(".jpeg"))
        state.photos = [...new Set([...state.photos, ...preparedData])]
      },
    )
  },
})

export const { setLastElement } = catsPhotoSlice.actions

export const { lastElement } = catsPhotoSlice.selectors

export const photos = createSelector(
  (state: RootState) => state.catPhoto.photos,
  photos => photos,
)

export default catsPhotoSlice.reducer
