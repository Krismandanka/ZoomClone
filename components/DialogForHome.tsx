import React,{ReactNode} from 'react'
import Image from 'next/image';
import { cn } from '@/lib/utils';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
  } from "@/components/ui/dialog"
import { Button } from './ui/button';
  
  interface DialogHome {
    isOpen: boolean;
    onClose: () => void;
    title: string;
    handleClick?:()=>void;
    buttonText?:string;
    className?:string;
    image?:string;
    children?:ReactNode;
    buttonIcon?:string;
  }
const DialogForHome = ({isOpen,onClose,title,handleClick,buttonText,className,image,children,buttonIcon}:DialogHome) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
        {/* <DialogTrigger>Open</DialogTrigger> */}
        <DialogContent className='flex flex-col border-none bg-dark-1 gap-6 w-full max-w-[520px] px-6 py-9 text-white'>
            {image && 
                <div className='flex justify-center'>
                    <Image src={image} alt='Image' width={72} height={72}/>
                </div>
            }
            <h1 className={cn("text-3xl font-bold leading-[42px]", className)}>
            {title}
          </h1>
          {children}
          <Button
            className={
              "bg-blue-1 focus-visible:ring-0 focus-visible:ring-offset-0"
            }
            onClick={handleClick}
          >
            {buttonIcon && (
              <Image
                src={buttonIcon}
                alt="button icon"
                width={13}
                height={13}
              />
            )}{" "}
            &nbsp;
            {buttonText || "Schedule Meeting"}
          </Button>

            
        </DialogContent>
    </Dialog>

  )
}

export default DialogForHome