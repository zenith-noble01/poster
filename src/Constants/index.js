import {
  user,
  img1,
  img2,
  img3,
  img4,
  img5,
  img6,
  img7,
  img8,
  img9,
  img10,
  img11,
  img12,
  img13,
  img14,
  img15,
  img16,
} from "../Images";
import { BiCamera, BiImage, BiLinkAlt, BiSmile } from "react-icons/bi";
import { SlHome } from "react-icons/sl";
import { MdCardMembership, MdGroups } from "react-icons/md";
import { HiOutlineShoppingBag } from "react-icons/hi2";
// import { BsCalendar4Event } from "react-icons/bs";

export const sidebarRoutes = [
  {
    name: "Home",
    path: "/",
    icon: SlHome,
  },
  {
    name: "Recents",
    path: "/recent",
    icon: MdGroups,
  },
  {
    name: "Most search",
    path: "/top",
    icon: HiOutlineShoppingBag,
  },
  {
    name: "Trending",
    path: "/treding",
    icon: MdCardMembership,
  },
  {
    name: "Messages",
    path: "/messages",
    icon: MdCardMembership,
  },
];

export const recentRequest = [
  {
    name: "zenith",
    profile: user,
  },
  {
    name: "noble zenith",
    profile: user,
  },
  {
    name: "zenith king",
    profile: user,
  },
];

export const shareOptions = [
  {
    icon: BiCamera,
  },
  {
    icon: BiImage,
  },
  {
    icon: BiLinkAlt,
  },
  {
    icon: BiSmile,
  },
];

export const posters = [
  {
    id: 439843349,
    img: img1,
    user: user,
  },
  {
    id: 85395398489,
    img: img2,
    user: user,
  },
  {
    id: 28939385,
    img: img3,
    user: user,
  },
  {
    id: 3843747937,
    img: img4,
    user: user,
  },
  {
    id: 3849347364,
    img: img5,
    user: user,
  },
  {
    id: 489387437,
    img: img6,
    user: user,
  },
  {
    id: 34675252453,
    img: img7,
    user: user,
  },
  {
    id: 93843743863,
    img: img8,
    user: user,
  },
  {
    id: 6723525242,
    img: img9,
    user: user,
  },
  {
    id: 3743863537,
    img: img10,
    user: user,
  },
  {
    id: 2672524626789,
    img: img11,
    user: user,
  },
  {
    id: 3743776338,
    img: img12,
    user: user,
  },
  {
    id: 2984728272,
    img: img13,
    user: user,
  },
  {
    id: 32632652728,
    img: img14,
    user: user,
  },
  {
    id: 3645335277,
    img: img15,
    user: user,
  },
  {
    id: 736734353553,
    img: img16,
    user: user,
  },
];

export const comments = [
  {
    id: 894839843,
  },
  {
    id: 894839843,
  },
  {
    id: 894839843,
  },
  {
    id: 894839843,
  },
];

export const apiRoute = "http://localhost:5000/api";

export const tags = [
  {
    name: "programming",
    id: 4567890,
  },
  {
    name: "development",
    id: 4387763,
  },
  {
    name: "coding",
    id: 276427289,
  },
  {
    name: "Artificial inteligence",
    id: 3438920909,
  },
  {
    name: "master mind",
    id: 3874738782,
  },
  {
    name: "design thinking",
    id: 4398483893,
  },
];

export const conversations = [
  {
    username: "zenith-noble01",
    id: 483834839,
    profile: user,
  },
  {
    username: "miles",
    id: 483834839,
    profile: img1,
  },
  {
    username: "miles morales",
    id: 483834839,
    profile: img2,
  },
];

export const messages = [
  {
    text: "lore me sdnajndja adjknfajd aadn",
    own: false,
  },
  {
    text: "lore me sdnajndja adjknfajd aadn",
    own: true,
  },
  {
    text: "lore me sdnajndja adjknfajd aadn",
    own: false,
  },
  {
    text: "lore me sdnajndja adjknfajd aadn",
    own: true,
  },
];
