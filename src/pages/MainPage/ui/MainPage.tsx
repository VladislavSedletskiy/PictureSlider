import { useGetCatsPostsQuery } from "../../../shared/api/commonApi/commonApi"

import { PhotoView } from "../../../widgets/PhotoView"
import { lastElement } from "../../../widgets/PhotoView/model/slice/catsPhotoSlice"

import { useAppSelector } from "../../../shared/hook/hooks"

import "./styles.css"

export const MainPage = () => {
  const lastPicture = useAppSelector(lastElement)

  const { isLoading } = useGetCatsPostsQuery({
    ...(lastPicture && { after: lastPicture }),
  })

  return (
    <div className="main">
      {isLoading ? <span>Loading...</span> : <PhotoView photoRange={5} />}
    </div>
  )
}
