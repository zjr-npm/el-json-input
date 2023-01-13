<template>
    <div class="el-json-input"></div>
</template>

<script>
import JsonEditor from "jsoneditor";
import "jsoneditor/dist/jsoneditor.min.css";

import emitter from 'element-ui/src/mixins/emitter';

import { getInstanceTypeof } from './utils/index';

export default {
    name: "ElJsonInput",
    mixins: [emitter],
    props: {
        value: {
            type: [String, Object, Array],
            default: ''
        },
        disabled: {
            type: Boolean,
            default: false
        }
    },
    data() {
        return {
            editorText: ""
        };
    },
    mounted() {
        this.initJsonEditor();
    },
    methods: {
        initJsonEditor() {
            if (this.editor) return this.editor;

            this.editor = new JsonEditor(this.$el, {
                mode: "code",
                onChange: this.onEditorChange,
                onBlur: this.onEditorBlur,
            });
            this.setEditorText(this.editorText);
            this.$el.querySelector(".jsoneditor-repair").classList.add("el-icon-magic-stick");

            return this.editor;
        },
        onEditorChange() {
            this.editorText = this.getEditorText();

            this.emitEvent('change', 'change');
        },
        onEditorBlur() {
            this.editorText = this.getEditorText();

            this.emitEvent('input', 'blur');
        },
        getEditorText() {
            if (this.editor) {
                return this.editor.getText();
            } else {
                console.warn(`[el-json-input earn] json编辑器还未初始化`);
            }
            return "";
        },
        setEditorText(text) {
            if (this.editor) {
                this.editor.setText(text);
            } else {
                console.warn(`[el-json-input earn] json编辑器还未初始化`);
            }
        },
        emitEvent(eventName = "change", formItemEventName = "change") {
            this.$emit(eventName, this.editorText);
            this.dispatch('ElFormItem', `el.form.${formItemEventName}`, this.editorText);
        }
    },
    watch: {
        value: {
            immediate: true,
            handler(val) {
                let _val = "";
                const valType = getInstanceTypeof(val);

                if (~["Array", "Object"].indexOf(valType)) {
                    _val = JSON.stringify(val);
                } else if (valType === "String") {
                    _val = val;
                }
                if (_val !== this.editorText) {
                    this.editorText = _val;

                    this.setEditorText(_val);
                    this.emitEvent('change', 'change');
                }
            }
        }
    }
};
</script>

<style lang="scss" scoped>
::v-deep {
    div.jsoneditor {
        border-radius: 4px;
    }

    .jsoneditor-sort,
    .jsoneditor-transform,
    .jsoneditor-poweredBy,
    .jsoneditor-statusbar {
        display: none;
    }

    .jsoneditor-repair {
        background-image: none;
        font-size: 18px;
        font-weight: 600;
    }
}
</style>