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
  day: string;
  time: string;
  address: string;
  description: string;
  coordinates: [number, number];
  image: string;
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
    address: "Rua Medeiros de Albuquerque, 75 · Caminho Novo, Palhoça - SC",
    description: "Um encontro para criar laços, crescer na fé e caminhar junto.",
    coordinates: [-27.6474, -48.6754],
    image: "/ekbaloo.jpg",
    color: "#D85A3C",
    icon: "heart",
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
  },
  {
    id: "jardim-da-emunah",
    name: "Jardim da Emunah",
    day: "Quarta-feira",
    time: "20h",
    address: "Rua Carlos Kirch, 160 · Passa Vinte, Palhoça - SC",
    description: "Um jardim de fé onde a esperança cria raízes e floresce.",
    coordinates: [-27.6380, -48.6740],
    image: "/jardim-emunah.png",
    color: "#4D7C0F",
    icon: "tree",
  },
  {
    id: "mulheres-enraizadas",
    name: "Mulheres Enraizadas",
    day: "Sexta-feira",
    time: "20h",
    address: "Rua Rodolfo Weiss, 49 · Sobrado 3, Aririú, Palhoça - SC",
    description: "Um encontro de mulheres para criar raízes profundas na fé e na amizade.",
    coordinates: [-27.6697, -48.6844],
    image: "/mulheres-enraizadas.jpg",
    color: "#7C3AED",
    icon: "sprout",
  },
];
