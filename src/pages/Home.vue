<template>
  <section class="section">
    <blockquote class="loading blockquote text-center text-green" v-if="showLoad">
      <i role="status" class="spinner-border spinner-border-lg mr-4"></i>
    </blockquote>

    <div class="grid search">
        <h2 class="search__title hero-2 text-center text-white">Search Profile</h2>
        <h5 class="search__sub text-center text-white">Enter a username and see all the profile details</h5>

        <div class="mt-4 search__content">
            <div class="row">
                <div class="col">
                  <div class="form-group input-lg">
                    <input class="search__content__input" type="text" id="search" placeholder="Search" v-model="queryUser"
                      @keyup="github.page = 1,
                      getProfile(),
                      getRepos()"
                    >
                  </div>
                </div>
            </div>
        </div>
    </div>

    <aside class="content" v-if="dataUser">
      <div class="grid">
        <div class="row">
          <div class="content__profile col-12 col-md-4">
            <Profile :user="dataUser" />
          </div>

          <div class="content__repos col-12 col-md-8" v-if="dataUser">
            <Repo v-for="repo in dataRepo" :key="repo.id" :repo="repo" />

            <div class="content__repos__actions text-center">
              <button @click="github.page--, getRepos()" class="button button-success mr-4" ref="btnPrev">⮜ Previous</button>
              <button @click="github.page++, getRepos()" class="button button-success" ref="btnNext">Next ➤</button>
            </div>
          </div>
        </div>
      </div>
    </aside>
  </section>
</template>

<script>
import { api } from '@/services/index.js'
import Profile from '@/components/Profile.vue'
import Repo from '@/components/Repositories.vue'

export default {
  name: 'Home',
  components: {
    Profile,
    Repo
  },
  data() {
    return {
      showLoad: false,
      github: {
        url: 'https://api.github.com/users',
        client_id: process.env.VUE_APP_GITHUB_CLIENT_ID,
        client_secret: process.env.VUE_APP_GITHUB_CLIENT_SECRET,
        count: 10,
        sort: 'created: asc',
        page: 1,
      },
      queryUser: '',
      dataUser: null,
      dataRepo: null,
    };
  },
  methods: {
    getProfile: async function() {
      const { url, client_id, client_secret } = this.github;

      this.showLoad = true;

      try {
        api.get(`${url}/${this.queryUser}?client_id=${client_id}&client_secret=${client_secret}`).then(r =>{
          this.dataUser = r.data;
        });
      } catch(error) {
        console.log(error);
      } finally {
        this.showLoad = false;
      }
    },
    getRepos: async function() {
      const { url, client_id, client_secret, count, sort, page } = this.github;

      this.showLoad = true;

      try {
        api.get(`${url}/${this.queryUser}/repos?per_page=${count}&page=${page}&sort=${sort}&client_id=${client_id}&client_secret=${client_secret}`).then(r =>{
          this.dataRepo = r.data;

          const btnNext = this.$refs.btnNext;
          const btnPrev = this.$refs.btnPrev;

          if(r.data.length == 0) btnNext.setAttribute('disabled', 'disabled');
          else btnNext.removeAttribute('disabled', 'disabled');

          if(page == 1) btnPrev.setAttribute('disabled', 'disabled');
          else btnPrev.removeAttribute('disabled', 'disabled');
        });
      } catch(error) {
        console.log(error);
      } finally {
        this.showLoad = false;
      }
    }
  },
  created() {
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
</style>
