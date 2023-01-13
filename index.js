import JsonInput from "./src/index";

/* istanbul ignore next */
JsonInput.install = function (Vue) {
	Vue.component(JsonInput.name, JsonInput);
};

export default JsonInput;
