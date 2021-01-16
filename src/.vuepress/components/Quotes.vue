<template>
  <div>
    <blockquote class="custom-block tip">
      <h3>
        <iframe :src="selectedQuote.regularPath" />
      </h3>
    </blockquote>

    <footer>
      Go <a :href="contributeLink">contribute</a> your favourite quote. 🎉
    </footer>
  </div>
</template>

<script>
export default {
  data: () => {
    return {
      quotes: [],
      quote: '',
      selectedQuote: '',
      loading: true,
      repo: '/'
    }
  },
  mounted() {
    this.$site.pages.forEach(page => {
      if (page.regularPath.startsWith('/quotes')) {
        this.quotes.push(page)
      }
    })
    this.repo = this.$site.themeConfig.repo.replace(/.git$/, '')
    this.fetchQuote()
  },
  created() {
    this.fetchQuote()
  },
  computed: {
    contributeLink: function() {
      const id = `q${this.quotes.length + 1}`
      return `${this.repo}/new/master/src/quotes?filename=${id}.md&value=Your%20quote%20goes%20here`
    }
  },
  methods: {
    fetchQuote() {
      if (this.quotes.length <= 0)
        return

      this.selectedQuote = this.quotes[Math.floor(Math.random() * this.quotes.length)]
      this.loading = true
      this.quote = this.selectedQuote.regularPath
      fetch(this.selectedQuote.regularPath)
          .then(response => response.text())
          .then(text => {
            const parser = new DOMParser()
            const htmlDocument = parser.parseFromString(text, 'text/html')
            const section = htmlDocument.documentElement.querySelector('body')
            this.quote = section.innerHTML
            console.log(this.quote)
            this.loading = false
          })
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