"use client";

import { useState, useEffect } from "react";
import { Product, ApiResponse } from "@/types/types";

import Pagination from "./Pagination";
import SearchBar from "./SearchBar";
import ProductTable from "./ProductTable";

const ProductsContainer = () => {
    const [products, setProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);
    const [lastPage, setLastPage] = useState(1);
    const [searchTerm, setSearchTerm] = useState("");
    const [sortBy, setSortBy] = useState("id");
    const [sortOrder, setSortOrder] = useState("desc");

    const handleSort = (column: string) => {
        if (sortBy === column) {
            setSortOrder(sortOrder === "asc" ? "desc" : "asc");
        } else {
            setSortBy(column);
            setSortOrder("asc");
        }
    };

    useEffect(() => {
        const timeoutId = setTimeout(() => {
            fetchProducts();
        }, 300);

        return () => clearTimeout(timeoutId);
    }, [currentPage, searchTerm, sortBy, sortOrder]);

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
    

    return (
        <div className="container mx-auto px-4 py-8">
            <SearchBar searchTerm={searchTerm} onSearch={setSearchTerm} />

            {error && <div className="text-red-500 text-center mb-4">{error}</div>}

            {loading ? (
                <div className="flex justify-center items-center h-64">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
                </div>
            ) : (
                <>
                    <div className="min-h-[50vh]">
                        <ProductTable
                            products={products}
                            sortBy={sortBy}
                            sortOrder={sortOrder}
                            onSort={handleSort}
                        />
                    </div>
                    <Pagination
                        currentPage={currentPage}
                        lastPage={lastPage}
                        onPageChange={setCurrentPage}
                    />
                </>
            )}
        </div>
    );
};

export default ProductsContainer;