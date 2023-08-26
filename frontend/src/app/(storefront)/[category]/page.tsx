import { handleFetchErrors } from "@/utils";
import ProductCard from "@/components/storefront/ProductCard";
import Filters from "@/components/storefront/Filters";

const fetchCategory = async (category: string) => {
  const res = await fetch(`http://localhost:5000/categories/${category}`);
  handleFetchErrors(res);
  const data = await res.json();
  return data.category;
};

async function Category({ params }: { params: { category: string } }) {
  const { category } = params;
  const categoryData = await fetchCategory(category);

  return (
    <div className="flex flex-col mt-5 mx-10">
      <h1 className="text-2xl">{category}</h1>

      <div className="flex">
        <Filters />
        <div className="grid grid-cols-4 gap-4 md:grid-cols-3">
          {categoryData?.products && categoryData?.products.length ? (
            categoryData?.products?.map((product: any) => (
              <ProductCard key={product.id} product={product} />
            ))
          ) : (
            <h1>No products found</h1>
          )}
        </div>
      </div>
    </div>
  );
}

export default Category;
