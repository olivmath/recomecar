export type CellIcon =
  | "heart"
  | "flame"
  | "shield"
  | "star"
  | "sun"
  | "handshake"
  | "tree"
  | "sprout"
  | "cross";

export type Cell = {
  id: string;
  name: string;
  day?: string;
  time?: string;
  address: string;
  description: string;
  coordinates: [number, number];
  image?: string;
  color: string;
  icon: CellIcon;
  whatsapp?: string;
};

export const cells: Cell[] = [
  {
    id: "ekbaloo",
    name: "Célula Ekbaloo",
    day: "Segunda-feira",
    time: "20h",
    address: "Rua Orquídea, 06 · São Sebastião, Palhoça - SC",
    description: "Um encontro para criar laços, crescer na fé e caminhar junto.",
    coordinates: [-27.6474, -48.6754],
    image: "/ekbaloo.jpg",
    color: "#D85A3C",
    icon: "heart",
    whatsapp: "5548999979631",
  },
  {
    id: "asaph",
    name: "Célula ASAPH",
    day: "Segunda-feira",
    time: "19h",
    address: "Rua Angelino Francisco da Silva, 290 · Barra do Aririú, Palhoça - SC",
    description: "Uma noite de comunhão, conversa e presença de Deus.",
    coordinates: [-27.6833, -48.6607],
    image: "/asaph.jpg",
    color: "#B45309",
    icon: "flame",
    whatsapp: "5548920035249",
  },
  {
    id: "safe",
    name: "Célula SAFE",
    day: "Sexta-feira",
    time: "20h",
    address: "Rua José Clemente de Macedo, 916 · Bela Vista, Palhoça - SC",
    description: "Um lugar seguro para pertencer, ser cuidado e conhecer Jesus.",
    coordinates: [-27.6613, -48.6890],
    image: "/safe.jpg",
    color: "#1F7A5C",
    icon: "shield",
    whatsapp: "5548996534474",
  },
  {
    id: "israel",
    name: "Célula Israel",
    day: "Quarta-feira",
    time: "20h",
    address: "Rua Barão do Rio Branco, 645 · Apto. 02, Palhoça - SC",
    description: "Uma família para dividir a vida, a Palavra e bons momentos.",
    coordinates: [-27.6439, -48.6674],
    image: "/israel.jpg",
    color: "#4F46E5",
    icon: "star",
    whatsapp: "5551984399136",
  },
  {
    id: "adonai",
    name: "Célula Adonai",
    day: "Segunda-feira",
    time: "20h",
    address: "Rua Araucária, 560 · Casa 3, Jardim Botânico, São José - SC",
    description: "Tempo de fé, amizade e crescimento para todas as idades.",
    coordinates: [-27.5551, -48.6584],
    image: "/adonai.jpg",
    color: "#C2410C",
    icon: "sun",
    whatsapp: "5548996378534",
  },
  {
    id: "amor-perfeito",
    name: "Célula Amor Perfeito",
    day: "Quarta-feira",
    time: "20h",
    address: "Av. Atílio Pedro Pagani, 469 · Igreja Recomeçar, Palhoça - SC",
    description: "Encontro semanal aberto para quem quiser conhecer a comunidade.",
    coordinates: [-27.6425, -48.6715],
    image: "/amor-perfeito.jpg",
    color: "#BE185D",
    icon: "handshake",
    whatsapp: "5548991361311",
  },
  {
    id: "jardim-da-emunah",
    name: "Jardim da Emuná",
    day: "Quarta-feira",
    time: "20h",
    address: "Rua Carlos Kirch, 160 · Passa Vinte, Palhoça - SC",
    description: "Um jardim de fé onde a esperança cria raízes e floresce.",
    coordinates: [-27.6380, -48.6740],
    image: "/emuna.jpg",
    color: "#4D7C0F",
    icon: "tree",
    whatsapp: "5548999013089",
  },
  {
    id: "shalom",
    name: "Célula Shalom",
    day: "Segunda-feira",
    time: "20h",
    address: "Rua Ferrara, 133 · Pagani, Palhoça - SC",
    description: "Um encontro para criar laços, crescer na fé e caminhar junto.",
    coordinates: [-27.6434674, -48.6774487],
    image: "/shalom.jpeg",
    color: "#256D5A",
    icon: "cross",
    whatsapp: "5548991532414",
  },
];
