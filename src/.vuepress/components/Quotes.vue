<template>
  <div>
    <blockquote class="custom-block tip">
      <h3>
        <!--suppress JSUnresolvedFunction -->
        <iframe :src="$withBase(selectedQuote.regularPath)" v-if="selectedQuote !== undefined" />
        <span v-if="selectedQuote === undefined" >Loading...</span>
      </h3>
    </blockquote>

    <footer>
      <a :href="contributeLink">Contribute</a> your favourite quote. 🎉
    </footer>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      quotes: [],
      selectedQuote: undefined,
      repo: ''
    }
  },
  mounted() {
    // noinspection JSUnresolvedVariable
    this.$site.pages.forEach(page => {
      if (page.regularPath.startsWith('/quotes')) {
        this.quotes.push(page)
      }
    })
    // noinspection JSUnresolvedVariable
    this.repo = this.$site.themeConfig.repo.replace(/.git$/, '')
    this.selectQuote()
  },
  created() {
    this.selectQuote()
  },
  computed: {
    contributeLink: function() {
      const id = `q${this.quotes.length + 1}`
      return `${this.repo}/new/master/src/quotes/new?filename=${id}.md&value=Your%20quote%20goes%20here`
    }
  },
  methods: {
    selectQuote() {
      if (this.quotes.length <= 0)
        return

      // TODO improve the selection to be truly once per day...
      const randomIndex = Math.floor(Math.random() * this.quotes.length)
      this.selectedQuote = this.quotes[randomIndex]
    }
  }
}
</script>
<style lang="scss">
iframe {
  width: 100%;
  border: 0;
  background: none transparent;
  margin-top: -8rem;
  height: 200px;
}

footer {
  margin-bottom: 4rem;
}

blockquote {
  font-family: Georgia, "Times New Roman", Times, serif;
  margin-bottom: -30px;
  quotes: "“" "”" "‘" "’";
  color: inherit;
  height: 300px;
}

blockquote h3 {
  font-size: 3rem;
  margin: 0;
}

blockquote h3:before {
  content: open-quote;
  font-weight: bold;
  font-size: 7rem;
  float: right;
}

blockquote h3:after {
  content: close-quote;
  font-weight: bold;
  font-size: 7rem;
  float: left;
}

</style>