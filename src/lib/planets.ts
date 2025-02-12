export const planets = [
  {
    name: "Mercury",
    size: 0.4,
    distanceFromSun: 6,
    distanceFromSunKm: "57.9 million",
    orbitalPeriod: 88,
    diameter: 4879,
    averageTemp: 167,
    rotationSpeed: 0.01,
    orbitSpeed: 0.04,
    texture: "/textures/2k_mercury.jpg",
    description: {
      en: "Mercury is the smallest and innermost planet in the Solar System. Its orbit around the Sun takes only 88 Earth days, making it the fastest planet.",
      zh: "水星是太阳系中最小且最靠近太阳的行星。它绕太阳一周只需88个地球日，是运行最快的行星。"
    },
    funFacts: {
      en: [
        "Mercury has no moons and no substantial atmosphere",
        "Despite being closest to the Sun, Venus is actually hotter than Mercury",
        "Mercury's surface resembles our Moon's heavily cratered terrain"
      ],
      zh: [
        "水星没有卫星，也没有明显的大气层",
        "虽然水星最靠近太阳，但金星实际上比水星更热",
        "水星表面与月球的布满陨石坑的地形相似"
      ]
    }
  },
  {
    name: "Venus",
    size: 0.9,
    distanceFromSun: 11,
    distanceFromSunKm: "108.2 million",
    orbitalPeriod: 225,
    diameter: 12104,
    averageTemp: 464,
    rotationSpeed: 0.008,
    orbitSpeed: 0.015,
    texture: "/textures/2k_venus_surface.jpg",
    description: {
      en: "Venus is the second planet from the Sun and is Earth's closest planetary neighbor. It's one of the four inner, terrestrial planets.",
      zh: "金星是离太阳第二近的行星，也是离地球最近的行星。它是四颗内行星之一。"
    },
    funFacts: {
      en: [
        "Venus spins backwards compared to most other planets",
        "It's the hottest planet in our solar system",
        "A day on Venus is longer than its year"
      ],
      zh: [
        "金星的自转方向与大多数行星相反",
        "它是太阳系中最热的行星",
        "金星上的一天比一年还要长"
      ]
    }
  },
  {
    name: "Earth",
    size: 1,
    distanceFromSun: 16,
    distanceFromSunKm: "149.6 million",
    orbitalPeriod: 365.25,
    diameter: 12742,
    averageTemp: 15,
    rotationSpeed: 0.01,
    orbitSpeed: 0.01,
    texture: "/textures/2k_earth_daymap.jpg",
    description: {
      en: "Earth is the third planet from the Sun and the only astronomical object known to harbor life. About 71% of Earth's surface is water-covered.",
      zh: "地球是离太阳第三近的行星，也是目前已知唯一孕育生命的天体。地球表面约71%被水覆盖。"
    },
    funFacts: {
      en: [
        "Earth is the only planet not named after a mythological god or goddess",
        "The Earth's core is as hot as the surface of the sun",
        "Our planet's atmosphere extends up to 10,000 kilometers into space"
      ],
      zh: [
        "地球是唯一一个不是以神话中的神祇命名的行星",
        "地球核心的温度与太阳表面一样高",
        "地球的大气层延伸到太空中约10,000公里"
      ]
    },
    moons: [
      {
        name: "Moon",
        size: 0.27,
        distance: 2,
        texture: "/textures/2k_moon.jpg"
      }
    ]
  },
  {
    name: "Mars",
    size: 0.5,
    distanceFromSun: 22,
    distanceFromSunKm: "227.9 million",
    orbitalPeriod: 687,
    diameter: 6779,
    averageTemp: -63,
    rotationSpeed: 0.009,
    orbitSpeed: 0.008,
    texture: "/textures/2k_mars.jpg",
    description: {
      en: "Mars is the fourth planet from the Sun and is often called the 'Red Planet' due to its reddish appearance in the night sky.",
      zh: "火星是距离太阳第四近的行星，由于其在夜空中呈现红色，因此常被称为'红色星球'"
    },
    funFacts: {
      en: [
        "Mars has the largest volcano in the solar system, Olympus Mons",
        "The red color comes from iron oxide (rust) on its surface",
        "Mars has two moons: Phobos and Deimos"
      ],
      zh: [
        "火星拥有太阳系中最大的火山，奥林匹斯山",
        "红色来自其表面上的氧化铁（铁锈）",
        "火星有两颗卫星：火卫一和火卫二"
      ]
    }
  },
  {
    name: "Jupiter",
    size: 2.5,
    distanceFromSun: 30,
    distanceFromSunKm: "778.5 million",
    orbitalPeriod: 4333,
    diameter: 139820,
    averageTemp: -110,
    rotationSpeed: 0.015,
    orbitSpeed: 0.004,
    texture: "/textures/2k_jupiter.jpg",
    description: {
      en: "Jupiter is the largest planet in our solar system. It's a gas giant and has a Great Red Spot, which is actually a giant storm.",
      zh: "木星是太阳系中最大的行星。它是一颗气态巨行星，并拥有一个大红斑，实际上是一个巨大的风暴。"
    },
    funFacts: {
      en: [
        "Jupiter has the shortest day of any planet",
        "The Great Red Spot has been raging for at least 400 years",
        "Jupiter has at least 79 moons"
      ],
      zh: [
        "木星是所有行星中自转周期最短的",
        "大红斑至少肆虐了400年",
        "木星至少有79颗卫星"
      ]
    }
  },
  {
    name: "Saturn",
    size: 2,
    distanceFromSun: 38,
    distanceFromSunKm: "1.4 billion",
    orbitalPeriod: 10759,
    diameter: 116460,
    averageTemp: -140,
    rotationSpeed: 0.012,
    orbitSpeed: 0.002,
    texture: "/textures/2k_saturn.jpg",
    description: {
      en: "Saturn is the sixth planet from the Sun and is famous for its prominent ring system, which is composed mostly of ice particles, rocky debris, and dust.",
      zh: "土星是距离太阳第六近的行星，以其显著的环系统而闻名，该系统主要由冰粒、岩石碎片和尘埃组成。"
    },
    funFacts: {
      en: [
        "Saturn's rings are mostly made of water ice",
        "Saturn has 82 confirmed moons",
        "Saturn is the least dense planet in the solar system"
      ],
      zh: [
        "土星环主要由水冰构成",
        "土星有82颗已确认的卫星",
        "土星是太阳系中密度最小的行星"
      ]
    }
  },
  {
    name: "Uranus",
    size: 1.5,
    distanceFromSun: 46,
    distanceFromSunKm: "2.9 billion",
    orbitalPeriod: 30687,
    diameter: 50724,
    averageTemp: -195,
    rotationSpeed: 0.007,
    orbitSpeed: 0.001,
    texture: "/textures/2k_uranus.jpg",
    description: {
      en: "Uranus is the seventh planet from the Sun. It's an ice giant and the only planet that spins on its side.",
      zh: "天王星是距离太阳第七近的行星。它是一颗冰巨星，也是唯一一颗侧向旋转的行星。"
    },
    funFacts: {
      en: [
        "Uranus rotates east to west like Venus",
        "It has 13 known rings",
        "The planet is named after the Greek god of the sky"
      ],
      zh: [
        "天王星像金星一样自东向西旋转",
        "它有13个已知的环",
        "这颗行星是以希腊天空之神命名的"
      ]
    }
  },
  {
    name: "Neptune",
    size: 1.4,
    distanceFromSun: 54,
    distanceFromSunKm: "4.5 billion",
    orbitalPeriod: 60190,
    diameter: 49244,
    averageTemp: -200,
    rotationSpeed: 0.006,
    orbitSpeed: 0.0006,
    texture: "/textures/2k_neptune.jpg",
    description: {
      en: "Neptune is the eighth and farthest planet from the Sun. It's an ice giant known for its bright blue color caused by methane in its atmosphere.",
      zh: "海王星是距离太阳第八近也是最远的行星。它是一颗冰巨星，以其由大气层中的甲烷造成的亮蓝色而闻名。"
    },
    funFacts: {
      en: [
        "Neptune has the strongest winds in the solar system",
        "It has a dark spot similar to Jupiter's Great Red Spot",
        "Neptune takes 165 Earth years to orbit the Sun"
      ],
      zh: [
        "海王星拥有太阳系中最强的风",
        "它有一个类似于木星大红斑的暗斑",
        "海王星绕太阳运行需要165个地球年"
      ]
    }
  },
  {
    name: "Pluto",
    size: 0.3,
    distanceFromSun: 85,
    distanceFromSunKm: "5.9 billion",
    orbitalPeriod: 90560,
    diameter: 2377,
    averageTemp: -230,
    rotationSpeed: 0.004,
    orbitSpeed: 0.0004,
    texture: "/textures/2k_asteroid_1.jpg",
    description: {
      en: "Pluto is a dwarf planet in the Kuiper belt. It was once considered the ninth planet from the Sun before being reclassified as a dwarf planet in 2006.",
      zh: "冥王星是柯伊伯带中的一颗矮行星。在2006年被重新归类为矮行星之前，它曾被认为是距离太阳第九近的行星。"
    },
    funFacts: {
      en: [
        "Pluto is smaller than Earth's moon",
        "It has five known moons, with Charon being the largest",
        "A year on Pluto is 248 Earth years"
      ],
      zh: [
        "冥王星比地球的月球还小",
        "它有五颗已知的卫星，其中卡戎最大",
        "冥王星上的一年相当于248个地球年"
      ]
    }
  }
];