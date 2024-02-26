import { ReactNode } from "react"
import "./styles.css"
import { classNames } from "../../lib/classNames"
import { Portal } from "../Portal"
import { Overlay } from "../Overlay"

interface ModalProps {
  children?: ReactNode
  isOpen?: boolean
  onClose?: () => void
}

export const Modal = (props: ModalProps) => {
  const { children, isOpen, onClose } = props

  const mods = {
    opened: isOpen,
  }

  return (
    <Portal>
      <div className={classNames("modal", mods)} onClick={onClose}>
        <Overlay />
        <div className="content">{children}</div>
      </div>
    </Portal>
  )
}
