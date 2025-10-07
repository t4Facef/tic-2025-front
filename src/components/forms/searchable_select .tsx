import { useState, useRef, useEffect } from "react";

interface SearchableSelectProps {
  options: string[];
  setSelected: (option: string) => void;
}

export default function SearchableSelect({options, setSelected}: SearchableSelectProps) {
  const [search, setSearch] = useState('')
  const [filteredOptions, setFilteredOptions] = useState(options)
  const [isOpen, setIsOpen] = useState(false)
  const dropdownRef = useRef<HTMLDivElement>(null)

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
    setFilteredOptions(options.filter(option => option.toLowerCase().includes(e.target.value.toLowerCase())))
  }

  const handleSelected = (option: string) => () => {
    setSelected(option)
    setSearch('')
    setIsOpen(false)
  }

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
    <div className="relative" ref={dropdownRef}>
      <input
        type="text"
        value={search}
        onChange={(e) => handleSearch(e)}
        onFocus={() => setIsOpen(true)}
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
