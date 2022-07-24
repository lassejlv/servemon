---
layout: page
---

<script setup>
import {
  VPTeamPage,
  VPTeamPageTitle,
  VPTeamMembers
} from 'vitepress/theme'

const members = [
  {
    avatar: 'https://github.com/lassv.png',
    name: 'Lasse Vestergaard',
    title: 'Creator',
    links: [
      { icon: 'github', link: 'https://github.com/lassv' },
      { icon: 'twitter', link: 'https://twitter.com/lassv_05' }
    ]
  },
]
</script>

<VPTeamPage>
  <VPTeamPageTitle>
    <template #title>
      Our Team
    </template>
    <template #lead>
      This is our awesome team, that made this project possible.
    </template>
  </VPTeamPageTitle>
  <VPTeamMembers
    :members="members"
  />
</VPTeamPage>
