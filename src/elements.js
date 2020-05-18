import Vue from "vue";

import { Pagination, MessageBox, Message, Button } from "element-ui";

Vue.component(Pagination.name, Pagination);
Vue.component(Button.name, Button);

Vue.prototype.$msgbox = MessageBox;
Vue.prototype.$alert = MessageBox.alert;
Vue.prototype.$message = Message;
