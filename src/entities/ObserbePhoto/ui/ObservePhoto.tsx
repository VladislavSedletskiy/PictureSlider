import React, { FC } from "react"
import { ICatsPhoto } from "../../../shared/model/catPhotosShema"
import "./style.css"
interface ObservePhotoProps {
  photo?: ICatsPhoto
}

export const ObservePhoto: FC<ObservePhotoProps> = ({ photo }) => {
  return photo ? (
    <img className="wrapperImg" src={photo.imageUrl} alt={photo.name} />
  ) : (
    <span>404</span>
  )
}
