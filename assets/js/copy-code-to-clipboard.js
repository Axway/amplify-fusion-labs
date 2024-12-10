document.querySelector('pre').addEventListener('click', function() {
  const codeContent = this.innerText;
  navigator.clipboard.writeText(codeContent).then(function() {
    console.info('Code copied to clipboard');
  }, function(err) {
    console.error('Could not copy text: ', err);
  });
});
