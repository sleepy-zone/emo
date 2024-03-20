import { useEffect, useState } from 'react'
import { AvatarIcon } from '@radix-ui/react-icons'
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from '@/components/ui/drawer'
import { Calendar } from '@/components/ui/calendar'

export default function User () {
  const [avatar, setAvatar] = useState('');

  const init = () => {
    // @ts-ignore
    const utools = window.utools;

    if (utools) {
      const user = utools.getUser();
      setAvatar(user?.avatar);
    }
  }

  useEffect(() => {
    init();
  }, [])

  return (
    <div
      className="fixed right-8 bottom-8 cursor-pointer"
    >
      <Drawer>
        <DrawerTrigger>
        {
          avatar ?
          <img src={avatar} className="h-10 w-10 rounded-full" /> :
          <AvatarIcon className="h-10 w-10 text-zinc-700" />
        }
        </DrawerTrigger>
        <DrawerContent>
          <div className="flex justify-center items-center h-96">
            <Calendar
              mode="single"
              className="rounded-md border shadow"
            />
          </div>
        </DrawerContent>
      </Drawer>
    </div>
  )
}