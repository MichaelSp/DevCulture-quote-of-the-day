<script>
import Layout from '@vuepress/theme-default/layouts/Layout.vue'

export default {
  extends: Layout,
  data: () => {
    return {
      iteration: 0,
      loop: null,
      svgSegments: [],
      currentIteration: null
    }
  },
  mounted() {
    fetch(this.$withBase('devops-loop.svg'))
        .then((svg) => svg.text())
        .then((svg) => {
          const hero = this.$el.querySelector('header.hero')
          hero.innerHTML = svg
          this.svgSegments = this.$el.querySelectorAll('#segments path')
        })
  },
  created() {
    if (!this.loop) {
      this.loop = setInterval(() => this.step(), 800)
    }
  },
  methods: {
    step: function() {
      if (this.currentIteration) {
        this.currentIteration.classList.remove('highlight')
      }

      if (this.iteration >= this.svgSegments.length - 1) {
        this.iteration = -1
      }
      this.iteration++

      this.currentIteration = this.svgSegments[this.iteration]
      if (this.currentIteration) {
        this.currentIteration.classList.add('highlight')
      }
    }
  }
}
</script>
<style lang="scss">
header.hero svg {
  max-width: 450px;
  max-height: 280px;
  display: block;
  margin: 3rem auto 1.5rem;

  #segments {
    path {
      transition: fill-opacity 1.5s;
      -webkit-transition: fill-opacity 1.5s;
    }

    path.highlight {
      fill-opacity: 0.3 !important;
      stroke: #2d2d2d;
      stroke-width: 3px;
    }
  }


}
</style>