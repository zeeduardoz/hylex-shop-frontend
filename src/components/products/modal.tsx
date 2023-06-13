import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FaCheckCircle, FaTimes, FaTimesCircle } from 'react-icons/fa'

export function Modal(props: any) {
  const [open, setOpen] = useState(false)
  const cancelButton = useRef(null)

  function closeModal() {
    setOpen(false)
  }

  return (
    <>
      <p
        onClick={() => setOpen(true)}
        className="cursor-pointer text-center text-color-light underline w-full"
      >
        Ver vantagens
      </p>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          static
          className="inset-0 overflow-y-auto fixed z-20"
          initialFocus={cancelButton}
          open={open}
          onClose={setOpen}
        >
          <div className="items-end flex justify-center min-h-screen pb-20 pt-4 px-4 text-center sm:block sm:p-0">
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="bg-gray-500 bg-opacity-75 inset-0 fixed transition-opacity" />
            </Transition.Child>

            <span
              className="hidden sm:inline-block sm:h-screen sm:align-middle"
              aria-hidden="true"
            >
              &#8203;
            </span>
            <Transition.Child
              as={Fragment}
              enter="ease-out duration-300"
              enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
              enterTo="opacity-100 translate-y-0 sm:scale-100"
              leave="ease-in duration-200"
              leaveFrom="opacity-100 translate-y-0 sm:scale-100"
              leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            >
              <div className="bg-primary rounded-lg shadow-xl inline-block overflow-hidden text-left transform transition-all align-bottom sm:my-8 sm:max-w-lg sm:align-middle sm:w-full">
                <div className="bg-primary pb-4 pt-5 px-4 sm:p-6 sm:pb-4">
                  <div className="sm:items-start sm:flex">
                    <div className="mt-3 text-center w-full sm:ml-4 sm:mt-0 sm:text-left">
                      <div className="itens-center flex justify-between w-full">
                        <Dialog.Title
                          as="h3"
                          className="font-smibold text-xl leading-6 text-color-light"
                        >
                          Descrição do Produto
                        </Dialog.Title>
                        <button
                          ref={cancelButton}
                          onClick={() => closeModal()}
                          className="text-xl focus:outline-none text-color-danger"
                        >
                          <FaTimes />
                        </button>
                      </div>
                      <div className="my-10">
                        {props.description.map((desc: any, index: any) => {
                          return (
                            <div
                              className="items-center border-hr-color border-b flex opacity-80 py-2"
                              key={index}
                            >
                              {desc.condition === '1' ? (
                                <FaCheckCircle className="rounded-full mr-2 text-color-success" />
                              ) : (
                                <FaTimesCircle className="rounded-full mr-2 text-color-danger" />
                              )}
                              <p
                                className={
                                  desc.condition === '1'
                                    ? 'text-sm font-light text-color-light'
                                    : 'text-sm font-light text-color-medium'
                                }
                              >
                                {desc.desc}
                              </p>
                            </div>
                          )
                        })}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </Transition.Child>
          </div>
        </Dialog>
      </Transition.Root>
    </>
  )
}
