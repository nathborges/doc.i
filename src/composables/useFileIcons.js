const ICON_MAP = {
  pdf: 'picture_as_pdf',
  doc: 'description',
  docx: 'description',
  txt: 'description',
  rtf: 'description',
  xls: 'grid_on',
  xlsx: 'grid_on',
  csv: 'grid_on',
  ppt: 'slideshow',
  pptx: 'slideshow',
  jpg: 'image',
  jpeg: 'image',
  png: 'image',
  gif: 'image',
  bmp: 'image',
  svg: 'image',
  mp4: 'videocam',
  avi: 'videocam',
  mov: 'videocam',
  wmv: 'videocam',
  mp3: 'audiotrack',
  wav: 'audiotrack',
  ogg: 'audiotrack',
  zip: 'folder_zip',
  rar: 'folder_zip',
  '7z': 'folder_zip',
  tar: 'folder_zip',
  gz: 'folder_zip',
  html: 'code',
  htm: 'code',
  xml: 'code'
}

export const useFileIcons = () => {
  const getFileIcon = (extension) => {
    if (!extension) return 'insert_drive_file'
    
    const ext = extension.toLowerCase()
    return ICON_MAP[ext] || 'insert_drive_file'
  }

  return { getFileIcon }
}