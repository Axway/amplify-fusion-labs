document.querySelectorAll('pre').forEach(function(pre) {
  pre.style.position = 'relative';

  var btn = document.createElement('button');
  btn.textContent = 'Copy';
  btn.className = 'copy-code-btn';
  btn.style.position = 'absolute';
  btn.style.top = '4px';
  btn.style.right = '4px';
  btn.style.padding = '2px 8px';
  btn.style.fontSize = '12px';
  btn.style.cursor = 'pointer';
  btn.style.border = '1px solid #ccc';
  btn.style.borderRadius = '4px';
  btn.style.background = '#f5f5f5';
  pre.appendChild(btn);

  btn.addEventListener('click', function(e) {
    e.stopPropagation();
    var codeContent = pre.querySelector('code')
      ? pre.querySelector('code').innerText
      : pre.innerText;
    navigator.clipboard.writeText(codeContent).then(function() {
      btn.textContent = 'Copied!';
      setTimeout(function() { btn.textContent = 'Copy'; }, 2000);
    }, function(err) {
      console.error('Could not copy text: ', err);
    });
  });
});