import { toast } from 'react-toastify'

export function AlertSuccess(message: string) {
  toast.success(message)
}

export function AlertError(message: string) {
  toast.error(message)
}

export function AlertWarn(message: string) {
  toast.warn(message)
}
