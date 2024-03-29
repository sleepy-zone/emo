import { useEffect, useRef, useState } from 'react'
import { TypedH2 } from './components/typography'
import EmojiList from './lib/emoji-list'
import User from './components/user'
import { getEmojiFromStorage, setEmoji2Storage } from './lib/utils'
import { ThemeProvider } from './components/theme-provider'
import { ModeToggle } from './components/mode-toggle'
import dayjs from 'dayjs'

function App() {
  const [emo, setEmo] = useState('');
  const [initTime, setInitTime] = useState(dayjs().startOf('day'));
  const [currentTime, setCurrentTime] = useState(0);
  const timeoutRef = useRef();

  const handleEmojiSelect = (emojiItem: any) => {
    setEmo(emojiItem.native);

    setEmoji2Storage(emojiItem);
  }

  const init = () => {
    try {
      const _emoji = getEmojiFromStorage(initTime);
      if (_emoji) {
        setEmo(_emoji)
      }
    } catch(e) {
      console.log(e);
    }
  }

  const tickTime = () => {
    timeoutRef.current = setTimeout(() => {
      setCurrentTime(Date.now());
    }, 1000);

    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
        timeoutRef.current = null;
      }
    }
  }

  useEffect(() => {
    init();
  }, [initTime]);

  useEffect(() => {
    tickTime();
  }, []);

  useEffect(() => {
    const delta = dayjs(currentTime).diff(dayjs(initTime), 'day', true);
    if (delta > 1) {
      setInitTime(dayjs().startOf('day'));
    }

    tickTime();
  }, [currentTime, initTime]);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="flex flex-col justify-center items-center h-full">
        <TypedH2 initTime={initTime}/>
        <div className="text-[60px]">
          {emo}
        </div>
        <div className="flex flex-wrap justify-around gap-4 w-[402px] mt-4 cursor-pointer">
        {
          EmojiList.map(emojiItem => (
            <div className="text-[36px]" onClick={() => handleEmojiSelect(emojiItem)}>
              {emojiItem.native}
            </div>
          ))
        }
        </div>

        <User />

        <ModeToggle />
      </div>
    </ThemeProvider>
  )
}

export default App
