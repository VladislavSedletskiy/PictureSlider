import { memo } from "react"
import { classNames } from "../../lib/classNames"
import "./styles.css"

interface OverlayProps {
  className?: string
  onClick?: () => void
}

export const Overlay = memo((props: OverlayProps) => {
  const { className, onClick } = props

  return (
    <div onClick={onClick} className={classNames("overlay", {}, [className])} />
  )
})
