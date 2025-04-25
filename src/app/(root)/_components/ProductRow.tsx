import Image from "next/image";
import { Product } from "@/types/types";

interface ProductRowProps {
    product: Product;
}

const ProductRow = ({ product }: ProductRowProps) => {
    return (
        <tr className="hover:bg-gray-50">
            <td className="px-6 py-4 border-b">
                <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/${product.img}`}
                    alt={product.name}
                    width={64}
                    height={64}
                    className="object-cover rounded"
                />
            </td>
            <td className="px-6 py-4 border-b">{product.name}</td>
            <td className="px-6 py-4 border-b">{product.brand_name}</td>
            <td className="px-6 py-4 border-b">{product.category_name}</td>
            <td className="px-6 py-4 border-b">{product.stock}</td>
            <td className="px-6 py-4 border-b">{product.buying_price}</td>
            <td className="px-6 py-4 border-b">{product.selling_price}</td>
            <td className="px-6 py-4 border-b">
                <span
                    className={`px-2 py-1 rounded ${product.status === "active"
                            ? "bg-green-100 text-green-800"
                            : "bg-red-100 text-red-800"
                        }`}
                >
                    {product.status}
                </span>
            </td>
        </tr>
    );
};

export default ProductRow;