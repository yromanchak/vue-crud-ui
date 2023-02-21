import { mount } from '@vue/test-utils'
import TodoAdd from './TodoAdd.vue'

test("click button and call method", () => {
    const wrapper = mount(TodoAdd)

    wrapper.setMethods({ addNewTodo:jest.fn() })

    const createButton = wrapper.find('.btn')
    createButton.trigger('click')

    expect(wrapper.vm.addNewTodo).toHaveBeenCalledTimes(1)

    expect(wrapper.find('.btn').text()).toBe('Create')

})