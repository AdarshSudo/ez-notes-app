import React, { useState } from 'react'
import { House, Plus, Timer } from 'lucide-react'
import { Link } from 'react-router-dom'
import { themeClasses } from '@renderer/noteThemes'
import useNoteStore from '@renderer/store/useNoteStore'

const LeftBar: React.FC = ({}) => {
  const [showThemes, setShowThemes] = useState(false)
  const addNote = useNoteStore((state) => state.addNote)

  const handleThemeClick = (themeIndex: number) => {
    const newNote = {
      id: crypto.randomUUID(),
      title: '',
      content: '',
      theme: themeIndex
    }
    addNote(newNote)
  }

  const handleTimerClick = () => {
    window.electronAPI.openTimer()
  }
  return (
    <div className="fixed left-0 top-0 h-full w-16 flex flex-col justify-center items-center gap-6">
      <Link to={'/'}>
        <House className="h-5 w-5 cursor-pointer opacity-50 hover:opacity-100 text-white" />
      </Link>
      <div className="flex justify-center items-center flex-col gap-4">
        <Plus
          className="h-5 w-5 cursor-pointer opacity-50 hover:opacity-100 text-white"
          onClick={() => setShowThemes(!showThemes)}
        />
        {showThemes && (
          <div className="flex flex-col gap-3 rounded">
            {[0, 1, 2, 3, 4].map((index) => (
              <div
                key={index}
                className={`h-3 w-3 flex items-center gap-2 cursor-pointer rounded-full ${themeClasses[index]} hover:opacity-80`}
                onClick={() => handleThemeClick(index)}
              ></div>
            ))}
          </div>
        )}
      </div>
      {/* <Link to={'/timer'}> */}
      <Timer
        className="h-5 w-5 cursor-pointer opacity-50 hover:opacity-100 text-white"
        onClick={handleTimerClick}
      />
      {/* </Link> */}
    </div>
  )
}

export default LeftBar
