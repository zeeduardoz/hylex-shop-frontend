import { Fragment, useRef, useState } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import { FaEdit, FaTimes } from 'react-icons/fa'

export function Modal(props: any) {
  const [open, setOpen] = useState(false)
  const cancelButton = useRef(null)

  function closeModal() {
    setOpen(false)
  }

  return (
    <>
      <div className="items-center flex justify-center space-x-5 w-full lg:justify-end lg:w-1/12">
        <a
          onClick={() => setOpen(true)}
          className="cursor-pointer text-xl focus:outline-none text-color-info"
        >
          <FaEdit />
        </a>
      </div>
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
                          Informação da compra
                        </Dialog.Title>
                        <button
                          ref={cancelButton}
                          onClick={() => closeModal()}
                          className="text-xl focus:outline-none text-color-danger"
                        >
                          <FaTimes />
                        </button>
                      </div>
                      <div className="mt-10">
                        <div>
                          <div className="mt-2">
                            <p className="text-sm font-semibold text-color-medium">
                              Usuário
                            </p>
                            <p className="font-light text-color-light">
                              {props.order?.user}
                            </p>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm font-semibold text-color-medium">
                              ID da Compra
                            </p>
                            <p className="font-light text-color-light">
                              {props.order?.orderId}
                            </p>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm font-semibold text-color-medium">
                              Produtos
                            </p>
                            <p className="font-light text-color-light">
                              {props.order?.items.map((p: any) => {
                                return `${p.quantity}x ${p.product}`
                              })}
                            </p>
                          </div>
                        </div>

                        <hr className="border-color-medium mx-auto my-5 opacity-100 w-full" />

                        <div>
                          <div className="mt-2">
                            <p className="text-sm font-semibold text-color-medium">
                              Gateway
                            </p>
                            <p className="font-light text-color-light">
                              {props.order.gateway}
                            </p>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm font-semibold text-color-medium">
                              Status
                            </p>
                            <p className="font-light text-color-light">
                              {props.order.status}
                            </p>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm font-semibold text-color-medium">
                              Tipo do Pagamento
                            </p>
                            <p className="font-light text-color-light">
                              {props.order.paymentType}
                            </p>
                          </div>
                        </div>

                        <hr className="border-color-medium mx-auto my-5 w-full" />

                        <div>
                          <div className="mt-2">
                            <p className="text-sm font-semibold text-color-medium">
                              Sub-Total
                            </p>
                            <p className="font-light text-color-light">
                              R$ {props.order.subTotal}
                            </p>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm font-semibold text-color-medium">
                              Desconto
                            </p>
                            <p className="font-light text-color-light">
                              R$ -{props.order.totalDiscounts}
                            </p>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm font-semibold text-color-medium">
                              Total
                            </p>
                            <p className="font-light text-color-light">
                              R$ {props.order.totalAmount}
                            </p>
                          </div>
                        </div>

                        <hr className="border-color-medium mx-auto my-5 w-full" />

                        <div>
                          <div className="mt-2">
                            <p className="text-sm font-semibold text-color-medium">
                              Cupom de Desconto
                            </p>
                            <p className="font-light text-color-light">
                              {props.order.discountCoupon}
                            </p>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm font-semibold text-color-medium">
                              Influenciador
                            </p>
                            <p className="font-light text-color-light">
                              {props.order.influencer}
                            </p>
                          </div>
                        </div>

                        <hr className="border-color-medium mx-auto my-5 w-full" />

                        <div>
                          <div className="mt-2">
                            <p className="text-sm font-semibold text-color-medium">
                              Realizada em
                            </p>
                            <p className="font-light text-color-light">
                              {props.order.createdAt}
                            </p>
                          </div>
                          <div className="mt-2">
                            <p className="text-sm font-semibold text-color-medium">
                              Aprovada em
                            </p>
                            <p className="font-light text-color-light">
                              {props.order.approvedAt}
                            </p>
                          </div>
                        </div>
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
