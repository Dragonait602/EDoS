function HomePage() {
return (
<>
    <div class="grid grid-cols-1 md:grid-cols-2 items-center gap-8">
        <img src="/src/assets/mainImage.png" alt="Student" class="w-full max-w-md mx-auto" />
        <div class="text-center md:text-left space-y-4">
            <h1 class="text-4xl font-bold">Електронна база даних студентів</h1>
            <p class="text-gray-600">Lorem ipsum dolor sit amet, consectetur adipiscing elit...</p>
            <button class="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 transition">Детальніше</button>
        </div>
    </div>
</>
)
}

export default HomePage