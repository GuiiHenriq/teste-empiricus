<template>
  <section class="section">
    <blockquote class="loading blockquote text-center text-green" v-if="showLoad">
      <i role="status" class="spinner-border spinner-border-lg mr-4"></i>
    </blockquote>

    <div class="grid commits">
      <div class="row">
        <div class="commits__cta col-12 col-md-2 mb-4">
          <button @click.prevent="backPage" class="button button-lg button-green">⮜</button>
        </div>

        <div class="commits__item col-12 col-md-10">
          <p class="commits__item__name-profile">Profile: <span class="label label-pill label-blue">{{name_profile}}</span></p>
          <p class="commits__item__name-repo">Repository: <span class="label label-pill label-green">{{name_repo}}</span></p>
          <p class="commits__item__name-stars mb-4">Stars: <span class="label label-pill label-red">{{stars}}</span></p>


          <p class="mb-2">Commits:</p>

          <div class="commits__commit mb-1" v-for="commit in dataCommits" :key="commit.sha">
            <a :href="`https://github.com/${name_profile}/${name_repo}/commit/${commit.sha}`" target="_blank" class="commits__commit__cta label label-blue" title="Go to View Commit">{{commit.commit.message}}</a>
          </div>

          <div class="commits__commit__action text-center">
            <button @click="github.page--, getCommits()" class="button button-success mr-4" ref="btnPrev">⮜ Previous</button>
            <button @click="github.page++, getCommits()" class="button button-success" ref="btnNext">Next ➤</button>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import { api } from '@/services/index.js'

export default {
  name: 'Commits',
  props: ['name_profile', 'name_repo', 'stars'],
  data() {
    return {
      showLoad: false,
      github: {
        url: 'https://api.github.com/repos',
        client_id: process.env.VUE_APP_GITHUB_CLIENT_ID,
        client_secret: process.env.VUE_APP_GITHUB_CLIENT_SECRET,
        count: 10,
        sort: 'created: asc',
        page: 1,
      },
      dataCommits: null,
    };
  },
  methods: {
    getCommits: async function() {
      const { url, count, page, client_id, client_secret } = this.github;
      
      this.showLoad = true;

      try {
        api.get(`${url}/${this.name_profile}/${this.name_repo}/commits?per_page=${count}&page=${page}&client_id=${client_id}&client_secret=${client_secret}`).then(r =>{
          this.dataCommits = r.data;
          
          const btnNext = this.$refs.btnNext;
          const btnPrev = this.$refs.btnPrev;

          if(r.data.length == 0) {
            btnNext.setAttribute('disabled', 'disabled');
            this.showPagination = false;
          } else {
            btnNext.removeAttribute('disabled', 'disabled');
            this.showPagination = true
          }

          if(page == 1) btnPrev.setAttribute('disabled', 'disabled');
          else btnPrev.removeAttribute('disabled', 'disabled');
        });
      } catch(error) {
        console.log(error);
      } finally {
        this.showLoad = false;
      }
    },
    backPage() {
      this.$router.push('/');
    }
  },
  created() {
    this.showLoad = true;
    this.getCommits();
  }
}
</script>

<style scoped lang="scss">
.loading {
  width: 100%;
  height: 100vh;
  position: fixed;
  top: 0;
  left: 0;
  z-index: 2;
  display: flex;
  justify-content: center;
  align-items: center;
  background: rgba(0,0,0,1);
}

.commits {
  &__commit {
    &__cta {
      max-width: 80%;
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      font-weight: 700;
    }
  }
}
</style>