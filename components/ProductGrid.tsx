import ProductCard from "@/components/ProductCard"; import {Product} from "@/lib/products";
export default function ProductGrid({items}:{items:Product[]}){return <div className="product-grid">{items.map(p=><ProductCard key={p.slug} product={p}/>)}</div>}
