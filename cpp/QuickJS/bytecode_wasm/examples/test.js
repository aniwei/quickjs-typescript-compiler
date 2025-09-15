import { useState }from 'react' 
import { jsxs, jsx } from 'react/jsx-runtime'
import { render } from 'react-dom'
import { createRoot } from 'react-dom/client'
import { hy } from 'react-dom/server'
import { View, Text } from '@tarojs/components'
import Taro from '@tarojs/taro'
import TaroDynamicBridge from '@tarojs/dynamic-bridge'
import { updateStyle } from '@vite/dev'
import { preload } from '@vite/preload'

const App = () => {
  const [count] = useState(0)

  return jsxs(View, {
    children: [jsx(Text, {
      className: 'a',
      style: {
        color: 'red' 
      },
      children: 'Count: ' + count
    })]
  }, 'app')
}


export default App