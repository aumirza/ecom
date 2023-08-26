import AddToCartWithQuantity from "@/components/storefront/AddToCartWithQuantity";
import Image from "next/image";

const fetchProduct = async (id: string) => {
  const response = await fetch(`http://localhost:5000/products/${id}`);
  const data = await response.json();
  return data.product;
};

export default async function page({ params }: { params: { id: string } }) {
  const { id } = params;
  const product = await fetchProduct(id);

  return (
    <div className="flex flex-col md:flex-row -mx-4">
      <div className="md:flex-1 px-4">
        <div>
          <div className="h-64 md:h-80 rounded-lg bg-gray-100 mb-4 flex items-center justify-center">
            <Image
              src={product.image}
              alt="product"
              width={400}
              height={300}
              className="rounded-lg bg-gray-100 mb-4"
            />
          </div>

          <div className="flex -mx-2 mb-4">
            {new Array(4).fill(0).map((_, i) => (
              <div className="flex-1 px-2" key={i}>
                <button
                  className={
                    "focus:outline-none w-full rounded-lg h-24 md:h-32 bg-gray-100 flex items-center justify-center" +
                    (i === 0 ? " ring-2 ring-indigo-300 ring-inset" : "")
                  }
                >
                  <span className="text-2xl">{i}</span>
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="md:flex-1 px-4">
        <h2 className="mb-2 leading-tight tracking-tight font-bold text-gray-800 text-2xl md:text-3xl">
          {product.name}
        </h2>
        <p className="text-gray-500 text-sm">
          By{" "}
          <a href="#" className="text-indigo-600 hover:underline">
            ABC Company
          </a>
        </p>

        <div className="flex items-center space-x-4 my-4">
          <div>
            <div className="rounded-lg bg-gray-100 flex py-2 px-3">
              <span className="text-indigo-400 mr-1 text-3xl">₹</span>
              <span className="font-bold text-indigo-600 text-3xl">
                {product.price}
              </span>
            </div>
          </div>
          <div className="flex-1">
            <p className="text-green-500 text-xl font-semibold">Save 12%</p>
            <p className="text-gray-400 text-sm">Inclusive of all Taxes.</p>
          </div>
        </div>

        <p className="text-gray-500">{product.description}</p>

        <AddToCartWithQuantity product={product} />
      </div>
    </div>
  );
}
