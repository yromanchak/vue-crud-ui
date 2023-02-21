import {render} from '@testing-library/vue'
import TodoLoader from './TodoLoader.vue'

test('render todo add', () => {
  const { debug } = render(TodoLoader)

  debug()
})
