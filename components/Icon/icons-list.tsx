import { AiOutlineSave, AiOutlineRight, AiOutlineLeft } from 'react-icons/ai'

// https://react-icons.github.io/react-icons/icons?name=cg
import { CgGym } from 'react-icons/cg'

// https://react-icons.github.io/react-icons/icons?name=ti
import {
  TiArrowSortedDown,
  TiArrowSortedUp,
  TiChevronLeft,
  TiChevronRight,
  TiGroup,
  TiHome,
  TiMail,
  TiMediaPlay,
  TiMediaPlayReverse,
  TiTick,
  TiUser,
  TiUserAdd,
  TiUserDelete,
  TiWiFi,
  TiZoom,
  TiDocumentText,
  TiCogOutline,
  TiTimes,
  TiPlusOutline,
  TiMinusOutline,
  TiInfoLarge,
  TiFilter,
  TiEdit,
  TiTrash
} from 'react-icons/ti'

// https://react-icons.github.io/react-icons/icons?name=si
import { SiWhatsapp } from 'react-icons/si'

// https://react-icons.github.io/react-icons/icons?name=md
import {
  MdLocationOff,
  MdLocationOn,
  MdOutlineEmergency,
  MdOutlineEvent,
  MdOutlineMoreVert,
  MdOutlinePhoneForwarded
} from 'react-icons/md'

// react-icons.github.io/react-icons/icons?name=fc
import { FcGoogle } from 'react-icons/fc'

import { FaRegComment, FaSignInAlt, FaRegHeart, FaHeart } from 'react-icons/fa'

import { RiFileCopyLine, RiFileCopyFill } from 'react-icons/ri'
// ALL ICONS SHOULD BE OUTLINE

import {
  BsCart4,
  BsFillEyeFill,
  BsFillEyeSlashFill,
  BsShareFill
} from 'react-icons/bs'

const ICON_LIST = {
  cart: BsCart4,
  signin: FaSignInAlt,
  'color-google': FcGoogle,
  emergency: MdOutlineEmergency,
  email: TiMail,
  whatsapp: SiWhatsapp,
  save: AiOutlineSave,
  'rigth-arrow': AiOutlineRight,
  'left-arrow': AiOutlineLeft,
  document: TiDocumentText,
  gear: TiCogOutline,
  phone: MdOutlinePhoneForwarded,
  cross: TiTimes,
  plus: TiPlusOutline,
  minus: TiMinusOutline,
  info: TiInfoLarge,
  filter: TiFilter,
  edit: TiEdit,
  trash: TiTrash,
  delete: TiTrash,
  down: TiArrowSortedDown,
  up: TiArrowSortedUp,
  back: TiChevronLeft,
  forward: TiChevronRight,
  home: TiHome,
  group: TiGroup,
  user: TiUser,
  wifi: TiWiFi,
  done: TiTick,
  addUser: TiUserAdd,
  removeUser: TiUserDelete,
  search: TiZoom,
  right: TiMediaPlay,
  left: TiMediaPlayReverse,
  dots: MdOutlineMoreVert,
  workout: CgGym,
  event: MdOutlineEvent,
  copy: RiFileCopyLine,
  copyFill: RiFileCopyFill,
  openEye: BsFillEyeFill,
  closeEye: BsFillEyeSlashFill,
  heart: FaRegHeart,
  coments: FaRegComment,
  heartFill: FaHeart,
  share: BsShareFill,
  location: MdLocationOn,
  hideLocation: MdLocationOff
} as const

export type IconName = keyof typeof ICON_LIST
export type ReactIconElement = typeof ICON_LIST[IconName]

export default ICON_LIST
