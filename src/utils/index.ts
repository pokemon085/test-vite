/**
 * 取得 assets 資料夾內的圖片完整 URL
 *
 * 使用 Vite 的 new URL + import.meta.url 方式，
 * 讓圖片在開發環境與 build 後都能正確解析路徑。
 *
 * @param file - assets 資料夾內的檔案路徑，例如：'goods/image.png'
 * @returns 圖片的完整 URL，可直接用於 <img :src="">
 */
export const getImage = (file: string) =>
  new URL(`../assets/${file}`, import.meta.url).href;
