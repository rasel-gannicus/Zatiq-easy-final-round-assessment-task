"use client";
import { useEffect, useState } from "react";
import SearchBar from "./SearchBar";
import { ApiResponse, Product } from "@/types/types";

const ProductsContainer = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [searchTerm, setSearchTerm] = useState("");
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [sortBy, setSortBy] = useState("id");
    const [sortOrder, setSortOrder] = useState("desc");
    const [lastPage, setLastPage] = useState(1);


    const fetchProducts = async () => {
        try {
            setLoading(true);
            setError(null);
            const queryParams = new URLSearchParams({
                page: currentPage.toString(),
                ...(searchTerm && { search: searchTerm }),
                sort_by: sortBy,
                order: sortOrder,
            });

            const response = await fetch(
                `${process.env.NEXT_PUBLIC_API_URL}/api/ProductList?${queryParams}`
            );

            if (!response.ok) {
                throw new Error("Failed to fetch products");
            }

            const data: ApiResponse = await response.json();
            setProducts(data.data);
            setLastPage(data.last_page);
        } catch (error) {
            setError("Error fetching products. Please try again later.");
            console.error("Error fetching products:", error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(()=>{
        console.log(fetchProducts());
    },[products])

    return (
        <div className="container mx-auto px-4 py-8">
            <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />
        </div>
    );
};

export default ProductsContainer;
