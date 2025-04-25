import { Product } from "@/types/types";
import ProductRow from "./ProductRow";

interface ProductTableProps {
    products: Product[];
    sortBy: string;
    sortOrder: string;
    onSort: (column: string) => void;
}

const ProductTable = ({ products, sortBy, sortOrder, onSort }: ProductTableProps) => {
    const renderSortIcon = (column: string) => {
        if (sortBy !== column) return "↕️";
        return sortOrder === "asc" ? "↑" : "↓";
    };

    const renderTableHeader = (title: string, column: string) => (
        <th
            className="px-6 py-3 border-b cursor-pointer hover:bg-gray-200"
            onClick={() => onSort(column)}
        >
            <div className="flex items-center justify-between">
                <span>{title}</span>
                <span className="ml-2">{renderSortIcon(column)}</span>
            </div>
        </th>
    );

    return (
        <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300">
                <thead>
                    <tr className="bg-gray-100">
                        <th className="px-6 py-3 border-b">Image</th>
                        {renderTableHeader("Name", "name")}
                        {renderTableHeader("Brand", "brand_name")}
                        {renderTableHeader("Category", "category_name")}
                        {renderTableHeader("Stock", "stock")}
                        {renderTableHeader("Buying Price", "buying_price")}
                        {renderTableHeader("Selling Price", "selling_price")}
                        {renderTableHeader("Status", "status")}
                    </tr>
                </thead>
                <tbody>
                    {products.map((product) => (
                        <ProductRow key={product.id} product={product} />
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default ProductTable;