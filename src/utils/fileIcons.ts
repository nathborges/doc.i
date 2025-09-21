import {
  FileTextIcon,
  FileIcon,
  PhotoIcon,
  FileSpreadsheetIcon,
  FolderIcon,
  PresentationIcon,
  BriefcaseIcon,
  HeartIcon,
  HomeIcon,
  SettingsIcon,
  BookIcon,
} from 'vue-tabler-icons';

const iconMap = {
  pdf: FileTextIcon,
  doc: FileTextIcon,
  docx: FileTextIcon,
  txt: FileTextIcon,
  jpg: PhotoIcon,
  jpeg: PhotoIcon,
  png: PhotoIcon,
  gif: PhotoIcon,
  bmp: PhotoIcon,
  svg: PhotoIcon,
  xls: FileSpreadsheetIcon,
  xlsx: FileSpreadsheetIcon,
  ppt: PresentationIcon,
  pptx: PresentationIcon,
  zip: FolderIcon,
  rar: FolderIcon,
  '7z': FolderIcon,
};

export const categoryIconMap = {
  FolderIcon,
  FileIcon,
  BookIcon,
  BriefcaseIcon,
  HeartIcon,
  HomeIcon,
  SettingsIcon,
};

export const getFileIcon = (fileName: string) => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  return iconMap[ext as keyof typeof iconMap] || FileIcon;
};

export const getFileColor = (fileName: string): string => {
  const ext = fileName.split('.').pop()?.toLowerCase();
  if (ext === 'pdf') return 'red';
  if (['doc', 'docx'].includes(ext || '')) return 'blue';
  if (['jpg', 'jpeg', 'png', 'gif', 'bmp', 'svg'].includes(ext || '')) return 'green';
  if (['txt'].includes(ext || '')) return 'grey';
  if (['xls', 'xlsx'].includes(ext || '')) return 'green';
  if (['ppt', 'pptx'].includes(ext || '')) return 'orange';
  if (['zip', 'rar', '7z'].includes(ext || '')) return 'purple';
  return 'grey';
};
