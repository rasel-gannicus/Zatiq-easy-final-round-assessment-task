"use client" ; 
import { useState } from "react";
import SearchBar from "./SearchBar";

const ProductsContainer = () => {

    const [searchTerm, setSearchTerm] = useState("");

    return (
        <div className="container mx-auto px-4 py-8">
            <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
        </div>
    );
};

export default ProductsContainer;
