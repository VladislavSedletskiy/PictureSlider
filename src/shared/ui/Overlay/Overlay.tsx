import { memo } from "react"
import "./styles.css"
import { classNames } from "../../lib/classNames"

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
