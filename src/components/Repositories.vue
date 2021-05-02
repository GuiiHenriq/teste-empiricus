<template>
  <div class="grid repo">
    <div class="row mb-4">
      <div class="repo__cta col-12 col-md-6">
        <button class="col-12 button button-sm button-outline-green" @click.prevent="getCommits" target="_blank">{{repo.name}}</button>
      </div>
      <div class="repo__item col-12 col-md-6 text-center">
        <span class="repo__item__stars label label-pill label-blue mr-2">Stars: {{repo.stargazers_count}}</span>
        <span class="repo__item__watch label label-pill label-green mr-2">Watch: {{repo.watchers_count}}</span>
        <span class="repo__item__forks label label-pill label-red">Forks: {{repo.forks_count}}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Repositories',
  props: ['repo'],
  methods: {
    getCommits() {
      this.$router.push({ name: "Commits", params: { name_repo: this.repo.name, name_profile: this.repo.owner.login, stars: this.repo.stargazers_count } });
    },
  },
}
</script>

<style scoped lang="scss">
/* ============= Responsive ============= */
@media screen and (max-width: 768px) {
  .repo {
    &__item {
      margin-top: 8px;
    }
  }
}
</style>