// import { annotate } from 'rough-notation';
import { annotate } from '../node_modules/rough-notation/lib/rough-notation.js';

const AVAILABLE_TYPES = [
  'underline',
  'box',
  'circle',
  'highlight',
  'strike-through',
  'crossed-off',
];

export default {
  name: 'RoughNotation',

  props: {
    type: {
      type: String,
      required: true,
      validator (type) {
        return AVAILABLE_TYPES.indexOf(type) > -1;
      },
    },

    tag: {
      type: String,
      default: 'div',
    },

    show: {
      type: Boolean,
      default: false,
    },

    animate: {
      type: Boolean,
      default: true,
    },

    animationDuration: {
      type: Number,
      default: 800,
    },

    animationDelay: {
      type: Number,
      default: 0,
    },

    color: {
      type: String,
      default: 'currentColor',
    },

    strokeWidth: {
      type: Number,
      default: 1,
    },

    padding: {
      type: Number,
      default: 5,
    },
  },

  mounted () {
    this.el = this.$el;

    this.annotation = annotate(this.el, {
      type: this.type,
      animate: this.animate,
      animationDuration: this.animationDuration,
      animationDelay: this.animationDelay,
      color: this.color,
      strokeWidth: this.strokeWidth,
      padding: this.padding,
    });

    if (this.show) {
      this.annotation.show();
    }

    this.$watch('show', (value) => {
      if (value) {
        this.annotation.show();
      } else {
        this.annotation.hide();
      }
    }, { immediate: true });
  },

  beforeDestroy () {
    this.annotation && this.annotation.remove();
  },

  methods: {
    isShowing () {
      return !!(this.annotation && this.annotation.isShowing());
    },
  },

  render (h) {
    const slot = this.$slots.default;

    if (this.tag) {
      return h(this.tag, null, slot);
    }

    return slot && slot[0];
  },
};