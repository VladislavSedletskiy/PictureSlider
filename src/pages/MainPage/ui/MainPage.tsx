import { useGetCatsPostsQuery } from "../../../shared/api/commonApi/commonApi"
import { PhotoView } from "../../../widgets"
import "./styles.css"
import { useAppSelector } from "../../../app/hooks"
import { lastElement } from "../../../widgets/model/slice/catsPhotoSlice"

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
