import { useState, useRef, useEffect } from "react";

interface SearchableSelectProps {
  options: string[];
  addTag: (value?: string) => void;
  currentTags: string[];
}

export default function SearchableSelect({options, addTag, currentTags}: SearchableSelectProps) {
  const [search, setSearch] = useState('')
  const [filteredOptions, setFilteredOptions] = useState(options)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const handleSelected = (option: string) => () => {
    addTag(option)
    setSearch('')
    setIsOpen(false)
  }

  useEffect(() => {
    setFilteredOptions(options.filter(option => 
      option.toLowerCase().includes(search.toLowerCase()) && !currentTags.includes(option)
    ))
  }, [currentTags, search, options])

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }

    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  return (
    <div className="relative inline-flex items-center bg-blue1 px-3 m-2 rounded-2xl font-medium" ref={dropdownRef}>
      <input
        type="text"
        value={search}
        onChange={(e) => handleSearch(e)}
        onFocus={() => setIsOpen(true)}
        className="bg-transparent border-none outline-none placeholder-gray-500 text-sm min-w-[120px]"
        placeholder="Nova capacidade..."
      />
      {
        isOpen && (
          <div className="absolute top-full left-0 w-full bg-white border shadow-lg max-h-48 overflow-y-auto">
            {filteredOptions.map(option => (
              <div
                key={option}
                onClick={handleSelected(option)}
                className="p-2 hover:bg-gray-100 cursor-pointer"
              >
                {option}
              </div>
            ))}
          </div>
        )
      }
    </div>
  );
}
