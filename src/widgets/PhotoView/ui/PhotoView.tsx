import React, { FC, useEffect, useRef, useState } from "react"

import { photos, setLastElement } from "../model/slice/catsPhotoSlice"

import { ObservePhoto } from "../../../entities/ObserbePhoto"

import { useAppDispatch, useAppSelector } from "../../../shared/hook/hooks"

import { classNames } from "../../../shared/lib/classNames"
import { Modal } from "../../../shared/ui/Modal"

import "./styles.css"

interface PhotoViewProps {
  photoRange: number
}

const SCROLL_AMOUNT = 50

export const PhotoView: FC<PhotoViewProps> = ({ photoRange }) => {
  const catsPhotos = useAppSelector(photos)
  const catsPhotosLength = catsPhotos.length

  const scrollRef = useRef<HTMLDivElement | null>(null)

  const dispatch = useAppDispatch()

  const [slide, setSlide] = useState(0)

  const [openModal, setModalOpen] = useState(false)

  const nextSlide = () => {
    setSlide(slide === catsPhotosLength - 1 ? 0 : slide + 1)
  }

  const prevSlide = () => {
    setSlide(slide === 0 ? catsPhotosLength - 1 : slide - 1)
  }

  const handleScroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      if (direction === "left") {
        scrollRef.current.scrollLeft -= SCROLL_AMOUNT
      } else if (direction === "right") {
        scrollRef.current.scrollLeft += SCROLL_AMOUNT
      }
    }
  }

  const getActualPhoto = () => {
    return catsPhotos.find((item, index) => index === slide)
  }

  const getWidth = (): string => {
    return photoRange * 62 + "px"
  }

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) {
        return
      }
      const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current

      if (Math.ceil(scrollLeft) + clientWidth >= scrollWidth - SCROLL_AMOUNT) {
        dispatch(setLastElement(catsPhotos[catsPhotosLength - 1].name))
      }
    }

    scrollRef.current?.addEventListener("scroll", handleScroll)

    return () => {
      scrollRef.current?.removeEventListener("scroll", handleScroll)
    }
  }, [catsPhotos])

  return (
    <>
      <div className="wrapper">
        <div className="carousel">
          <button onClick={prevSlide} className="arrow arrow-left" />
          {catsPhotos.map((item, idx) => {
            return (
              <img
                src={item.imageUrl}
                alt={item.name}
                key={item.imageUrl}
                className={classNames("slide", {
                  hidden: slide !== idx,
                })}
                onClick={() => setModalOpen(true)}
              />
            )
          })}
          <button onClick={nextSlide} className="arrow arrow-right" />
        </div>
        <div className="previewWrapper">
          <div className="carouselBut">
            <button
              onClick={() => handleScroll("left")}
              className="arrow arrow-left arrow-small"
            />
          </div>
          <div
            ref={scrollRef}
            className="preview"
            style={{ maxWidth: getWidth() }}
          >
            {catsPhotos.map((item, idx) => {
              return (
                <img
                  key={item.id}
                  src={item.imageUrl}
                  alt={item.name}
                  className={classNames("indicator", {
                    indicatorInactive: slide !== idx,
                  })}
                  onClick={() => setSlide(idx)}
                />
              )
            })}
          </div>
          <div className="carouselBut">
            <button
              onClick={() => handleScroll("right")}
              className="arrow arrow-right arrow-small"
            />
          </div>
        </div>
      </div>
      <Modal isOpen={openModal} onClose={() => setModalOpen(false)}>
        <ObservePhoto photo={getActualPhoto()} />
      </Modal>
    </>
  )
}
