export default {
    data() {
      return {
        items: [{}, {}, {}, {}, {}, {}, {}],
      };
    },
    methods: {
      onLoad(index, done) {
        setTimeout(() => {
          this.items.push({}, {}, {}, {}, {}, {}, {});
          done();
        }, 2000);
      },
    },
  };
  