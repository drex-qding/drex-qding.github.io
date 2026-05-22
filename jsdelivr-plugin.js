const CDN_BASE = 'https://cdn.jsdelivr.net/gh/drex-qding/drex-qding.github.io@main/public'

function encodePath(path) {
  return path.split('/').map(s => encodeURIComponent(s)).join('/')
}

export default function jsdelivrPlugin() {
  return {
    name: 'jsdelivr-cdn',
    enforce: 'post',
    generateBundle(_, bundle) {
      for (const name of Object.keys(bundle)) {
        const chunk = bundle[name]
        if (chunk.type === 'chunk') {
          chunk.code = chunk.code.replace(
            /"\/assets\/([^"]+)"/g,
            (_, path) => `"${CDN_BASE}/assets/${encodePath(path)}"`
          )
          chunk.code = chunk.code.replace(
            /'\/assets\/([^']+)'/g,
            (_, path) => `'${CDN_BASE}/assets/${encodePath(path)}'`
          )
        }
      }
    },
  }
}
