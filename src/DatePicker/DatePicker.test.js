import { render, screen, fireEvent } from '@testing-library/react'
import ErrorBoundary from './../ErrorBoundary'
import Combo from './demos/Combo'

test('白屏测试', () => {
  // 保存原始的 console 方法
  // const originalConsoleError = console.error
  // const originalConsoleWarn = console.warn

  // 重写 console.error 和 console.warn，防止它们输出信息
  console.error = (error) => {
    console.log(chalk.red(error?.message || 'error'))
  }
  console.warn = jest.fn()

  try {
    const { container } = render(
      <ErrorBoundary>
        <Combo />
      </ErrorBoundary>
    )

    // 如果 container 中没有内容，认为是白屏
    if (container.textContent.indexOf('Something went wrong.') !== -1) {
      throw new Error('已白屏, 未通过测试')
    }

    // expect(container.textContent).not.toBe('Something went wrong')
  } finally {
    // 恢复原来的 console 方法
    // console.error = originalConsoleError
    // console.warn = originalConsoleWarn
  }
})
