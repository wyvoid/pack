export default function show(content: string) {
  var $app = document.getElementById('app')
  if ($app) {
    $app.innerText = 'Hello, 哈哈33哈 ' + content
  }
}