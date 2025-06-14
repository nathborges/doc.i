// Arquivo de configuração para Material Icons
// Este arquivo substitui o fontawesome.js

// Mapeamento de ícones FontAwesome para Material Icons:
// faEye -> visibility
// faEyeSlash -> visibility_off
// faUser -> person
// faLock -> lock
// faEnvelope -> email
// faHome -> home
// faFolder -> folder
// faStar -> star
// faTrashCan -> delete
// faSearch -> search
// faBell -> notifications
// faFilePdf -> picture_as_pdf
// faFileWord -> description
// faFileImage -> image
// faFileExcel -> table_chart
// faCog -> settings
// faSignOutAlt -> logout
// faCheckCircle -> check_circle
// faExclamationCircle -> error
// faExclamationTriangle -> warning
// faInfoCircle -> info
// faTimes -> close
// faPlus -> add

// Componente para compatibilidade com código existente
const MaterialIcon = {
  name: 'MaterialIcon',
  props: {
    icon: {
      type: String,
      required: true
    }
  },
  setup(props) {
    // Mapeamento de ícones FontAwesome para Material Icons
    const iconMap = {
      'eye': 'visibility',
      'eye-slash': 'visibility_off',
      'user': 'person',
      'lock': 'lock',
      'envelope': 'email',
      'home': 'home',
      'folder': 'folder',
      'star': 'star',
      'trash-can': 'delete',
      'search': 'search',
      'bell': 'notifications',
      'file-pdf': 'picture_as_pdf',
      'file-word': 'description',
      'file-image': 'image',
      'file-excel': 'table_chart',
      'cog': 'settings',
      'sign-out-alt': 'logout',
      'check-circle': 'check_circle',
      'exclamation-circle': 'error',
      'exclamation-triangle': 'warning',
      'info-circle': 'info',
      'times': 'close',
      'plus': 'add'
    }
    
    return { iconMap }
  },
  template: `
    <span class="material-icons">{{ iconMap[icon] || icon }}</span>
  `
}

export { MaterialIcon }