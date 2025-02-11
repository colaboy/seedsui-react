import SafeArea from './SafeArea'
import autoSafeArea from './utils/autoSafeArea'
import needsSafeArea from './utils/needsSafeArea'
import onResize from './utils/onResize'

SafeArea.autoSafeArea = autoSafeArea
SafeArea.needsSafeArea = needsSafeArea
SafeArea.onResize = onResize

export default SafeArea
