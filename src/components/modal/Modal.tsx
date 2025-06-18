import { Button } from "@/components/ui/button";
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogOverlay, DialogPortal, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { X } from "lucide-react";
import { ReactElement } from "react";

interface Props {
  trigger: ReactElement
  title: string
  description?: ReactElement | string
  body: ReactElement
  isOpen: boolean
  setIsOpen: (isOpen: boolean) => void
  handleOnClose: () => void
}

export const Modal = ({ isOpen, setIsOpen, handleOnClose, trigger, title, description, body } : Props) => {
    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                {trigger}
            </DialogTrigger>
            <DialogPortal>
                <DialogOverlay className="bg-white/60 fixed inset-0"/>
                <DialogContent className="bg-[#fcfcfc] rounded-[6px] shadow-[0_10px_38px_-10px_rgba(22,23,24,0.35),0_10px_20px_-15px_rgba(22,23,24,0.2)] fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[90vw] max-w-[500px] max-h-[85vh] p-[25px] z-[1001] overflow-y-auto focus:outline-none">
                <DialogTitle className="mb-[10px] font-semibold text-[17px]">
                    {title}
                </DialogTitle>
                { description ? 
                    <DialogDescription className="mb-5 text-[15px] leading-[1.5]">
                        {description}  
                    </DialogDescription>
                    : null
                }
                    {body}

                {/* <DialogClose asChild> */}
                    <Button onClick={handleOnClose} variant='ghost' className='rounded-full inline-flex items-center justify-center absolute top-[20px] right-[20px]' aria-label="Close">
                        <X/>
                    </Button>
                {/* </DialogClose>  */}
                </DialogContent>
            </DialogPortal>
        </Dialog>
    )
};
