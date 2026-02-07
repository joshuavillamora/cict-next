// [IMPORT] Standard
import Image from "next/image";

const SearchBar = () => {
    return (
        <div className="flex rounded-lg focus:outline-none shadow-xl border-2 border-[var(--color-orange-dark)]"
            >
            <input className="px-3 py-2 text-xs font-minor italic h-full focus:outline-none"
            placeholder="Search by name..."/>
            <button className="bg-[var(--color-orange-dark)] px-2 rounded-r-sm cursor-pointer">
                <Image src="search-icon.svg" alt="search-icon" className="" width={20} height={20}/>
            </button>
        </div>
    );
};

export default SearchBar;