import fs from 'fs'
import path from 'path'
import { fileURLToPath } from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

// Função para encontrar todos os arquivos Vue
function findVueFiles(dir) {
  let results = []
  const list = fs.readdirSync(dir)

  list.forEach(file => {
    const filePath = path.join(dir, file)
    const stat = fs.statSync(filePath)

    if (stat && stat.isDirectory() && file !== 'node_modules') {
      results = results.concat(findVueFiles(filePath))
    } else if (path.extname(file) === '.vue') {
      results.push(filePath)
    }
  })

  return results
}

// Função para extrair todas as classes CSS usadas nos arquivos Vue
function extractUsedClasses(vueFiles) {
  const usedClasses = new Set()

  vueFiles.forEach(file => {
    const content = fs.readFileSync(file, 'utf8')

    // Encontrar classes em atributos class="..."
    const classRegex = /class="([^"]*)"/g
    let match

    while ((match = classRegex.exec(content)) !== null) {
      const classes = match[1].split(/\s+/)
      classes.forEach(cls => {
        if (cls.trim()) {
          usedClasses.add(cls.trim())
        }
      })
    }

    // Encontrar classes em :class bindings
    const bindClassRegex = /:class="([^"]*)"/g
    while ((match = bindClassRegex.exec(content)) !== null) {
      // Não podemos analisar completamente expressões JavaScript,
      // mas podemos capturar strings literais dentro delas
      const stringLiterals = match[1].match(/'([^']+)'|"([^"]+)"/g)
      if (stringLiterals) {
        stringLiterals.forEach(literal => {
          const cls = literal.replace(/['"]/g, '').trim()
          if (cls) {
            usedClasses.add(cls)
          }
        })
      }
    }
  })

  return usedClasses
}

// Função para limpar CSS não utilizado em arquivos
function purgeCSSFiles(cssFiles, usedClasses) {
  cssFiles.forEach(file => {
    let content = fs.readFileSync(file, 'utf8')
    const originalSize = content.length

    // Encontrar todas as definições de classe no CSS
    const classRegex =
      /\.([a-zA-Z0-9_-]+)(?:\s*,\s*\.([a-zA-Z0-9_-]+))*\s*{[^}]*}/g
    let newContent = content
    let match

    while ((match = classRegex.exec(content)) !== null) {
      const selector = match[0]
      const classNames = selector.match(/\.([a-zA-Z0-9_-]+)/g)

      if (classNames) {
        const allUnused = classNames.every(className => {
          // Remover o ponto inicial
          const name = className.substring(1)
          return !usedClasses.has(name)
        })

        if (allUnused) {
          newContent = newContent.replace(selector, '')
        }
      }
    }

    // Remover espaços em branco extras e linhas vazias
    newContent = newContent.replace(/\n\s*\n/g, '\n')

    // Salvar o arquivo apenas se houve alterações
    if (newContent !== content) {
      fs.writeFileSync(file, newContent, 'utf8')
      const newSize = newContent.length
      const reduction = (
        ((originalSize - newSize) / originalSize) *
        100
      ).toFixed(2)
      console.log(`Limpado ${file}: ${reduction}% de redução`)
    } else {
      console.log(`Nenhuma classe não utilizada encontrada em ${file}`)
    }
  })
}

// Função principal
async function main() {
  try {
    const srcDir = path.join(__dirname, 'src')

    // Encontrar todos os arquivos Vue
    const vueFiles = findVueFiles(srcDir)
    console.log(`Encontrados ${vueFiles.length} arquivos Vue`)

    // Extrair classes usadas
    const usedClasses = extractUsedClasses(vueFiles)
    console.log(`Encontradas ${usedClasses.size} classes CSS utilizadas`)

    // Encontrar arquivos CSS
    const cssFiles = []
    const assetsDir = path.join(srcDir, 'assets')
    if (fs.existsSync(assetsDir)) {
      fs.readdirSync(assetsDir).forEach(file => {
        if (path.extname(file) === '.css') {
          cssFiles.push(path.join(assetsDir, file))
        }
      })
    }

    // Limpar CSS não utilizado
    if (cssFiles.length > 0) {
      console.log(`Processando ${cssFiles.length} arquivos CSS`)
      purgeCSSFiles(cssFiles, usedClasses)
    } else {
      console.log('Nenhum arquivo CSS encontrado')
    }

    console.log('Processo de limpeza concluído!')
  } catch (error) {
    console.error('Erro:', error)
  }
}

main()
