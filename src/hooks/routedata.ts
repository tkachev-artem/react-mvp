//здесь будет запрос на маршруты из бд

const routes = [
    {
        id: 1,
        title: "Левый берег Дона",
        time: "40 минут",
        image: "/images/route1.jpg",
        description: "Прогуляйтесь по парку, который точно сделает вас красным. И стадион который без деревьев))",
        coordinates: {
            start: [47.212655, 39.731018] as [number, number],
            end: [47.209436, 39.737818] as [number, number]
        }
    },
    {
        id: 2,
        title: "Правый берег Дона",
        time: "45 минут",
        image: "/images/route2.jpg",
        description: "Эта сторона Дона богата на историю, тут расположена набережная, Речной вокзал, и Парамоновские склады, а ещё тут есть фонтан!",
        coordinates: {
            start: [47.213300, 39.711024] as [number, number],
            end: [47.219725, 39.733891] as [number, number]
        }
    },
    {
        id: 3,
        title: "Дом Алины",
        time: "5 минут",
        image: "/images/route2.jpg",
        description: "Этот дом находится в центре города, и является памятником архитектуры. Его построили в 1930-х годах, и он является одним из самых красивых зданий в городе.",
        coordinates: {
            start: [47.271626, 39.747864] as [number, number],
            end: [47.271626, 39.747864] as [number, number]
        }
    }
]

export default routes;