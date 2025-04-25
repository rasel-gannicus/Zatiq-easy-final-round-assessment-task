import { SearchBarProps } from "@/types/types";

const SearchBar = ({ searchTerm, onSearch }: SearchBarProps) => {
    return (
        <div className="mb-6">
            <input
                type="text"
                placeholder="Search products..."
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
            />
        </div>
    );
};

export default SearchBar;