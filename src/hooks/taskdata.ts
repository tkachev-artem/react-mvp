//здесь будет запрос на задания из бд

const tasks = [
    {
        id: 1,
        title: "Парамоны",
        icon: "/icons/a-block/camera.svg",
        taskpointstart: "0",
        taskpointend: "1",
        image: "/images/task1.jpg",
        description: "Комплекс складских сооружений XIX века в Ростове-на-Дону. Построены они были во второй половине XIX века. Что примечательно, только два из них принадлежали Елпидифору Трофимовичу Парамонову, но в силу популярности крупнейшего зернопромышленника и купца, теперь весь складской комплекс называют Парамоновским.",
        taskdescription: "Найдите и сфотографируйте сооружение",
        reward: "90",
        taskcitytype: "старый город",
        taskcityplaceinfo: "детали",
        coordinates: [47.218199, 39.727021]
    },
    {
        id: 2,
        title: "Памятник-Стела",
        icon: "/icons/a-block/camera.svg",
        taskpointstart: "1",
        taskpointend: "1",
        image: "/images/task2.jpg",
        description: "Памятник, возведённый на Театральной площади Ростова-на-Дону в честь освобождения города от нацистских войск. Торжественное открытие состоялось 8 мая 1983 года и было приурочено к 40-летию освобождения.",
        taskdescription: "Найдите и сфотографируйте монументальное сооружение",
        reward: "70",
        taskcitytype: "история",
        taskcityplaceinfo: "детали",
        coordinates: [47.225954, 39.745840]
    },
    {
        id: 3,
        title: "Охотник за мозаиками",
        icon: "/icons/a-block/camera.svg",
        taskpointstart: "0",
        taskpointend: "1",
        image: "/images/task3.jpg",
        description: "Мозаики в подземных переходах являютсяуникальными произведениями монументального искусства, созданные в советское время. Они украшают стены переходов яркими сюжетами на темы труда, прогресса, мира и культуры.",
        taskdescription: "Найдите и сфотографируйте сооружение",
        reward: "40",
        taskcitytype: "подземный город",
        taskcityplaceinfo: "детали",
        coordinates: [47.217275, 39.708898]
    },
    {
        id: 4,
        title: "Мемориал Змиёвская балка",
        icon: "/icons/a-block/camera.svg",
        taskpointstart: "0",
        taskpointend: "1",
        image: "/images/task4.jpg",
        description: "Мемориал жертвам фашизма «Змиёвская балка» расположен на месте, где в 1942 году фашисты расстреляли около 3000 человек. Это крупнейшее в России место захоронения жертв Холокоста.",
        taskdescription: "Посетите мемориальный комплекс",
        reward: "50",
        taskcitytype: "история",
        taskcityplaceinfo: "помним",
        coordinates: [47.245998, 39.650862]
    }

]

export default tasks;