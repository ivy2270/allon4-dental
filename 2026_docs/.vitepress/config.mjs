export default {
  base: '/2026/',
  title: "2026 牙醫年會",
  themeConfig: {
    // 1. 設定頂部導航欄 (這在手機版會收進漢堡選單，且固定在頂部)
    nav: [
      {
        text: '組別快速切換',
        items: [
          { text: '🚩 四校報到', link: '#registration' },
          { text: '📝 學術組', link: '#academic' },
          { text: '💰 財務組', link: '#finance' },
          { text: '🎁 場地組', link: '#venue' },
          { text: '🏬 廠商看板', link: '#vendor' },
          { text: '👨‍⚕️ 醫師入口', link: '#doctor' }
        ]
      },
      { text: '系統登入', link: 'https://app.allon4-dental.tw/2026/gate.html' }
    ],

    // 2. 設定「本頁導覽」文字
    outline: {
      label: '本頁導覽',
      level: [2, 3]
    },

    // 3. (選配) 如果你希望有搜尋功能，這也是固定的
    search: {
      provider: 'local'
    }
  }
}
