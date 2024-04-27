const pages = [
  'keshav-upadhyaya'
]

pages.forEach((page, index) => {
  const link = document.createElement('a');
  link.href = `${page}.html`;
  link.innerHTML = `${index + 1}. ${formatProjectName(page)}`;

  const section = document.getElementsByTagName('section')[0];
  section.appendChild(link);
});

/**
 * 
 * @param {string} name
 */
function formatProjectName(name) {
  return name.split('-').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
}