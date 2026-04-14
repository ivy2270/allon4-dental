export default {
  base: '/2026/', 
  title: "2026 牙醫年會",
  description: "工作手冊",
  // 強制指定輸出目錄，確保與 yml 檔的 cp 指令對應
  outDir: './.vitepress/dist',
  themeConfig: {
    outline: { label: '本頁導覽', level: [2, 3] }
  }
}
