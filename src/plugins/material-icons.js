const MaterialIcon = {
  name: 'MaterialIcon',
  props: {
    icon: {
      type: String,
      required: true
    }
  },
  setup(props) {
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