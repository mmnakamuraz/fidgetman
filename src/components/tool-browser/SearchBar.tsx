import { Search } from 'lucide-react';
import './SearchBar.css';

type SearchBarProps = { value: string; onChange: (value: string) => void };

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <label className="tool-search">
      <Search size={15} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search tools..."
        aria-label="Search tools"
      />
      <kbd>⌘ K</kbd>
    </label>
  );
}
