import { useEffect, useState } from 'react'
import { TypedH2 } from './components/typography'
import EmojiList from './lib/emoji-list'
import User from './components/user'
import { getEmojiFromStorage, setEmoji2Storage } from './lib/utils'
import { ThemeProvider } from './components/theme-provider'
import { ModeToggle } from './components/mode-toggle'

function App() {
  const [emo, setEmo] = useState('');

  const handleEmojiSelect = (emojiItem: any) => {
    setEmo(emojiItem.native);

    setEmoji2Storage(emojiItem);
  }

  useEffect(() => {
    try {
      const _emoji = getEmojiFromStorage();
      if (_emoji) {
        setEmo(_emoji)
      }
    } catch(e) {
      console.log(e);
    }
  }, []);

  return (
    <ThemeProvider defaultTheme="system" storageKey="vite-ui-theme">
      <div className="flex flex-col justify-center items-center h-full">
        <TypedH2 />
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
