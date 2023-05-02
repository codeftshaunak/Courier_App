const products = [
    {
        id: 1,
        name: 'Total Shipment',
        totalamount: '0',
        date: 'Last 30 days'
    },
    {
        id: 2,
        name: 'Today Shipment',
        totalamount: '0',
        date: 'today'
    },
    {
        id: 3,
        name: 'Yesterday Shipment',
        totalamount: '0',
        date: 'tomorrow'
    }, {
        id: 4,
        name: 'Total Load',
        totalamount: '0',
        date: 'In KG'
    }
    // More products...
]

export default function DashboardAmount() {
    return (
        <div className="bg-white">
            <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
                <h1 className="text-black py-3">Products</h1>
                <div className="grid grid-cols-1 gap-x-1 gap-y-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
                    {products.map((product) => (
                        <div key={product.id} className="group">
                            <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-w-7 p-3">
                                <h2 className="mt-1 text-md text-gray-700 text-left text-lg">{product.totalamount}</h2>
                                <h1 className="mt-1 text-lg text-gray-700 text-center">{product.name}</h1>
                                <p className="text-black text-right font-sm">{product.date}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}
