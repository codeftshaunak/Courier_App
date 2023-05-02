const people = [
    {
        name: 'Add Warehouse',
        imageUrl: 'https://i.ibb.co/7RV6VCG/warehouse.png',
    }, {
        name: 'Complete Profile',
        imageUrl: 'https://i.ibb.co/gSyDQt6/profile.png'
    }
    // More people...
]



export default function HeroDashbord() {
    return (
        <div className="bg-white py-5 sm:py-5">
            <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
                <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
                    {people.map((person) => (
                        <li key={person.name}>
                            <div className="flex items-center gap-x-6">
                                <img className="h-16 w-16 rounded-full" src={person.imageUrl} alt="" />
                                <div>
                                    <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900">{person.name}</h3>
                                </div>
                            </div>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}


