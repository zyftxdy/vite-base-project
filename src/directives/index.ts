import type { App } from 'vue'
import { permissionDirective } from './permission'

export default function(app: App) {
  permissionDirective(app)
}
