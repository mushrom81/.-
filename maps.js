let lookupArray = [
    [1, 2, 3, 4],
    [0, 0, 6, 5]
];

let currentPos = {
    x: 0,
    y: 0
};

let terrainHash = {
    1: [
        [
            1,1,1,1,1,1,1,1,1,1,1,1,
            1,0,0,0,0,0,0,0,0,0,0,0,
            1,0,0,0,0,0,0,0,0,0,0,0,
            1,0,0,1,0,1,1,1,1,0,0,0,
            1,0,0,0,0,0,0,0,0,0,0,0,
            1,0,0,0,0,0,0,0,0,0,0,0,
            1,1,1,1,1,1,1,1,1,1,1,1,

            0,0,0,0,0,0,0,0,0,0,0,0
        ],
        [
            [[2,2,"eu"]],
            [[3,2,"er"]],
            [[4,2,"er"]],
            [[4,3,"ed"]],
            [[4,4,"ed"]],
            [[3,4,"el"]],
            [[2,4,"el"]],
            [[2,3,"eu"]],
        ]
    ],
    
    2: [
        [
            1,1,1,1,1,1,1,1,1,1,1,1,
            0,0,1,1,1,1,1,1,1,1,0,0,
            0,0,0,0,1,1,1,1,0,0,0,0,
            0,0,0,0,0,0,0,0,0,0,0,0,
            0,0,0,0,1,1,1,1,0,0,0,0,
            0,0,1,1,1,1,1,1,1,1,0,0,
            1,1,1,1,1,1,1,1,1,1,1,1,

            0,0,0,0,0,0,0,0,0,0,0,0
        ],
        [
            [[]],
        ]
    ],

    3: [
        [
            1,1,1,1,1,1,1,1,1,1,1,1,
            0,0,0,0,1,0,1,0,0,1,1,0,
            0,0,1,0,0,0,1,0,0,0,0,0,
            0,0,1,0,1,0,0,0,1,1,1,0,
            0,0,1,0,0,0,1,0,0,0,0,0,
            0,0,0,0,1,0,1,0,0,1,1,0,
            1,1,1,1,1,1,1,1,1,1,1,1,
            
            0,0,0,0,0,0,0,0,0,0,0,0
        ],
        [
            [[]],
        ]
    ],

    4: [
        [
            1,1,1,1,1,1,1,1,1,1,1,1,
            0,0,0,0,0,0,0,1,0,0,0,1,
            0,0,0,0,0,0,0,2,0,0,0,1,
            0,0,0,0,0,0,0,1,0,0,0,1,
            0,0,0,0,0,0,0,1,0,0,0,1,
            0,0,0,0,0,0,0,1,0,0,0,1,
            1,1,1,1,1,1,1,1,0,0,0,1,
            
            0,0,0,0,0,0,0,0,0,0,0,0
        ],
        [
            [[]],
        ]
    ],

    5: [
        [
            1,1,1,1,1,1,1,1,0,0,0,1,
            0,0,0,1,0,0,0,1,0,0,0,1,
            0,1,0,1,0,1,0,1,0,0,0,1,
            0,1,0,1,0,1,0,1,0,0,0,1,
            0,1,0,1,0,1,0,1,0,0,0,1,
            0,1,0,0,0,1,0,0,0,0,0,1,
            1,1,1,1,1,1,1,1,1,1,1,1,
            
            0,0,0,0,0,0,0,0,0,0,0,0
        ],
        [
            [[]],
        ]
    ],
    
    6: [
        [
            1,1,1,1,1,1,1,1,1,1,1,1,
            1,0,0,0,0,0,0,0,0,0,0,0,
            1,0,0,0,0,0,0,0,0,0,0,0,
            1,0,0,0,0,0,0,0,0,0,0,0,
            1,0,0,0,0,0,0,0,0,0,0,0,
            1,0,0,0,0,0,0,0,0,0,0,0,
            1,1,1,1,1,1,1,1,1,1,1,1,
            
            0,0,0,0,0,0,0,0,0,0,0,0
        ],
        [
            [[]],
        ]
    ],
};

let sprites = {
    0: [
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0
    ],

    1: [
        1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1,
        1,1,1,1,1,1,1,1
    ],

    2: [
        0,1,1,1,1,1,1,1,
        1,0,1,1,1,1,0,1,
        0,1,1,1,1,1,1,1,
        0,1,0,0,1,1,1,0,
        0,0,0,0,1,0,0,0,
        0,0,0,0,0,0,0,1,
        0,1,0,1,1,0,1,0,
        0,1,1,0,1,1,1,1
    ],
    
    "el": [
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        0,0,1,1,1,1,0,0,
        0,0,0,1,0,1,0,0,
        0,0,1,1,1,1,0,0,
        0,0,0,0,0,1,0,0,
        0,0,1,1,1,1,1,0,
        0,0,0,0,0,0,0,0
    ],

    "er": [
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        0,0,1,1,1,1,0,0,
        0,0,1,0,1,0,0,0,
        0,0,1,1,1,1,0,0,
        0,0,1,0,0,0,0,0,
        0,1,1,1,1,1,0,0,
        0,0,0,0,0,0,0,0
    ],

    "eu": [
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        0,0,1,1,1,1,0,0,
        0,0,1,1,1,1,0,0,
        0,0,1,1,1,1,0,0,
        0,0,1,1,1,1,0,0,
        0,0,1,1,1,1,0,0,
        0,0,0,1,1,0,0,0
    ],

    "ed": [
        0,0,0,0,0,0,0,0,
        0,0,0,0,0,0,0,0,
        0,0,1,1,1,1,0,0,
        0,0,0,1,1,0,0,0,
        0,0,1,1,1,1,0,0,
        0,0,0,0,0,0,0,0,
        0,0,1,1,1,1,0,0,
        0,0,0,0,0,0,0,0
    ],
};
