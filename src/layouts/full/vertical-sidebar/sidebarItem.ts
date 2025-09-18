import {
  CircleIcon,
  WindmillIcon,
  TypographyIcon,
  ShadowIcon,
  PaletteIcon,
  KeyIcon,
  BugIcon,
  HomeIcon,
  BrandChromeIcon,
  HelpIcon,
  CategoryIcon,
} from 'vue-tabler-icons';

export interface menu {
  header?: string;
  title?: string;
  icon?: object;
  to?: string;
  divider?: boolean;
  chip?: string;
  chipColor?: string;
  chipVariant?: string;
  chipIcon?: string;
  children?: menu[];
  disabled?: boolean;
  type?: string;
  subCaption?: string;
}

const sidebarItem: menu[] = [
  { header: 'Painel' },
  {
    title: 'Início',
    icon: HomeIcon,
    to: '/',
  },
  {
    title: 'Categorias',
    icon: CategoryIcon,
    to: '/auth',
    children: [
      {
        title: 'Login',
        icon: CircleIcon,
        to: '/login1',
      },
      {
        title: 'Cadastro',
        icon: CircleIcon,
        to: '/register',
      },
    ],
  },
  {
    title: 'Erro 404',
    icon: BugIcon,
    to: '/error',
  },
  { divider: true },
];

export default sidebarItem;
