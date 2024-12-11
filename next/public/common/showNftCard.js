;(function () {
  // scriptタグからキャンペーンIDを取得
  const scriptTag = document.currentScript
  const campaignId = scriptTag.getAttribute('campaignId')
  const scriptSrc = scriptTag.getAttribute('src')
  const baseUrl = new URL(scriptSrc).origin

  if (!campaignId) {
    console.error('campaignId is required')
    return
  }
  if (!baseUrl) {
    console.error('baseUrl is required')
    return
  }

  console.log({ campaignId })
  console.log({ baseUrl })

  // コンテンツを表示するためのdiv要素を取得
  const container = document.getElementById('nft-card-container')
  if (!container) {
    console.error('Container element with id "nft-card-container" is required')
    return
  }

  // iframeを作成してNext.jsのページを埋め込む
  const iframe = document.createElement('iframe')
  iframe.src = `${baseUrl}/?campaignId=${campaignId}`
  iframe.width = '100%'
  iframe.height = '100%' // 高さは必要に応じて調整
  iframe.style.border = 'none' // ボーダーを消す

  // iframeをコンテナに挿入
  container.appendChild(iframe)
})()
