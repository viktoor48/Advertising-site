export const CategoryType = {
    ALL: 'any',
    ESTATE: 'estate',
    LAPTOPS: 'laptops',
    CAMERA: 'camera',
    CARS: 'cars',
};

export const SortingOrder = {
  POPULAR: 'popular',
  CHEAP: 'cheap',
  NEW: 'new',
};

export const categories = [
    {
        name: CategoryType.ALL,
        title: `Все`
    },
    {
        name: CategoryType.ESTATE,
        title: `Недвижимость`
    },
    {
        name: CategoryType.LAPTOPS,
        title: `Ноутбуки`
    },
    {
        name: CategoryType.CAMERA,
        title: `Фотоаппараты`
    },
    {
        name: CategoryType.CARS,
        title: `Автомобили`
    },
];

export const filters = {
    camera: {
        type: [
            {
                name: 'Зеркальный',
                value: 'slr',
                id: 'mirror',
            },
            {
                name: 'Цифровой',
                value: 'digital',
                id: 'digital',
            },
            {
                name: 'Беззеркальный',
                value: 'mirrorless',
                id: 'mirrorless',
            },
        ],
        matrix: [
            {
                name: 'Любое',
                value: 'any',
                selected: true,
            },
            {
                name: '1 МП',
                value: '1',
                selected: false,
            },
            {
                name: '3 МП',
                value: '3',
                selected: false,
            },
            {
                name: '5 МП',
                value: '5',
                selected: false,
            },
            {
                name: '7 МП',
                value: '7',
                selected: false,
            },
            {
                name: '10 МП',
                value: '10',
                selected: false,
            },
        ],
        video: [
            {
                name: 'Любое',
                value: 'any',
                selected: true,
            },
            {
                name: 'HD',
                value: 'HD',
                selected: false,
            },
            {
                name: 'Full HD',
                value: 'full-hd',
                selected: false,
            },
            {
                name: '4K',
                value: '4K',
                selected: false,
            },
            {
                name: '5K',
                value: '5K',
                selected: false,
            },
        ],
    },
    car: {
        productionYear: [
            {
                name: '1900',
                value: '1900',
                selected: true,
            },
            {
                name: '1940',
                value: '1940',
                selected: false,
            },
            {
                name: '1960',
                value: '1960',
                selected: false,
            },
            {
                name: '1980',
                value: '1980',
                selected: false,
            },
            {
                name: '2000',
                value: '2000',
                selected: false,
            },
        ],
        transmission: [
            {
                name: 'Любая',
                value: 'any',
                id: 'any_transmission',
                checked: true,
            },
            {
                name: 'Механика',
                value: 'mechanic',
                id: 'mechanic_transmission',
                checked: false,
            },
            {
                name: 'Автомат',
                value: 'auto',
                id: 'auto_transmission',
                checked: false,
            },
        ],
        bodyType: [
            {
                name: 'Седан',
                value: 'sedan',
                id: 'sedan',
            },
            {
                name: 'Универсал',
                value: 'universal',
                id: 'universal',
            },
            {
                name: 'Хэтчбэк',
                value: 'hatchback',
                id: 'hatchback',
            },
            {
                name: 'Внедорожник',
                value: 'suv',
                id: 'jeep',
            },
            {
                name: 'Купэ',
                value: 'cupe',
                id: 'cupe',
            },
        ],
    },
    estate: {
        type: [
            {
                name: 'Дом',
                value: 'house',
                id: 'house',
            },
            {
                name: 'Квартира',
                value: 'flat',
                id: 'flat',
            },
            {
                name: 'Апартаменты',
                value: 'apartment',
                id: 'apartments',
            },
        ],
        roomsCount: [
            {
                name: 'Любое',
                value: 'any',
                id: 'any_room',
                checked: true,
            },
            {
                name: '1',
                value: '1',
                id: 'one',
                checked: false,
            },
            {
                name: '2',
                value: '2',
                id: 'two',
                checked: false,
            },
            {
                name: '3',
                value: '3',
                id: 'three',
                checked: false,
            },
            {
                name: '4',
                value: '4',
                id: 'four',
                checked: false,
            },
            {
                name: '5+',
                value: '5',
                id: 'fivemore',
                checked: false,
            },
        ],
    },
    laptop: {
        type: [
            {
                name: 'Ультрабук',
                value: 'ultrabook',
                id: 'ultra',
            },
            {
                name: 'Домашний ноутбук',
                value: 'home',
                id: 'home',
            },
            {
                name: 'Игровой ноутбук',
                value: 'gaming',
                id: 'gaming',
            },
        ],
        ram: [
            {
                name: 'Любой',
                value: 'any',
                id: 'any_ram',
                checked: true,
            },
            {
                name: '4 Гб',
                value: '4',
                id: '4gb',
                checked: false,
            },
            {
                name: '8 Гб',
                value: '8',
                id: '8gb',
                checked: false,
            },
            {
                name: '16 Гб',
                value: '16',
                id: '16gb',
                checked: false,
            },
        ],
        screenSize: [
            {
                name: 'Любая',
                value: 'any',
                id: 'any_diagonal',
                checked: true,
            },
            {
                name: '13',
                value: '13',
                id: '13in',
                checked: false,
            },
            {
                name: '14',
                value: '14',
                id: '14in',
                checked: false,
            },
            {
                name: '15',
                value: '15',
                id: '15in',
                checked: false,
            },
            {
                name: '17',
                value: '17',
                id: '17in',
                checked: false,
            },
        ],
        cpu: [
            {
                name: 'Intel Core i3',
                value: 'i3',
                id: 'i3',
            },
            {
                name: 'Intel Core i5',
                value: 'i5',
                id: 'i5',
            },
            {
                name: 'Intel Core i7',
                value: 'i7',
                id: 'i7',
            },
        ],
    },
};

export const NAVIGATION_PHOTOS_COUNT = 5;
