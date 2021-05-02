<template>
  <div class="grid profile">
    <div class="row">
      <div class="col-12 col-md-12">
        <div class="card card-alternative bg-dark mb-4">
          <div class="card-body">
            <img class="profile__thumb card-img-top img-fluid mb-4" :src="user.avatar_url" alt="">
            <ul class="profile__item list-group list-group-flush">
              <li class="profile__item__repositories list-group-item mb-3">
                Repositories: <span class="label label-pill label-blue">{{user.public_repos}}</span>
              </li>

              <li class="profile__item__followers list-group-item mb-3">
                Followers: <span class="label label-pill label-green">{{user.followers}}</span>
              </li>

              <li class="profile__item__following list-group-item">
                Following: <span class="label label-pill label-red">{{user.following}}</span>
              </li>
            </ul>
          </div>
          <div class="profile__cta card-footer text-center">
            <a :href="user.html_url" class="text-green" title="Go to View Profile">View Profile</a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Profile',
  props: ['user'],
}
</script>

<style>

</style>